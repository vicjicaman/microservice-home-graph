import * as NamespaceApi from "Api/cluster/namespace";
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
      const current = await NamespaceApi.current(cxt);
      return await NamespaceModel.get(cluster, current, cxt);
    }
  }
};

export { schema, resolvers };
