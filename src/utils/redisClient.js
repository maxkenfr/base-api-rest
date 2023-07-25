const redis = require('redis');


const redisConfig = {
  url : process.env.REDIS_URI
};

const redisClient = redis.createClient(redisConfig);


module.exports = redisClient;
