import Joi from "joi";
import { asyncHandler } from "../../utils/asyncHandler";
import { created, ok } from "../../utils/apiResponse";
import { productService } from "./product.service";

export const productListQuerySchema = Joi.object({
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(1).max(100),
  q: Joi.string().max(120),
  category: Joi.string().max(120),
  minPrice: Joi.number().min(0),
  maxPrice: Joi.number().min(0),
  featured: Joi.boolean(),
  sort: Joi.string().valid("price_asc", "price_desc", "rating_desc", "newest"),
});

export const productController = {
  list: asyncHandler(async (req, res) => {
    const result = await productService.list(req.query as any);
    return res.json(result.items);
  }),
  search: asyncHandler(async (req, res) => ok(res, await productService.list(req.query as any))),
  get: asyncHandler(async (req, res) => res.json(await productService.getById(req.params.id))),
  create: asyncHandler(async (req, res) => created(res, await productService.create(req.body))),
  update: asyncHandler(async (req, res) => ok(res, await productService.update(req.params.id, req.body))),
  addReview: asyncHandler(async (req, res) => created(res, await productService.addReview(req.user!.id, req.params.id, req.body))),
  wishlist: asyncHandler(async (req, res) => ok(res, await productService.wishlist(req.user!.id))),
};
