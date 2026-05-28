const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/database");
const User = sequelize.define("User", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    email: { type: DataTypes.STRING(190), allowNull: false, unique: true },
    passwordHash: { type: DataTypes.STRING(255), allowNull: false },
    firstName: { type: DataTypes.STRING(80), allowNull: false },
    lastName: { type: DataTypes.STRING(80), allowNull: false },
    phone: { type: DataTypes.STRING(20), allowNull: true },
    role: { type: DataTypes.ENUM("ADMIN", "CUSTOMER"), allowNull: false, defaultValue: "CUSTOMER" },
    isEmailVerified: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    status: { type: DataTypes.ENUM("ACTIVE", "BLOCKED", "DELETED"), allowNull: false, defaultValue: "ACTIVE" },
}, { sequelize: sequelize, tableName: "users", indexes: [{ fields: ["email"] }, { fields: ["role", "status"] }] });

module.exports = {
    User,
};
