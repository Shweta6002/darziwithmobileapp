const Joi = require("joi");

const productListQuerySchema = Joi.object({
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(1).max(100),
  q: Joi.string().max(120),
  category: Joi.string().max(120),
  minPrice: Joi.number().min(0),
  maxPrice: Joi.number().min(0),
  featured: Joi.boolean(),
  sort: Joi.string().valid("price_asc", "price_desc", "rating_desc", "newest")
});

const productSchema = Joi.object({
  categoryId: Joi.string().required(),
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
  status: Joi.string().valid("DRAFT", "ACTIVE", "ARCHIVED").default("DRAFT")
});

const productUpdateSchema = productSchema.fork(
  ["categoryId", "name", "slug", "description", "basePrice"],
  (schema) => schema.optional()
);

const productReviewSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5).required(),
  title: Joi.string().allow("", null),
  body: Joi.string().allow("", null)
});

module.exports = {
  productListQuerySchema,
  productReviewSchema,
  productSchema,
  productUpdateSchema
};
