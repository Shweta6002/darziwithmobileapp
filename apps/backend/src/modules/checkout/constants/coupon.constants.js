const COUPON_MESSAGES = {
    CREATED: "Coupon created successfully",
    UPDATED: "Coupon updated successfully",
    FETCHED: "Coupon fetched successfully",
    LIST_FETCHED: "Coupons fetched successfully",
    DELETED: "Coupon deleted successfully",
    NOT_FOUND: "Coupon not found",
    CODE_EXISTS: "Coupon code already exists",
    INVALID_WINDOW: "Coupon end date must be after start date",
};
const DISCOUNT_TYPES = ["PERCENTAGE", "FIXED"];
module.exports = {
  COUPON_MESSAGES,
  DISCOUNT_TYPES
};
