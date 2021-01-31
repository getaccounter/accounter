import nock from "nock";
import faker from "faker";
import { testAccountsGetByEmail } from "../../utils/handlers/accounts.testutils";

const createSlackUser = ({
  id = faker.random.uuid(),
  firstName = faker.name.firstName(),
  lastName = faker.name.lastName(),
  email = faker.internet.email(firstName, lastName),
  imageSmall = faker.image.imageUrl(24, 24),
  userName = faker.internet.userName(firstName, lastName),
} = {}) => {
  const fullName = `${firstName} ${lastName}`;
  return {
    id: id,
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
      display_name: userName,
      display_name_normalized: userName,
      fields: null,
      status_text: "",
      status_emoji: "",
      status_expiration: 0,
      avatar_hash: faker.random.image(),
      email: email,
      first_name: firstName,
      last_name: lastName,
      image_24: imageSmall,
      image_32: faker.image.imageUrl(32, 32),
      image_48: faker.image.imageUrl(48, 48),
      image_72: faker.image.imageUrl(72, 72),
      image_192: faker.image.imageUrl(192, 192),
      image_512: faker.image.imageUrl(512, 512),
      status_text_canonical: "",
      team: "The team",
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
  };
};

describe("accounts", () => {
  it("getByEmail", async () => {
    await testAccountsGetByEmail(
      "/slack",
      async ({ params }, expectedReturnValue) => {
        const { token, email } = params;
        const slackUser = createSlackUser({
          id: expectedReturnValue.id,
          email: expectedReturnValue.email,
          imageSmall: expectedReturnValue.image.small,
          userName: expectedReturnValue.username,
        });
        nock("https://slack.com")
          .post(
            "/api/users.lookupByEmail",
            `token=${token}&email=${email.replace("@", "%40")}`
          )
          .once()
          .reply(200, {
            ok: true,
            cache_ts: 1611515141,
            response_metadata: { next_cursor: "" },
            user: slackUser,
          });
      }
    );
  });
});
