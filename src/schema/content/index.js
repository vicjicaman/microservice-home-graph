import * as Queries from "./queries";
import * as Mutations from "./mutations";

const schema = [
  `
  type Content {
    id: ID
    content: String!
  }
  `,
  ...Queries.schema,
  ...Mutations.schema
];

const resolvers = {
  ...{},
  ...Queries.resolvers,
  ...Mutations.resolvers
};

export { schema, resolvers };
