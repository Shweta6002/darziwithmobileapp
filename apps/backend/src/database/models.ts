import { User } from "../modules/user/user.model";
import { Address } from "../modules/user/address.model";
import { PaymentMethod } from "../modules/user/payment-method.model";
import { Category } from "../modules/product/category.model";
import { Product } from "../modules/product/product.model";
import { ProductVariant } from "../modules/product/product-variant.model";
import { Inventory } from "../modules/product/inventory.model";
import { Review } from "../modules/product/review.model";
import { WishlistItem } from "../modules/product/wishlist.model";
import { Cart } from "../modules/cart/cart.model";
import { CartItem } from "../modules/cart/cart-item.model";
import { Coupon } from "../modules/checkout/coupon.model";
import { Order } from "../modules/order/order.model";
import { OrderItem } from "../modules/order/order-item.model";
import { Payment } from "../modules/payment/payment.model";
import { MeasurementProfile } from "../modules/measurement/measurement-profile.model";
import { AdminLog } from "../modules/admin/admin-log.model";

User.hasMany(Address, { foreignKey: "userId" });
Address.belongsTo(User, { foreignKey: "userId" });
User.hasMany(PaymentMethod, { foreignKey: "userId" });
User.hasMany(MeasurementProfile, { foreignKey: "userId" });

Category.hasMany(Category, { as: "children", foreignKey: "parentId" });
Category.hasMany(Product, { foreignKey: "categoryId" });
Product.belongsTo(Category, { foreignKey: "categoryId" });
Product.hasMany(ProductVariant, { foreignKey: "productId" });
ProductVariant.belongsTo(Product, { foreignKey: "productId" });
ProductVariant.hasOne(Inventory, { foreignKey: "variantId" });
Inventory.belongsTo(ProductVariant, { foreignKey: "variantId" });
Product.hasMany(Review, { foreignKey: "productId" });
Product.hasMany(WishlistItem, { foreignKey: "productId" });

User.hasOne(Cart, { foreignKey: "userId" });
Cart.hasMany(CartItem, { foreignKey: "cartId" });
CartItem.belongsTo(Product, { foreignKey: "productId" });
CartItem.belongsTo(ProductVariant, { foreignKey: "variantId" });

User.hasMany(Order, { foreignKey: "userId" });
Order.hasMany(OrderItem, { foreignKey: "orderId" });
Order.hasOne(Payment, { foreignKey: "orderId" });

export {
  User,
  Address,
  PaymentMethod,
  Category,
  Product,
  ProductVariant,
  Inventory,
  Review,
  WishlistItem,
  Cart,
  CartItem,
  Coupon,
  Order,
  OrderItem,
  Payment,
  MeasurementProfile,
  AdminLog,
};
