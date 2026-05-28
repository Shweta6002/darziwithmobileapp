const { asyncHandler } = require("../../utils/asyncHandler");
const { ok, created } = require("../../utils/apiResponse");
const { productService } = require("./product.service");
const productController = {
    list: asyncHandler(async (req, res) => {
        const result = await productService.list(req.query);
        return res.json(result.items);
    }),
    search: asyncHandler(async (req, res) => ok(res, await productService.list(req.query))),
    get: asyncHandler(async (req, res) => res.json(await productService.getById(req.params.id))),
    create: asyncHandler(async (req, res) => created(res, await productService.create(req.body))),
    update: asyncHandler(async (req, res) => ok(res, await productService.update(req.params.id, req.body))),
    addReview: asyncHandler(async (req, res) => created(res, await productService.addReview(req.user.id, req.params.id, req.body))),
    wishlist: asyncHandler(async (req, res) => ok(res, await productService.wishlist(req.user.id))),
};
module.exports = {
  productController
};
