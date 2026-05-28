const { Router, raw } = require("express");
const { authenticate } = require("../../middlewares/auth.middleware");
const { validate } = require("../../utils/validate");
const { paymentController } = require("./payment.controller");
const { verifyPaymentSchema } = require("./validation_schema");
const paymentRoutes = Router();
paymentRoutes.post("/webhook", raw({ type: "application/json" }), paymentController.webhook);
paymentRoutes.use(authenticate);
paymentRoutes.post("/orders/:orderId/provider-order", paymentController.createProviderOrder);
paymentRoutes.post("/verify", validate({ body: verifyPaymentSchema }), paymentController.verify);
module.exports = {
  paymentRoutes
};
