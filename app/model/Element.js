const {DataTypes} = require("sequelize");
const {connection} = require(".");
const Property = require("./Property");
const Group = require("./Group");

const Element = connection.define(
    "Element",
    {
        slug: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: 'slugIndex'
        },
    }
);

Element.belongsTo(
    Element,
    {
        onDelete: 'CASCADE',
        foreignKey: "parent",
    }
);

Element.children = Element.hasMany(
    Element,
    {
        as: "children",
        foreignKey: "parent",
    }
)

const ElementProperty = connection.define(
    "ElementProperty",
    {
        value: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
);

const Element2Group = connection.define(
    "Element2Group",
    {}
)

Element.Group = Element.belongsToMany(
    Group,
    {
        through: Element2Group,
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

module.exports = {
    Element,
    ElementProperty,
    Element2Group,
};


