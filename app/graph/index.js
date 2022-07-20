const {graphqlHTTP} = require('express-graphql');
const {graphql, buildSchema} = require('graphql');
const {Element} = require("../model/Element");

const MyGraphQLSchema = buildSchema(`
  type Query {
    element: ElementRoot
  }
  
  type ElementRoot {
    item: Element
    list: [Element]
    count: Int
  }
  
  type Element {
    id: Int
    slug: String!
    createdAt: String!
    updatedAt: String!
    property: [ElementProperty]
    parent: Element
    children: [Element]
    group: [Int]
  }
  
  type Group {
    id: Int
    slug: String!
    createdAt: String!
    updatedAt: String!
  }
  
  type ElementProperty {
    value: String
    PropertyId: String
  }
`);


const rootValue = {
    element: {
        list: async () => {
            const list = (await Element.findAll())
                .map(item => require("./element/ElementResolver")(item));

            return list;
        },
    }
};


module.exports = graphqlHTTP({
    schema: MyGraphQLSchema,
    rootValue,
    graphiql: true,
});
