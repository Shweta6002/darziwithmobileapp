const Joi = require("joi");

const checkoutSchema = Joi.object({
  address: Joi.object().required()
});

const orderStatusSchema = Joi.object({
  status: Joi.string().required()
});

module.exports = {
  checkoutSchema,
  orderStatusSchema
};
