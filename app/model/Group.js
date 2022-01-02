const {DataTypes, Model} = require("sequelize");
const sequelize = require(".");
const {connection} = require(".");

const Group = connection.define(
    "Group",
    {
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        }
    },
);

module.exports = Group;
