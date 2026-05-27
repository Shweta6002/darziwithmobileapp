import { DataTypes, Model, type InferAttributes, type InferCreationAttributes, type CreationOptional } from "sequelize";
import { sequelize } from "../../config/database";

export class Inventory extends Model<InferAttributes<Inventory>, InferCreationAttributes<Inventory>> {
  declare id: CreationOptional<string>;
  declare variantId: string;
  declare stockOnHand: CreationOptional<number>;
  declare stockReserved: CreationOptional<number>;
  declare reorderPoint: CreationOptional<number>;
}

Inventory.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    variantId: { type: DataTypes.UUID, allowNull: false, unique: true },
    stockOnHand: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
    stockReserved: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
    reorderPoint: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 5 },
  },
  { sequelize, tableName: "inventory", indexes: [{ fields: ["variant_id"] }] },
);
