require("dotenv").config();
const express = require("express");
const graphqlHTTP = require("express-graphql");
const { makeExecutableSchema } = require("graphql-tools");
const { schema: rootSchema, resolvers: rootResolvers } = require("./schema");

import * as AuthLib from "@nebulario/microservice-auth-common";
import * as Utils from "@nebulario/microservice-utils";
import * as GraphCommon from "@nebulario/microservice-graph-common";

const ACCOUNT_INTERNAL_URL_GRAPH = process.env["ACCOUNT_INTERNAL_URL_GRAPH"];
const AUTH_CACHE_INTERNAL_HOST = process.env["AUTH_CACHE_INTERNAL_HOST"];
const AUTH_CACHE_INTERNAL_PORT = process.env["AUTH_CACHE_INTERNAL_PORT"];
const HOME_ROUTE_GRAPH = process.env["HOME_ROUTE_GRAPH"];
const HOME_INTERNAL_PORT_GRAPH = process.env["HOME_INTERNAL_PORT_GRAPH"];
const AUTH_CACHE_SECRET_PASSWORD = process.env["AUTH_CACHE_SECRET_PASSWORD"];

const RESOURCES_CACHE_INTERNAL_HOST =
  process.env["RESOURCES_CACHE_INTERNAL_HOST"];
const RESOURCES_CACHE_INTERNAL_PORT =
  process.env["RESOURCES_CACHE_INTERNAL_PORT"];
const RESOURCES_CACHE_SECRET_PASSWORD =
  process.env["RESOURCES_CACHE_SECRET_PASSWORD"];

(async () => {
  const cache = await GraphCommon.Cache.connect({
    host: RESOURCES_CACHE_INTERNAL_HOST,
    port: RESOURCES_CACHE_INTERNAL_PORT,
    password: RESOURCES_CACHE_SECRET_PASSWORD
  });

  const cxt = {
    services: {
      cache
    }
  };

  var app = express();
  AuthLib.init({
    app,
    cache: {
      host: AUTH_CACHE_INTERNAL_HOST,
      port: AUTH_CACHE_INTERNAL_PORT,
      secret: AUTH_CACHE_SECRET_PASSWORD
    },
    accounts: {
      url: ACCOUNT_INTERNAL_URL_GRAPH
    }
  });

  const schema = makeExecutableSchema({
    typeDefs: rootSchema,
    resolvers: rootResolvers
  });

  app.use(
    HOME_ROUTE_GRAPH,
    graphqlHTTP(request => ({
      schema: schema,
      graphiql: true,
      context: {
        request,
        ...cxt
      }
    }))
  );
  app.listen(HOME_INTERNAL_PORT_GRAPH, () =>
    console.log("Home GraphQL running...")
  );
})().catch(e => console.log(e.toString()));

Utils.Process.shutdown(signal => console.log("shutdown " + signal));
