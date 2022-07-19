const process = require("process");

class Environment {
    get APP_PORT() {
        return process.env.PORT || 8080;
    }

    get DB_USER() {
        return process.env.DB_USER;
    }

    get DB_PASSWORD() {
        return process.env.DB_PASSWORD;
    }

    /**
     * Хост для базы данных
     */
    get DB_HOST() {
        return process.env.DB_HOST;
    }

    get DB_NAME() {
        return process.env.DB_NAME;
    }

    get SECRET() {
        return process.env.SECRET || "hello world !";
    }

    get CACHE_PATH() {
        return process.env.CACHE_PATH;
    }
}

module.exports = new Environment();
