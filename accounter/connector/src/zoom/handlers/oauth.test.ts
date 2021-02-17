import nock from "nock";
import app from "..";
import { decrypt } from "../../utils/encryption";
import { refreshToken } from "../../utils/handlers/oauth.testutils";

describe("oauth", () => {
  refreshToken(app, {
    success: async ({ params }, expected) => {
      const { token: refreshToken } = params;
      nock("https://zoom.us")
        .post("/oauth/token", body => body.refresh_token === decrypt(refreshToken))
        .once()
        .reply(200, {
          access_token: decrypt(expected.token),
        });
    },
    invalidToken: async ({ params }) => {
      const { token: refreshToken } = params;
      nock("https://zoom.us")
        .post("/oauth/token", body => body.refresh_token === decrypt(refreshToken))
        .once()
        .reply(401);
    },
  });
});
