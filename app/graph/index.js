const {graphqlHTTP} = require('express-graphql');
const {graphql, buildSchema} = require('graphql');
const {Element} = require("../model/Element");
const fs = require("fs");
const path = require("path")

const MyGraphQLSchema = buildSchema(
    fs.readFileSync(path.resolve(__dirname, "./query.graphql")).toString()
);

const rootValue = {
    element: {
        list: async (params, context) => {
            const list = (await Element.findAll())
                .map(item => require("./element/ElementResolver")(item));

            return list;
        },
    },
};

module.exports = graphqlHTTP({
    schema: MyGraphQLSchema,
    rootValue,
    graphiql: true,
});
