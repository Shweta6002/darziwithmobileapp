const { sequelize } = require("../../config/database");
const { Cart, CartItem, Inventory, Product, ProductVariant } = require("../../database/models");
const { AppError } = require("../../utils/AppError");

const getCart = async (userId) => {
    const [cart] = await Cart.findOrCreate({ where: { userId }, defaults: { userId, guestToken: null, couponCode: null } });
    return Cart.findByPk(cart.id, { include: [{ model: CartItem, include: [Product, ProductVariant] }] });
};

const addItem = async (userId, input) => {
    return sequelize.transaction(async (transaction) => {
        const [cart] = await Cart.findOrCreate({ where: { userId }, defaults: { userId, guestToken: null, couponCode: null }, transaction });
        const inventory = await Inventory.findOne({ where: { variantId: input.variantId }, transaction, lock: transaction.LOCK.UPDATE });
        if (!inventory || inventory.stockOnHand - inventory.stockReserved < input.quantity) {
            throw AppError(409, "Insufficient inventory", "INSUFFICIENT_INVENTORY");
        }

        const variant = await ProductVariant.findByPk(input.variantId, { transaction });
        if (!variant) throw AppError(404, "Variant not found", "VARIANT_NOT_FOUND");

        const product = await Product.findByPk(input.productId, { transaction });
        if (!product) throw AppError(404, "Product not found", "PRODUCT_NOT_FOUND");

        const [item, created] = await CartItem.findOrCreate({
            where: { cartId: cart.id, variantId: input.variantId },
            defaults: {
                cartId: cart.id,
                productId: input.productId,
                variantId: input.variantId,
                quantity: input.quantity,
                unitPrice: Number(product.basePrice) + Number(variant.priceDelta),
                customization: input.customization || {},
                measurementProfileId: input.measurementProfileId || null,
            },
            transaction,
        });

        if (!created) {
            item.quantity += input.quantity;
            await item.save({ transaction });
        }

        return getCart(userId);
    });
};

const updateItem = async (userId, itemId, quantity) => {
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) throw AppError(404, "Cart not found", "CART_NOT_FOUND");

    const item = await CartItem.findOne({ where: { id: itemId, cartId: cart.id } });
    if (!item) throw AppError(404, "Cart item not found", "CART_ITEM_NOT_FOUND");

    item.quantity = quantity;
    await item.save();
    return getCart(userId);
};

const removeItem = async (userId, itemId) => {
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) return null;
    await CartItem.destroy({ where: { id: itemId, cartId: cart.id } });
    return getCart(userId);
};

const cartService = {
    getCart,
    addItem,
    updateItem,
    removeItem,
};

module.exports = {
    getCart,
    addItem,
    updateItem,
    removeItem,
    cartService,
};
