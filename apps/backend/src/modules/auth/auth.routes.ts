import { Router } from "express";
import Joi from "joi";
import { validate } from "../../utils/validate";
import { authController } from "./auth.controller";
import { forgotPasswordSchema, loginSchema, refreshSchema, registerSchema, resetPasswordSchema } from "./auth.validation";

export const authRoutes = Router();

authRoutes.post("/register", validate({ body: registerSchema }), authController.register);
authRoutes.post("/login", validate({ body: loginSchema }), authController.login);
authRoutes.post("/refresh", validate({ body: refreshSchema }), authController.refresh);
authRoutes.post("/logout", validate({ body: refreshSchema }), authController.logout);
authRoutes.post("/verify-email", validate({ body: Joi.object({ token: Joi.string().required() }) }), authController.verifyEmail);
authRoutes.post("/forgot-password", validate({ body: forgotPasswordSchema }), authController.forgotPassword);
authRoutes.post("/reset-password", validate({ body: resetPasswordSchema }), authController.resetPassword);
