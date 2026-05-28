module.exports = {
  ...require("../modules/admin/admin.controller"),
  ...require("../modules/auth/auth.controller"),
  ...require("../modules/cart/cart.controller"),
  ...require("../modules/checkout/controller/coupon.controller"),
  ...require("../modules/measurement/measurement.controller"),
  ...require("../modules/order/order.controller"),
  ...require("../modules/payment/payment.controller"),
  ...require("../modules/product/product.controller"),
  ...require("../modules/user/user.controller")
};
