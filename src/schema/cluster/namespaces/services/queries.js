import * as ServiceModel from "Model/cluster/namespace/service";

const schema = [
  `
  type ServicesQueries {
    list: [Service]
  }

`
];

const resolvers = {
  ServicesQueries: {
    list: async (namespace, args, cxt) => await ServiceModel.list(namespace, args, cxt)
  }
};

export { schema, resolvers };
