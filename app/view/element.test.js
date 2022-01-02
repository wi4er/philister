const app = require("..");
const request = require("supertest");

beforeEach(() => require("../model").clearDatabase());

describe("Element endpoint", () => {
    describe("Element fields", () => {
        test("Should get list", async () => {
            await request(app)
                .get("/element/")
                .expect(200)
                .then(res => {
                    expect(res.body).toHaveLength(0);
                });
        });

    });

    describe("Element with properties", () => {
        test("Should post item", async () => {
            await request(app)
                .post("/property/")
                .send({id: "NAME"})
                .expect(200);

            await request(app)
                .post("/element/")
                .send({
                    slug: "TEST",
                    property: [{
                        value: "1",
                        PropertyId: "NAME",
                    }, {
                        value: "2",
                        PropertyId: "NAME",
                    }]
                })
                .expect(200)
                .then(res => {
                    expect(res.body.property).toHaveLength(2);
                })
        });
    });

    describe("Element with groups", () => {

    });
});
