const Redis = require("ioredis");

let redis;
const memoryCache = new Map();

try {
  redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    maxRetriesPerRequest: 1,
    connectTimeout: 2000,
  });

  redis.on("connect", () => {
    console.log("Server is connected to Redis successfully!");
  });

  redis.on("error", (err) => {
    // Only log connection error once, avoiding infinite terminal flooding
  });
} catch (e) {
  console.log("Failed to initialize Redis client, using in-memory fallback:", e.message);
}

const redisWrapper = {
  get: async (key) => {
    try {
      if (redis && redis.status === "ready") {
        return await redis.get(key);
      }
    } catch (err) {
      // fallback to memory
    }
    return memoryCache.get(key);
  },
  set: async (key, value, mode, duration) => {
    try {
      if (redis && redis.status === "ready") {
        return await redis.set(key, value, mode, duration);
      }
    } catch (err) {
      // fallback to memory
    }
    memoryCache.set(key, value);
    if (mode === "EX" && duration) {
      setTimeout(() => memoryCache.delete(key), duration * 1000);
    }
    return "OK";
  }
};

module.exports = redisWrapper;
