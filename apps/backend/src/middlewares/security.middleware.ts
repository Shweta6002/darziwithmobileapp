import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { randomUUID } from "crypto";
import type { Express, Request, Response, NextFunction } from "express";
import pinoHttp from "pino-http";
import { env } from "../config/env";
import { logger } from "../config/logger";

export function registerSecurityMiddleware(app: Express) {
  app.disable("x-powered-by");
  app.use((req: Request, res: Response, next: NextFunction) => {
    req.requestId = req.header("x-request-id") || randomUUID();
    res.setHeader("x-request-id", req.requestId);
    next();
  });
  app.use(pinoHttp({ logger }));
  app.use(helmet());
  app.use(cors({ origin: env.webOrigin.split(","), credentials: true }));
  app.use(compression());
  app.use(cookieParser());
  app.use(expressJsonWithWebhookException);
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 500,
      standardHeaders: "draft-7",
      legacyHeaders: false,
    }),
  );
}

function expressJsonWithWebhookException(req: Request, res: Response, next: NextFunction) {
  if (req.originalUrl.includes("/payments/webhook")) return next();
  return express.json({ limit: "1mb" })(req, res, next);
}
