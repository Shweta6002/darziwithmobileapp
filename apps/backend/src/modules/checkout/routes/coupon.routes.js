const { Router } = require("express");
const { authenticate, authorize } = require("../../../core/middleware/auth.middleware");
const { validate } = require("../../../core/middleware/validate.middleware");
const { couponController } = require("../controller/coupon.controller");
const { listCouponsSchema, createCouponSchema, updateCouponSchema } = require("../validator/coupon.validator");
const couponRoutes = Router();
couponRoutes.use(authenticate, authorize("ADMIN"));
couponRoutes.get("/", validate({ query: listCouponsSchema }), couponController.list);
couponRoutes.post("/", validate({ body: createCouponSchema }), couponController.create);
couponRoutes.get("/:id", couponController.getById);
couponRoutes.patch("/:id", validate({ body: updateCouponSchema }), couponController.update);
couponRoutes.delete("/:id", couponController.delete);
module.exports = {
  couponRoutes
};
