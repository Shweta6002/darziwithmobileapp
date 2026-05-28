const { createApp } = require("./src/app");
const { env } = require("./src/config/env");
const { logger } = require("./src/config/logger");
const { connectDatabase, sequelize } = require("./src/config/database");
const { connectRedis, redis } = require("./src/config/redis");
require("./src/database/models");

let server;

async function startServer() {
  const app = createApp();

  await Promise.allSettled([connectDatabase(), connectRedis()]);

  server = app.listen(env.port, "0.0.0.0", () => {
    logger.info(`[Darzi Server] listening on port ${env.port}`);
  });
}

async function shutdown(signal) {
  logger.info({ signal }, "Graceful shutdown started");

  if (server) {
    await new Promise((resolve) => server.close(resolve));
  }

  await Promise.allSettled([
    sequelize.close(),
    redis.quit(),
  ]);

  logger.info("Graceful shutdown completed");
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

startServer().catch((error) => {
  logger.fatal({ err: error }, "Failed to start server");
  process.exit(1);
});
