const { Router } = require("express");
const { validate } = require("../../utils/validate");
const { authController } = require("./auth.controller");
const {
    forgotPasswordSchema,
    loginSchema,
    refreshSchema,
    registerSchema,
    resetPasswordSchema,
    verifyEmailSchema
} = require("./validation_schema");
const authRoutes = Router();
authRoutes.post("/register", validate({ body: registerSchema }), authController.register);
authRoutes.post("/login", validate({ body: loginSchema }), authController.login);
authRoutes.post("/refresh", validate({ body: refreshSchema }), authController.refresh);
authRoutes.post("/logout", validate({ body: refreshSchema }), authController.logout);
authRoutes.post("/verify-email", validate({ body: verifyEmailSchema }), authController.verifyEmail);
authRoutes.post("/forgot-password", validate({ body: forgotPasswordSchema }), authController.forgotPassword);
authRoutes.post("/reset-password", validate({ body: resetPasswordSchema }), authController.resetPassword);
module.exports = {
  authRoutes
};
