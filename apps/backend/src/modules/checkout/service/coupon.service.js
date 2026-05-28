const { ApiError } = require("../../../core/errors/ApiError");
const { COUPON_MESSAGES } = require("../constants/coupon.constants");
const { toCouponListResponse, toCouponResponse } = require("../dto/coupon.dto");
const { assertValidCouponWindow, normalizeCouponCode } = require("../helper/coupon.helper");
const { couponRepository } = require("../repository/coupon.repository");

const list = async (query) => {
    const result = await couponRepository.list(query);
    return {
        items: toCouponListResponse(result.rows),
        pagination: result.pagination,
    };
};

const getById = async (id) => {
    const coupon = await couponRepository.findById(id);
    if (!coupon) throw ApiError(404, COUPON_MESSAGES.NOT_FOUND, "COUPON_NOT_FOUND");
    return toCouponResponse(coupon);
};

const create = async (input) => {
    const payload = {
        ...input,
        code: normalizeCouponCode(input.code),
        startsAt: new Date(input.startsAt),
        endsAt: new Date(input.endsAt),
    };

    assertValidCouponWindow(payload.startsAt, payload.endsAt);

    const existing = await couponRepository.findByCode(payload.code);
    if (existing) throw ApiError(409, COUPON_MESSAGES.CODE_EXISTS, "COUPON_CODE_EXISTS");

    return toCouponResponse(await couponRepository.create(payload));
};

const update = async (id, input) => {
    const existing = await couponRepository.findById(id);
    if (!existing) throw ApiError(404, COUPON_MESSAGES.NOT_FOUND, "COUPON_NOT_FOUND");

    const payload = { ...input };
    if (payload.code) payload.code = normalizeCouponCode(payload.code);
    if (payload.startsAt) payload.startsAt = new Date(payload.startsAt);
    if (payload.endsAt) payload.endsAt = new Date(payload.endsAt);

    const startsAt = payload.startsAt || existing.startsAt;
    const endsAt = payload.endsAt || existing.endsAt;
    assertValidCouponWindow(startsAt, endsAt);

    if (payload.code && payload.code !== existing.code) {
        const duplicate = await couponRepository.findByCode(payload.code);
        if (duplicate) throw ApiError(409, COUPON_MESSAGES.CODE_EXISTS, "COUPON_CODE_EXISTS");
    }

    const updated = await couponRepository.update(id, payload);
    if (!updated) throw ApiError(404, COUPON_MESSAGES.NOT_FOUND, "COUPON_NOT_FOUND");
    return toCouponResponse(updated);
};

const remove = async (id) => {
    const deleted = await couponRepository.delete(id);
    if (!deleted) throw ApiError(404, COUPON_MESSAGES.NOT_FOUND, "COUPON_NOT_FOUND");
};

const couponService = {
    list,
    getById,
    create,
    update,
    delete: remove,
};

module.exports = {
    list,
    getById,
    create,
    update,
    delete: remove,
    couponService,
};
