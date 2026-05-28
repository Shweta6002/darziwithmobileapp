const { Router } = require("express");
const { adminRoutes } = require("../../modules/admin/admin.routes");
const { authRoutes } = require("../../modules/auth/auth.routes");
const { cartRoutes } = require("../../modules/cart/cart.routes");
const { couponRoutes } = require("../../modules/checkout/routes/coupon.routes");
const { measurementRoutes } = require("../../modules/measurement/measurement.routes");
const { orderRoutes } = require("../../modules/order/order.routes");
const { paymentRoutes } = require("../../modules/payment/payment.routes");
const { productRoutes } = require("../../modules/product/product.routes");
const { userRoutes } = require("../../modules/user/user.routes");
const routeDefinitions = [
    { path: "/auth", router: authRoutes, tags: ["Authentication"] },
    { path: "/customers", router: userRoutes, tags: ["Customers"] },
    { path: "/users", router: userRoutes, tags: ["Users"] },
    { path: "/products", router: productRoutes, tags: ["Products"] },
    { path: "/carts", router: cartRoutes, tags: ["Carts"] },
    { path: "/cart", router: cartRoutes, tags: ["Cart"] },
    { path: "/orders", router: orderRoutes, tags: ["Orders"] },
    { path: "/payments", router: paymentRoutes, tags: ["Payments"] },
    { path: "/measurement-profiles", router: measurementRoutes, tags: ["Measurement Profiles"] },
    { path: "/coupons", router: couponRoutes, tags: ["Coupons"] },
    { path: "/admin", router: adminRoutes, tags: ["Admin"] },
];
function registerV1Routes() {
    const router = Router();
    router.get("/health", (_req, res) => {
        res.json({ success: true, message: "OK", data: { status: "ok", service: "darzi-api" } });
    });
    for (const definition of routeDefinitions) {
        router.use(definition.path, definition.router);
    }
    return router;
}
const v1Routes = registerV1Routes();
module.exports = {
  registerV1Routes,
  routeDefinitions,
  v1Routes
};
