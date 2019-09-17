import * as Protected from './protected';
import * as Public from './public';
const {
  GraphQLDate,
  GraphQLDateTime
} = require('graphql-iso-date');

const schema = [...Protected.schema,
  ...Public.schema,
  `
  scalar DateTime
  scalar Date

  type Viewer {
    id: ID
    username: String
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

const getViewer = (cxt) => {
  const username = cxt.request.user ? cxt.request.user.username : null;
  return {
    id: username,
    username
  };
}

const resolvers = {
  Date: GraphQLDate,
  DateTime: GraphQLDateTime,
  ...Public.resolvers,
  ...Protected.resolvers,
  Query: {
    viewer: (parent, args, cxt) => getViewer(cxt)
  },
  Mutation: {
    viewer: (parent, args, cxt) => getViewer(cxt),
  }
};


export {
  schema,
  resolvers
}
