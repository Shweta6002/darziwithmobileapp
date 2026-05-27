import { randomBytes } from "crypto";
import { sequelize } from "../../config/database";
import { Cart, CartItem, Inventory, Order, OrderItem, Payment, Product, ProductVariant } from "../../database/models";
import { AppError } from "../../utils/AppError";

export class OrderService {
  async createFromCart(userId: string, addressSnapshot: Record<string, unknown>) {
    return sequelize.transaction(async (transaction) => {
      const cart = await Cart.findOne({ where: { userId }, include: [{ model: CartItem, include: [Product, ProductVariant] }], transaction });
      const items = ((cart as any)?.CartItems || []) as any[];
      if (!cart || items.length === 0) throw new AppError(400, "Cart is empty", "EMPTY_CART");

      let subtotal = 0;
      for (const item of items) subtotal += Number(item.unitPrice) * item.quantity;
      const taxTotal = Math.round(subtotal * 0.05);
      const shippingTotal = subtotal > 5000 ? 0 : 199;
      const grandTotal = subtotal + taxTotal + shippingTotal;

      const order = await Order.create({
        orderNumber: `DRZ-${randomBytes(5).toString("hex").toUpperCase()}`,
        userId,
        addressSnapshot,
        subtotal,
        taxTotal,
        shippingTotal,
        discountTotal: 0,
        grandTotal,
        couponCode: cart.couponCode,
        estimatedDeliveryAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      }, { transaction });

      for (const item of items) {
        const inventory = await Inventory.findOne({ where: { variantId: item.variantId }, transaction, lock: transaction.LOCK.UPDATE });
        if (!inventory || inventory.stockOnHand - inventory.stockReserved < item.quantity) {
          throw new AppError(409, "Insufficient inventory during checkout", "INSUFFICIENT_INVENTORY");
        }
        inventory.stockReserved += item.quantity;
        await inventory.save({ transaction });
        await OrderItem.create({
          orderId: order.id,
          productId: item.productId,
          variantId: item.variantId,
          productSnapshot: item.Product?.toJSON?.() || {},
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          lineTotal: Number(item.unitPrice) * item.quantity,
          customization: item.customization,
          measurementSnapshot: {},
        }, { transaction });
      }
      await CartItem.destroy({ where: { cartId: cart.id }, transaction });
      await Payment.create({ orderId: order.id, provider: "RAZORPAY", amount: grandTotal }, { transaction });
      return this.getById(userId, order.id);
    });
  }

  async initiate(payload: any) {
    return {
      ...payload,
      id: `ord-${randomBytes(4).toString("hex")}`,
      status: "Order Received",
      date: new Date().toISOString().slice(0, 10),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    };
  }

  async list(userId: string) {
    return Order.findAll({ where: { userId }, include: [OrderItem, Payment], order: [["createdAt", "DESC"]] });
  }

  async getById(userId: string, id: string) {
    const order = await Order.findOne({ where: { id, userId }, include: [OrderItem, Payment] });
    if (!order) throw new AppError(404, "Order not found", "ORDER_NOT_FOUND");
    return order;
  }

  async updateStatus(id: string, status: any) {
    const [count] = await Order.update({ status }, { where: { id } });
    if (!count) throw new AppError(404, "Order not found", "ORDER_NOT_FOUND");
    return Order.findByPk(id);
  }
}

export const orderService = new OrderService();
