const {DataTypes} = require("sequelize");
const {connection} = require(".");
const Property = require("./Property");
const Group = require("./Group");

const Element = connection.define(
    "Element",
    {
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
);

const ElementProperty = connection.define(
    "ElementProperty",
    {
        value: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
);

Element.Group = Element.belongsToMany(
    Group,
    {
        through: "Element2Group",
        as: "group"
    }
);


ElementProperty.Property = ElementProperty.belongsTo(
    Property,
    {
        foreignKey: {
            allowNull: false,
        },
        onDelete: 'CASCADE',
    }
);

Element.Property = Element.hasMany(ElementProperty, {as: "property"});

module.exports = Element;


