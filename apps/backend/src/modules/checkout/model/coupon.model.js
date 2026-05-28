const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../core/database/sequelize");
const Coupon = sequelize.define("Coupon", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    code: { type: DataTypes.STRING(40), allowNull: false, unique: true },
    discountType: { type: DataTypes.ENUM("PERCENTAGE", "FIXED"), allowNull: false },
    discountValue: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    minOrderAmount: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
    maxDiscountAmount: { type: DataTypes.DECIMAL(12, 2), allowNull: true },
    startsAt: { type: DataTypes.DATE, allowNull: false },
    endsAt: { type: DataTypes.DATE, allowNull: false },
    usageLimit: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    usedCount: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
}, { sequelize: sequelize, tableName: "coupons", indexes: [{ fields: ["code"] }, { fields: ["is_active", "starts_at", "ends_at"] }] });

module.exports = {
    Coupon,
};
