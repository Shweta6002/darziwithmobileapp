import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { validate } from "../../utils/validate";
import { measurementController, measurementSchema } from "./measurement.controller";

export const measurementRoutes = Router();

measurementRoutes.post("/", validate({ body: measurementSchema }), measurementController.create);
measurementRoutes.get("/", authenticate, measurementController.list);
