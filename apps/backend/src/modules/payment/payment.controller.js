const { asyncHandler } = require("../../utils/asyncHandler");
const { ok } = require("../../utils/apiResponse");
const { paymentService } = require("./payment.service");
const paymentController = {
    createProviderOrder: asyncHandler(async (req, res) => ok(res, await paymentService.createProviderOrder(req.params.orderId))),
    verify: asyncHandler(async (req, res) => ok(res, await paymentService.verifyRazorpayPayment(req.body))),
    webhook: asyncHandler(async (req, res) => ok(res, await paymentService.handleWebhook(req.header("x-razorpay-signature"), req.body))),
};
module.exports = {
  paymentController
};
