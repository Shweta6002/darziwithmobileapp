import Redis from "ioredis";
import { env } from "./env";

export const redis = new Redis({
  host: env.redis.host,
  port: env.redis.port,
  password: env.redis.password || undefined,
  lazyConnect: true,
  maxRetriesPerRequest: 2,
});

export async function connectRedis() {
  if (redis.status === "end" || redis.status === "close") return;
  await redis.connect().catch((error) => {
    if (env.nodeEnv === "production") throw error;
  });
}
