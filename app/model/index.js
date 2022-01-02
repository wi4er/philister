const {Sequelize, DataTypes} = require('sequelize');
const env = require("../../environment");

class Model {
    constructor() {
        const res = this.createConnection.bind(this);
        res.connection = this.connection;
        res.clearDatabase = this.clearDatabase.bind(this);
        res.connect = this.connect.bind(this);

        return res;
    }

    connection = new Sequelize({
        dialect: 'postgres',
        host: env.DB_HOST,
        username: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_NAME,
        logging: false,
    });

    connected = false;

    clearDatabase() {
        return this.connection.sync({force: true});
    }

    async connect() {
        return this.connection.sync()
            .then(() => this.connected = true);
    }

    createConnection(req, res, next) {
        require("./Element");
        require("./Group");
        require("./Property");

        if (this.connected) {
            next();
        } else {
            this.connect()
                .then(
                    () => next(),
                    err => next(err)
                );
        }
    }
}

module.exports = new Model();
