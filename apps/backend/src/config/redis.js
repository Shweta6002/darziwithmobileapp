const Redis = require("ioredis");
const { env } = require("./env");
const redis = new Redis({
    host: env.redis.host,
    port: env.redis.port,
    password: env.redis.password || undefined,
    lazyConnect: true,
    maxRetriesPerRequest: 2,
});
async function connectRedis() {
    if (redis.status === "end" || redis.status === "close")
        return;
    await redis.connect().catch((error) => {
        if (env.nodeEnv === "production")
            throw error;
    });
}
module.exports = {
  connectRedis,
  redis
};
