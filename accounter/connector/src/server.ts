import fastify from "fastify";
import { NODE_ENV, PORT } from "./env";
import googleEndpoints from "./google";
import slackEndpoints from "./slack";

if (NODE_ENV === "development") {
  // quite hacky, I dont like it, but nodejs doesnt seem to pick up the
  // normal HTTP_PROXY env vars
  require("global-agent/bootstrap");
}

export default () => {
  const server = fastify({ logger: true });

  server.register(slackEndpoints, { prefix: "/slack" });
  server.register(googleEndpoints, { prefix: "/google" });

  return server
};
