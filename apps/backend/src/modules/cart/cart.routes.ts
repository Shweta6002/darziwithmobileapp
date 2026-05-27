import { Router } from "express";
import Joi from "joi";
import { authenticate } from "../../middlewares/auth.middleware";
import { validate } from "../../utils/validate";
import { cartController, cartItemSchema } from "./cart.controller";

export const cartRoutes = Router();

cartRoutes.use(authenticate);
cartRoutes.get("/", cartController.get);
cartRoutes.post("/items", validate({ body: cartItemSchema }), cartController.add);
cartRoutes.patch("/items/:itemId", validate({ body: Joi.object({ quantity: Joi.number().integer().min(1).max(10).required() }) }), cartController.update);
cartRoutes.delete("/items/:itemId", cartController.remove);
