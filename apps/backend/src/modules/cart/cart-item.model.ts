import { DataTypes, Model, type InferAttributes, type InferCreationAttributes, type CreationOptional } from "sequelize";
import { sequelize } from "../../config/database";

export class CartItem extends Model<InferAttributes<CartItem>, InferCreationAttributes<CartItem>> {
  declare id: CreationOptional<string>;
  declare cartId: string;
  declare productId: string;
  declare variantId: string;
  declare quantity: number;
  declare unitPrice: number;
  declare customization: CreationOptional<Record<string, unknown>>;
  declare measurementProfileId: string | null;
}

CartItem.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    cartId: { type: DataTypes.UUID, allowNull: false },
    productId: { type: DataTypes.UUID, allowNull: false },
    variantId: { type: DataTypes.UUID, allowNull: false },
    quantity: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, validate: { min: 1 } },
    unitPrice: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    customization: { type: DataTypes.JSON, allowNull: false, defaultValue: {} },
    measurementProfileId: { type: DataTypes.UUID, allowNull: true },
  },
  { sequelize, tableName: "cart_items", indexes: [{ fields: ["cart_id"] }, { fields: ["variant_id"] }] },
);
