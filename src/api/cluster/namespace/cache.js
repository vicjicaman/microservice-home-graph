import * as Serialize from "./serialize";

const Keys = {
  name: (cluster, name) => `Cluster/${cluster}/Namespace/${name}`
};

const Serializers = Serialize;

export { Keys, Serializers };
