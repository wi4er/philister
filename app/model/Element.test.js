const Element = require("./Element");
const Property = require("./Property");
const Group = require("./Group");

beforeEach(() => require(".").clearDatabase());
beforeAll(() => require(".").connect());

jest.mock("../../environment", () => ({
    DB_USER: "postgres",
    DB_PASSWORD: "example",
    DB_HOST: "localhost",
    DB_NAME: "postgres",
}));

describe("Element entity", () => {
    describe("Element fields", () => {
        test("Should create element with slug", async () => {
            const inst = await Element.create({slug: "123"});

            expect(inst.slug).toBe("123");
        });

        test("Should create with parent", async () => {
            const mother = await Element.create({slug: "MOTHER"});
            const inst = await Element.create({slug: "CHILD", parent: mother.id});

            expect(inst.parent).toBe(mother.id);
        });

        test("Should fetch with children", async () => {
            const mother = await Element.create({slug: "MOTHER"});
            const inst = await Element.create({slug: "CHILD", parent: mother.id});

            const item = await Element.findOne({
                where: {id: mother.id},
                include: Element.children,
            });

            expect(item.children).toHaveLength(1);
            expect(item.children[0].id).toBe(inst.id);
        });
    });

    describe("Element property with value", () => {
        test("Should create with property", async () => {
            await Property.create({id: "NAME"});

            const inst = await Element.create({
                slug: "123",
                property: [{
                    value: "Value",
                    property: "NAME",
                }]
            }, {
                include: [
                    Element.PropertyValue,
                ]
            });

            expect(inst.property).toHaveLength(1);
            expect(inst.property[0].value).toBe("Value");
            expect(inst.property[0].property).toBe("NAME");
        });

        test("Should create with multy property", async () => {
            await Property.create({id: "NAME"});

            const inst = await Element.create({
                slug: "123",
                property: [{
                    value: "VALUE_1",
                    property: "NAME",
                }, {
                    value: "VALUE_2",
                    property: "NAME",
                }, {
                    value: "VALUE_3",
                    property: "NAME",
                }]
            }, {
                include: [
                    Element.PropertyValue,
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
                    property: "FIRST",
                }, {
                    value: "Value",
                    property: "SECOND",
                }, {
                    value: "Value",
                    property: "THIRD",
                }]
            }, {
                include: [Element.PropertyValue]
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
                    property: "FIRST",
                }, {
                    value: "SECOND",
                    property: "SECOND",
                }]
            }, {
                include: [Element.PropertyValue]
            });

            const list = await Element.findAll({
                include: [Element.PropertyValue]
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
                        property: "Wrong",
                    }]
                }, {
                    include: [
                        Element.PropertyValue,
                    ]
                })
            ).rejects.toThrow();
        });
    });

    describe("Element property with element", () => {
        test("Should create with element", async () => {
            await Property.create({id: "NAME"});

            const slave = await Element.create({slug: "SLAVE"});

            const inst = await Element.create({
                slug: "MASTER",
                element: [{
                    property: "NAME",
                    element: slave.id
                }],
            }, {
                include: [
                    Element.PropertyElement,
                ]
            });

            console.log(inst.element[0])

            // expect(inst.property).toHaveLength(1);
            // expect(inst.property[0].value).toBe("Value");
            // expect(inst.property[0].property).toBe("NAME");
        });
    });

    // describe("Element with group", () => {
    //     test("Should create with group", async () => {
    //         const group = await Group.create({slug: "GROUP"});
    //
    //         const inst = await Element.create({
    //             slug: "ELEMENT",
    //         });
    //
    //         await inst.addGroup(group);
    //
    //         const item = await Element.findOne({
    //             where: {id: inst.id},
    //             include: Element.Group
    //         });
    //
    //         expect(item.group).toHaveLength(1);
    //         expect(item.group[0].id).toBe(group.id);
    //     });
    //
    //     test("Should create with couple of groups", async () => {
    //         const group1 = await Group.create({slug: "GROUP_1"});
    //         const group2 = await Group.create({slug: "GROUP_2"});
    //
    //         const inst = await Element.create({
    //             slug: "ELEMENT",
    //         });
    //
    //         await inst.addGroup(group1);
    //         await inst.addGroup(group2);
    //
    //         const item = await Element.findOne({
    //             where: {id: inst.id},
    //             include: Element.Group
    //         });
    //
    //         expect(item.group).toHaveLength(2);
    //         expect(item.group[0].id).toBe(group1.id);
    //         expect(item.group[1].id).toBe(group2.id);
    //     });
    //
    //     test("Should get by join", async () => {
    //         const group = await Group.create({slug: "GROUP"});
    //         const inst = await Element.create({
    //             slug: "ELEMENT",
    //         });
    //         await inst.addGroup(group);
    //
    //         const list = await Element2Group.findAll({
    //             // include: Group
    //         })
    //
    //         console.log(list)
    //     });
    // });
});
