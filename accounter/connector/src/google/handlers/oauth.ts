import { oauthCallbackHandler, oauthHandler } from "../../utils/handlers/oauth";
import { google } from "googleapis";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../env";

export const oauth = oauthHandler(async ({ params }, callback) => {
  const { redirectUri } = params;
  const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET
  );
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    redirect_uri: redirectUri,
    scope: [
      "https://www.googleapis.com/auth/admin.directory.user.readonly",
      "https://www.googleapis.com/auth/admin.directory.customer.readonly",
    ],
  });

  callback({
    code: 200,
    body: { url },
  });
});

export const oauthCallback = oauthCallbackHandler(
  async ({ params }, callback) => {
    const oauth2Client = new google.auth.OAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET
    );
    console.log("BINGO")
    oauth2Client.getToken(
      {
        code: params.code,
        redirect_uri: "http://localhost:8080/google/oauth/callback",
      },
      async (error, credentials) => {
        if (error) {
          return callback({
            code: 400,
            body: error.message,
          });
        }

        oauth2Client.setCredentials(credentials!);

        const adminSDK = google.admin({
          version: "directory_v1",
          auth: oauth2Client,
        });

        const {data} = await adminSDK.customers.get({
          customerKey: "my_customer",
        });

        callback({
          code: 200,
          body: {
            token: credentials!.access_token!,
            integrationId: data.id!,
            integrationName: data.customerDomain!,
            managementUrl: "https://admin.google.com/",
          },
        });
      }
    );
  }
);
