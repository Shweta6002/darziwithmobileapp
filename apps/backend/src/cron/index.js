const { logger } = require("../core/logger/logger");
function registerCronJobs() {
    logger.info("Cron registry initialized");
}
module.exports = {
  registerCronJobs
};
