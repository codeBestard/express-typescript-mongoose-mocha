import * as express from "express";
import * as path from "path";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";

import DB from "./db";
import getConfig from "./env";
import registerRoutes from "./regiterRoutes";

const env = process.env.NODE_ENV;
console.log(process.env.NODE_ENV);
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


const appConfig = getConfig(env);
DB.connect(appConfig.database.dbConnection);

registerRoutes( app );

export default app;
