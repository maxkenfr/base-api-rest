const Boom = require("boom");
const {RateLimiterRedis, RateLimiterUnion} = require('rate-limiter-flexible');

const {redisSystemClient} = require('../libs/redisSystemClient');
const LOG_LABEL = require("../config/logLabel");
const NODE = require("../config/node");

const createRateLimiter = ({label = "GLOBAL", points = 100, duration = 60})=>new RateLimiterRedis({
    storeClient: redisSystemClient,
    keyPrefix: `RATE_LIMITER_${label}`,
    points: points,
    duration: duration,
});

const createRateLimiterMiddleware = (config = {
    label : 'GLOBAL',
    points : 100,
    duration : 60
})=>{
    let isConfArray = Array.isArray(config);

    let rateLimiter = isConfArray
        ? new RateLimiterUnion(...config.map(item=>createRateLimiter(item)))
        : createRateLimiter(config);

    return async (req, res, next) => {
        try {
            if (NODE.IS_PRODUCTION) await rateLimiter.consume(req.ip);
            next();
        }
        catch (e) {
            console.log(`Too Many Requests`, {
                label:LOG_LABEL.RATE_LIMITER.TOO_MANY_REQUESTS,
                metadata:{
                    ip:req.ip,
                    body : req.body,
                    params : req.params,
                    headers : req.headers,
                    userId : req?.user?._id,
                    label : isConfArray ? Object.keys(e)[0] : config.label,
                    attempts : isConfArray ? Object.values(e)[0].consumedPoints : e.consumedPoints
                }
            });
            next(Boom.tooManyRequests('Too Many Requests'));
        }
    };
}

module.exports = {createRateLimiterMiddleware, createRateLimiter};