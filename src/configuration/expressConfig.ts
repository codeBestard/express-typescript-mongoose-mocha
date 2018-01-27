import * as express from "express";
import * as path from "path";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";

import DB from "./db";
import config from "./env";
import registerRoutes from "./registerRoutes";

import * as morgan from "morgan";
import logger, { ILogger } from "../utils/logger";
import { Error } from "mongoose";


const appConfig = config;

const env       = process.env.NODE_ENV;
logger.info ( process.env.NODE_ENV as string);
logger.debug( process.env.NODE_ENV as string);

const app = express();

app.use(morgan("dev", { stream: logger.stream }));

app.use(function(error, req, res, next){
  return res.json( { message: error.message } );
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

DB.connect(appConfig.database.dbConnection);

registerRoutes( app );

export default app;
