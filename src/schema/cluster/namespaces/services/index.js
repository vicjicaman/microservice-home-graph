import * as Queries from "./queries";
import * as Mutations from "./mutations";
import * as Pods from "Schema/cluster/namespaces/services/pods";

const schema = [
  `
  type Service {
    id: ID
    name: String!
    type: String!
    pods: PodsQueries
  }
  `,
  ...Queries.schema,
  ...Mutations.schema,
  ...Pods.schema
];

const resolvers = {
  ...{
    Service: {
      pods: service => service
    }
  },
  ...Queries.resolvers,
  ...Mutations.resolvers,
  ...Pods.resolvers
};

export { schema, resolvers };
