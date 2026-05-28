const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/database");
const Address = sequelize.define("Address", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false },
    fullName: { type: DataTypes.STRING(120), allowNull: false },
    phone: { type: DataTypes.STRING(20), allowNull: false },
    line1: { type: DataTypes.STRING(255), allowNull: false },
    line2: { type: DataTypes.STRING(255), allowNull: true },
    city: { type: DataTypes.STRING(80), allowNull: false },
    state: { type: DataTypes.STRING(80), allowNull: false },
    pincode: { type: DataTypes.STRING(12), allowNull: false },
    country: { type: DataTypes.STRING(80), allowNull: false, defaultValue: "India" },
    isDefault: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
}, { sequelize: sequelize, tableName: "addresses", indexes: [{ fields: ["user_id"] }, { fields: ["pincode"] }] });

module.exports = {
    Address,
};
