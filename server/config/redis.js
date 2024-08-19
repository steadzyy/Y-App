const Redis = require ("ioredis")
const redis = new Redis({
    port: 18918,
    host: "redis-18918.c252.ap-southeast-1-1.ec2.redns.redis-cloud.com",
    username: "default",
    password: process.env.REDIS_KEY,
    db: 0
});

module.exports = redis