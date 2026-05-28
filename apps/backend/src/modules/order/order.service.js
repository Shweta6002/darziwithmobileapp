const { randomBytes } = require("crypto");
const { sequelize } = require("../../config/database");
const { Cart, CartItem, Inventory, Order, OrderItem, Payment, Product, ProductVariant } = require("../../database/models");
const { AppError } = require("../../utils/AppError");

const getById = async (userId, id) => {
    const order = await Order.findOne({ where: { id, userId }, include: [OrderItem, Payment] });
    if (!order) throw AppError(404, "Order not found", "ORDER_NOT_FOUND");
    return order;
};

const createFromCart = async (userId, addressSnapshot) => {
    return sequelize.transaction(async (transaction) => {
        const cart = await Cart.findOne({ where: { userId }, include: [{ model: CartItem, include: [Product, ProductVariant] }], transaction });
        const items = (cart?.CartItems || []);
        if (!cart || items.length === 0) throw AppError(400, "Cart is empty", "EMPTY_CART");

        const subtotal = items.reduce((total, item) => total + Number(item.unitPrice) * item.quantity, 0);
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
                throw AppError(409, "Insufficient inventory during checkout", "INSUFFICIENT_INVENTORY");
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
        return getById(userId, order.id);
    });
};

const initiate = async (payload) => ({
    ...payload,
    id: `ord-${randomBytes(4).toString("hex")}`,
    status: "Order Received",
    date: new Date().toISOString().slice(0, 10),
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
});

const list = async (userId) => {
    return Order.findAll({ where: { userId }, include: [OrderItem, Payment], order: [["createdAt", "DESC"]] });
};

const updateStatus = async (id, status) => {
    const [count] = await Order.update({ status }, { where: { id } });
    if (!count) throw AppError(404, "Order not found", "ORDER_NOT_FOUND");
    return Order.findByPk(id);
};

const orderService = {
    createFromCart,
    initiate,
    list,
    getById,
    updateStatus,
};

module.exports = {
    createFromCart,
    initiate,
    list,
    getById,
    updateStatus,
    orderService,
};
