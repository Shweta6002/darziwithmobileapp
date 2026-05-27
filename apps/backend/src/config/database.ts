import { Sequelize } from "sequelize";
import { env } from "./env";
import { logger } from "./logger";

export const sequelize = new Sequelize(env.db.name, env.db.user, env.db.password, {
  host: env.db.host,
  port: env.db.port,
  dialect: "mysql",
  logging: env.nodeEnv === "development" ? (msg) => logger.debug(msg) : false,
  pool: {
    min: env.db.poolMin,
    max: env.db.poolMax,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    underscored: true,
    paranoid: true,
    timestamps: true,
  },
});

export async function connectDatabase() {
  await sequelize.authenticate();
  logger.info("MySQL connection established");
}
