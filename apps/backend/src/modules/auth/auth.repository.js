const { User } = require("../user/model/user.model");

const findUserByEmail = (email, options = {}) => {
    return User.findOne({ where: { email: email.toLowerCase(), ...options } });
};

const findActiveUserByEmail = (email) => {
    return findUserByEmail(email, { status: "ACTIVE" });
};

const findUserById = (id) => {
    return User.findByPk(id);
};

const createCustomer = (payload) => {
    return User.create({ ...payload, role: "CUSTOMER" });
};

const markEmailVerified = (userId) => {
    return User.update({ isEmailVerified: true }, { where: { id: userId } });
};

const updatePassword = (userId, passwordHash) => {
    return User.update({ passwordHash }, { where: { id: userId } });
};

const authRepository = {
    findUserByEmail,
    findActiveUserByEmail,
    findUserById,
    createCustomer,
    markEmailVerified,
    updatePassword,
};

module.exports = {
    findUserByEmail,
    findActiveUserByEmail,
    findUserById,
    createCustomer,
    markEmailVerified,
    updatePassword,
    authRepository,
};
