import * as Queries from "./queries";
import * as Mutations from "./mutations";
import * as Services from "Schema/cluster/namespaces/services";

const schema = [
  `

  type Namespace {
    id: ID
    name: String!
    services: ServicesQueries!
  }

  `,
  ...Queries.schema,
  ...Mutations.schema,
  ...Services.schema
];

const resolvers = {
  ...{
    Namespace: { services: namespace => namespace }
  },
  ...Queries.resolvers,
  ...Mutations.resolvers,
  ...Services.resolvers
};

export { schema, resolvers };
