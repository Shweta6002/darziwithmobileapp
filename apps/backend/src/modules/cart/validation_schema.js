const Joi = require("joi");

const cartItemSchema = Joi.object({
  productId: Joi.string().uuid().required(),
  variantId: Joi.string().uuid().required(),
  quantity: Joi.number().integer().min(1).max(10).required(),
  customization: Joi.object().default({}),
  measurementProfileId: Joi.string().uuid().allow(null)
});

const cartItemQuantitySchema = Joi.object({
  quantity: Joi.number().integer().min(1).max(10).required()
});

module.exports = {
  cartItemQuantitySchema,
  cartItemSchema
};
