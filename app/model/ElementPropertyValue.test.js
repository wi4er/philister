const ElementPropertyValue = require("./ElementPropertyValue");

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

    })
});