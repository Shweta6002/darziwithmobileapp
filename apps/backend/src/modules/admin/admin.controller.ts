import { fn, col } from "sequelize";
import { AdminLog, Order, Payment, Product, User } from "../../database/models";
import { asyncHandler } from "../../utils/asyncHandler";
import { ok } from "../../utils/apiResponse";

export const adminController = {
  analytics: asyncHandler(async (_req, res) => {
    const [users, products, orders, revenue] = await Promise.all([
      User.count(),
      Product.count(),
      Order.count(),
      Payment.findOne({ attributes: [[fn("SUM", col("amount")), "total"]], where: { status: "CAPTURED" }, raw: true }),
    ]);
    return ok(res, { users, products, orders, revenue: Number((revenue as any)?.total || 0) });
  }),
  users: asyncHandler(async (_req, res) => ok(res, await User.findAll({ attributes: { exclude: ["passwordHash"] }, limit: 100 }))),
  orders: asyncHandler(async (_req, res) => ok(res, await Order.findAll({ limit: 100, order: [["createdAt", "DESC"]] }))),
  logs: asyncHandler(async (_req, res) => ok(res, await AdminLog.findAll({ limit: 100, order: [["createdAt", "DESC"]] }))),
};
