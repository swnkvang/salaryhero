import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import cors from "cors";
const timeout = require("connect-timeout");
const app = express();
const expressWinston = require("express-winston");
const winston = require("winston");
const { debug } = require("./utils/log-utils");
import config from "./config/database-config";


function setupRoutes(app) {
    const APP_DIR = `${__dirname}/app`;
    const features = fs
        .readdirSync(APP_DIR)
        .filter((file) => fs.statSync(`${APP_DIR}/${file}`).isDirectory());

    console.log("\n" + "### Config route path");
    features.forEach((feature) => {
        const router = express.Router();
        const routes = require(`${APP_DIR}/${feature}/routes.js`);
        routes.setup(router);
        console.log("- " + feature);
        app.use(`/${feature}`, router);
    });
}


export function setup() {
    return new Promise(async (resolve, reject) => {
        try {
            const PORT = config.port;
            console.log('PORT', PORT);
            expressWinston.requestWhitelist.push("body");
            expressWinston.requestWhitelist.push("params");
            expressWinston.requestWhitelist.push("json_data");

            app.use(timeout(120000)); // Timeout in milliseconds. 120000 = 2min
            app.use(bodyParser.json({ limit: '50mb' }));
            app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
            app.use(cors());
            app.use(
                expressWinston.logger({
                    transports: [new winston.transports.Console()],
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.printf((info) => {
                            var body = info.meta.res.body;
                            var request_data = info.meta.req;
                            var duration = info.meta.responseTime;
                            if (!(request_data.method == "OPTIONS")) {
                                var id_log = ''
                                if (request_data) {
                                    if (request_data.hasOwnProperty('body')) {
                                        if (request_data.body.hasOwnProperty('headerData')) {
                                            id_log = request_data.body.headerData.messageId;
                                        }
                                    }
                                }
                                let json_data = {
                                    id: id_log,
                                    url: request_data.originalUrl,
                                    token: request_data.headers.authorization,
                                    body: request_data.body,
                                    response: body,
                                    time_duration: duration + " ms",
                                    statusCode: info.meta.res.statusCode,
                                };
                                debug(JSON.stringify(json_data));
                            }

                            return `${info.meta.res.body}`;
                        })
                    ),
                    responseWhitelist: [...expressWinston.responseWhitelist, "body"],
                })
            );
            setupRoutes(app);
            const server = app.listen(PORT, () => {
                console.log("\n" + "App listening on http://localhost:" + PORT);
                resolve(server);
            })

        } catch (error) {
            reject(error);
        }
    })

}
export default app;