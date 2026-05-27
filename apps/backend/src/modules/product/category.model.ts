import { DataTypes, Model, type InferAttributes, type InferCreationAttributes, type CreationOptional } from "sequelize";
import { sequelize } from "../../config/database";

export class Category extends Model<InferAttributes<Category>, InferCreationAttributes<Category>> {
  declare id: CreationOptional<string>;
  declare parentId: string | null;
  declare name: string;
  declare slug: string;
  declare isActive: CreationOptional<boolean>;
}

Category.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    parentId: { type: DataTypes.UUID, allowNull: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    slug: { type: DataTypes.STRING(120), allowNull: false, unique: true },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  },
  { sequelize, tableName: "categories", indexes: [{ fields: ["parent_id"] }, { fields: ["slug"] }] },
);
