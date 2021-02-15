import { oauthCallbackHandler, oauthHandler, refreshTokenHandler } from "../../utils/handlers/oauth";
import { ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET } from "../env";
import { AuthorizationCode } from 'simple-oauth2'
import jwt_decode from "jwt-decode";

export const oauth = oauthHandler(async ({ params }, callback) => {
  const { redirectUri } = params;

  const url = `https://zoom.us/oauth/authorize?response_type=code&client_id=${ZOOM_CLIENT_ID}&redirect_uri=${redirectUri}`

  callback({
    code: 200,
    body: { url },
  });
});

export const oauthCallback = oauthCallbackHandler(
  async ({ params }, callback) => {

    const config = {
      client: {
        id: ZOOM_CLIENT_ID,
        secret: ZOOM_CLIENT_SECRET
      },
      auth: {
        tokenHost: 'https://zoom.us/oauth/token'
      }
    };

    const client = new AuthorizationCode(config);

    const tokenParams = {
      code: params.code,
      redirect_uri: params.redirectUri,
    };
    // https://api.zoom.us/v2/users
    try {
      const accessToken = await client.getToken(tokenParams);
      // NOTE: we BELIEVE that `auid` is the account id, but we are not sure 
      // if there are any problems with duplicated integrations, this might 
      // be the culprit
      // @ts-expect-error auid should be defined
      const {auid} = jwt_decode(accessToken.token.access_token)
      callback({
        code: 200,
        body: {
          token: accessToken.token.access_token,
          refreshToken: accessToken.token.refresh_token,
          integrationId: auid,
          // Not sure if Zoom has something like a name
          integrationName: "Zoom",
          managementUrl: "https://zoom.us/account/user/"
        },
      });
    } catch (error) {
      callback({
        code: 400,
        body: error.message,
      });
    }
  }
);



export const refresh = refreshTokenHandler(async ({ params }, callback) => {
  const { token: refreshToken } = params;

  const config = {
    client: {
      id: ZOOM_CLIENT_ID,
      secret: ZOOM_CLIENT_SECRET
    },
    auth: {
      tokenHost: 'https://zoom.us/oauth/token'
    }
  };

  const client = new AuthorizationCode(config);
  const expiredAccessToken = client.createToken({refresh_token: refreshToken});

  try {
    const accessToken = await expiredAccessToken.refresh();
    console.log({accessToken})
    callback({
      code: 200,
      body: { token: accessToken.token.access_token },
    });
  } catch (e) {
    callback({
      code: 401,
    });
  }
});
