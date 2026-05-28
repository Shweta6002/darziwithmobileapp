const crypto = require("crypto");
const Razorpay = require("razorpay");
const { env } = require("../../config/env");
const { Order, Payment } = require("../../database/models");
const { AppError } = require("../../utils/AppError");

const razorpay = env.razorpay.keyId
    ? new Razorpay({ key_id: env.razorpay.keyId, key_secret: env.razorpay.keySecret })
    : null;

const createProviderOrder = async (orderId) => {
    const order = await Order.findByPk(orderId);
    if (!order) throw AppError(404, "Order not found", "ORDER_NOT_FOUND");
    if (!razorpay) return { provider: "RAZORPAY", simulated: true, amount: order.grandTotal };

    const providerOrder = await razorpay.orders.create({
        amount: Math.round(Number(order.grandTotal) * 100),
        currency: order.currency,
        receipt: order.orderNumber,
    });
    await Payment.update({ providerOrderId: providerOrder.id, rawResponse: providerOrder }, { where: { orderId } });
    return providerOrder;
};

const verifyRazorpayPayment = async (input) => {
    const expected = crypto
        .createHmac("sha256", env.razorpay.keySecret)
        .update(`${input.razorpay_order_id}|${input.razorpay_payment_id}`)
        .digest("hex");
    if (expected !== input.razorpay_signature) throw AppError(400, "Invalid payment signature", "INVALID_PAYMENT_SIGNATURE");

    const payment = await Payment.findOne({ where: { providerOrderId: input.razorpay_order_id } });
    if (!payment) throw AppError(404, "Payment not found", "PAYMENT_NOT_FOUND");
    await payment.update({ providerPaymentId: input.razorpay_payment_id, status: "CAPTURED" });
    await Order.update({ status: "ORDER_RECEIVED" }, { where: { id: payment.orderId } });
    return payment;
};

const handleWebhook = async (signature, rawBody) => {
    if (env.razorpay.webhookSecret) {
        const expected = crypto.createHmac("sha256", env.razorpay.webhookSecret).update(rawBody).digest("hex");
        if (!signature || expected !== signature) throw AppError(400, "Invalid webhook signature", "INVALID_WEBHOOK_SIGNATURE");
    }
    return { received: true };
};

const paymentService = {
    createProviderOrder,
    verifyRazorpayPayment,
    handleWebhook,
};

module.exports = {
    createProviderOrder,
    verifyRazorpayPayment,
    handleWebhook,
    paymentService,
};
