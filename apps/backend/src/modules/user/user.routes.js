const { Router } = require("express");
const { authenticate } = require("../../middlewares/auth.middleware");
const { validate } = require("../../utils/validate");
const { userController } = require("./user.controller");
const { addressSchema, updateUserSchema } = require("./validation_schema");
const userRoutes = Router();
userRoutes.use(authenticate);
userRoutes.get("/me", userController.me);
userRoutes.patch("/me", validate({ body: updateUserSchema }), userController.updateMe);
userRoutes.get("/addresses", userController.listAddresses);
userRoutes.post("/addresses", validate({ body: addressSchema }), userController.createAddress);
userRoutes.delete("/addresses/:id", userController.deleteAddress);
userRoutes.get("/payment-methods", userController.listPaymentMethods);
module.exports = {
  userRoutes
};
