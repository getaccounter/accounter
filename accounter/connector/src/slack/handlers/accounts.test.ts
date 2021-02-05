import nock from "nock";
import faker, { fake } from "faker";
import {
  testAccountsGetById,
  testList,
} from "../../utils/handlers/accounts.testutils";
import { Account } from "../../utils/handlers/accounts";

const createSlackbotUser = () => ({
  id: "USLACKBOT",
  team_id: "XYZD",
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
    team: "XYZD",
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

const createSlackIntegrationBotUser = () => ({
  id: "U01JUS6ED60",
  team_id: "XYZD",
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
    team: "XYZD",
  },
  is_admin: false,
  is_owner: false,
  is_primary_owner: false,
  is_restricted: false,
  is_ultra_restricted: false,
  is_bot: true,
  is_app_user: false,
  updated: "XYZD",
});

const createSlackUser = (account: Account) => {
  const fullName = `${account.firstName} ${account.lastName}`;
  return {
    id: account.id,
    team_id: "XYZD",
    name: "slack1",
    deleted: false,
    color: "9f69e7",
    real_name: `Peter Jackson`,
    tz: "Europe/Amsterdam",
    tz_label: "Central European Time",
    tz_offset: 3600,
    profile: {
      title: "",
      phone: "",
      skype: "",
      real_name: fullName,
      real_name_normalized: fullName,
      display_name: account.username,
      display_name_normalized: account.username,
      fields: null,
      status_text: "",
      status_emoji: "",
      status_expiration: 0,
      avatar_hash: faker.random.image(),
      email: account.email,
      first_name: account.firstName,
      last_name: account.lastName,
      image_24: faker.image.imageUrl(24, 24),
      image_32: faker.image.imageUrl(32, 32),
      image_48: account.image.small,
      image_72: faker.image.imageUrl(72, 72),
      image_192: account.image.big,
      image_512: faker.image.imageUrl(512, 512),
      status_text_canonical: "",
      team: "The team",
    },
    is_admin: account.role === "ADMIN",
    is_owner: account.role === "OWNER",
    is_primary_owner: false,
    is_restricted: false,
    is_ultra_restricted: false,
    is_bot: false,
    is_app_user: false,
    updated: 1607524353,
    has_2fa: false,
  };
};

describe("accounts", () => {
  testAccountsGetById("/slack", async ({ params }, { found, account }) => {
    const { token, id } = params;
    nock("https://slack.com")
      .post("/api/users.info", `token=${token}&user=${id}`)
      .once()
      .reply(
        200,
        found
          ? {
              ok: true,
              cache_ts: 1611515141,
              response_metadata: { next_cursor: "" },
              user: createSlackUser(account!),
            }
          : {
              ok: false,
              error: "users_not_found",
            }
      )
      .post("/api/auth.test", `token=${token}`)
      .once()
      .reply(200, {
        url: faker.internet.url(),
        ok: true,
        team: faker.company.companyName(),
        user: faker.internet.userName(),
        team_id: faker.random.uuid(),
        user_id: faker.random.uuid(),
      });
  });

  testList("/slack", async ({ params }, expectedReturnValue) => {
    const { token } = params;
    const members = [
      ...expectedReturnValue.map(createSlackUser),
      createSlackbotUser(),
      createSlackIntegrationBotUser(),
    ];
    nock("https://slack.com")
      .post("/api/users.list", `token=${token}`)
      .once()
      .reply(200, {
        ok: true,
        cache_ts: 1611515141,
        response_metadata: { next_cursor: "" },
        members,
      })
      .post("/api/auth.test", `token=${token}`)
      .once()
      .reply(200, {
        url: faker.internet.url(),
        ok: true,
        team: faker.company.companyName(),
        user: faker.internet.userName(),
        team_id: faker.random.uuid(),
        user_id: faker.random.uuid(),
      });
  });
});
