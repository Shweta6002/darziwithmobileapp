const { User, Address, PaymentMethod } = require("../../database/models");
const { asyncHandler } = require("../../utils/asyncHandler");
const { ok, created, noContent } = require("../../utils/apiResponse");
const { AppError } = require("../../utils/AppError");
const userController = {
    me: asyncHandler(async (req, res) => {
        const user = await User.findByPk(req.user.id, { attributes: { exclude: ["passwordHash"] } });
        if (!user)
            throw AppError(404, "User not found", "USER_NOT_FOUND");
        return ok(res, user);
    }),
    updateMe: asyncHandler(async (req, res) => {
        await User.update(req.body, { where: { id: req.user.id } });
        const user = await User.findByPk(req.user.id, { attributes: { exclude: ["passwordHash"] } });
        return ok(res, user);
    }),
    listAddresses: asyncHandler(async (req, res) => ok(res, await Address.findAll({ where: { userId: req.user.id } }))),
    createAddress: asyncHandler(async (req, res) => created(res, await Address.create({ ...req.body, userId: req.user.id }))),
    deleteAddress: asyncHandler(async (req, res) => {
        await Address.destroy({ where: { id: req.params.id, userId: req.user.id } });
        return noContent(res);
    }),
    listPaymentMethods: asyncHandler(async (req, res) => ok(res, await PaymentMethod.findAll({ where: { userId: req.user.id } }))),
};
module.exports = {
  userController
};
