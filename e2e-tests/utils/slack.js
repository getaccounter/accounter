import { mockServerClient } from "mockserver-client";
import faker from "faker";

const createSlackbotUser = (teamId) => ({
  id: "USLACKBOT",
  team_id: teamId,
  name: "slackbot",
  deleted: false,
  color: "757575",
  real_name: "Slackbot",
  tz: "America/Los_Angeles",
  tz_label: "Pacific Standard Time",
  tz_offset: -28800,
  profile: {
    title: "",
    phone: "",
    skype: "",
    real_name: "Slackbot",
    real_name_normalized: "Slackbot",
    display_name: "Slackbot",
    display_name_normalized: "Slackbot",
    fields: null,
    status_text: "",
    status_emoji: "",
    status_expiration: 0,
    avatar_hash: "sv41d8cd98f0",
    always_active: true,
    first_name: "slackbot",
    last_name: "",
    image_24: "https://a.slack-edge.com/80588/img/slackbot_24.png",
    image_32: "https://a.slack-edge.com/80588/img/slackbot_32.png",
    image_48: "https://a.slack-edge.com/80588/img/slackbot_48.png",
    image_72: "https://a.slack-edge.com/80588/img/slackbot_72.png",
    image_192:
      "https://a.slack-edge.com/80588/marketing/img/avatars/slackbot/avatar-slackbot.png",
    image_512: "https://a.slack-edge.com/80588/img/slackbot_512.png",
    status_text_canonical: "",
    team: teamId,
  },
  is_admin: false,
  is_owner: false,
  is_primary_owner: false,
  is_restricted: false,
  is_ultra_restricted: false,
  is_bot: false,
  is_app_user: false,
  updated: 0,
});

const createSlackIntegrationBotUser = (teamId) => ({
  id: "U01JUS6ED60",
  team_id: teamId,
  name: "zapier",
  deleted: false,
  color: "e7392d",
  real_name: "Zapier",
  tz: "America/Los_Angeles",
  tz_label: "Pacific Standard Time",
  tz_offset: -28800,
  profile: {
    title: "",
    phone: "",
    skype: "",
    real_name: "Zapier",
    real_name_normalized: "Zapier",
    display_name: "",
    display_name_normalized: "",
    fields: null,
    status_text: "",
    status_emoji: "",
    status_expiration: 0,
    avatar_hash: "cb1331b16b08",
    api_app_id: "A024R9PQM",
    always_active: true,
    image_original:
      "https://avatars.slack-edge.com/2021-01-13/1658568361568_cb1331b16b0844483b18_original.png",
    is_custom_image: true,
    bot_id: "B01JNMBV074",
    image_24:
      "https://avatars.slack-edge.com/2021-01-13/1658568361568_cb1331b16b0844483b18_24.png",
    image_32:
      "https://avatars.slack-edge.com/2021-01-13/1658568361568_cb1331b16b0844483b18_32.png",
    image_48:
      "https://avatars.slack-edge.com/2021-01-13/1658568361568_cb1331b16b0844483b18_48.png",
    image_72:
      "https://avatars.slack-edge.com/2021-01-13/1658568361568_cb1331b16b0844483b18_72.png",
    image_192:
      "https://avatars.slack-edge.com/2021-01-13/1658568361568_cb1331b16b0844483b18_192.png",
    image_512:
      "https://avatars.slack-edge.com/2021-01-13/1658568361568_cb1331b16b0844483b18_512.png",
    image_1024:
      "https://avatars.slack-edge.com/2021-01-13/1658568361568_cb1331b16b0844483b18_1024.png",
    status_text_canonical: "",
    team: teamId,
  },
  is_admin: false,
  is_owner: false,
  is_primary_owner: false,
  is_restricted: false,
  is_ultra_restricted: false,
  is_bot: true,
  is_app_user: false,
  updated: 1610571838,
});

