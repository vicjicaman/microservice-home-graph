import axios from "axios";
var https = require("https");
var fs = require("fs");

export const get = async (viewer, id, cxt) => {
  const token = fs.readFileSync(
    "/var/run/secrets/kubernetes.io/serviceaccount/token"
  );

  const httpsAgent = new https.Agent({
    keepAlive: true,
    ca: fs.readFileSync("/var/run/secrets/kubernetes.io/serviceaccount/ca.crt")
  });

  const request = async url => {
    const res = await axios({
      method: "get",
      url: "https://kubernetes.default.svc.cluster.local/api/v1" + url,
      headers: {
        Authorization: `Bearer ${token}`
      },
      httpsAgent
    });
    const { data } = res;
    return data;
  };

  return { id, request, viewer };
};
