import type { ErrorRequestHandler } from "express";
import Joi from "joi";
import { AppError } from "../utils/AppError";
import { env } from "../config/env";
import { logger } from "../config/logger";

export const notFoundHandler = () => {
  throw new AppError(404, "Route not found", "ROUTE_NOT_FOUND");
};

export const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  if (error instanceof Joi.ValidationError) {
    return res.status(400).json({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Request validation failed",
        details: error.details.map((item) => ({ path: item.path, message: item.message })),
      },
    });
  }

  const statusCode = error instanceof AppError ? error.statusCode : 500;
  const code = error instanceof AppError ? error.code : "INTERNAL_SERVER_ERROR";

  logger.error({ err: error, requestId: req.requestId }, "Request failed");

  return res.status(statusCode).json({
    success: false,
    error: {
      code,
      message: statusCode === 500 && env.isProduction ? "Internal server error" : error.message,
      details: error instanceof AppError ? error.details : undefined,
    },
  });
};
