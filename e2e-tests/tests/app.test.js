import { generateUser } from "../utils/users";
import mockSlackIntegration from "../utils/slack";
import mockGoogleIntegration from "../utils/google";
import mockZoomIntegration from "../utils/zoom";
import mockGithubIntegration, {
  mockService as mockGitHubService,
} from "../utils/github";
import { mockServerClient } from "mockserver-client";

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
});

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
});

beforeEach(() => {
  cy.viewport('macbook-13')
  mockGitHubService();
});

describe("e2e tests", () => {
  describe("Services", () => {
    [
      {
        serviceName: "SLACK",
        getMockIntegration: (users) => mockSlackIntegration(users),
        executeOauthFlow: "mockSlackOauth",
        getDisplayName: (user) => user.slack.displayName,
      },
      {
        serviceName: "GOOGLE",
        getMockIntegration: (users) => mockGoogleIntegration(users),
        executeOauthFlow: "mockGoogleOauth",
        getDisplayName: (user) => user.google.displayName,
      },
      {
        serviceName: "ZOOM",
        getMockIntegration: (users) => mockZoomIntegration(users),
        executeOauthFlow: "mockZoomOauth",
        getDisplayName: (user) => user.zoom.displayName,
      },
      {
        serviceName: "GITHUB",
        getMockIntegration: (users) => mockGithubIntegration(users),
        executeOauthFlow: "mockGithubOauth",
        getDisplayName: (user) => user.github.displayName,
      },
    ].forEach(
      ({
        serviceName,
        getMockIntegration,
        executeOauthFlow,
        getDisplayName,
      }) => {
        describe(serviceName, () => {
          it("add integration and pull users accounts", () => {
            const user = generateUser();
            const displayName = getDisplayName(user);
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
      }
    );
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
  });
});
