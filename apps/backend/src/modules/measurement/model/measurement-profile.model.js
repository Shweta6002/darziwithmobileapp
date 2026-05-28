const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/database");
const MeasurementProfile = sequelize.define("MeasurementProfile", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false },
    title: { type: DataTypes.STRING(120), allowNull: false },
    fitPreference: { type: DataTypes.STRING(40), allowNull: false },
    measurements: { type: DataTypes.JSON, allowNull: false },
    aiRecommendation: { type: DataTypes.JSON, allowNull: false, defaultValue: {} },
}, { sequelize: sequelize, tableName: "measurement_profiles", indexes: [{ fields: ["user_id"] }] });

module.exports = {
    MeasurementProfile,
};
