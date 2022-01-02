const {DataTypes} = require("sequelize");
const {connection} = require(".");

const Property = connection.define(
    "Property",
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
    },
);

module.exports = Property;

