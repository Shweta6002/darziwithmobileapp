module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/apps/backend/tests/**/*.test.ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};
