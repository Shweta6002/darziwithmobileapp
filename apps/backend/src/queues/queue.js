const { Queue } = require("bullmq");
const { env } = require("../config/env");
const connection = {
    host: env.redis.host,
    port: env.redis.port,
    password: env.redis.password || undefined,
};
const emailQueue = new Queue("email", { connection: connection });
const orderQueue = new Queue("order", { connection: connection });
const inventoryQueue = new Queue("inventory", { connection: connection });
module.exports = {
  connection,
  emailQueue,
  inventoryQueue,
  orderQueue
};
