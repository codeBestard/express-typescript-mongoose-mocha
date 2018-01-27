const configuration = {
    development: {
        database: {
            dbConnection: "mongodb://test:test@ds157298.mlab.com:57298/addressbook"
        },
        logging: {
            logLevel: "debug"
        }
    },
    test: {
        database: {
            dbConnection: "mongodb://test:test@ds153392.mlab.com:53392/notekeeper_test"
        },
        logging: {
            logLevel: "debug"
        }
    },
    production: {
    }
};


function getCurrentEnvString(){
    let env = process.env.NODE_ENV || "development";
    return env.trim();
}

function getConfig() {
    return configuration[ getCurrentEnvString() ];
}

function getHostEnv() {
    let env = getCurrentEnvString();
    return {
        isDevelopment: env === "development",
        isProduction: env === "production",
        isStaging: env === "staging",
        isTest: env === "test"
    };
}

const config  = getConfig();
const hostEnv = getHostEnv();

export { config as default, hostEnv };