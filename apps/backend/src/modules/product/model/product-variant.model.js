const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/database");
const ProductVariant = sequelize.define("ProductVariant", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    productId: { type: DataTypes.UUID, allowNull: false },
    sku: { type: DataTypes.STRING(80), allowNull: false, unique: true },
    size: { type: DataTypes.STRING(30), allowNull: false },
    colorName: { type: DataTypes.STRING(80), allowNull: false },
    colorHex: { type: DataTypes.STRING(10), allowNull: false },
    priceDelta: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
    attributes: { type: DataTypes.JSON, allowNull: false, defaultValue: {} },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
}, { sequelize: sequelize, tableName: "product_variants", indexes: [{ fields: ["product_id"] }, { fields: ["sku"] }, { fields: ["size", "color_name"] }] });

module.exports = {
    ProductVariant,
};
