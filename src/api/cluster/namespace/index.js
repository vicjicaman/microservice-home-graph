import * as Serialize from "./serialize";
import * as Cache from "./cache";
import * as GraphCommon from "@nebulario/microservice-graph-common";

const construct = (obj, cluster) => {
  const { name } = obj;
  return { id: cluster.id + "_" + name, name, cluster, raw: obj };
};

export const get = async (cluster, namespaceName, cxt) => {
  const {
    metadata: { name }
  } = await cluster.request(`/namespaces/${namespaceName}`);

  const res = { name };

  return construct(res, cluster);
};
