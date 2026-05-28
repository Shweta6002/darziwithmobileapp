const { authenticate, authorize, authMiddleware } = require("../../middlewares/auth.middleware");

module.exports = {
    authenticate,
    authorize,
    authMiddleware,
};
