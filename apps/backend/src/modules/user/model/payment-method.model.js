const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/database");
const PaymentMethod = sequelize.define("PaymentMethod", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false },
    provider: { type: DataTypes.ENUM("RAZORPAY", "STRIPE"), allowNull: false },
    providerCustomerId: { type: DataTypes.STRING(120), allowNull: true },
    providerMethodId: { type: DataTypes.STRING(120), allowNull: false },
    brand: { type: DataTypes.STRING(40), allowNull: true },
    last4: { type: DataTypes.STRING(4), allowNull: true },
    expMonth: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    expYear: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    isDefault: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
}, { sequelize: sequelize, tableName: "payment_methods", indexes: [{ fields: ["user_id"] }] });

module.exports = {
    PaymentMethod,
};
