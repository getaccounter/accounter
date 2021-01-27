import faker from "faker";
import { mockServerClient } from "mockserver-client";

const generateUser = (options = {}) => {
  const firstName = options.firstName || faker.name.firstName();
  const lastName = options.lastName || faker.name.lastName();
  return {
    organization: options.organization || faker.company.companyName(),
    firstName,
    lastName,
    email: options.email || faker.internet.email(firstName, lastName),
    title: options.title || faker.name.jobTitle(),
    password: options.password || faker.internet.password(),
  };
};

const mockSlackOauthToken = ({
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

const mockSlackUsersList = ({
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
            {
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
                image_512:
                  "https://a.slack-edge.com/80588/img/slackbot_512.png",
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
            },
            ...users.map(({ user, slackAccountId }) => ({
              id: slackAccountId,
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
                display_name: user.firstName,
                display_name_normalized: user.firstName,
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
            })),
            {
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
            },
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

const mockSlackUsersInfo = ({
  token,
  user,
  slackAccountId,
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
        body: `user=${slackAccountId}`,
      },
      httpResponse: {
        body: {
          ok: true,
          cache_ts: 1611515141,
          response_metadata: { next_cursor: "" },
          user: {
            id: slackAccountId,
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
              display_name: user.firstName,
              display_name_normalized: user.firstName,
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

const MOBILE = "mobile";
const WINDOW = "window";
const FULLSCREEN = "macbook-13";

const sizes = [
  { name: MOBILE, viewport: "iphone-5" },
  { name: WINDOW, viewport: [1024, 800] },
  { name: FULLSCREEN, viewport: "macbook-13" },
];

sizes.forEach(({ name, viewport }) => {
  describe(name, () => {
    beforeEach(() => {
      if (Cypress._.isArray(viewport)) {
        cy.viewport(viewport[0], viewport[1]);
      } else {
        cy.viewport(viewport);
      }
    });
    describe("Services", () => {
      it("add slack", () => {
        const user = generateUser();
        const token = faker.random.uuid();
        const slackAccountId = faker.random.uuid();
        const oauthCode = faker.random.uuid();
        mockSlackOauthToken({ user, token, oauthCode });
        mockSlackUsersList({ token, users: [{ user, slackAccountId }] });
        mockSlackUsersInfo({ token, user, slackAccountId });

        cy.visit("/");
        cy.findByRole("link", { name: "register" }).click();
        cy.register(
          user.organization,
          user.firstName,
          user.lastName,
          user.email,
          user.password
        );
        cy.login(user.email, user.password);

        cy.navigateTo("Add Apps", name);

        cy.findByRole("link", { name: "Add SLACK" }).click();

        cy.mockSlackOauth(oauthCode);

        cy.findByRole("navigation", { name: "Directory" }).within(() => {
          cy.findByRole("link", { name: `${user.organization} SLACK` }).should(
            "exist"
          );
        });

        cy.navigateTo("Users", name);

        cy.getUserFromDirectory({ user, ignoreTitle: true }, (userRow) =>
          userRow.click()
        );

        cy.findByRole("main").within(() => {
          cy.findByRole("link", { name: "Accounts" }).click();
          cy.findByRole("link", {
            name: `@${user.firstName} SLACK - ${user.organization}`,
          }).should("exist");
        });
      });
    });
    describe("Users", () => {
      it("Add, edit, offboard and reactivate", () => {
        const user = generateUser();
        const userToRegister = generateUser({
          organization: user.organization,
        });
        const newUserData = generateUser({
          organization: user.organization,
        });

        cy.visit("/");
        cy.findByRole("link", { name: "register" }).click();
        cy.register(
          user.organization,
          user.firstName,
          user.lastName,
          user.email,
          user.password
        );
        cy.login(user.email, user.password);

        cy.navigateTo("Add Users", name);

        cy.findByLabelText("First name").type(userToRegister.firstName);
        cy.findByLabelText("Last name").type(userToRegister.lastName);
        cy.findByLabelText("Email address").type(userToRegister.email);
        cy.findByLabelText("Title").type(userToRegister.title);
        cy.findByRole("button", { name: "Create" }).click();
        cy.wait(500);

        if (name !== FULLSCREEN) {
          cy.findByRole("main").within(() => {
            cy.findByRole("link", { name: "Users" }).click();
          });
        }

        cy.findByRole("navigation", { name: "Directory" }).within(() => {
          cy.findByRole("link", {
            name: `${userToRegister.firstName} ${userToRegister.lastName} ${userToRegister.title}`,
          }).should("exist");
        });

        cy.getUserFromDirectory({ user: userToRegister }, (userRow) =>
          userRow.click()
        );

        cy.findByRole("main").within(() => {
          cy.findByRole("heading", {
            name: `${userToRegister.firstName} ${userToRegister.lastName}`,
          }).should("exist");
        });

        cy.findByRole("main").within(() => {
          cy.findByRole("heading", {
            name: `${userToRegister.firstName} ${userToRegister.lastName}`,
          }).should("exist");

          cy.findByRole("article").within(() => {
            cy.findByText(userToRegister.firstName).should("exist");
            cy.findByText(userToRegister.lastName).should("exist");
            cy.findByText(userToRegister.email).should("exist");
          });

          cy.findByRole("link", { name: "Edit" }).click();
        });

        cy.findByLabelText("First name").clear().type(newUserData.firstName);
        cy.findByLabelText("Last name").clear().type(newUserData.lastName);
        cy.findByLabelText("Email address").clear().type(newUserData.email);
        cy.findByLabelText("Title").clear().type(newUserData.title);
        cy.findByRole("button", { name: "Update" }).click();

        if (name !== FULLSCREEN) {
          cy.findByRole("main").within(() => {
            cy.findByRole("link", { name: "Users" }).click();
          });
        }

        cy.getUserFromDirectory({ user: newUserData }, (userRow) => {
          userRow.should("exist");
          userRow.click();
        });

        cy.findByRole("main").within(() => {
          cy.findByRole("heading", {
            name: `${newUserData.firstName} ${newUserData.lastName}`,
          }).should("exist");

          cy.findByRole("article").within(() => {
            cy.findByText(newUserData.firstName).should("exist");
            cy.findByText(newUserData.lastName).should("exist");
            cy.findByText(newUserData.email).should("exist");
            cy.findByText(newUserData.title).should("exist");
          });

          cy.findByRole("link", { name: "Offboard" }).click();
        });

        if (name !== FULLSCREEN) {
          cy.findByRole("main").within(() => {
            cy.findByRole("link", { name: "Users" }).click();
          });
        }

        cy.old_getUserFromDirectory(
          `${newUserData.firstName} ${newUserData.lastName} ${newUserData.title}`,
          (user) => user.should("not.exist")
        );

        cy.findByRole("button", { name: "Filter" }).click();
        cy.findByRole("checkbox", { name: "Offboarded" }).click();

        cy.old_getUserFromDirectory(
          `${newUserData.firstName} ${newUserData.lastName} ${newUserData.title}`,
          (user) => {
            user.should("exist");
            user.click();
          }
        );

        cy.findByRole("main").within(() => {
          cy.findByRole("link", { name: "Reactivate" }).click();
        });

        if (name !== FULLSCREEN) {
          cy.findByRole("main").within(() => {
            cy.findByRole("link", { name: "Users" }).click();
          });
        }

        cy.findByRole("button", { name: "Filter" }).click();
        cy.findByRole("checkbox", { name: "Offboarded" }).click();

        cy.old_getUserFromDirectory(
          `${newUserData.firstName} ${newUserData.lastName} ${newUserData.title}`,
          (user) => user.should("exist")
        );
      });

      if (name === FULLSCREEN) {
        describe("Add user and then make him admin", () => {
          const user = generateUser({
            organization: "Greenfelder and Volkman",
            firstName: "Peter",
            lastName: "Greenfelder",
            email: "Peter@petergreenfelder.internet",
            title: "Jefe",
            password: "mysecretpassword",
          });
          const userToRegister = generateUser({
            organization: user.organization,
            firstName: "Jack",
            lastName: "Volkman",
            email: "Jack@petergreenfelder.internet",
            title: "Co-Jefe",
          });

          // only broken up in different tests to be able to access different domains
          // See this: https://github.com/cypress-io/cypress/issues/944
          it("Part 1", () => {
            cy.visit("/");
            cy.findByRole("link", { name: "register" }).click();
            cy.register(
              user.organization,
              user.firstName,
              user.lastName,
              user.email,
              user.password
            );
            cy.login(user.email, user.password);

            cy.navigateTo("Add Users");

            cy.findByLabelText("First name").type(userToRegister.firstName);
            cy.findByLabelText("Last name").type(userToRegister.lastName);
            cy.findByLabelText("Email address").type(userToRegister.email);
            cy.findByLabelText("Title").type(userToRegister.title);
            cy.findByRole("button", { name: "Create" }).click();
            cy.wait(500);
            cy.findByRole("navigation", { name: "Directory" }).within(() => {
              cy.findByRole("link", {
                name: `${userToRegister.firstName} ${userToRegister.lastName} ${userToRegister.title}`,
              }).should("exist");
            });

            cy.old_getUserFromDirectory(
              `${userToRegister.firstName} ${userToRegister.lastName} ${userToRegister.title}`,
              (user) => user.click()
            );

            cy.findByRole("button", { name: "Make admin" }).click();

            cy.findByRole("button", {
              name: `${user.firstName} ${user.lastName}`,
            }).click();
            cy.findByRole("menuitem", { name: "Logout" }).click();

            cy.findByRole("heading", {
              name: "Sign in to your account",
            }).should("exist");
          });

          it("part 2", () => {
            cy.visit("http://mailserver:8025/");
            cy.findByText(
              `${user.firstName} invited you to join ${user.organization} on accounter.io`
            ).click();
            cy.getMailHogEmailContent()
              .findByRole("link", { name: "Join" })
              .then((link) => {
                cy.saveResetUrl(
                  link.attr("href").replace("localhost", "loadbalancer")
                );
              });
          });

          it("part 3", function () {
            cy.loadResetUrl().then((url) => {
              cy.visit(url);
            });

            cy.findByLabelText("Password").type(userToRegister.password);
            cy.findByLabelText("Password Confirmation").type(
              userToRegister.password
            );
            cy.findByRole("button", { name: "Set password" }).click();

            cy.login(userToRegister.email, userToRegister.password);

            cy.findByRole("button", {
              name: `${userToRegister.firstName} ${userToRegister.lastName} ${userToRegister.title}`,
            }).click();
            cy.findByRole("menuitem", { name: "Logout" }).click();

            cy.findByRole("heading", {
              name: "Sign in to your account",
            }).should("exist");

            cy.login(user.email, user.password);

            cy.navigateTo("Users");

            cy.old_getUserFromDirectory(
              `${userToRegister.firstName} ${userToRegister.lastName} ${userToRegister.title}`,
              (user) => user.click()
            );

            cy.findByRole("button", { name: "Remove admin" }).click();

            cy.findByRole("button", {
              name: `${user.firstName} ${user.lastName}`,
            }).click();
            cy.findByRole("menuitem", { name: "Logout" }).click();

            cy.findByRole("heading", {
              name: "Sign in to your account",
            }).should("exist");

            cy.login(userToRegister.email, userToRegister.password);

            cy.findByText("Login Failed").should("exist");
          });
        });
      }
    });
  });
});
