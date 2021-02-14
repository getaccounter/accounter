import express from "express";
import { NODE_ENV, VERSION } from "./env";
import googleApp from "./google";
import slackApp from "./slack";
import logger from "morgan";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

if (NODE_ENV === "development") {
  // quite hacky, I dont like it, but nodejs doesnt seem to pick up the
  // normal HTTP_PROXY env vars
  require("global-agent/bootstrap");
}

const useSentry = NODE_ENV === "production";

const server = express();

if (useSentry) {
  Sentry.init({
    dsn:
      "https://e1802a2b21d44ef8ac8a904973de59d9@o523541.ingest.sentry.io/5635686",
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app: server }),
    ],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
    release: `connector@${VERSION}`
  });

  // RequestHandler creates a separate execution context using domains, so that every
  // transaction/span/breadcrumb is attached to its own Hub instance
  server.use(Sentry.Handlers.requestHandler());
  // TracingHandler creates a trace for every incoming request
  server.use(Sentry.Handlers.tracingHandler());
}

server.use(logger(NODE_ENV === "development" ? "dev" : "common"));

server.use("/google", googleApp);
server.use("/slack", slackApp);

if (useSentry) {
  server.use(Sentry.Handlers.errorHandler());
}

export default server;
