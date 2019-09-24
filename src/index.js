require("dotenv").config();
const express = require("express");
const graphqlHTTP = require("express-graphql");
const { makeExecutableSchema } = require("graphql-tools");
const { schema: rootSchema, resolvers: rootResolvers } = require("./schema");

import * as AuthLib from "@nebulario/microservice-auth-common";
import * as Utils from "@nebulario/microservice-utils";

const ACCOUNT_INTERNAL_URL_GRAPH = process.env["ACCOUNT_INTERNAL_URL_GRAPH"];
const AUTH_CACHE_INTERNAL_HOST = process.env["AUTH_CACHE_INTERNAL_HOST"];
const AUTH_CACHE_INTERNAL_PORT = process.env["AUTH_CACHE_INTERNAL_PORT"];
const HOME_ROUTE_GRAPH = process.env["HOME_ROUTE_GRAPH"];
const HOME_INTERNAL_PORT_GRAPH = process.env["HOME_INTERNAL_PORT_GRAPH"];
const AUTH_CACHE_SECRET_PASSWORD = process.env["AUTH_CACHE_SECRET_PASSWORD"];

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
      request
    }
  }))
);
app.listen(HOME_INTERNAL_PORT_GRAPH, () =>
  console.log("Home GraphQL running...")
);

Utils.Process.shutdown(signal => console.log("shutdown " + signal));
