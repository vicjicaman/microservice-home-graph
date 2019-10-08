import * as Queries from "./queries";
import * as Mutations from "./mutations";
import * as Namespaces from "Schema/cluster/namespaces";

const schema = [
  `

  type Cluster {
    id: ID
    namespaces: NamespacesQueries!
  }

  `,
  ...Queries.schema,
  ...Mutations.schema,
  ...Namespaces.schema
];

const resolvers = {
  ...{
    Cluster: {
      namespaces: cluster => cluster
    }
  },
  ...Queries.resolvers,
  ...Mutations.resolvers,
  ...Namespaces.resolvers
};

export { schema, resolvers };
