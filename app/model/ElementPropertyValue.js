const {DataTypes} = require("sequelize");
const {connection} = require(".");
const Property = require("./Property");

const ElementPropertyValue = connection.define(
    "ElementPropertyValue",
    {
        value: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
);

ElementPropertyValue.Property = ElementPropertyValue.belongsTo(
    Property,
    {
        foreignKey: {
            allowNull: false,
            name: "property"
        },
        onDelete: 'CASCADE',
    }
);

module.exports = ElementPropertyValue