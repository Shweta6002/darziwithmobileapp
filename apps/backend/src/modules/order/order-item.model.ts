import { DataTypes, Model, type InferAttributes, type InferCreationAttributes, type CreationOptional } from "sequelize";
import { sequelize } from "../../config/database";

export class OrderItem extends Model<InferAttributes<OrderItem>, InferCreationAttributes<OrderItem>> {
  declare id: CreationOptional<string>;
  declare orderId: string;
  declare productId: string;
  declare variantId: string;
  declare productSnapshot: Record<string, unknown>;
  declare quantity: number;
  declare unitPrice: number;
  declare lineTotal: number;
  declare customization: CreationOptional<Record<string, unknown>>;
  declare measurementSnapshot: CreationOptional<Record<string, unknown>>;
}

OrderItem.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    orderId: { type: DataTypes.UUID, allowNull: false },
    productId: { type: DataTypes.UUID, allowNull: false },
    variantId: { type: DataTypes.UUID, allowNull: false },
    productSnapshot: { type: DataTypes.JSON, allowNull: false },
    quantity: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    unitPrice: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    lineTotal: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    customization: { type: DataTypes.JSON, allowNull: false, defaultValue: {} },
    measurementSnapshot: { type: DataTypes.JSON, allowNull: false, defaultValue: {} },
  },
  { sequelize, tableName: "order_items", indexes: [{ fields: ["order_id"] }, { fields: ["product_id"] }] },
);
