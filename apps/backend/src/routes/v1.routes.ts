import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { userRoutes } from "../modules/user/user.routes";
import { productRoutes } from "../modules/product/product.routes";
import { cartRoutes } from "../modules/cart/cart.routes";
import { orderRoutes } from "../modules/order/order.routes";
import { paymentRoutes } from "../modules/payment/payment.routes";
import { measurementRoutes } from "../modules/measurement/measurement.routes";
import { adminRoutes } from "../modules/admin/admin.routes";

export const v1Routes = Router();

v1Routes.get("/health", (_req, res) => res.json({ status: "ok", service: "darzi-api" }));
v1Routes.use("/auth", authRoutes);
v1Routes.use("/users", userRoutes);
v1Routes.use("/products", productRoutes);
v1Routes.use("/cart", cartRoutes);
v1Routes.use("/orders", orderRoutes);
v1Routes.use("/payments", paymentRoutes);
v1Routes.use("/measurement-profiles", measurementRoutes);
v1Routes.use("/admin", adminRoutes);
