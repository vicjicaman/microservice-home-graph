import * as PodApi from "Api/cluster/namespace/service/pod";

export const list = async (service, args, cxt) => {
  return await PodApi.list(service, args, cxt);
};
