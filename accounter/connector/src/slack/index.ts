import { FastifyPluginCallback } from "fastify";
import { getByEmail, list } from "./handlers/accounts";
import { oauthCallback, oauth } from "./handlers/oauth";

const slackEndpoints: FastifyPluginCallback<{ prefix: string }> = (
  server,
  opts,
  done
) => {
  server.get("/oauth", oauth);
  server.get("/oauth/handleCallback", oauthCallback);
  server.get("/accounts/getByEmail", getByEmail);
  server.get("/accounts/list", list);
  done();
};

export default slackEndpoints;
