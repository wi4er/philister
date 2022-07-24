const Group = require("../../model/Group");
const {Op} = require("sequelize");
const ResolveResolver = require("../ResolveResolver");

function resolveGroup() {
    const loader = new ResolveResolver();

    return id => loader.load(id, {},  async list => {
        const resp = await Group.findAll({
            where: {id: {[Op.in]: [...list]}}
        });

        const byElement = {};

        for (const item of resp) {
            byElement[item.id] = require("./ElementResolver")(item);
        }

        return byElement;
    })
}


module.exports = resolveGroup();