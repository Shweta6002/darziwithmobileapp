import { DataTypes, Model, type InferAttributes, type InferCreationAttributes, type CreationOptional } from "sequelize";
import { sequelize } from "../../config/database";

export class Coupon extends Model<InferAttributes<Coupon>, InferCreationAttributes<Coupon>> {
  declare id: CreationOptional<string>;
  declare code: string;
  declare discountType: "PERCENTAGE" | "FIXED";
  declare discountValue: number;
  declare minOrderAmount: CreationOptional<number>;
  declare maxDiscountAmount: number | null;
  declare startsAt: Date;
  declare endsAt: Date;
  declare usageLimit: number | null;
  declare usedCount: CreationOptional<number>;
  declare isActive: CreationOptional<boolean>;
}

Coupon.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    code: { type: DataTypes.STRING(40), allowNull: false, unique: true },
    discountType: { type: DataTypes.ENUM("PERCENTAGE", "FIXED"), allowNull: false },
    discountValue: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    minOrderAmount: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
    maxDiscountAmount: { type: DataTypes.DECIMAL(12, 2), allowNull: true },
    startsAt: { type: DataTypes.DATE, allowNull: false },
    endsAt: { type: DataTypes.DATE, allowNull: false },
    usageLimit: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    usedCount: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  },
  { sequelize, tableName: "coupons", indexes: [{ fields: ["code"] }, { fields: ["is_active", "starts_at", "ends_at"] }] },
);
