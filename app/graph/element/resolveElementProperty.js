const {ElementProperty} = require("../../model/Element");
const {Op} = require("sequelize");
const ResolveResolver = require("../ResolveResolver");

function resolveElementProperty() {
    const loader = new ResolveResolver();

    return id => loader.load(id, async list => {
        const resp = await ElementProperty.findAll({
            where: {ElementId: {[Op.in]: [...list]}}
        })

        const byElement = {};

        for (const item of resp) {
            if (!byElement[item.ElementId]) {
                byElement[item.ElementId] = [];
            }

            byElement[item.ElementId].push(item);
        }

        return byElement;
    })
}

module.exports = resolveElementProperty()