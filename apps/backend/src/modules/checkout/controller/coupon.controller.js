const { asyncHandler } = require("../../../core/utils/asyncHandler");
const { sendSuccess, created, noContent } = require("../../../core/response/ApiResponse");
const { COUPON_MESSAGES } = require("../constants/coupon.constants");
const { couponService } = require("../service/coupon.service");
const couponController = {
    list: asyncHandler(async (req, res) => {
        return sendSuccess(res, COUPON_MESSAGES.LIST_FETCHED, await couponService.list(req.query));
    }),
    getById: asyncHandler(async (req, res) => {
        return sendSuccess(res, COUPON_MESSAGES.FETCHED, await couponService.getById(req.params.id));
    }),
    create: asyncHandler(async (req, res) => {
        return created(res, await couponService.create(req.body));
    }),
    update: asyncHandler(async (req, res) => {
        return sendSuccess(res, COUPON_MESSAGES.UPDATED, await couponService.update(req.params.id, req.body));
    }),
    delete: asyncHandler(async (req, res) => {
        await couponService.delete(req.params.id);
        return noContent(res);
    }),
};
module.exports = {
  couponController
};
