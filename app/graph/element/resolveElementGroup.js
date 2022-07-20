const {Element2Group, Element} = require("../../model/Element");
const {Op} = require("sequelize");
const ResolveResolver = require("../ResolveResolver");

function resolveElementGroup() {
    const loader = new ResolveResolver();

    return id => loader.load(id, async list => {
        const resp = await Element2Group.findAll({
            where: {ElementId: {[Op.in]: [...list]}},
            // include: Element.Group
        });

        const byExlement = {};

        for (const item of resp) {
            if (!byElement[item.ElementId]) {
                byElement[item.ElementId] = [];
            }

            byElement[item.ElementId].push(item.GroupId);
        }

        return byElement;
    })
}

module.exports = resolveElementGroup();