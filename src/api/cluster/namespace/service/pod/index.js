import axios from "axios";
import * as Serialize from "./serialize";
import * as Cache from "./cache";
import * as GraphCommon from "@nebulario/microservice-graph-common";

const construct = (obj, service) => {
  const { name, labels, status } = obj;

  return {
    id: service.id + "_" + name,
    name,
    labels,
    status,
    service,
    cluster: service.cluster,
    raw: obj
  };
};

export const list = async (service, args, cxt) => {
  const { namespace, cluster } = service;

  const { items } = await cluster.request(
    `/namespaces/${namespace.name}/pods`
  );

  const res = items.map(
    ({ metadata: { name, labels }, status: { phase } }) => ({
      name,
      labels,
      status: phase
    })
  );

  const filtered = res.filter(({ labels }) => {
    for (const k in service.selector) {
      if (service.selector[k] !== labels[k]) {
        return false;
      }
    }

    return true;
  });

  return filtered.map(obj => construct(obj, service));
};
