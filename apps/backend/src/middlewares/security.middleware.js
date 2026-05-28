const compression = require("compression");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { randomUUID } = require("crypto");
const pinoHttp = require("pino-http");
const { env } = require("../config/env");
const { logger } = require("../config/logger");
function registerSecurityMiddleware(app) {
    app.disable("x-powered-by");
    app.use((req, res, next) => {
        req.requestId = req.header("x-request-id") || randomUUID();
        res.setHeader("x-request-id", req.requestId);
        next();
    });
    app.use(pinoHttp({ logger: logger }));
    app.use(helmet());
    app.use(cors({ origin: env.webOrigin.split(","), credentials: true }));
    app.use(compression());
    app.use(cookieParser());
    app.use(expressJsonWithWebhookException);
    app.use(rateLimit({
        windowMs: 15 * 60 * 1000,
        limit: 500,
        standardHeaders: "draft-7",
        legacyHeaders: false,
    }));
}
function expressJsonWithWebhookException(req, res, next) {
    if (req.originalUrl.includes("/payments/webhook"))
        return next();
    return express.json({ limit: "1mb" })(req, res, next);
}
module.exports = {
  registerSecurityMiddleware
};
