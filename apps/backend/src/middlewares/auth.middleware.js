const jwt = require("jsonwebtoken");
const { env } = require("../config/env");
const { AppError } = require("../utils/AppError");

const authenticate = (req, _res, next) => {
    const header = req.header("authorization");
    const token = header?.startsWith("Bearer ") ? header.slice(7) : undefined;
    if (!token) return next(AppError(401, "Authentication required", "AUTH_REQUIRED"));

    try {
        const payload = jwt.verify(token, env.jwt.accessSecret);
        req.user = { id: payload.sub, role: payload.role, email: payload.email };
        return next();
    }
    catch {
        return next(AppError(401, "Invalid or expired access token", "INVALID_TOKEN"));
    }
};

const authorize = (...roles) => (req, _res, next) => {
    if (!req.user) return next(AppError(401, "Authentication required", "AUTH_REQUIRED"));
    if (!roles.includes(req.user.role)) return next(AppError(403, "Forbidden", "FORBIDDEN"));
    return next();
};

const authMiddleware = (roles = []) => [
    authenticate,
    authorize(...roles),
];

module.exports = {
    authenticate,
    authorize,
    authMiddleware,
};
