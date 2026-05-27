import pino from "pino";
import { env } from "./env";

export const logger = pino({
  level: env.logLevel,
  redact: {
    paths: ["req.headers.authorization", "password", "token", "refreshToken"],
    remove: true,
  },
  transport: env.nodeEnv === "development" ? { target: "pino-pretty" } : undefined,
});
