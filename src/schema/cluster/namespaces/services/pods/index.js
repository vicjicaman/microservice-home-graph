import * as Queries from "./queries";
import * as Mutations from "./mutations";

const schema = [
  `
  type Pod {
    id: ID
    name: String!
    status: String!
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
