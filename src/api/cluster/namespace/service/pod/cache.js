import * as Serialize from "./serialize";

const Keys = {
  list: (cluster, namespace) =>
    `Cluster/${cluster}/Namespace/${namespace}/Pods`
};

const Serializers = Serialize;

export { Keys, Serializers };
