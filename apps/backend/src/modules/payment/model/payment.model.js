const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/database");
const Payment = sequelize.define("Payment", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    orderId: { type: DataTypes.UUID, allowNull: false },
    provider: { type: DataTypes.ENUM("RAZORPAY", "STRIPE"), allowNull: false },
    providerOrderId: { type: DataTypes.STRING(120), allowNull: true },
    providerPaymentId: { type: DataTypes.STRING(120), allowNull: true },
    amount: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    currency: { type: DataTypes.STRING(3), allowNull: false, defaultValue: "INR" },
    status: { type: DataTypes.ENUM("CREATED", "AUTHORIZED", "CAPTURED", "FAILED", "REFUNDED"), allowNull: false, defaultValue: "CREATED" },
    rawResponse: { type: DataTypes.JSON, allowNull: false, defaultValue: {} },
}, { sequelize: sequelize, tableName: "payments", indexes: [{ fields: ["order_id"] }, { fields: ["provider_order_id"] }, { fields: ["provider_payment_id"] }] });

module.exports = {
    Payment,
};
