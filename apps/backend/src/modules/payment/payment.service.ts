import crypto from "crypto";
import Razorpay from "razorpay";
import { env } from "../../config/env";
import { Payment, Order } from "../../database/models";
import { AppError } from "../../utils/AppError";

const razorpay = env.razorpay.keyId
  ? new Razorpay({ key_id: env.razorpay.keyId, key_secret: env.razorpay.keySecret })
  : null;

export class PaymentService {
  async createProviderOrder(orderId: string) {
    const order = await Order.findByPk(orderId);
    if (!order) throw new AppError(404, "Order not found", "ORDER_NOT_FOUND");
    if (!razorpay) return { provider: "RAZORPAY", simulated: true, amount: order.grandTotal };

    const providerOrder = await razorpay.orders.create({
      amount: Math.round(Number(order.grandTotal) * 100),
      currency: order.currency,
      receipt: order.orderNumber,
    });
    await Payment.update({ providerOrderId: providerOrder.id, rawResponse: providerOrder as any }, { where: { orderId } });
    return providerOrder;
  }

  async verifyRazorpayPayment(input: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) {
    const expected = crypto
      .createHmac("sha256", env.razorpay.keySecret)
      .update(`${input.razorpay_order_id}|${input.razorpay_payment_id}`)
      .digest("hex");
    if (expected !== input.razorpay_signature) throw new AppError(400, "Invalid payment signature", "INVALID_PAYMENT_SIGNATURE");

    const payment = await Payment.findOne({ where: { providerOrderId: input.razorpay_order_id } });
    if (!payment) throw new AppError(404, "Payment not found", "PAYMENT_NOT_FOUND");
    await payment.update({ providerPaymentId: input.razorpay_payment_id, status: "CAPTURED" });
    await Order.update({ status: "ORDER_RECEIVED" }, { where: { id: payment.orderId } });
    return payment;
  }

  async handleWebhook(signature: string | undefined, rawBody: Buffer) {
    if (env.razorpay.webhookSecret) {
      const expected = crypto.createHmac("sha256", env.razorpay.webhookSecret).update(rawBody).digest("hex");
      if (!signature || expected !== signature) throw new AppError(400, "Invalid webhook signature", "INVALID_WEBHOOK_SIGNATURE");
    }
    return { received: true };
  }
}

export const paymentService = new PaymentService();
