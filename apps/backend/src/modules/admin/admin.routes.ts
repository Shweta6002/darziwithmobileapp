import { Router } from "express";
import { authenticate, authorize } from "../../middlewares/auth.middleware";
import { adminController } from "./admin.controller";

export const adminRoutes = Router();

adminRoutes.use(authenticate, authorize("ADMIN"));
adminRoutes.get("/analytics", adminController.analytics);
adminRoutes.get("/users", adminController.users);
adminRoutes.get("/orders", adminController.orders);
adminRoutes.get("/logs", adminController.logs);
