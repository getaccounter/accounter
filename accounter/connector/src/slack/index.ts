import { FastifyPluginCallback } from "fastify";
import { handleOauthCallback, oauth } from "./oauth";

const slackEndpoints: FastifyPluginCallback<{ prefix: string }> = (
  server,
  opts,
  done
) => {
  server.get("/oauth", oauth);
  server.get("/oauth/handleCallback", handleOauthCallback);
  done();
};

export default slackEndpoints;
