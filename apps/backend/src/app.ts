import express from "express";
import swaggerUi from "swagger-ui-express";
import { registerSecurityMiddleware } from "./middlewares/security.middleware";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware";
import { env } from "./config/env";
import { swaggerSpec } from "./config/swagger";
import { v1Routes } from "./routes/v1.routes";
import { aiRoutes } from "./modules/ai/ai.routes";

export function createApp() {
  const app = express();

  registerSecurityMiddleware(app);

  app.use("/api/gemini", aiRoutes);
  app.use(env.apiPrefix, v1Routes);
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/ready", (_req, res) => res.json({ status: "ready" }));

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
