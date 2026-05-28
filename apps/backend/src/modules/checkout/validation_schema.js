const Joi = require("joi");
const { DISCOUNT_TYPES } = require("./constants/coupon.constants");

const listCouponsSchema = Joi.object({
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(1).max(100),
  isActive: Joi.boolean(),
  code: Joi.string().max(40)
});

const createCouponSchema = Joi.object({
  code: Joi.string().max(40).required(),
  discountType: Joi.string().valid(...DISCOUNT_TYPES).required(),
  discountValue: Joi.number().positive().required(),
  minOrderAmount: Joi.number().min(0).default(0),
  maxDiscountAmount: Joi.number().min(0).allow(null),
  startsAt: Joi.date().required(),
  endsAt: Joi.date().required(),
  usageLimit: Joi.number().integer().min(1).allow(null),
  isActive: Joi.boolean().default(true)
});

const updateCouponSchema = createCouponSchema.fork(
  ["code", "discountType", "discountValue", "startsAt", "endsAt"],
  (schema) => schema.optional()
);

module.exports = {
  createCouponSchema,
  listCouponsSchema,
  updateCouponSchema
};
