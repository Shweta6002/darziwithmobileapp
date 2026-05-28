const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/database");
const CartItem = sequelize.define("CartItem", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    cartId: { type: DataTypes.UUID, allowNull: false },
    productId: { type: DataTypes.UUID, allowNull: false },
    variantId: { type: DataTypes.UUID, allowNull: false },
    quantity: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, validate: { min: 1 } },
    unitPrice: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    customization: { type: DataTypes.JSON, allowNull: false, defaultValue: {} },
    measurementProfileId: { type: DataTypes.UUID, allowNull: true },
}, { sequelize: sequelize, tableName: "cart_items", indexes: [{ fields: ["cart_id"] }, { fields: ["variant_id"] }] });

module.exports = {
    CartItem,
};
