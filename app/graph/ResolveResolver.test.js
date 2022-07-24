const ResolveResolver = require("./ResolveResolver");


describe('Resolver', function () {

    test("Should load", async () => {
        const inst = new ResolveResolver();
        const resolve = jest.fn(async () => ({10: "VALUE"}));

        const res = inst.load(10, {}, resolve);

        expect(await res).toBe("VALUE");
    });

    test("Should load multi times", async () => {
        const inst = new ResolveResolver();
        const fire = jest.fn();
        const resolve = jest.fn(async () => {
            fire();

            return {
                10: "VALUE_10",
                20: "VALUE_20",
                30: "VALUE_30",
            }
        });

        const res_10 = inst.load(10, {}, resolve);
        const res_20 = inst.load(20, {}, resolve);
        const res_30 = inst.load(30, {}, resolve);

        expect(await res_10).toBe("VALUE_10");
        expect(await res_20).toBe("VALUE_20");
        expect(await res_30).toBe("VALUE_30");
        expect(fire).toBeCalledTimes(1);
    });

    test("Should load with query", async () => {
        const inst = new ResolveResolver();
        const fire = jest.fn();
        const resolve = jest.fn(async (list, query) => {
            fire();

            return {
                10: query.value
            }
        });

        const res_1 = inst.load(10, {value: "VALUE_1"}, resolve);
        const res_2 = inst.load(10, {value: "VALUE_2"}, resolve);

        expect(await res_1).toBe("VALUE_1");
        expect(await res_2).toBe("VALUE_2");
        expect(fire).toBeCalledTimes(2);
    });
});