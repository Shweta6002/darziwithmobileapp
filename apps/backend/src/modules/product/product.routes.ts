import { Router } from "express";
import Joi from "joi";
import { authenticate, authorize } from "../../middlewares/auth.middleware";
import { validate } from "../../utils/validate";
import { productController, productListQuerySchema } from "./product.controller";

export const productRoutes = Router();

const productSchema = Joi.object({
  categoryId: Joi.string().uuid().required(),
  name: Joi.string().required(),
  slug: Joi.string().required(),
  tagline: Joi.string().allow(null, ""),
  description: Joi.string().required(),
  basePrice: Joi.number().min(0).required(),
  imageUrl: Joi.string().uri().allow(null, ""),
  detailImages: Joi.array().items(Joi.string().uri()).default([]),
  specs: Joi.array().items(Joi.string()).default([]),
  designedFor: Joi.string().allow(null, ""),
  isFeatured: Joi.boolean().default(false),
  status: Joi.string().valid("DRAFT", "ACTIVE", "ARCHIVED").default("DRAFT"),
});

productRoutes.get("/", validate({ query: productListQuerySchema }), productController.list);
productRoutes.get("/search", validate({ query: productListQuerySchema }), productController.search);
productRoutes.get("/:id", productController.get);
productRoutes.post("/:id/reviews", authenticate, validate({ body: Joi.object({ rating: Joi.number().integer().min(1).max(5).required(), title: Joi.string().allow("", null), body: Joi.string().allow("", null) }) }), productController.addReview);
productRoutes.post("/", authenticate, authorize("ADMIN"), validate({ body: productSchema }), productController.create);
productRoutes.patch("/:id", authenticate, authorize("ADMIN"), validate({ body: productSchema.fork(["categoryId", "name", "slug", "description", "basePrice"], (s) => s.optional()) }), productController.update);
