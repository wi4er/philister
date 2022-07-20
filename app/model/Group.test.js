const Group = require("./Group");

beforeEach(() => require(".").clearDatabase());
beforeAll(() => require(".").connect());

describe("Group entity", () => {
    describe("Group fields", () => {
        test("Should create group", async () => {
            const inst = await Group.create({
                slug: "NAME"
            });

            expect(inst.slug).toBe("NAME");
        });

        test("Shouldn't create with uniq slug", async () => {
            await Group.create({
                slug: "NAME"
            });

            await expect(Group.create({
                slug: "NAME"
            })).rejects.toThrow();
        });
    });
});
