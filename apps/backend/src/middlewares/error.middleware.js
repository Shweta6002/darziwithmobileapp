const Joi = require("joi");
const { AppError, isAppError } = require("../utils/AppError");
const { env } = require("../config/env");
const { logger } = require("../config/logger");
const notFoundHandler = () => {
    throw AppError(404, "Route not found", "ROUTE_NOT_FOUND");
};
const errorHandler = (error, req, res, _next) => {
    if (error instanceof Joi.ValidationError) {
        return res.status(400).json({
            success: false,
            message: "Request validation failed",
            error: {
                code: "VALIDATION_ERROR",
                details: error.details.map((item) => ({ path: item.path, message: item.message })),
            },
        });
    }
    const statusCode = isAppError(error) ? error.statusCode : 500;
    const code = isAppError(error) ? error.code : "INTERNAL_SERVER_ERROR";
    logger.error({ err: error, requestId: req.requestId }, "Request failed");
    return res.status(statusCode).json({
        success: false,
        message: statusCode === 500 && env.isProduction ? "Internal server error" : error.message,
        error: { code, details: isAppError(error) ? error.details : undefined },
    });
};
module.exports = {
  errorHandler,
  notFoundHandler
};
