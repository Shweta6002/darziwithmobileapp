const { ApiError } = require("../../../core/errors/ApiError");
const { COUPON_MESSAGES } = require("../constants/coupon.constants");
function normalizeCouponCode(code) {
    return code.trim().toUpperCase();
}
function assertValidCouponWindow(startsAt, endsAt) {
    if (endsAt <= startsAt) {
        throw ApiError(400, COUPON_MESSAGES.INVALID_WINDOW, "INVALID_COUPON_WINDOW");
    }
}
module.exports = {
  assertValidCouponWindow,
  normalizeCouponCode
};
