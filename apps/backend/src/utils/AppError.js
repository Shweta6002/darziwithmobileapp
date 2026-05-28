const AppError = (statusCode, message, code = "APP_ERROR", details) => {
    const error = Error(message);
    error.name = "AppError";
    error.statusCode = statusCode;
    error.code = code;
    error.details = details;
    error.isOperational = true;
    return error;
};

const isAppError = (error) => Boolean(error && error.name === "AppError" && error.isOperational);

module.exports = {
    AppError,
    isAppError,
};
