const Joi = require("joi");

const measurementSchema = Joi.object({
  id: Joi.string().allow(null, ""),
  title: Joi.string().default("Primary Fit Profile"),
  fitPreference: Joi.string().valid("Slim Fit", "Regular Fit", "Relaxed Fit").default("Regular Fit"),
  measurements: Joi.object().required(),
  aiRecommendation: Joi.object().default({}),
  createdOn: Joi.string().allow(null, "")
});

module.exports = {
  measurementSchema
};
