// it's not really oauth, it's github installations ...
// probably should add a better name for the auth flow than oauth
import {
  oauthCallbackHandler,
  oauthHandler,
  refreshTokenHandler,
} from "../../utils/handlers/oauth";
import { GITHUB_APP_ID, GITHUB_PRIVATE_KEY } from "../env";
import { Octokit } from "@octokit/rest";
import { createAppAuth } from "@octokit/auth-app";
import { encryptToken } from "../utils";

export const oauth = oauthHandler(async ({ params }, callback) => {
  const app = new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: GITHUB_APP_ID,
      privateKey: GITHUB_PRIVATE_KEY,
    },
  });

  const { data } = await app.apps.getAuthenticated();

  callback({
    code: 200,
    body: { url: data.html_url },
  });
});

export const oauthCallback = oauthCallbackHandler(
  async ({ params }, callback) => {
    const installationId = params.code;

    const app = new Octokit({
      authStrategy: createAppAuth,
      auth: {
        appId: GITHUB_APP_ID,
        privateKey: GITHUB_PRIVATE_KEY,
        installationId,
      },
    });

    const { data: installationData } = await app.apps.getInstallation({
      installation_id: parseInt(installationId, 10),
    });
    const account = installationData.account!;
    if (account.type !== "Organization") {
      throw Error(
        `GitHub Account is not an Organization. It's ${account.type}.`
      );
    }
    const { data: orgData } = await app.orgs.get({ org: account.login! });
    console.log({ organizationNodeId: orgData.node_id });
    callback({
      code: 200,
      body: {
        token: encryptToken({
          installationId,
          organizationNodeId: orgData.node_id,
        }),
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
