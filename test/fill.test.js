const {Element} = require("../app/model/Element");
const Property = require("../app/model/Property");
const Group = require("../app/model/Group");
const {execMap} = require("nodemon/lib/config/defaults");

beforeEach(() => require("../app/model").clearDatabase());
beforeAll(() => require("../app/model").connect());

jest.mock("../environment", () => ({
    DB_USER: "postgres",
    DB_PASSWORD: "example",
    DB_HOST: "localhost",
    DB_NAME: "postgres",
}));

function randStr() {
    return Math.random().toString(32).replace(/\d|\./g, "")
}


describe("Fill mock", () => {

    test("Should fill", async () => {
        await Property.create({id: "FIRST_NAME"});
        await Property.create({id: "LAST_NAME"});
        await Property.create({id: "GENDER"});

        const parent = [];

        const rootGroup = await Group.create({slug: "ROOT"});

        for (let i = 0; i < 100; i++) {
            const inst = await Element.create({
                slug: randStr(),
                property: [],
            }, {
                include: Element.Property
            })

            await inst.addGroup(rootGroup);

            parent.push(inst);
        }

        for (let i = 0; i < 1000; i++) {
            await Element.create({
                slug: randStr(),
                parent: parent[(Math.random() * 100) >> 1].id,
                property: [{
                    value: randStr(),
                    PropertyId: "FIRST_NAME"
                }, {
                    value: randStr(),
                    PropertyId: "LAST_NAME"
                }, {
                    value: randStr(),
                    PropertyId: "GENDER"
                }]
            }, {
                include: [
                    Element.Property,
                ]
            })
        }
    });
});