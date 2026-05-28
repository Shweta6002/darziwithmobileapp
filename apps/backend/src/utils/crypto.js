const crypto = require("crypto");
const bcrypt = require("bcryptjs");
async function hashPassword(password) {
    return bcrypt.hash(password, 12);
}
async function verifyPassword(password, hash) {
    return bcrypt.compare(password, hash);
}
function sha256(value) {
    return crypto.createHash("sha256").update(value).digest("hex");
}
function randomToken(bytes = 32) {
    return crypto.randomBytes(bytes).toString("hex");
}
module.exports = {
  hashPassword,
  randomToken,
  sha256,
  verifyPassword
};
