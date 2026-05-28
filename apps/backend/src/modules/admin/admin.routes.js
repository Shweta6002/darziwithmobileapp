const { Router } = require("express");
const { authenticate, authorize } = require("../../middlewares/auth.middleware");
const { adminController } = require("./admin.controller");
const adminRoutes = Router();
adminRoutes.use(authenticate, authorize("ADMIN"));
adminRoutes.get("/analytics", adminController.analytics);
adminRoutes.get("/users", adminController.users);
adminRoutes.get("/orders", adminController.orders);
adminRoutes.get("/logs", adminController.logs);
module.exports = {
  adminRoutes
};
