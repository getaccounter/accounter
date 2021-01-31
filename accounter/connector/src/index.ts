import fastify from "fastify";
import { NODE_ENV, PORT } from "./env";
import slackEndpoints from "./slack";

if (NODE_ENV === "development") {
  // quite hacky, I dont like it, but nodejs doesnt seem to pick up the 
  // normal HTTP_PROXY env vars
  require("global-agent/bootstrap")
}

const server = fastify();

server.register(slackEndpoints, { prefix: "/slack" });

server.listen(PORT, "0.0.0.0", (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
