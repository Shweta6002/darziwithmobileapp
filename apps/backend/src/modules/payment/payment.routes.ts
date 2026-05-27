import { Router, raw } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { validate } from "../../utils/validate";
import { paymentController, verifyPaymentSchema } from "./payment.controller";

export const paymentRoutes = Router();

paymentRoutes.post("/webhook", raw({ type: "application/json" }), paymentController.webhook);
paymentRoutes.use(authenticate);
paymentRoutes.post("/orders/:orderId/provider-order", paymentController.createProviderOrder);
paymentRoutes.post("/verify", validate({ body: verifyPaymentSchema }), paymentController.verify);
