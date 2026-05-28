const { Router } = require("express");
const { authenticate, authorize } = require("../../middlewares/auth.middleware");
const { validate } = require("../../utils/validate");
const { orderController } = require("./order.controller");
const { checkoutSchema, orderStatusSchema } = require("./validation_schema");
const orderRoutes = Router();
orderRoutes.post("/initiate", orderController.initiate);
orderRoutes.use(authenticate);
orderRoutes.post("/checkout", validate({ body: checkoutSchema }), orderController.checkout);
orderRoutes.get("/", orderController.list);
orderRoutes.get("/:id", orderController.get);
orderRoutes.patch("/:id/status", authorize("ADMIN"), validate({ body: orderStatusSchema }), orderController.updateStatus);
module.exports = {
  orderRoutes
};
