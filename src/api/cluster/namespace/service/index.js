import axios from "axios";
import * as Serialize from "./serialize";
import * as Cache from "./cache";
import * as GraphCommon from "@nebulario/microservice-graph-common";

const construct = (obj, namespace) => {
  const { name, type, selector } = obj;

  return {
    id: namespace.id + "_" + name,
    name,
    type,
    selector,
    namespace,
    cluster: namespace.cluster,
    raw: obj
  };
};

export const list = async (namespace, args, cxt) => {
  const { name: namespaceName, cluster } = namespace;

  const { items } = await cluster.request(
    `/namespaces/${namespaceName}/services`
  );
  const res = items.map(({ metadata: { name }, spec: { type, selector } }) => ({
    name,
    type,
    selector
  }));

  return res.map(obj => construct(obj, namespace));
};

/*

const res = await GraphCommon.Cache.object(
  Cache.Keys.name(cluster.id, namespaceName),
  {
    getter: async (params, cxt) => {
      const {
        metadata: { name }
      } = await cluster.request(`/namespaces/${namespaceName}`);

      return { name };
    },
    serializer: Cache.Serializers.Complete,
    expire: 60
  },
  cxt
);

const res = await GraphCommon.Cache.list(
  Cache.Keys.list(cluster.id, namespaceName),
  {
    getter: async (params, cxt) => {
      const { items } = await cluster.request(
        `/namespaces/${namespaceName}/services`
      );
      return items.map(({ metadata: { name }, spec: { type, selector } }) => ({
        name,
        type,
        selector
      }));
    },
    serializer: Cache.Serializers.List,
    expire: 60
  },
  cxt
);
*/
