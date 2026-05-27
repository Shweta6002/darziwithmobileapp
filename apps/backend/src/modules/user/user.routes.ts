import { Router } from "express";
import Joi from "joi";
import { authenticate } from "../../middlewares/auth.middleware";
import { validate } from "../../utils/validate";
import { userController } from "./user.controller";

export const userRoutes = Router();

const addressSchema = Joi.object({
  fullName: Joi.string().required(),
  phone: Joi.string().required(),
  line1: Joi.string().required(),
  line2: Joi.string().allow(null, ""),
  city: Joi.string().required(),
  state: Joi.string().required(),
  pincode: Joi.string().required(),
  country: Joi.string().default("India"),
  isDefault: Joi.boolean().default(false),
});

userRoutes.use(authenticate);
userRoutes.get("/me", userController.me);
userRoutes.patch("/me", validate({ body: Joi.object({ firstName: Joi.string(), lastName: Joi.string(), phone: Joi.string().allow(null, "") }) }), userController.updateMe);
userRoutes.get("/addresses", userController.listAddresses);
userRoutes.post("/addresses", validate({ body: addressSchema }), userController.createAddress);
userRoutes.delete("/addresses/:id", userController.deleteAddress);
userRoutes.get("/payment-methods", userController.listPaymentMethods);
