import * as Serialize from "./serialize";

const Keys = {
  list: (cluster, namespace) =>
    `Cluster/${cluster}/Namespace/${namespace}/Services`
};

const Serializers = Serialize;

export { Keys, Serializers };
