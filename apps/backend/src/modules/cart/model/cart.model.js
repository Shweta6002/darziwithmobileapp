const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/database");
const Cart = sequelize.define("Cart", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: true },
    guestToken: { type: DataTypes.STRING(80), allowNull: true },
    couponCode: { type: DataTypes.STRING(40), allowNull: true },
}, { sequelize: sequelize, tableName: "carts", indexes: [{ fields: ["user_id"] }, { fields: ["guest_token"] }] });

module.exports = {
    Cart,
};
