import { DataTypes, Model, type InferAttributes, type InferCreationAttributes, type CreationOptional } from "sequelize";
import { sequelize } from "../../config/database";

export class MeasurementProfile extends Model<InferAttributes<MeasurementProfile>, InferCreationAttributes<MeasurementProfile>> {
  declare id: CreationOptional<string>;
  declare userId: string;
  declare title: string;
  declare fitPreference: string;
  declare measurements: Record<string, unknown>;
  declare aiRecommendation: CreationOptional<Record<string, unknown>>;
}

MeasurementProfile.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false },
    title: { type: DataTypes.STRING(120), allowNull: false },
    fitPreference: { type: DataTypes.STRING(40), allowNull: false },
    measurements: { type: DataTypes.JSON, allowNull: false },
    aiRecommendation: { type: DataTypes.JSON, allowNull: false, defaultValue: {} },
  },
  { sequelize, tableName: "measurement_profiles", indexes: [{ fields: ["user_id"] }] },
);
