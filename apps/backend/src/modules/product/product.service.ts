import { Op, Sequelize } from "sequelize";
import { Category, Inventory, Product, ProductVariant, Review, WishlistItem } from "../../database/models";
import { redis } from "../../config/redis";
import { getPagination } from "../../utils/pagination";
import { AppError } from "../../utils/AppError";

type ProductQuery = {
  page?: number;
  limit?: number;
  q?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
  sort?: "price_asc" | "price_desc" | "rating_desc" | "newest";
};

function mapProduct(product: Product & { variants?: ProductVariant[]; category?: Category }) {
  const variants = (product as any).ProductVariants || (product as any).variants || [];
  return {
    id: product.id,
    name: product.name,
    tagline: product.tagline || "",
    category: (product as any).Category?.name || "Blazers",
    basePrice: Number(product.basePrice),
    rating: Number(product.ratingAverage),
    reviewCount: product.reviewCount,
    imageUrl: product.imageUrl || "",
    detailImages: product.detailImages || [],
    fabrics: [],
    colors: variants.map((variant: ProductVariant) => ({ name: variant.colorName, hex: variant.colorHex })),
    description: product.description,
    specs: product.specs || [],
    defaultCustomization: {},
    designedFor: product.designedFor || "",
    outOfStock: variants.every((variant: ProductVariant & { Inventory?: Inventory }) => Number(variant.Inventory?.stockOnHand || 0) <= Number(variant.Inventory?.stockReserved || 0)),
    variants,
  };
}

export class ProductService {
  async list(query: ProductQuery) {
    const cacheKey = `products:${JSON.stringify(query)}`;
    const cached = await redis.get(cacheKey).catch(() => null);
    if (cached) return JSON.parse(cached);

    const { limit, offset, page } = getPagination(query as Record<string, unknown>);
    const where: any = { status: "ACTIVE" };
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
    }[query.sort || "newest"] as any;

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
      items: result.rows.map((product) => mapProduct(product as any)),
      pagination: { page, limit, total: result.count, totalPages: Math.ceil(result.count / limit) },
    };
    await redis.setex(cacheKey, 60, JSON.stringify(payload)).catch(() => undefined);
    return payload;
  }

  async getById(idOrSlug: string) {
    const product = await Product.findOne({
      where: { [Op.or]: [{ id: idOrSlug }, { slug: idOrSlug }], status: "ACTIVE" },
      include: [{ model: Category }, { model: ProductVariant, include: [Inventory] }],
    });
    if (!product) throw new AppError(404, "Product not found", "PRODUCT_NOT_FOUND");
    return mapProduct(product as any);
  }

  async create(input: any) {
    const product = await Product.create(input);
    await redis.del("products:index").catch(() => undefined);
    return product;
  }

  async update(id: string, input: any) {
    const [count] = await Product.update(input, { where: { id } });
    if (!count) throw new AppError(404, "Product not found", "PRODUCT_NOT_FOUND");
    return Product.findByPk(id);
  }

  async addReview(userId: string, productId: string, input: { rating: number; title?: string; body?: string }) {
    const review = await Review.create({ ...input, userId, productId, status: "PENDING" });
    const aggregates = await Review.findOne({
      where: { productId, status: "APPROVED" },
      attributes: [[Sequelize.fn("AVG", Sequelize.col("rating")), "avg"], [Sequelize.fn("COUNT", Sequelize.col("id")), "count"]],
      raw: true,
    });
    await Product.update(
      { ratingAverage: Number((aggregates as any)?.avg || 0), reviewCount: Number((aggregates as any)?.count || 0) },
      { where: { id: productId } },
    );
    return review;
  }

  async wishlist(userId: string) {
    return WishlistItem.findAll({ where: { userId }, include: [Product] });
  }
}

export const productService = new ProductService();
