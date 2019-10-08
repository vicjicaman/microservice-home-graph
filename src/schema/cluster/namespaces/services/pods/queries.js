import * as PodModel from "Model/cluster/namespace/service/pod";

const schema = [
  `
  type PodsQueries {
    list: [Pod]
  }

`
];

const resolvers = {
  PodsQueries: {
    list: async (service, args, cxt) => await PodModel.list(service, args, cxt)
  }
};

export { schema, resolvers };
