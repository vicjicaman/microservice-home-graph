import axios from "axios";
const https = require("https");
const fs = require("fs");

import * as GraphCommon from "@nebulario/microservice-graph-common";

export const get = async (viewer, id, cxt) => {
  const token = fs.readFileSync(
    "/var/run/secrets/kubernetes.io/serviceaccount/token"
  );
  const ca = fs.readFileSync(
    "/var/run/secrets/kubernetes.io/serviceaccount/ca.crt"
  );

  const httpsAgent = new https.Agent({
    keepAlive: true,
    ca
  });

  const request = async url => {
    try {
      const type = "request:cluster:api";
      const key = url;

      const rem = "Operations/" + type + "/" + key;

      const { result, error } = await GraphCommon.Cache.operation(
        type,
        url,
        async () => {
          const res = await axios({
            method: "get",
            url: "https://kubernetes.default.svc.cluster.local/api/v1" + url,
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json"
            },
            httpsAgent
          });

          const { data } = res;
          return JSON.stringify(data);
        },
        { expire: 60 },
        cxt
      );

      if (error) {
        console.log(url);
        console.log(error);
        throw new Error(error);
      }

      const resultData = JSON.parse(result);
      return resultData;
    } catch (e) {
      console.log(url);
      console.log(e.toString());
      throw e;
    }
  };

  return { id, request, viewer };
};
