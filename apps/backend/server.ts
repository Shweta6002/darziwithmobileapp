import path from "path";
import express from "express";
import { createServer as createViteServer } from "vite";
import { createApp } from "./src/app";
import { env } from "./src/config/env";
import { logger } from "./src/config/logger";
import { connectDatabase } from "./src/config/database";
import { connectRedis } from "./src/config/redis";
import "./src/database/models";

const rootDir = process.cwd();
const webDir = path.join(rootDir, "apps/web");
const distPath = path.join(rootDir, "dist");

async function startServer() {
  const app = createApp();

  if (env.nodeEnv !== "production") {
    const vite = await createViteServer({
      root: webDir,
      configFile: path.join(webDir, "vite.config.ts"),
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath));
    app.get("*", (_req, res) => res.sendFile(path.join(distPath, "index.html")));
  }

  await Promise.allSettled([connectDatabase(), connectRedis()]);

  app.listen(env.port, "0.0.0.0", () => {
    logger.info(`[Darzi Server] listening on port ${env.port}`);
  });
}

startServer().catch((error) => {
  logger.fatal({ err: error }, "Failed to start server");
  process.exit(1);
});
