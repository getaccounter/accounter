// it's not really oauth, it's github installations ... 
// probably should add a better name for the auth flow than oauth
import {
  oauthCallbackHandler,
  oauthHandler,
  refreshTokenHandler,
} from "../../utils/handlers/oauth";
import { GITHUB_PRIVATE_KEY } from "../env";
import { Octokit } from "@octokit/rest"
import { createAppAuth } from "@octokit/auth-app"

export const oauth = oauthHandler(async ({ params }, callback) => {
  const { redirectUri } = params;

  const url = "https://github.com/apps/accounter-integration"

  callback({
    code: 200,
    body: { url },
  });
});

export const oauthCallback = oauthCallbackHandler(
  async ({ params }, callback) => {
    
    const app = new Octokit({
      authStrategy: createAppAuth,
      auth: {
        appId: 101209,
        privateKey: GITHUB_PRIVATE_KEY,
        installationId: params.code,
      },
    });

    const {data: installationData} = await app.apps.getInstallation({ installation_id: parseInt(params.code, 10) });
    const account = installationData.account!
    if (account.type !== "Organization") {
      throw Error(`GitHub Account is not an Organization. It's ${account.type}.`)
    }

    const {data: orgData} = await app.orgs.get({ org: account.login! })

    callback({
      code: 200,
      body: {
        token: params.code,
        integrationId: account.id!.toString(),
        integrationName: orgData.name!,
        managementUrl: `https://github.com/orgs/${account.login}/people`,
      },
    });
  }
);

export const refresh = refreshTokenHandler(async (_, callback) => {
  callback({
    code: 501,
  });
});