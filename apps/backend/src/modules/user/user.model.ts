import { DataTypes, Model, type InferAttributes, type InferCreationAttributes, type CreationOptional } from "sequelize";
import { sequelize } from "../../config/database";

export type Role = "ADMIN" | "CUSTOMER";

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<string>;
  declare email: string;
  declare passwordHash: string;
  declare firstName: string;
  declare lastName: string;
  declare phone: string | null;
  declare role: Role;
  declare isEmailVerified: CreationOptional<boolean>;
  declare status: CreationOptional<"ACTIVE" | "BLOCKED" | "DELETED">;
}

User.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    email: { type: DataTypes.STRING(190), allowNull: false, unique: true },
    passwordHash: { type: DataTypes.STRING(255), allowNull: false },
    firstName: { type: DataTypes.STRING(80), allowNull: false },
    lastName: { type: DataTypes.STRING(80), allowNull: false },
    phone: { type: DataTypes.STRING(20), allowNull: true },
    role: { type: DataTypes.ENUM("ADMIN", "CUSTOMER"), allowNull: false, defaultValue: "CUSTOMER" },
    isEmailVerified: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    status: { type: DataTypes.ENUM("ACTIVE", "BLOCKED", "DELETED"), allowNull: false, defaultValue: "ACTIVE" },
  },
  { sequelize, tableName: "users", indexes: [{ fields: ["email"] }, { fields: ["role", "status"] }] },
);
