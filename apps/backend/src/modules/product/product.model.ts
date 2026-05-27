import { DataTypes, Model, type InferAttributes, type InferCreationAttributes, type CreationOptional } from "sequelize";
import { sequelize } from "../../config/database";

export class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
  declare id: CreationOptional<string>;
  declare categoryId: string;
  declare name: string;
  declare slug: string;
  declare tagline: string | null;
  declare description: string;
  declare basePrice: number;
  declare currency: CreationOptional<string>;
  declare imageUrl: string | null;
  declare detailImages: CreationOptional<string[]>;
  declare specs: CreationOptional<string[]>;
  declare designedFor: string | null;
  declare isFeatured: CreationOptional<boolean>;
  declare status: CreationOptional<"DRAFT" | "ACTIVE" | "ARCHIVED">;
  declare ratingAverage: CreationOptional<number>;
  declare reviewCount: CreationOptional<number>;
}

Product.init(
  {
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
  },
  {
    sequelize,
    tableName: "products",
    indexes: [
      { fields: ["category_id", "status"] },
      { fields: ["is_featured", "status"] },
      { fields: ["slug"] },
      { type: "FULLTEXT", fields: ["name", "tagline", "description"] },
    ],
  },
);
