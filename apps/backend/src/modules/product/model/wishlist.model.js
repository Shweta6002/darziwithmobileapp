const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/database");
const WishlistItem = sequelize.define("WishlistItem", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false },
    productId: { type: DataTypes.UUID, allowNull: false },
}, { sequelize: sequelize, tableName: "wishlist_items", indexes: [{ fields: ["user_id", "product_id"], unique: true }] });

module.exports = {
    WishlistItem,
};
