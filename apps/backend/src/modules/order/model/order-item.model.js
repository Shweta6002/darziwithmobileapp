const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/database");
const OrderItem = sequelize.define("OrderItem", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    orderId: { type: DataTypes.UUID, allowNull: false },
    productId: { type: DataTypes.UUID, allowNull: false },
    variantId: { type: DataTypes.UUID, allowNull: false },
    productSnapshot: { type: DataTypes.JSON, allowNull: false },
    quantity: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    unitPrice: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    lineTotal: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    customization: { type: DataTypes.JSON, allowNull: false, defaultValue: {} },
    measurementSnapshot: { type: DataTypes.JSON, allowNull: false, defaultValue: {} },
}, { sequelize: sequelize, tableName: "order_items", indexes: [{ fields: ["order_id"] }, { fields: ["product_id"] }] });

module.exports = {
    OrderItem,
};
