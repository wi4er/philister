const {DataTypes} = require("sequelize");
const {connection} = require(".");

const ElementPropertyElement = connection.define(
    "ElementPropertyElement",
    {},
    {}
);

module.exports = ElementPropertyElement