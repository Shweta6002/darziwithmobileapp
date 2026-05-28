const { Op, Sequelize } = require("sequelize");
const { Category, Inventory, Product, ProductVariant, Review, WishlistItem } = require("../../database/models");
const { redis } = require("../../config/redis");
const { getPagination } = require("../../utils/pagination");
const { AppError } = require("../../utils/AppError");

const mapProduct = (product) => {
    const variants = product.ProductVariants || product.variants || [];
    return {
        id: product.id,
        name: product.name,
        tagline: product.tagline || "",
        category: product.Category?.name || "Blazers",
        basePrice: Number(product.basePrice),
        rating: Number(product.ratingAverage),
        reviewCount: product.reviewCount,
        imageUrl: product.imageUrl || "",
        detailImages: product.detailImages || [],
        fabrics: [],
        colors: variants.map((variant) => ({ name: variant.colorName, hex: variant.colorHex })),
        description: product.description,
        specs: product.specs || [],
        defaultCustomization: {},
        designedFor: product.designedFor || "",
        outOfStock: variants.every((variant) => Number(variant.Inventory?.stockOnHand || 0) <= Number(variant.Inventory?.stockReserved || 0)),
        variants,
    };
};

const list = async (query) => {
    const cacheKey = `products:${JSON.stringify(query)}`;
    const cached = await redis.get(cacheKey).catch(() => null);
    if (cached) return JSON.parse(cached);

    const { limit, offset, page } = getPagination(query);
    const where = { status: "ACTIVE" };
    if (query.featured !== undefined) where.isFeatured = query.featured;
    if (query.minPrice || query.maxPrice) {
        where.basePrice = {
            ...(query.minPrice ? { [Op.gte]: query.minPrice } : {}),
            ...(query.maxPrice ? { [Op.lte]: query.maxPrice } : {}),
        };
    }
    if (query.q) {
        where[Op.or] = [
            { name: { [Op.like]: `%${query.q}%` } },
            { tagline: { [Op.like]: `%${query.q}%` } },
            { description: { [Op.like]: `%${query.q}%` } },
        ];
    }

    const order = {
        price_asc: [["basePrice", "ASC"]],
        price_desc: [["basePrice", "DESC"]],
        rating_desc: [["ratingAverage", "DESC"]],
        newest: [["createdAt", "DESC"]],
    }[query.sort || "newest"];

    const result = await Product.findAndCountAll({
        where,
        include: [
            { model: Category, where: query.category ? { slug: query.category } : undefined, required: Boolean(query.category) },
            { model: ProductVariant, include: [Inventory] },
        ],
        limit,
        offset,
        order,
        distinct: true,
    });

    const payload = {
        items: result.rows.map(mapProduct),
        pagination: { page, limit, total: result.count, totalPages: Math.ceil(result.count / limit) },
    };
    await redis.setex(cacheKey, 60, JSON.stringify(payload)).catch(() => undefined);
    return payload;
};

const getById = async (idOrSlug) => {
    const product = await Product.findOne({
        where: { [Op.or]: [{ id: idOrSlug }, { slug: idOrSlug }], status: "ACTIVE" },
        include: [{ model: Category }, { model: ProductVariant, include: [Inventory] }],
    });
    if (!product) throw AppError(404, "Product not found", "PRODUCT_NOT_FOUND");
    return mapProduct(product);
};

const create = async (input) => {
    const product = await Product.create(input);
    await redis.del("products:index").catch(() => undefined);
    return product;
};

const update = async (id, input) => {
    const [count] = await Product.update(input, { where: { id } });
    if (!count) throw AppError(404, "Product not found", "PRODUCT_NOT_FOUND");
    return Product.findByPk(id);
};

const addReview = async (userId, productId, input) => {
    const review = await Review.create({ ...input, userId, productId, status: "PENDING" });
    const aggregates = await Review.findOne({
        where: { productId, status: "APPROVED" },
        attributes: [[Sequelize.fn("AVG", Sequelize.col("rating")), "avg"], [Sequelize.fn("COUNT", Sequelize.col("id")), "count"]],
        raw: true,
    });
    await Product.update({ ratingAverage: Number(aggregates?.avg || 0), reviewCount: Number(aggregates?.count || 0) }, { where: { id: productId } });
    return review;
};

const wishlist = async (userId) => {
    return WishlistItem.findAll({ where: { userId }, include: [Product] });
};

const productService = {
    list,
    getById,
    create,
    update,
    addReview,
    wishlist,
};

module.exports = {
    mapProduct,
    list,
    getById,
    create,
    update,
    addReview,
    wishlist,
    productService,
};
