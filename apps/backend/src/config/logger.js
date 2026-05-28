const pino = require("pino");
const { env } = require("./env");
const logger = pino({
    level: env.logLevel,
    redact: {
        paths: ["req.headers.authorization", "password", "token", "refreshToken"],
        remove: true,
    },
    transport: env.nodeEnv === "development" ? { target: "pino-pretty" } : undefined,
});
module.exports = {
  logger
};
