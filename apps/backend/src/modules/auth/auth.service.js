const jwt = require("jsonwebtoken");
const { AppError, isAppError } = require("../../utils/AppError");
const { hashPassword, randomToken, sha256, verifyPassword } = require("../../utils/crypto");
const { env } = require("../../config/env");
const { redis } = require("../../config/redis");
const { authRepository } = require("./auth.repository");

const signAccessToken = (user) => {
    return jwt.sign({ role: user.role, email: user.email }, env.jwt.accessSecret, {
        subject: user.id,
        expiresIn: env.jwt.accessExpiresIn,
    });
};

const signRefreshToken = (user, tokenId) => {
    return jwt.sign({ tokenId }, env.jwt.refreshSecret, {
        subject: user.id,
        expiresIn: env.jwt.refreshExpiresIn,
    });
};

const toPublicUser = (user) => ({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    role: user.role,
    isEmailVerified: user.isEmailVerified,
});

const issueTokens = async (user) => {
    const tokenId = randomToken(16);
    return {
        user: toPublicUser(user),
        accessToken: signAccessToken(user),
        refreshToken: signRefreshToken(user, tokenId),
    };
};

const register = async (input) => {
    const existing = await authRepository.findUserByEmail(input.email);
    if (existing) throw AppError(409, "Email already registered", "EMAIL_EXISTS");

    const user = await authRepository.createCustomer({
        email: input.email.toLowerCase(),
        passwordHash: await hashPassword(input.password),
        firstName: input.firstName,
        lastName: input.lastName,
        phone: input.phone || null,
    });

    const verificationToken = randomToken();
    await redis.setex(`email_verify:${sha256(verificationToken)}`, 60 * 60 * 24, user.id).catch(() => undefined);
    return { user: toPublicUser(user), verificationToken };
};

const login = async (email, password) => {
    const user = await authRepository.findActiveUserByEmail(email);
    if (!user || !(await verifyPassword(password, user.passwordHash))) {
        throw AppError(401, "Invalid credentials", "INVALID_CREDENTIALS");
    }
    return issueTokens(user);
};

const refresh = async (refreshToken) => {
    try {
        const payload = jwt.verify(refreshToken, env.jwt.refreshSecret);
        const isRevoked = await redis.get(`refresh_revoked:${payload.tokenId}`).catch(() => null);
        if (isRevoked) throw AppError(401, "Refresh token revoked", "TOKEN_REVOKED");

        const user = await authRepository.findUserById(payload.sub);
        if (!user || user.status !== "ACTIVE") throw AppError(401, "Invalid refresh token", "INVALID_REFRESH_TOKEN");
        return issueTokens(user);
    }
    catch (error) {
        if (isAppError(error)) throw error;
        throw AppError(401, "Invalid refresh token", "INVALID_REFRESH_TOKEN");
    }
};

const logout = async (refreshToken) => {
    const payload = jwt.decode(refreshToken);
    if (payload?.tokenId && payload.exp) {
        const ttl = Math.max(payload.exp - Math.floor(Date.now() / 1000), 1);
        await redis.setex(`refresh_revoked:${payload.tokenId}`, ttl, "1").catch(() => undefined);
    }
};

const verifyEmail = async (token) => {
    const key = `email_verify:${sha256(token)}`;
    const userId = await redis.get(key);
    if (!userId) throw AppError(400, "Invalid or expired verification token", "INVALID_EMAIL_TOKEN");
    await authRepository.markEmailVerified(userId);
    await redis.del(key);
};

const forgotPassword = async (email) => {
    const user = await authRepository.findUserByEmail(email);
    if (!user) return { resetToken: null };
    const resetToken = randomToken();
    await redis.setex(`password_reset:${sha256(resetToken)}`, 60 * 30, user.id).catch(() => undefined);
    return { resetToken };
};

const resetPassword = async (token, password) => {
    const key = `password_reset:${sha256(token)}`;
    const userId = await redis.get(key);
    if (!userId) throw AppError(400, "Invalid or expired reset token", "INVALID_RESET_TOKEN");
    await authRepository.updatePassword(userId, await hashPassword(password));
    await redis.del(key);
};

const authService = {
    register,
    login,
    refresh,
    logout,
    verifyEmail,
    forgotPassword,
    resetPassword,
};

module.exports = {
    register,
    login,
    refresh,
    logout,
    verifyEmail,
    forgotPassword,
    resetPassword,
    authService,
};
