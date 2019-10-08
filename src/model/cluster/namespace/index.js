import * as NamespaceApi from "Api/cluster/namespace";

export const get = async (cluster, id, cxt) => {
  const namespace = await NamespaceApi.get(cluster, id, cxt);
  return namespace;
};
