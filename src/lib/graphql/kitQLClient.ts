import { KitQLClient } from "@kitql/client";

const url = import.meta.env.VITE_GRAPHQL_ENDPOINT;

export const kitQLClient = new KitQLClient({
  url,
  credentials: "omit",
  headersContentType: "application/json",
  logType: ["client", "server", "operationAndvariables"],
});
