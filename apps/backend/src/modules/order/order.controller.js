const { asyncHandler } = require("../../utils/asyncHandler");
const { created, ok } = require("../../utils/apiResponse");
const { orderService } = require("./order.service");
const orderController = {
    checkout: asyncHandler(async (req, res) => created(res, await orderService.createFromCart(req.user.id, req.body.address))),
    initiate: asyncHandler(async (req, res) => res.json(await orderService.initiate(req.body))),
    list: asyncHandler(async (req, res) => ok(res, await orderService.list(req.user.id))),
    get: asyncHandler(async (req, res) => ok(res, await orderService.getById(req.user.id, req.params.id))),
    updateStatus: asyncHandler(async (req, res) => ok(res, await orderService.updateStatus(req.params.id, req.body.status))),
};
module.exports = {
  orderController
};
