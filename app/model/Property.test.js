const Element = require("./Element");
const Property = require("./Property");

beforeEach(() => require(".").clearDatabase());
beforeAll(() => require(".").connect());

describe("Property entity", () => {

    describe("Property fields", () => {
        test("Should create property", async () => {
            await Property.create({
                id: "NAME"
            })

        });
    });
});
