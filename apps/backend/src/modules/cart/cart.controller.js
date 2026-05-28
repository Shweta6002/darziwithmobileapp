const { asyncHandler } = require("../../utils/asyncHandler");
const { ok } = require("../../utils/apiResponse");
const { cartService } = require("./cart.service");
const cartController = {
    get: asyncHandler(async (req, res) => ok(res, await cartService.getCart(req.user.id))),
    add: asyncHandler(async (req, res) => ok(res, await cartService.addItem(req.user.id, req.body))),
    update: asyncHandler(async (req, res) => ok(res, await cartService.updateItem(req.user.id, req.params.itemId, req.body.quantity))),
    remove: asyncHandler(async (req, res) => ok(res, await cartService.removeItem(req.user.id, req.params.itemId))),
};
module.exports = {
  cartController
};