const createSlackProfile = (teamId, user) => ({
  id: user.slack.id,
  team_id: teamId,
  name: "slack1",
  deleted: false,
  color: "9f69e7",
  real_name: `${user.firstName} ${user.lastName}`,
  tz: "Europe/Amsterdam",
  tz_label: "Central European Time",
  tz_offset: 3600,
  profile: {
    title: "",
    phone: "",
    skype: "",
    real_name: `${user.firstName} ${user.lastName}`,
    real_name_normalized: `${user.firstName} ${user.lastName}`,
    display_name: user.slack.displayName,
    display_name_normalized: user.slack.displayName,
    fields: null,
    status_text: "",
    status_emoji: "",
    status_expiration: 0,
    avatar_hash: "g3307d47b80c",
    email: user.email,
    first_name: user.firstName,
    last_name: user.lastName,
    image_24: "https://secure.gravatar.com/mock",
    image_32: "https://secure.gravatar.com/mock",
    image_48: "https://secure.gravatar.com/mock",
    image_72: "https://secure.gravatar.com/mock",
    image_192: "https://secure.gravatar.com/mock",
    image_512: "https://secure.gravatar.com/mock",
    status_text_canonical: "",
    team: teamId,
  },
  is_admin: true,
  is_owner: true,
  is_primary_owner: true,
  is_restricted: false,
  is_ultra_restricted: false,
  is_bot: false,
  is_app_user: false,
  updated: 1607524353,
  has_2fa: false,
});

export const mockSlackOauthToken = ({
  oauthCode,
  user,
  token = faker.random.uuid(),
  teamId = faker.random.uuid(),
} = {}) => {
  mockServerClient("mockserver", 1080)
    .mockAnyResponse({
      httpRequest: {
        method: "POST",
        path: "/api/oauth.v2.access",
        body: `redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fslack%2Foauth%2Fcallback&code=${oauthCode}`,
      },
      httpResponse: {
        body: {
          ok: true,
          authed_user: {
            access_token: token,
          },
          team: {
            id: teamId,
            name: user.organization,
          },
        },
      },
      times: {
        remainingTimes: 1,
      },
    })
    .then(
      function () {
        console.log("expectation created");
      },
      function (error) {
        console.log(error);
      }
    );
};

export const mockSlackUsersList = ({
  token,
  teamId = faker.random.uuid(),
  users = [],
} = {}) => {
  mockServerClient("mockserver", 1080)
    .mockAnyResponse({
      httpRequest: {
        method: "POST",
        path: "/api/users.list",
        headers: {
          Authorization: [`Bearer ${token}`],
        },
      },
      httpResponse: {
        body: {
          ok: true,
          cache_ts: 1611515141,
          response_metadata: { next_cursor: "" },
          members: [
            createSlackbotUser(teamId),
            createSlackIntegrationBotUser(teamId),
            ...users.map((user) => createSlackProfile(teamId, user)),
          ],
          cache_ts: 1611515141,
          response_metadata: { next_cursor: "" },
        },
      },
      times: {
        remainingTimes: 1,
      },
    })
    .then(
      function () {
        console.log("expectation created");
      },
      function (error) {
        console.log(error);
      }
    );
};

export const mockSlackUsersInfo = ({
  token,
  user,
  teamId = faker.random.uuid(),
} = {}) => {
  mockServerClient("mockserver", 1080)
    .mockAnyResponse({
      httpRequest: {
        method: "POST",
        path: "/api/users.info",
        headers: {
          Authorization: [`Bearer ${token}`],
        },
        body: `user=${user.slack.id}`,
      },
      httpResponse: {
        body: {
          ok: true,
          cache_ts: 1611515141,
          response_metadata: { next_cursor: "" },
          user: createSlackProfile(teamId, user),
        },
      },
      times: {
        remainingTimes: 1,
      },
    })
    .then(
      function () {
        console.log("expectation created");
      },
      function (error) {
        console.log(error);
      }
    );
};

export const mockSlackUsersLookupByEmail = ({
  token,
  user,
  teamId = faker.random.uuid(),
} = {}) => {
  mockServerClient("mockserver", 1080)
    .mockAnyResponse({
      httpRequest: {
        method: "POST",
        "path" : "/api/users.lookupByEmail",
        headers: {
          Authorization: [`Bearer ${token}`],
        },
        body: `email=${user.email.replace("@", "%40")}`,
      },
      httpResponse: {
        body: {
          ok: true,
          cache_ts: 1611515141,
          response_metadata: { next_cursor: "" },
          user: createSlackProfile(teamId, user),
        },
      },
      times: {
        remainingTimes: 1,
      },
    })
    .then(
      function () {
        console.log("expectation created");
      },
      function (error) {
        console.log(error);
      }
    );
};