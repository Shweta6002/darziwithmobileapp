const dotenv = require("dotenv");
const Joi = require("joi");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });
const schema = Joi.object({
    NODE_ENV: Joi.string().valid("development", "test", "production").default("development"),
    PORT: Joi.number().port().default(3000),
    API_PREFIX: Joi.string().default("/api/darzi/v1"),
    WEB_ORIGIN: Joi.string().default("http://localhost:5173"),
    APP_URL: Joi.string().allow("").default("http://localhost:3000"),
    GEMINI_API_KEY: Joi.string().allow("").default(""),
    DB_HOST: Joi.string().default("127.0.0.1"),
    DB_PORT: Joi.number().port().default(3306),
    DB_NAME: Joi.string().default("darzi"),
    DB_USER: Joi.string().default("darzi"),
    DB_PASSWORD: Joi.string().allow("").default("darzi123"),
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
    throw Error(`Invalid environment: ${error.message}`);
}
const env = {
    nodeEnv: value.NODE_ENV,
    isProduction: value.NODE_ENV === "production",
    port: Number(value.PORT),
    apiPrefix: value.API_PREFIX,
    webOrigin: value.WEB_ORIGIN,
    appUrl: value.APP_URL,
    geminiApiKey: value.GEMINI_API_KEY,
    db: {
        host: value.DB_HOST,
        port: Number(value.DB_PORT),
        name: value.DB_NAME,
        user: value.DB_USER,
        password: value.DB_PASSWORD,
        poolMin: Number(value.DB_POOL_MIN),
        poolMax: Number(value.DB_POOL_MAX),
    },
    redis: {
        host: value.REDIS_HOST,
        port: Number(value.REDIS_PORT),
        password: value.REDIS_PASSWORD,
    },
    jwt: {
        accessSecret: value.JWT_ACCESS_SECRET,
        refreshSecret: value.JWT_REFRESH_SECRET,
        accessExpiresIn: value.JWT_ACCESS_EXPIRES_IN,
        refreshExpiresIn: value.JWT_REFRESH_EXPIRES_IN,
    },
    razorpay: {
        keyId: value.RAZORPAY_KEY_ID,
        keySecret: value.RAZORPAY_KEY_SECRET,
        webhookSecret: value.RAZORPAY_WEBHOOK_SECRET,
    },
    cloudinary: {
        cloudName: value.CLOUDINARY_CLOUD_NAME,
        apiKey: value.CLOUDINARY_API_KEY,
        apiSecret: value.CLOUDINARY_API_SECRET,
    },
    logLevel: value.LOG_LEVEL,
};
module.exports = {
  env
};
