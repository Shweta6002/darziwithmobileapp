const { redis } = require("../database/redis");

const getJson = async (key) => {
    const value = await redis.get(key).catch(() => null);
    return value ? JSON.parse(value) : null;
};

const setJson = async (key, value, ttlSeconds) => {
    await redis.setex(key, ttlSeconds, JSON.stringify(value)).catch(() => undefined);
};

const del = async (key) => {
    await redis.del(key).catch(() => undefined);
};

const delByPattern = async (pattern) => {
    const stream = redis.scanStream({ match: pattern, count: 100 });
    stream.on("data", (keys) => {
        if (keys.length) redis.del(keys).catch(() => undefined);
    });
};

const cacheStore = {
    getJson,
    setJson,
    del,
    delByPattern,
};

module.exports = {
    getJson,
    setJson,
    del,
    delByPattern,
    cacheStore,
};
