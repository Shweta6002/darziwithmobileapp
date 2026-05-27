import dotenv from "dotenv";
import Joi from "joi";

dotenv.config();

const schema = Joi.object({
  NODE_ENV: Joi.string().valid("development", "test", "production").default("development"),
  PORT: Joi.number().port().default(3000),
  API_PREFIX: Joi.string().default("/api/v1"),
  WEB_ORIGIN: Joi.string().default("http://localhost:5173"),
  APP_URL: Joi.string().allow("").default("http://localhost:3000"),
  GEMINI_API_KEY: Joi.string().allow("").default(""),
  DB_HOST: Joi.string().default("127.0.0.1"),
  DB_PORT: Joi.number().port().default(3306),
  DB_NAME: Joi.string().default("darzi"),
  DB_USER: Joi.string().default("darzi"),
  DB_PASSWORD: Joi.string().allow("").default(""),
  DB_POOL_MIN: Joi.number().min(0).default(2),
  DB_POOL_MAX: Joi.number().min(1).default(20),
  REDIS_HOST: Joi.string().default("127.0.0.1"),
  REDIS_PORT: Joi.number().port().default(6379),
  REDIS_PASSWORD: Joi.string().allow("").default(""),
  JWT_ACCESS_SECRET: Joi.string().min(16).default("dev_access_secret_change_me"),
  JWT_REFRESH_SECRET: Joi.string().min(16).default("dev_refresh_secret_change_me"),
  JWT_ACCESS_EXPIRES_IN: Joi.string().default("15m"),
  JWT_REFRESH_EXPIRES_IN: Joi.string().default("30d"),
  RAZORPAY_KEY_ID: Joi.string().allow("").default(""),
  RAZORPAY_KEY_SECRET: Joi.string().allow("").default(""),
  RAZORPAY_WEBHOOK_SECRET: Joi.string().allow("").default(""),
  CLOUDINARY_CLOUD_NAME: Joi.string().allow("").default(""),
  CLOUDINARY_API_KEY: Joi.string().allow("").default(""),
  CLOUDINARY_API_SECRET: Joi.string().allow("").default(""),
  LOG_LEVEL: Joi.string().default("info"),
}).unknown(true);

const { value, error } = schema.validate(process.env, { abortEarly: false });

if (error) {
  throw new Error(`Invalid environment: ${error.message}`);
}

export const env = {
  nodeEnv: value.NODE_ENV as "development" | "test" | "production",
  isProduction: value.NODE_ENV === "production",
  port: Number(value.PORT),
  apiPrefix: value.API_PREFIX as string,
  webOrigin: value.WEB_ORIGIN as string,
  appUrl: value.APP_URL as string,
  geminiApiKey: value.GEMINI_API_KEY as string,
  db: {
    host: value.DB_HOST as string,
    port: Number(value.DB_PORT),
    name: value.DB_NAME as string,
    user: value.DB_USER as string,
    password: value.DB_PASSWORD as string,
    poolMin: Number(value.DB_POOL_MIN),
    poolMax: Number(value.DB_POOL_MAX),
  },
  redis: {
    host: value.REDIS_HOST as string,
    port: Number(value.REDIS_PORT),
    password: value.REDIS_PASSWORD as string,
  },
  jwt: {
    accessSecret: value.JWT_ACCESS_SECRET as string,
    refreshSecret: value.JWT_REFRESH_SECRET as string,
    accessExpiresIn: value.JWT_ACCESS_EXPIRES_IN as string,
    refreshExpiresIn: value.JWT_REFRESH_EXPIRES_IN as string,
  },
  razorpay: {
    keyId: value.RAZORPAY_KEY_ID as string,
    keySecret: value.RAZORPAY_KEY_SECRET as string,
    webhookSecret: value.RAZORPAY_WEBHOOK_SECRET as string,
  },
  cloudinary: {
    cloudName: value.CLOUDINARY_CLOUD_NAME as string,
    apiKey: value.CLOUDINARY_API_KEY as string,
    apiSecret: value.CLOUDINARY_API_SECRET as string,
  },
  logLevel: value.LOG_LEVEL as string,
};
