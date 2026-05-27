import Joi from "joi";
import { asyncHandler } from "../../utils/asyncHandler";
import { ok } from "../../utils/apiResponse";
import { cartService } from "./cart.service";

export const cartItemSchema = Joi.object({
  productId: Joi.string().uuid().required(),
  variantId: Joi.string().uuid().required(),
  quantity: Joi.number().integer().min(1).max(10).required(),
  customization: Joi.object().default({}),
  measurementProfileId: Joi.string().uuid().allow(null),
});

export const cartController = {
  get: asyncHandler(async (req, res) => ok(res, await cartService.getCart(req.user!.id))),
  add: asyncHandler(async (req, res) => ok(res, await cartService.addItem(req.user!.id, req.body))),
  update: asyncHandler(async (req, res) => ok(res, await cartService.updateItem(req.user!.id, req.params.itemId, req.body.quantity))),
  remove: asyncHandler(async (req, res) => ok(res, await cartService.removeItem(req.user!.id, req.params.itemId))),
};
