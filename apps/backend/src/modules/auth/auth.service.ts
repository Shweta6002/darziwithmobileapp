import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";
import { User } from "../user/user.model";
import { AppError } from "../../utils/AppError";
import { hashPassword, randomToken, sha256, verifyPassword } from "../../utils/crypto";
import { env } from "../../config/env";
import { redis } from "../../config/redis";

type RegisterInput = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
};

function signAccessToken(user: User) {
  const options: SignOptions = { subject: user.id, expiresIn: env.jwt.accessExpiresIn as SignOptions["expiresIn"] };
  return jwt.sign({ role: user.role, email: user.email }, env.jwt.accessSecret, {
    ...options,
  });
}

function signRefreshToken(user: User, tokenId: string) {
  const options: SignOptions = { subject: user.id, expiresIn: env.jwt.refreshExpiresIn as SignOptions["expiresIn"] };
  return jwt.sign({ tokenId }, env.jwt.refreshSecret, {
    ...options,
  });
}

export class AuthService {
  async register(input: RegisterInput) {
    const existing = await User.findOne({ where: { email: input.email.toLowerCase() } });
    if (existing) throw new AppError(409, "Email already registered", "EMAIL_EXISTS");

    const user = await User.create({
      email: input.email.toLowerCase(),
      passwordHash: await hashPassword(input.password),
      firstName: input.firstName,
      lastName: input.lastName,
      phone: input.phone || null,
      role: "CUSTOMER",
    });

    const verificationToken = randomToken();
    await redis.setex(`email_verify:${sha256(verificationToken)}`, 60 * 60 * 24, user.id).catch(() => undefined);

    return { user: this.toPublicUser(user), verificationToken };
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ where: { email: email.toLowerCase(), status: "ACTIVE" } });
    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      throw new AppError(401, "Invalid credentials", "INVALID_CREDENTIALS");
    }
    return this.issueTokens(user);
  }

  async refresh(refreshToken: string) {
    try {
      const payload = jwt.verify(refreshToken, env.jwt.refreshSecret) as { sub: string; tokenId: string };
      const isRevoked = await redis.get(`refresh_revoked:${payload.tokenId}`).catch(() => null);
      if (isRevoked) throw new AppError(401, "Refresh token revoked", "TOKEN_REVOKED");
      const user = await User.findByPk(payload.sub);
      if (!user || user.status !== "ACTIVE") throw new AppError(401, "Invalid refresh token", "INVALID_REFRESH_TOKEN");
      return this.issueTokens(user);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(401, "Invalid refresh token", "INVALID_REFRESH_TOKEN");
    }
  }

  async logout(refreshToken: string) {
    const payload = jwt.decode(refreshToken) as { tokenId?: string; exp?: number } | null;
    if (payload?.tokenId && payload.exp) {
      const ttl = Math.max(payload.exp - Math.floor(Date.now() / 1000), 1);
      await redis.setex(`refresh_revoked:${payload.tokenId}`, ttl, "1").catch(() => undefined);
    }
  }

  async verifyEmail(token: string) {
    const key = `email_verify:${sha256(token)}`;
    const userId = await redis.get(key);
    if (!userId) throw new AppError(400, "Invalid or expired verification token", "INVALID_EMAIL_TOKEN");
    await User.update({ isEmailVerified: true }, { where: { id: userId } });
    await redis.del(key);
  }

  async forgotPassword(email: string) {
    const user = await User.findOne({ where: { email: email.toLowerCase() } });
    if (!user) return { resetToken: null };
    const resetToken = randomToken();
    await redis.setex(`password_reset:${sha256(resetToken)}`, 60 * 30, user.id).catch(() => undefined);
    return { resetToken };
  }

  async resetPassword(token: string, password: string) {
    const key = `password_reset:${sha256(token)}`;
    const userId = await redis.get(key);
    if (!userId) throw new AppError(400, "Invalid or expired reset token", "INVALID_RESET_TOKEN");
    await User.update({ passwordHash: await hashPassword(password) }, { where: { id: userId } });
    await redis.del(key);
  }

  private async issueTokens(user: User) {
    const tokenId = randomToken(16);
    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user, tokenId);
    return { user: this.toPublicUser(user), accessToken, refreshToken };
  }

  private toPublicUser(user: User) {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
    };
  }
}

export const authService = new AuthService();
