const { Router } = require("express");
const { authenticate, authorize } = require("../../middlewares/auth.middleware");
const { validate } = require("../../utils/validate");
const { productController } = require("./product.controller");
const {
    productListQuerySchema,
    productReviewSchema,
    productSchema,
    productUpdateSchema
} = require("./validation_schema");
const productRoutes = Router();
productRoutes.get("/", validate({ query: productListQuerySchema }), productController.list);
productRoutes.get("/search", validate({ query: productListQuerySchema }), productController.search);
productRoutes.get("/:id", productController.get);
productRoutes.post("/:id/reviews", authenticate, validate({ body: productReviewSchema }), productController.addReview);
productRoutes.post("/", authenticate, authorize("ADMIN"), validate({ body: productSchema }), productController.create);
productRoutes.patch("/:id", authenticate, authorize("ADMIN"), validate({ body: productUpdateSchema }), productController.update);
module.exports = {
  productRoutes
};
