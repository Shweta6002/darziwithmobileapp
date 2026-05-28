const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/database");
const Product = sequelize.define("Product", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    categoryId: { type: DataTypes.UUID, allowNull: false },
    name: { type: DataTypes.STRING(180), allowNull: false },
    slug: { type: DataTypes.STRING(220), allowNull: false, unique: true },
    tagline: { type: DataTypes.STRING(255), allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: false },
    basePrice: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    currency: { type: DataTypes.STRING(3), allowNull: false, defaultValue: "INR" },
    imageUrl: { type: DataTypes.STRING(500), allowNull: true },
    detailImages: { type: DataTypes.JSON, allowNull: false, defaultValue: [] },
    specs: { type: DataTypes.JSON, allowNull: false, defaultValue: [] },
    designedFor: { type: DataTypes.STRING(180), allowNull: true },
    isFeatured: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    status: { type: DataTypes.ENUM("DRAFT", "ACTIVE", "ARCHIVED"), allowNull: false, defaultValue: "DRAFT" },
    ratingAverage: { type: DataTypes.DECIMAL(3, 2), allowNull: false, defaultValue: 0 },
    reviewCount: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
}, {
    sequelize: sequelize,
    tableName: "products",
    indexes: [
        { fields: ["category_id", "status"] },
        { fields: ["is_featured", "status"] },
        { fields: ["slug"] },
        { type: "FULLTEXT", fields: ["name", "tagline", "description"] },
    ],
});

module.exports = {
    Product,
};
