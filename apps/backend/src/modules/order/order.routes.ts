import { Router } from "express";
import Joi from "joi";
import { authenticate, authorize } from "../../middlewares/auth.middleware";
import { validate } from "../../utils/validate";
import { checkoutSchema, orderController } from "./order.controller";

export const orderRoutes = Router();

orderRoutes.post("/initiate", orderController.initiate);
orderRoutes.use(authenticate);
orderRoutes.post("/checkout", validate({ body: checkoutSchema }), orderController.checkout);
orderRoutes.get("/", orderController.list);
orderRoutes.get("/:id", orderController.get);
orderRoutes.patch("/:id/status", authorize("ADMIN"), validate({ body: Joi.object({ status: Joi.string().required() }) }), orderController.updateStatus);
