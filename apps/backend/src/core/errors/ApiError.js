const { AppError, isAppError } = require("../../utils/AppError");

module.exports = {
    ApiError: AppError,
    AppError,
    isAppError,
};
