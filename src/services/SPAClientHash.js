const axios = require("axios");
const {redisSystemClientAsync} = require("../utils/redisSystemClient");
const REDIS_KEY_VERSIONS = "SPA_VERSIONS";
const REDIS_KEY_LAST_VERSION = "SPA_LAST_VERSION";

async function update(){
    if (process.env.FRONT_MANIFEST_URI){
        let res = await axios.get(process.env.FRONT_MANIFEST_URI);
        let mainScriptPath = res?.data?.files?.['main.js'];
        const match = /main\.([a-z0-9]{8})\./.exec(mainScriptPath);
        let lastSavedVersion = await redisSystemClientAsync.get(REDIS_KEY_LAST_VERSION);
        if (match && (match[1] !== lastSavedVersion)){
            let version = match[1];
            await redisSystemClientAsync.sadd(REDIS_KEY_VERSIONS, version);
            await redisSystemClientAsync.set(REDIS_KEY_LAST_VERSION, version);
            return version;
        }
    }
    else return false;
}

async function spaVersionIsOutdated(clientVersion){
    if(clientVersion && typeof clientVersion === "string"){
        let clientVersionExists = await redisSystemClientAsync.sismember(REDIS_KEY_VERSIONS, clientVersion);
        let lastVersion = await redisSystemClientAsync.get(REDIS_KEY_LAST_VERSION);
        return clientVersionExists && (clientVersion !== lastVersion);
    } else return false;
}

async function middleware(req, res, next){
    if(['POST','PATCH', 'DELETE'].includes(req.method)){
        let isOutdated = await spaVersionIsOutdated(req.headers["spa-version"]);
        if(isOutdated){
            res.set("Surrogate-Control", "no-store");
            res.set(
                "Cache-Control",
                "no-store, no-cache, must-revalidate, proxy-revalidate"
            );
            res.set("Pragma", "no-cache");
            res.set("Expires", "0");
            res.set('spa-version-outdated', "outdated");
            res.status(200).end();
        }
        else next();
    }
    else next();
}

async function controller(req, res){
    let isOutdated = await spaVersionIsOutdated(req?.query?.v);
    if (isOutdated) {
        res.set("Surrogate-Control", "no-store");
        res.set(
            "Cache-Control",
            "no-store, no-cache, must-revalidate, proxy-revalidate"
        );
        res.set("Pragma", "no-cache");
        res.set("Expires", "0");
        res.set('spa-version-outdated', "outdated"); 
        res.json({status: "outdated"});
    }
    else res.json({status: "uptodate"});
}

module.exports = {
    update,
    controller,
    middleware,
    spaVersionIsOutdated
};