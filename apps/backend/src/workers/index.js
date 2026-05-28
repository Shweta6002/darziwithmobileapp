const { Worker } = require("bullmq");
const { connection } = require("../queues/queue");
const { logger } = require("../config/logger");
const workers = [
    new Worker("email", async (job) => {
        logger.info({ jobId: job.id, name: job.name }, "Processing email job");
    }, { connection: connection }),
    new Worker("order", async (job) => {
        logger.info({ jobId: job.id, name: job.name }, "Processing order job");
    }, { connection: connection }),
    new Worker("inventory", async (job) => {
        logger.info({ jobId: job.id, name: job.name }, "Processing inventory job");
    }, { connection: connection }),
];
for (const worker of workers) {
    worker.on("failed", (job, error) => logger.error({ jobId: job?.id, err: error }, "Worker job failed"));
}
process.on("SIGTERM", async () => {
    await Promise.all(workers.map((worker) => worker.close()));
    process.exit(0);
});
