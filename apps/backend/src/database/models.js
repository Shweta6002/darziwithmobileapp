const { User } = require("../modules/user/model/user.model");
const { Address } = require("../modules/user/model/address.model");
const { PaymentMethod } = require("../modules/user/model/payment-method.model");
const { Category } = require("../modules/product/model/category.model");
const { Product } = require("../modules/product/model/product.model");
const { ProductVariant } = require("../modules/product/model/product-variant.model");
const { Inventory } = require("../modules/product/model/inventory.model");
const { Review } = require("../modules/product/model/review.model");
const { WishlistItem } = require("../modules/product/model/wishlist.model");
const { Cart } = require("../modules/cart/model/cart.model");
const { CartItem } = require("../modules/cart/model/cart-item.model");
const { Coupon } = require("../modules/checkout/model/coupon.model");
const { Order } = require("../modules/order/model/order.model");
const { OrderItem } = require("../modules/order/model/order-item.model");
const { Payment } = require("../modules/payment/model/payment.model");
const { MeasurementProfile } = require("../modules/measurement/model/measurement-profile.model");
const { AdminLog } = require("../modules/admin/model/admin-log.model");
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
module.exports = {
  Address,
  AdminLog,
  Cart,
  CartItem,
  Category,
  Coupon,
  Inventory,
  MeasurementProfile,
  Order,
  OrderItem,
  Payment,
  PaymentMethod,
  Product,
  ProductVariant,
  Review,
  User,
  WishlistItem
};
