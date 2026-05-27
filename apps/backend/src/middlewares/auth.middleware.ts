import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import { env } from "../config/env";
import { AppError } from "../utils/AppError";
import type { Role } from "../modules/user/user.model";

export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const header = req.header("authorization");
  const token = header?.startsWith("Bearer ") ? header.slice(7) : undefined;
  if (!token) return next(new AppError(401, "Authentication required", "AUTH_REQUIRED"));

  try {
    const payload = jwt.verify(token, env.jwt.accessSecret) as { sub: string; role: Role; email: string };
    req.user = { id: payload.sub, role: payload.role, email: payload.email };
    return next();
  } catch {
    return next(new AppError(401, "Invalid or expired access token", "INVALID_TOKEN"));
  }
}

export function authorize(...roles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) return next(new AppError(401, "Authentication required", "AUTH_REQUIRED"));
    if (!roles.includes(req.user.role)) return next(new AppError(403, "Forbidden", "FORBIDDEN"));
    return next();
  };
}
