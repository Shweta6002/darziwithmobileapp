const request = require("supertest");
const { createApp } = require("../../src/app");
describe("health", () => {
    it("returns API health", async () => {
        const response = await request(createApp()).get("/api/darzi/v1/health");
        expect(response.status).toBe(200);
        expect(response.body.data.status).toBe("ok");
    });
    it("keeps legacy /api/v1 compatibility", async () => {
        const response = await request(createApp()).get("/api/v1/health");
        expect(response.status).toBe(200);
        expect(response.body.data.status).toBe("ok");
    });
});
