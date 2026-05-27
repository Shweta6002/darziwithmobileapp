import Joi from "joi";
import { MeasurementProfile } from "../../database/models";
import { asyncHandler } from "../../utils/asyncHandler";
import { created, ok } from "../../utils/apiResponse";

export const measurementSchema = Joi.object({
  id: Joi.string().allow(null, ""),
  title: Joi.string().default("Primary Fit Profile"),
  fitPreference: Joi.string().valid("Slim Fit", "Regular Fit", "Relaxed Fit").default("Regular Fit"),
  measurements: Joi.object().required(),
  aiRecommendation: Joi.object().default({}),
  createdOn: Joi.string().allow(null, ""),
});

export const measurementController = {
  create: asyncHandler(async (req, res) => {
    if (!req.user) return res.json(req.body);
    const profile = await MeasurementProfile.create({ ...req.body, userId: req.user.id });
    return created(res, profile);
  }),
  list: asyncHandler(async (req, res) => ok(res, await MeasurementProfile.findAll({ where: { userId: req.user!.id } }))),
};
