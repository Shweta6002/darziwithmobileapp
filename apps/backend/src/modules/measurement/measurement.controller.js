const { MeasurementProfile } = require("../../database/models");
const { asyncHandler } = require("../../utils/asyncHandler");
const { created, ok } = require("../../utils/apiResponse");
const measurementController = {
    create: asyncHandler(async (req, res) => {
        console.log("------req ", req.headers);
        if (!req.user)
            return res.json(req.body);
        const profile = await MeasurementProfile.create({ ...req.body, userId: req.user.id });
        return created(res, profile);
    }),
    list: asyncHandler(async (req, res) => ok(res, await MeasurementProfile.findAll({ where: { userId: req.user.id } }))),
};
module.exports = {
  measurementController
};
