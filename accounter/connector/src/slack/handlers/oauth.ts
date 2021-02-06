import installer from "../installer";
import { oauthCallbackHandler, oauthHandler } from "../../utils/handlers/oauth";

export const oauth = oauthHandler(async ({ params }, callback) => {
  const { redirectUri } = params;
  const url = await installer.generateInstallUrl({
    redirectUri,
    scopes: ["users:read", "users:read.email"],
  });

  callback({
    code: 200,
    body: { url },
  });
});

export const oauthCallback = oauthCallbackHandler(
  async ({ params }, callback) => {
    installer.parseCodeState(params, {
      success: (installation) => {
        callback({
          code: 200,
          body: {
            token: installation.bot!.token!,
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
