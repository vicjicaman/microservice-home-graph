import * as Content from "Schema/content";
import * as Cluster from "Schema/cluster";
import * as ClusterModel from "Model/cluster";
const { GraphQLDate, GraphQLDateTime } = require("graphql-iso-date");

const schema = [
  ...Cluster.schema,
  ...Content.schema,
  `
  scalar DateTime
  scalar Date

  type Viewer {
    id: ID
    username: String
    content: ContentQueries
    cluster: Cluster
  }

  type ViewerMutations {
    id: ID
    username: String
  }

  type Query {
    viewer: Viewer
  }

  type Mutation {
    viewer: ViewerMutations
  }
`
];

const getViewer = cxt => {
  const username = cxt.request.user ? cxt.request.user.username : null;
  return {
    id: username,
    username
  };
};

const resolvers = {
  Date: GraphQLDate,
  DateTime: GraphQLDateTime,
  ...Content.resolvers,
  ...Cluster.resolvers,
  Viewer: {
    content: viewer => viewer,
    cluster: async (viewer, args, cxt) =>
      await ClusterModel.get(viewer, "default", cxt)
  },
  Query: {
    viewer: (parent, args, cxt) => getViewer(cxt)
  },
  Mutation: {
    viewer: (parent, args, cxt) => getViewer(cxt)
  }
};

export { schema, resolvers };
