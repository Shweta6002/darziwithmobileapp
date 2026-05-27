import { DataTypes, Model, type InferAttributes, type InferCreationAttributes, type CreationOptional } from "sequelize";
import { sequelize } from "../../config/database";

export class Review extends Model<InferAttributes<Review>, InferCreationAttributes<Review>> {
  declare id: CreationOptional<string>;
  declare userId: string;
  declare productId: string;
  declare rating: number;
  declare title: string | null;
  declare body: string | null;
  declare status: CreationOptional<"PENDING" | "APPROVED" | "REJECTED">;
}

Review.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false },
    productId: { type: DataTypes.UUID, allowNull: false },
    rating: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, validate: { min: 1, max: 5 } },
    title: { type: DataTypes.STRING(120), allowNull: true },
    body: { type: DataTypes.TEXT, allowNull: true },
    status: { type: DataTypes.ENUM("PENDING", "APPROVED", "REJECTED"), allowNull: false, defaultValue: "PENDING" },
  },
  { sequelize, tableName: "reviews", indexes: [{ fields: ["product_id", "status"] }, { fields: ["user_id", "product_id"], unique: true }] },
);
