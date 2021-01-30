import { FastifyReply, FastifyRequest } from "fastify";
import installer from "./installer";
import * as z from "zod";
import { oauthCallbackHandler, oauthHandler } from "../utils/handlers";

export const oauth = oauthHandler(async ({ params }, callback) => {
  const { redirectUri } = params;
  const url = await installer.generateInstallUrl({
    redirectUri,
    scopes: [],
    userScopes: ["users:read", "users:read.email"],
  });

  callback({
    code: 200,
    body: { url },
  });
});

const handleOAuthBodySchema = z.object({
  code: z.string(),
  state: z.string(),
});

export const handleOauthCallback = oauthCallbackHandler(
  async ({ params }, callback) => {
    installer.parseCodeState(params, {
      success: (installation) => {
        callback({
          code: 200,
          body: {
            token: installation.user.token!,
            integrationId: installation.team!.id,
            integrationName: installation.team!.name!,
          },
        });
      },
      failure: (error) => {
        callback({
          code: 400,
          body: error.message,
        });
      },
    });
  }
);
