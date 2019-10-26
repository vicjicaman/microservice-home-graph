import * as ClusterApi from "Api/cluster";

export const get = async (viewer, id, cxt) => {
  const cluster = await ClusterApi.get(viewer, id, cxt);
  return cluster;
};
