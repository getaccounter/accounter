import faker from "faker";
import { generateUser } from "../utils/users";
import mockSlackIntegration, {
  generateWorkspaceData,
  mockSlackOauthToken,
  mockSlackUsersList,
  mockSlackAuthTest,
} from "../utils/slack";
import mockGoogleIntegration from "../utils/google"
import mockZoomIntegration from "../utils/zoom"
import mockGithubIntegration, {mockService as mockGitHubService} from "../utils/github"
import { mockServerClient } from "mockserver-client";

// const MOBILE = "mobile";
const FULLSCREEN = "macbook-13";

const sizes = [
  // deactivated mobile tests until we have a faster/cheaper CI
  // { name: MOBILE, viewport: "iphone-5" },
  { name: FULLSCREEN, viewport: "macbook-13" },
];

before(() => {
  mockServerClient("localhost", 1080)
  .reset()
  .then(
    function () {
      console.log("reset all state");
    },
    function (error) {
      console.log(error);
    }
  );
})

after(() => {
  mockServerClient("localhost", 1080)
  .reset()
  .then(
    function () {
      console.log("reset all state");
    },
    function (error) {
      console.log(error);
    }
  );
})

beforeEach(() => {
  mockGitHubService()
})

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
      [
        {
          serviceName: "SLACK",
          getMockIntegration: (users) => mockSlackIntegration(users),
          executeOauthFlow: "mockSlackOauth",
          getDisplayName: (user) => user.slack.displayName
        },
        {
          serviceName: "GOOGLE",
          getMockIntegration: (users) => mockGoogleIntegration(users),
          executeOauthFlow: "mockGoogleOauth",
          getDisplayName: (user) => user.google.displayName
        },
        {
          serviceName: "ZOOM",
          getMockIntegration: (users) => mockZoomIntegration(users),
          executeOauthFlow: "mockZoomOauth",
          getDisplayName: (user) => user.zoom.displayName
        },
        {
          serviceName: "GITHUB",
          getMockIntegration: (users) => mockGithubIntegration(users),
          executeOauthFlow: "mockGithubOauth",
          getDisplayName: (user) => user.github.displayName
        },
      ].forEach(({ serviceName, getMockIntegration, executeOauthFlow, getDisplayName }) => {
        describe(serviceName, () => {
          it("add integration and pull users accounts", () => {
            const user = generateUser();
            const displayName = getDisplayName(user)
            const integration = getMockIntegration([user]);

            cy.visit("/");
            cy.findByRole("link", { name: "Sign up for free" }).click();
            cy.register(user);
            cy.login(user.email, user.password);

            cy.navigateTo("Add Apps", name);

            cy.findByRole("link", { name: `Add ${serviceName}` }).click();

            cy[executeOauthFlow](integration.oauthCode);

            cy.findByRole("navigation", { name: "Directory" }).within(() => {
              cy.findByRole("link", {
                name: `${integration.name} ${serviceName}`,
              }).click();
            });

            cy.findByRole("main").within(() => {
              cy.findByRole("heading", {
                name: integration.name,
              }).should("exist");

              cy.findByRole("table", { name: "Accounts" }).within(() => {
                cy.findByRole("row", {
                  name: `${user.firstName} ${user.lastName} ${user.firstName} ${user.lastName} ${displayName} USER Active View`,
                });
              });
            });

            cy.navigateTo("Users", name);

            cy.getUserFromDirectory({ user, ignoreTitle: true }, (userRow) =>
              userRow.click()
            );

            cy.findByRole("main").within(() => {
              cy.findByRole("link", { name: "Accounts" }).click();
              cy.findByRole("table", { name: "Accounts" }).within(() => {
                cy.findByRole("row", {
                  name: `${serviceName} ${integration.name} ${serviceName} ${displayName} USER Active View`,
                });
              });
            });
          });
        });
      });
    });
    describe("Users", () => {
      it("edit", () => {
        const user = generateUser();
        const newUserData = generateUser({
          organization: user.organization,
        });

        cy.visit("/");
        cy.findByRole("link", { name: "Sign up for free" }).click();
        cy.register(user);
        cy.login(user.email, user.password);

        cy.navigateTo("Users", name);

        cy.findByRole("button", { name: "Filter" }).click();
        cy.findByRole("checkbox", { name: "Disabled" }).click();

        cy.getUserFromDirectory({ user, ignoreTitle: true }, (userRow) =>
          userRow.click()
        );

        cy.findByRole("main").within(() => {
          cy.findByRole("heading", {
            name: `${user.firstName} ${user.lastName}`,
          }).should("exist");
        });

        cy.findByRole("main").within(() => {
          cy.findByRole("heading", {
            name: `${user.firstName} ${user.lastName}`,
          }).should("exist");

          cy.findByRole("article").within(() => {
            cy.findByText(user.firstName).should("exist");
            cy.findByText(user.lastName).should("exist");
            cy.findByText(user.email).should("exist");
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
          cy.findByRole("button", { name: "Filter" }).click();
          cy.findByRole("checkbox", { name: "Disabled" }).click();
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
        });
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
          const userToCreate = generateUser({
            organization: user.organization,
            firstName: "Jack",
            lastName: "Volkman",
            email: "Jack@petergreenfelder.internet",
            title: "Co-Jefe",
          });

          // only broken up in different tests to be able to access different domains
          // See this: https://github.com/cypress-io/cypress/issues/944
          it("Part 1", () => {
            const slackWorkspace = generateWorkspaceData();
            const token = faker.random.uuid();
            const oauthCode = faker.random.uuid();
            mockSlackOauthToken({
              workspace: slackWorkspace,
              token,
              oauthCode,
            });
            mockSlackAuthTest({ user, workspace: slackWorkspace, token });
            mockSlackUsersList({
              token,
              workspace: slackWorkspace,
              users: [user, userToCreate],
            });

            cy.visit("/");
            cy.findByRole("link", { name: "Sign up for free" }).click();
            cy.register(user);
            cy.login(user.email, user.password);

            cy.navigateTo("Add Apps", name);

            cy.findByRole("link", { name: "Add SLACK" }).click();

            cy.mockSlackOauth(oauthCode);

            cy.findByRole("navigation", { name: "Directory" }).within(() => {
              cy.findByRole("link", {
                name: `${slackWorkspace.name} SLACK`,
              }).click();
            });

            cy.navigateTo("Users");

            cy.old_getUserFromDirectory(
              `${userToCreate.firstName} ${userToCreate.lastName}`,
              (user) => user.click()
            );

            cy.findByRole("button", { name: "Make admin" }).click();

            cy.findByRole("button", {
              name: `${user.firstName} ${user.lastName}`,
            }).click();
            cy.findByRole("menuitem", { name: "Logout" }).click();

            cy.findByRole("heading", {
              name: "Accounter",
            }).should("exist");
          });

          it("part 2", () => {
            cy.visit("http://mailserver:8025/");
            cy.findByText(
              `${user.firstName} invited you to join ${user.organization} on accounter.io`
            ).click();
            cy.getMailHogEmailContent().within(() => {
              cy.findByText(`Hi ${userToCreate.firstName},`).should("exist");
              cy.findByText(
                `${user.firstName} invited you to join ${user.organization} on accounter.io`
              ).should("exist");
              cy.findByRole("link", { name: "Join" }).then((link) => {
                cy.saveResetUrl(
                  link.attr("href").replace("localhost", "loadbalancer")
                );
              });
            });
          });

          it("part 3", function () {
            cy.loadResetUrl().then((url) => {
              cy.visit(url);
            });

            cy.findByLabelText("Password").type(userToCreate.password);
            cy.findByLabelText("Password Confirmation").type(
              userToCreate.password
            );
            cy.findByRole("button", { name: "Set password" }).click();

            cy.login(userToCreate.email, userToCreate.password);

            cy.findByRole("button", {
              name: `${userToCreate.firstName} ${userToCreate.lastName}`,
            }).click();
            cy.findByRole("menuitem", { name: "Logout" }).click();

            cy.findByRole("heading", {
              name: "Accounter",
            }).should("exist");

            cy.login(user.email, user.password);

            cy.navigateTo("Users");

            cy.old_getUserFromDirectory(
              `${userToCreate.firstName} ${userToCreate.lastName}`,
              (user) => user.click()
            );

            cy.findByRole("button", { name: "Remove admin" }).click();

            cy.findByRole("button", {
              name: `${user.firstName} ${user.lastName}`,
            }).click();
            cy.findByRole("menuitem", { name: "Logout" }).click();

            cy.findByRole("heading", {
              name: "Accounter",
            }).should("exist");

            cy.login(userToCreate.email, userToCreate.password);

            cy.findByText("Login Failed").should("exist");
          });
        });
      }
    });
  });
});
