const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/database");
const Review = sequelize.define("Review", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false },
    productId: { type: DataTypes.UUID, allowNull: false },
    rating: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, validate: { min: 1, max: 5 } },
    title: { type: DataTypes.STRING(120), allowNull: true },
    body: { type: DataTypes.TEXT, allowNull: true },
    status: { type: DataTypes.ENUM("PENDING", "APPROVED", "REJECTED"), allowNull: false, defaultValue: "PENDING" },
}, { sequelize: sequelize, tableName: "reviews", indexes: [{ fields: ["product_id", "status"] }, { fields: ["user_id", "product_id"], unique: true }] });

module.exports = {
    Review,
};
