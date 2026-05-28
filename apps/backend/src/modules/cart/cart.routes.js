const { Router } = require("express");
const { authenticate } = require("../../middlewares/auth.middleware");
const { validate } = require("../../utils/validate");
const { cartController } = require("./cart.controller");
const { cartItemQuantitySchema, cartItemSchema } = require("./validation_schema");
const cartRoutes = Router();
cartRoutes.use(authenticate);
cartRoutes.get("/", cartController.get);
cartRoutes.post("/items", validate({ body: cartItemSchema }), cartController.add);
cartRoutes.patch("/items/:itemId", validate({ body: cartItemQuantitySchema }), cartController.update);
cartRoutes.delete("/items/:itemId", cartController.remove);
module.exports = {
  cartRoutes
};
