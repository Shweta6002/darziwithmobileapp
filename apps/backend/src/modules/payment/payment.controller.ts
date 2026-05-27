import Joi from "joi";
import { asyncHandler } from "../../utils/asyncHandler";
import { ok } from "../../utils/apiResponse";
import { paymentService } from "./payment.service";

export const verifyPaymentSchema = Joi.object({
  razorpay_order_id: Joi.string().required(),
  razorpay_payment_id: Joi.string().required(),
  razorpay_signature: Joi.string().required(),
});

export const paymentController = {
  createProviderOrder: asyncHandler(async (req, res) => ok(res, await paymentService.createProviderOrder(req.params.orderId))),
  verify: asyncHandler(async (req, res) => ok(res, await paymentService.verifyRazorpayPayment(req.body))),
  webhook: asyncHandler(async (req, res) => ok(res, await paymentService.handleWebhook(req.header("x-razorpay-signature"), req.body))),
};
