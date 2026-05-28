const swaggerJSDoc = require("swagger-jsdoc");
const { env } = require("./env");
const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: "3.0.3",
        info: {
            title: "DARZI Commerce API",
            version: "1.0.0",
            description: "Versioned REST APIs for DARZI premium corporate fashion commerce.",
        },
        servers: [{ url: env.appUrl + env.apiPrefix }],
        components: {
            securitySchemes: {
                bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
            },
        },
    },
  apis: ["apps/backend/src/modules/**/*.js", "apps/backend/src/routes/**/*.js"],
});
module.exports = {
  swaggerSpec
};
