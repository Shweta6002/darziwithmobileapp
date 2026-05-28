function toCouponResponse(coupon) {
    return {
        id: coupon.id,
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: Number(coupon.discountValue),
        minOrderAmount: Number(coupon.minOrderAmount),
        maxDiscountAmount: coupon.maxDiscountAmount === null ? null : Number(coupon.maxDiscountAmount),
        startsAt: coupon.startsAt,
        endsAt: coupon.endsAt,
        usageLimit: coupon.usageLimit,
        usedCount: coupon.usedCount,
        isActive: coupon.isActive,
    };
}
function toCouponListResponse(coupons) {
    return coupons.map(toCouponResponse);
}
module.exports = {
  toCouponListResponse,
  toCouponResponse
};
