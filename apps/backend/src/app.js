const express = require("express");
const swaggerUi = require("swagger-ui-express");
const { registerSecurityMiddleware } = require("./core/middleware/security.middleware");
const { notFoundHandler, errorHandler } = require("./core/middleware/error.middleware");
const { env } = require("./core/config/env");
const { swaggerSpec } = require("./core/config/swagger");
const { v1Routes } = require("./routes");
const { aiRoutes } = require("./modules/ai/ai.routes");
function createApp() {
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
module.exports = {
  createApp
};
