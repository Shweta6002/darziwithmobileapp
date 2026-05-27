import { DataTypes, Model, type InferAttributes, type InferCreationAttributes, type CreationOptional } from "sequelize";
import { sequelize } from "../../config/database";

export class PaymentMethod extends Model<InferAttributes<PaymentMethod>, InferCreationAttributes<PaymentMethod>> {
  declare id: CreationOptional<string>;
  declare userId: string;
  declare provider: "RAZORPAY" | "STRIPE";
  declare providerCustomerId: string | null;
  declare providerMethodId: string;
  declare brand: string | null;
  declare last4: string | null;
  declare expMonth: number | null;
  declare expYear: number | null;
  declare isDefault: CreationOptional<boolean>;
}

PaymentMethod.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false },
    provider: { type: DataTypes.ENUM("RAZORPAY", "STRIPE"), allowNull: false },
    providerCustomerId: { type: DataTypes.STRING(120), allowNull: true },
    providerMethodId: { type: DataTypes.STRING(120), allowNull: false },
    brand: { type: DataTypes.STRING(40), allowNull: true },
    last4: { type: DataTypes.STRING(4), allowNull: true },
    expMonth: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    expYear: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    isDefault: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  },
  { sequelize, tableName: "payment_methods", indexes: [{ fields: ["user_id"] }] },
);
