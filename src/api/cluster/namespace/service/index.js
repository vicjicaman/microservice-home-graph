import axios from "axios";
import * as Serialize from "./serialize";
import * as Cache from "./cache";
import * as GraphCommon from "@nebulario/microservice-graph-common";

const construct = (obj, namespace) => {
  const { name, type } = obj;

  return {
    id: namespace.id + "_" + name,
    name,
    type,
    namespace,
    cluster: namespace.cluster,
    raw: obj
  };
};

export const list = async (namespace, args, cxt) => {
  const { name: namespaceName, cluster } = namespace;

  const res = await GraphCommon.Cache.list(
    Cache.Keys.list(cluster.id, namespaceName),
    {
      getter: async (params, cxt) => {
        const { items } = await cluster.request(
          `/namespaces/${namespaceName}/services`
        );
        return items.map(({ metadata: { name }, spec: { type } }) => ({
          name,
          type
        }));
      },
      serializer: Cache.Serializers.List
    },
    cxt
  );

  return res.map(obj => construct(obj, namespace));
};
