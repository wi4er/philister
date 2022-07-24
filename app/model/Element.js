const {DataTypes} = require("sequelize");
const {connection} = require(".");
const ElementPropertyElement = require("./ElementPropertyElement");

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
);

// const Element2Group = connection.define(
//     "Element2Group",
//     {}
// )
//
// Element.Group = Element.belongsToMany(
//     Group,
//     {
//         through: Element2Group,
//         as: "group"
//     }
// );

Element.PropertyValue = Element.hasMany(require("./ElementPropertyValue"), {as: "property"});

Element.PropertyElement = Element.hasMany(ElementPropertyElement, {as: "element"});
ElementPropertyElement.Element = ElementPropertyElement.belongsTo(
    Element,
    {
        foreignKey: {
            allowNull: false,
            name: "element"
        },
        onDelete: 'CASCADE',
    },
);
ElementPropertyElement.Property = ElementPropertyElement.belongsTo(
    require("./Property"),
    {
        foreignKey: {
            allowNull: false,
            name: "property"
        },
        onDelete: 'CASCADE',
    }
);

module.exports = Element;


