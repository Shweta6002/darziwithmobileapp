const { Router } = require("express");
const { authenticate } = require("../../middlewares/auth.middleware");
const { validate } = require("../../utils/validate");
const { measurementController } = require("./measurement.controller");
const { measurementSchema } = require("./validation_schema");
const measurementRoutes = Router();
measurementRoutes.post("/", authenticate, validate({ body: measurementSchema }), measurementController.create);
measurementRoutes.get("/", authenticate, measurementController.list);
module.exports = {
  measurementRoutes
};
