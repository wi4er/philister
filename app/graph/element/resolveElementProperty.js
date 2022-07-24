const {ElementPropertyValue} = require("../../model/Element");
const {Op} = require("sequelize");
const ResolveResolver = require("../ResolveResolver");

function resolveElementProperty() {
    const loader = new ResolveResolver();

    return (id, filter) => loader.load(id, filter, async (list, query) => {
        const where = {
            ElementId: {[Op.in]: [...list]}
        }

        if (query.filter?.property) {
            where.PropertyId = {[Op.in]: query.filter.property};
        }

        const resp = await Promise.all([
            ElementPropertyValue.findAll({where})
        ]).then(([values]) => {

            return values;
        });

        const byElement = {};

        for (const item of resp) {
            if (!byElement[item.ElementId]) {
                byElement[item.ElementId] = [];
            }

            byElement[item.ElementId].push(require("./ElementPropertyValueResolver")(item));
        }

        return byElement;
    })
}

module.exports = resolveElementProperty()