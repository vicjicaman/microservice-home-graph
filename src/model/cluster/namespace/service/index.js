import * as ServiceApi from "Api/cluster/namespace/service";

export const list = async (namespace, args, cxt) => {
  const services = await ServiceApi.list(namespace, args, cxt);
  return services;
};
