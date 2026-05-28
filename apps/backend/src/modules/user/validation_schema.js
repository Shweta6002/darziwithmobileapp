const Joi = require("joi");

const addressSchema = Joi.object({
  fullName: Joi.string().required(),
  phone: Joi.string().required(),
  line1: Joi.string().required(),
  line2: Joi.string().allow(null, ""),
  city: Joi.string().required(),
  state: Joi.string().required(),
  pincode: Joi.string().required(),
  country: Joi.string().default("India"),
  isDefault: Joi.boolean().default(false)
});

const updateUserSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  phone: Joi.string().allow(null, "")
});

module.exports = {
  addressSchema,
  updateUserSchema
};
