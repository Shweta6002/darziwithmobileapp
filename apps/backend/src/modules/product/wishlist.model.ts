import { DataTypes, Model, type InferAttributes, type InferCreationAttributes, type CreationOptional } from "sequelize";
import { sequelize } from "../../config/database";

export class WishlistItem extends Model<InferAttributes<WishlistItem>, InferCreationAttributes<WishlistItem>> {
  declare id: CreationOptional<string>;
  declare userId: string;
  declare productId: string;
}

WishlistItem.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false },
    productId: { type: DataTypes.UUID, allowNull: false },
  },
  { sequelize, tableName: "wishlist_items", indexes: [{ fields: ["user_id", "product_id"], unique: true }] },
);
