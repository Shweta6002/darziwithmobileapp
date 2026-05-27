import { DataTypes, Model, type InferAttributes, type InferCreationAttributes, type CreationOptional } from "sequelize";
import { sequelize } from "../../config/database";

export class Payment extends Model<InferAttributes<Payment>, InferCreationAttributes<Payment>> {
  declare id: CreationOptional<string>;
  declare orderId: string;
  declare provider: "RAZORPAY" | "STRIPE";
  declare providerOrderId: string | null;
  declare providerPaymentId: string | null;
  declare amount: number;
  declare currency: CreationOptional<string>;
  declare status: CreationOptional<"CREATED" | "AUTHORIZED" | "CAPTURED" | "FAILED" | "REFUNDED">;
  declare rawResponse: CreationOptional<Record<string, unknown>>;
}

Payment.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    orderId: { type: DataTypes.UUID, allowNull: false },
    provider: { type: DataTypes.ENUM("RAZORPAY", "STRIPE"), allowNull: false },
    providerOrderId: { type: DataTypes.STRING(120), allowNull: true },
    providerPaymentId: { type: DataTypes.STRING(120), allowNull: true },
    amount: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    currency: { type: DataTypes.STRING(3), allowNull: false, defaultValue: "INR" },
    status: { type: DataTypes.ENUM("CREATED", "AUTHORIZED", "CAPTURED", "FAILED", "REFUNDED"), allowNull: false, defaultValue: "CREATED" },
    rawResponse: { type: DataTypes.JSON, allowNull: false, defaultValue: {} },
  },
  { sequelize, tableName: "payments", indexes: [{ fields: ["order_id"] }, { fields: ["provider_order_id"] }, { fields: ["provider_payment_id"] }] },
);
