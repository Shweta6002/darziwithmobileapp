import { sequelize } from "../../config/database";
import { Cart, CartItem, Inventory, Product, ProductVariant } from "../../database/models";
import { AppError } from "../../utils/AppError";

export class CartService {
  async getCart(userId: string) {
    const [cart] = await Cart.findOrCreate({ where: { userId }, defaults: { userId, guestToken: null, couponCode: null } });
    return Cart.findByPk(cart.id, { include: [{ model: CartItem, include: [Product, ProductVariant] }] });
  }

  async addItem(userId: string, input: any) {
    return sequelize.transaction(async (transaction) => {
      const [cart] = await Cart.findOrCreate({ where: { userId }, defaults: { userId, guestToken: null, couponCode: null }, transaction });
      const inventory = await Inventory.findOne({ where: { variantId: input.variantId }, transaction, lock: transaction.LOCK.UPDATE });
      if (!inventory || inventory.stockOnHand - inventory.stockReserved < input.quantity) {
        throw new AppError(409, "Insufficient inventory", "INSUFFICIENT_INVENTORY");
      }
      const variant = await ProductVariant.findByPk(input.variantId, { transaction });
      if (!variant) throw new AppError(404, "Variant not found", "VARIANT_NOT_FOUND");
      const product = await Product.findByPk(input.productId, { transaction });
      if (!product) throw new AppError(404, "Product not found", "PRODUCT_NOT_FOUND");

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
      return this.getCart(userId);
    });
  }

  async updateItem(userId: string, itemId: string, quantity: number) {
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) throw new AppError(404, "Cart not found", "CART_NOT_FOUND");
    const item = await CartItem.findOne({ where: { id: itemId, cartId: cart.id } });
    if (!item) throw new AppError(404, "Cart item not found", "CART_ITEM_NOT_FOUND");
    item.quantity = quantity;
    await item.save();
    return this.getCart(userId);
  }

  async removeItem(userId: string, itemId: string) {
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) return null;
    await CartItem.destroy({ where: { id: itemId, cartId: cart.id } });
    return this.getCart(userId);
  }
}

export const cartService = new CartService();
