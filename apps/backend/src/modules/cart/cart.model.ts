import { DataTypes, Model, type InferAttributes, type InferCreationAttributes, type CreationOptional } from "sequelize";
import { sequelize } from "../../config/database";

export class Cart extends Model<InferAttributes<Cart>, InferCreationAttributes<Cart>> {
  declare id: CreationOptional<string>;
  declare userId: string | null;
  declare guestToken: string | null;
  declare couponCode: string | null;
}

Cart.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: true },
    guestToken: { type: DataTypes.STRING(80), allowNull: true },
    couponCode: { type: DataTypes.STRING(40), allowNull: true },
  },
  { sequelize, tableName: "carts", indexes: [{ fields: ["user_id"] }, { fields: ["guest_token"] }] },
);
