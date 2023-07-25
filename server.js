require('dotenv').config({ path: '.env.local', override:true });
require('dotenv').config();
const express = require('express');
const { createTerminus } = require('@godaddy/terminus')
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const cors = require("cors");
const mongoose = require('mongoose');
const _ = require("lodash");

const MONGO_DB = require("./src/config/mongoDb");
const LOG_LABEL = require("./src/config/logLabel");

const redisClient = require("./src/utils/redisClient");

const errorHandler = require("./src/middlewares/errorHandler");


const app = express();
const server = require('http').createServer(app);

const corsOptions = {
    credentials: true,
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*'
}

app.enable('trust proxy');
app.use(compression());
app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get("/", (req, res) => {
    res.json({status : true});
});

app.use(errorHandler((err, boomErr) => {
    console.log(err);
}));


async function onSignal () {
    await mongoose.connection.close();
    await redisClient.disconnect();
}

function onShutdown () {
    console.log(`Stopping process`, {label:LOG_LABEL.SYSTEM.PROCESS_GRACEFUL,metadata:{state:'stopping'}});
}

async function onHealthCheck () {
    return true;
}

createTerminus(server, {
    signals : ['SIGTERM', 'SIGINT', 'uncaughtException'],
    healthChecks: { '/healthcheck': onHealthCheck },
    onSignal,
    onShutdown
});

(async function run() {
    try {
        await mongoose.connect(MONGO_DB.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        await redisClient.connect();
        server.listen(process.env.PORT, () => console.log(`Http server is now running on http://localhost:${process.env.PORT}`));
    } catch (error) {
        console.error(error);
    }
})();