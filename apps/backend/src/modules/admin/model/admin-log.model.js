const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/database");
const AdminLog = sequelize.define("AdminLog", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    adminId: { type: DataTypes.UUID, allowNull: false },
    action: { type: DataTypes.STRING(120), allowNull: false },
    entityType: { type: DataTypes.STRING(80), allowNull: false },
    entityId: { type: DataTypes.UUID, allowNull: true },
    metadata: { type: DataTypes.JSON, allowNull: false, defaultValue: {} },
    ipAddress: { type: DataTypes.STRING(60), allowNull: true },
}, { sequelize: sequelize, tableName: "admin_logs", indexes: [{ fields: ["admin_id", "created_at"] }, { fields: ["entity_type", "entity_id"] }] });

module.exports = {
    AdminLog,
};
