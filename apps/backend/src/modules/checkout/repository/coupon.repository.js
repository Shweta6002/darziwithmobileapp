const { Op } = require("sequelize");
const { Coupon } = require("../model/coupon.model");
const { getPagination } = require("../../../core/utils/pagination");

const findById = (id) => Coupon.findByPk(id);

const findByCode = (code) => Coupon.findOne({ where: { code } });

const list = async (query) => {
    const { page, limit, offset } = getPagination(query);
    const where = {};
    if (query.code) where.code = { [Op.like]: `%${query.code}%` };
    if (query.isActive !== undefined) where.isActive = query.isActive;

    const result = await Coupon.findAndCountAll({
        where,
        limit,
        offset,
        order: [["createdAt", "DESC"]],
    });

    return {
        rows: result.rows,
        pagination: { page, limit, total: result.count, totalPages: Math.ceil(result.count / limit) },
    };
};

const create = (payload) => Coupon.create(payload);

const update = async (id, payload) => {
    const [count] = await Coupon.update(payload, { where: { id } });
    if (!count) return null;
    return findById(id);
};

const remove = (id) => Coupon.destroy({ where: { id } });

const couponRepository = {
    findById,
    findByCode,
    list,
    create,
    update,
    delete: remove,
};

module.exports = {
    findById,
    findByCode,
    list,
    create,
    update,
    delete: remove,
    couponRepository,
};
