import { Queue } from "bullmq";
import { env } from "../config/env";

export const connection = {
  host: env.redis.host,
  port: env.redis.port,
  password: env.redis.password || undefined,
};

export const emailQueue = new Queue("email", { connection });
export const orderQueue = new Queue("order", { connection });
export const inventoryQueue = new Queue("inventory", { connection });
