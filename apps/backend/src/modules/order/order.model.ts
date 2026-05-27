import { DataTypes, Model, type InferAttributes, type InferCreationAttributes, type CreationOptional } from "sequelize";
import { sequelize } from "../../config/database";

export type OrderStatus =
  | "PENDING_PAYMENT"
  | "ORDER_RECEIVED"
  | "PATTERN_DRAFTED"
  | "HAND_CUT"
  | "TAILORING"
  | "QUALITY_CHECK"
  | "DISPATCHED"
  | "DELIVERED"
  | "CANCELLED"
  | "RETURN_REQUESTED"
  | "RETURNED";

export class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
  declare id: CreationOptional<string>;
  declare orderNumber: string;
  declare userId: string;
  declare addressSnapshot: Record<string, unknown>;
  declare subtotal: number;
  declare discountTotal: CreationOptional<number>;
  declare taxTotal: CreationOptional<number>;
  declare shippingTotal: CreationOptional<number>;
  declare grandTotal: number;
  declare currency: CreationOptional<string>;
  declare status: CreationOptional<OrderStatus>;
  declare couponCode: string | null;
  declare estimatedDeliveryAt: Date | null;
}

Order.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    orderNumber: { type: DataTypes.STRING(40), allowNull: false, unique: true },
    userId: { type: DataTypes.UUID, allowNull: false },
    addressSnapshot: { type: DataTypes.JSON, allowNull: false },
    subtotal: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    discountTotal: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
    taxTotal: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
    shippingTotal: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
    grandTotal: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    currency: { type: DataTypes.STRING(3), allowNull: false, defaultValue: "INR" },
    status: {
      type: DataTypes.ENUM("PENDING_PAYMENT", "ORDER_RECEIVED", "PATTERN_DRAFTED", "HAND_CUT", "TAILORING", "QUALITY_CHECK", "DISPATCHED", "DELIVERED", "CANCELLED", "RETURN_REQUESTED", "RETURNED"),
      allowNull: false,
      defaultValue: "PENDING_PAYMENT",
    },
    couponCode: { type: DataTypes.STRING(40), allowNull: true },
    estimatedDeliveryAt: { type: DataTypes.DATE, allowNull: true },
  },
  { sequelize, tableName: "orders", indexes: [{ fields: ["user_id", "created_at"] }, { fields: ["status"] }, { fields: ["order_number"] }] },
);
