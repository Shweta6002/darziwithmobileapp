import { DataTypes, Model, type InferAttributes, type InferCreationAttributes, type CreationOptional } from "sequelize";
import { sequelize } from "../../config/database";

export class AdminLog extends Model<InferAttributes<AdminLog>, InferCreationAttributes<AdminLog>> {
  declare id: CreationOptional<string>;
  declare adminId: string;
  declare action: string;
  declare entityType: string;
  declare entityId: string | null;
  declare metadata: CreationOptional<Record<string, unknown>>;
  declare ipAddress: string | null;
}

AdminLog.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    adminId: { type: DataTypes.UUID, allowNull: false },
    action: { type: DataTypes.STRING(120), allowNull: false },
    entityType: { type: DataTypes.STRING(80), allowNull: false },
    entityId: { type: DataTypes.UUID, allowNull: true },
    metadata: { type: DataTypes.JSON, allowNull: false, defaultValue: {} },
    ipAddress: { type: DataTypes.STRING(60), allowNull: true },
  },
  { sequelize, tableName: "admin_logs", indexes: [{ fields: ["admin_id", "created_at"] }, { fields: ["entity_type", "entity_id"] }] },
);
