const Element = require("./Element");
const Property = require("./Property");
const Group = require("./Group");

beforeEach(() => require(".").clearDatabase());
beforeAll(() => require(".").connect());

describe("Element entity", () => {
    describe("Element fields", () => {
        test("Should create element", async () => {
            await Property.create({id: "NAME"});

            const inst = await Element.create({slug: "123"});

            expect(inst.slug).toBe("123");
        });
    });

    describe("Element with property", () => {
        test("Should create with property", async () => {
            await Property.create({id: "NAME"});

            const inst = await Element.create({
                slug: "123",
                property: [{
                    value: "Value",
                    PropertyId: "NAME",
                }]
            }, {
                include: [
                    Element.Property,
                ]
            });
            
            expect(inst.property).toHaveLength(1);
            expect(inst.property[0].value).toBe("Value");
            expect(inst.property[0].PropertyId).toBe("NAME");
        });

        test("Should create with multy property", async () => {
            await Property.create({id: "NAME"});

            const inst = await Element.create({
                slug: "123",
                property: [{
                    value: "VALUE_1",
                    PropertyId: "NAME",
                }, {
                    value: "VALUE_2",
                    PropertyId: "NAME",
                }, {
                    value: "VALUE_3",
                    PropertyId: "NAME",
                }]
            }, {
                include: [
                    Element.Property,
                ]
            });

            expect(inst.property).toHaveLength(3);
            expect(inst.property[0].value).toBe("VALUE_1");
            expect(inst.property[1].value).toBe("VALUE_2");
            expect(inst.property[2].value).toBe("VALUE_3");
        });

        test("Should create with many properties", async () => {
            await Property.create({id: "FIRST"});
            await Property.create({id: "SECOND"});
            await Property.create({id: "THIRD"});

            const inst = await Element.create({
                slug: "123",
                property: [{
                    value: "Value",
                    PropertyId: "FIRST",
                }, {
                    value: "Value",
                    PropertyId: "SECOND",
                }, {
                    value: "Value",
                    PropertyId: "THIRD",
                }]
            }, {
                include: [Element.Property]
            });

            expect(inst.property).toHaveLength(3);
            expect(inst.property[0].value).toBe("Value");
            expect(inst.property[1].value).toBe("Value");
            expect(inst.property[2].value).toBe("Value");
        });

        test("Should query with props", async () => {
            await Property.create({id: "FIRST"});
            await Property.create({id: "SECOND"});

            await Element.create({
                slug: "WITH_PROPS",
                property: [{
                    value: "FIRST",
                    PropertyId: "FIRST",
                }, {
                    value: "SECOND",
                    PropertyId: "SECOND",
                }]
            }, {
                include: [Element.Property]
            });

            const list = await Element.findAll({
                include: [Element.Property]
            });

            expect(list).toHaveLength(1);
            expect(list[0].slug).toBe("WITH_PROPS");
            expect(list[0].property).toHaveLength(2);
        });

        test("Shouldn't create with wrong property", async () => {
            await Property.create({id: "NAME"});

            await expect(
                Element.create({
                    slug: "123",
                    property: [{
                        value: "Value",
                        PropertyId: "Wrong",
                    }]
                }, {
                    include: [
                        Element.Property,
                    ]
                })
            ).rejects.toThrow();
        });
    });

    describe("Element with group", () => {
        test("Should create with group", async () => {
            const group = await Group.create({slug: "GROUP"});
            const inst = await Element.create({
                slug: "ELEMENT",
            });

            inst.addGroup(group);
            console.log(inst);


        });
    });
});
