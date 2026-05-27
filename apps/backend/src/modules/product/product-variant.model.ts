import { DataTypes, Model, type InferAttributes, type InferCreationAttributes, type CreationOptional } from "sequelize";
import { sequelize } from "../../config/database";

export class ProductVariant extends Model<InferAttributes<ProductVariant>, InferCreationAttributes<ProductVariant>> {
  declare id: CreationOptional<string>;
  declare productId: string;
  declare sku: string;
  declare size: string;
  declare colorName: string;
  declare colorHex: string;
  declare priceDelta: CreationOptional<number>;
  declare attributes: CreationOptional<Record<string, unknown>>;
  declare isActive: CreationOptional<boolean>;
}

ProductVariant.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    productId: { type: DataTypes.UUID, allowNull: false },
    sku: { type: DataTypes.STRING(80), allowNull: false, unique: true },
    size: { type: DataTypes.STRING(30), allowNull: false },
    colorName: { type: DataTypes.STRING(80), allowNull: false },
    colorHex: { type: DataTypes.STRING(10), allowNull: false },
    priceDelta: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
    attributes: { type: DataTypes.JSON, allowNull: false, defaultValue: {} },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  },
  { sequelize, tableName: "product_variants", indexes: [{ fields: ["product_id"] }, { fields: ["sku"] }, { fields: ["size", "color_name"] }] },
);
