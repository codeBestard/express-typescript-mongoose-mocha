
import config from "../configuration/env";
import * as winston from "winston";

const appConfig = config;
const level     = appConfig.logging.logLevel || "debug";

interface ILogger {
    debug(message: string, error?: Error): void,
    error(message: string, error?: Error): void,
    info(message: string, error?: Error): void,
    warn(message: string, error?: Error): void,
    log( level: string, message: string, error?: Error ): void,
    [ x: string ]: any
}

const logger: ILogger  = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: level,
            timestamp: function () {
                return (new Date()).toISOString();
            },
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ]
});

logger.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};

export { logger as default, ILogger } ;