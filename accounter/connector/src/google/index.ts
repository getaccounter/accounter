import { FastifyPluginCallback } from "fastify";
import { getById, list } from "./handlers/accounts";
import { oauthCallback, oauth } from "./handlers/oauth";

const googleEndpoints: FastifyPluginCallback<{ prefix: string }> = (
  server,
  opts,
  done
) => {
  server.get("/oauth", oauth);
  server.get("/oauth/handleCallback", oauthCallback);
  server.get("/accounts/getById", getById);
  server.get("/accounts/list", list);
  done();
};

export default googleEndpoints;
