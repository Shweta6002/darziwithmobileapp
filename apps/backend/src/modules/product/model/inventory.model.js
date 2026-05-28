const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/database");
const Inventory = sequelize.define("Inventory", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    variantId: { type: DataTypes.UUID, allowNull: false, unique: true },
    stockOnHand: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
    stockReserved: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
    reorderPoint: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 5 },
}, { sequelize: sequelize, tableName: "inventory", indexes: [{ fields: ["variant_id"] }] });

module.exports = {
    Inventory,
};
