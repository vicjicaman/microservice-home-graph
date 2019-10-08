import * as Serialize from "./serialize";
import * as Cache from "./cache";
import * as GraphCommon from "@nebulario/microservice-graph-common";

const construct = (obj, cluster) => {
  const { name } = obj;
  return { id: cluster.id + "_" + name, name, cluster, raw: obj };
};

export const get = async (cluster, name, cxt) => {
  const res = await GraphCommon.Cache.object(
    Cache.Keys.name(cluster.id, name),
    {
      getter: async (params, cxt) => {
        const {
          metadata: { name }
        } = await cluster.request(`/namespaces/${name}`);

        return { name };
      },
      serializer: Cache.Serializers.Complete
    },
    cxt
  );

  return construct(res, cluster);
};
