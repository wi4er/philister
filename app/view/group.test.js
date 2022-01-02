const app = require("..");
const request = require("supertest");

beforeEach(() => require("../model").clearDatabase());

describe("Group endpoint", () => {
    describe("Group fields", () => {
        test("Should get list", async () => {
            await request(app)
                .get("/group/")
                .expect(200)
                .then(res => {
                    expect(res.body).toHaveLength(0);
                });
        });
    });
});
