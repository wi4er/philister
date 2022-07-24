const {Element} = require("../../model/Element");
const {Op} = require("sequelize");
const ResolveResolver = require("../ResolveResolver");

function resolveElement() {
    const loader = new ResolveResolver();

    return id => loader.load(id, {}, async list => {
        const resp = await Element.findAll({
            where: {parent: {[Op.in]: [...list]}}
        });

        const byElement = {};

        for (const item of resp) {
            if (!byElement[item.parent]) {
                byElement[item.parent] = [];
            }

            byElement[item.parent].push(require("./ElementResolver")(item));
        }

        return byElement;
    })
}

module.exports = resolveElement();