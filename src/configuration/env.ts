const config = {
    development: {
        database: {
            dbConnection: "mongodb://test:test@ds157298.mlab.com:57298/addressbook"
        }
    },
    test: {
        database: {
            dbConnection: "mongodb://test:test@ds153392.mlab.com:53392/notekeeper_test"
        }
    },
    production: {
    }
};

export default function getConfig(env: string = "development") {
    return config[env.trim()];
}