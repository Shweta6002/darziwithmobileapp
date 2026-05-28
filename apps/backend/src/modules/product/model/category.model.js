const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/database");
const Category = sequelize.define("Category", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    parentId: { type: DataTypes.UUID, allowNull: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    slug: { type: DataTypes.STRING(120), allowNull: false, unique: true },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
}, { sequelize: sequelize, tableName: "categories", indexes: [{ fields: ["parent_id"] }, { fields: ["slug"] }] });

module.exports = {
    Category,
};
