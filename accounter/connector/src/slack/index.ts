import { FastifyPluginCallback } from "fastify";
import { getByEmail } from "./handlers/accounts";
import { oauthCallback, oauth } from "./handlers/oauth";

const slackEndpoints: FastifyPluginCallback<{ prefix: string }> = (
  server,
  opts,
  done
) => {
  server.get("/oauth", oauth);
  server.get("/oauth/handleCallback", oauthCallback);
  server.get("/accounts/getByEmail", getByEmail);
  done();
};

export default slackEndpoints;
