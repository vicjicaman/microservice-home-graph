import * as NamespaceModel from "Model/cluster/namespace";

const schema = [
  `
  type NamespacesQueries {
    get: Namespace
  }

`
];

const resolvers = {
  NamespacesQueries: {
    get: async (cluster, args, cxt) => {
      const name = "blog-microservices-namespace";
      return await NamespaceModel.get(cluster, name, cxt);
    }
  }
};

export { schema, resolvers };
