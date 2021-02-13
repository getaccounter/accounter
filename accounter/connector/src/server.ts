import express from "express"
import { NODE_ENV } from "./env";
import googleApp from "./google";
import slackApp from "./slack";

if (NODE_ENV === "development") {
  // quite hacky, I dont like it, but nodejs doesnt seem to pick up the
  // normal HTTP_PROXY env vars
  require("global-agent/bootstrap");
}

const server = express()
server.use("/google", googleApp)
server.use("/slack", slackApp)

export default server