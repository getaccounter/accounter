import faker from "faker";
import { generateUser } from "../utils/users";
import {
  generateWorkspaceData,
  mockSlackOauthToken,
  mockSlackUsersList,
  mockSlackUsersLookupByEmail,
  mockSlackAuthTest,
} from "../utils/slack";

const MOBILE = "mobile";
const WINDOW = "window";
const FULLSCREEN = "macbook-13";

const sizes = [
  { name: MOBILE, viewport: "iphone-5" },
  // { name: WINDOW, viewport: [1024, 800] },
  // { name: FULLSCREEN, viewport: "macbook-13" },
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
      describe("slack", () => {
        it("add integration and pull users accounts", () => {
          const user = generateUser();
          const slackWorkspace = generateWorkspaceData();
          const token = faker.random.uuid();
          const oauthCode = faker.random.uuid();
          mockSlackOauthToken({ workspace: slackWorkspace, token, oauthCode });
          mockSlackAuthTest({user, workspace: slackWorkspace, token })
          mockSlackUsersList({
            token,
            workspace: slackWorkspace,
            users: [user],
          });

          cy.visit("/");
          cy.findByRole("link", { name: "register" }).click();
          cy.register(user);
          cy.login(user.email, user.password);

          cy.navigateTo("Add Apps", name);

          cy.findByRole("link", { name: "Add SLACK" }).click();

          cy.mockSlackOauth(oauthCode);

          cy.findByRole("navigation", { name: "Directory" }).within(() => {
            cy.findByRole("link", {
              name: `${slackWorkspace.name} SLACK`,
            }).click()
          });

          cy.findByRole("main").within(() => {
            cy.findByRole("heading", {
              name: slackWorkspace.name,
            }).should("exist");
            cy.findByRole("link", {
              name: `${user.firstName} ${user.lastName} @${user.slack.displayName}`,
            }).should("exist");
          });

          cy.navigateTo("Users", name);

          cy.getUserFromDirectory({ user, ignoreTitle: true }, (userRow) =>
            userRow.click()
          );

          cy.findByRole("main").within(() => {
            cy.findByRole("link", { name: "Accounts" }).click();
            cy.findByRole("link", {
              name: `@${user.slack.displayName} SLACK - ${slackWorkspace.name}`,
            }).should("exist");
          });
        });
        it("pulls accounts for newly created users", () => {
          const user = generateUser();
          const userToCreate = generateUser({
            organization: user.organization,
          });
          const token = faker.random.uuid();
          const slackWorkspace = generateWorkspaceData();
          const oauthCode = faker.random.uuid();
          mockSlackAuthTest({user, workspace: slackWorkspace, token })
          mockSlackOauthToken({ workspace: slackWorkspace, token, oauthCode });
          mockSlackUsersLookupByEmail({
            token,
            workspace: slackWorkspace,
            user: userToCreate,
          });
          mockSlackUsersList({
            token,
            workspace: slackWorkspace,
            users: [user, userToCreate],
          });

          cy.visit("/");
          cy.findByRole("link", { name: "register" }).click();
          cy.register(user);
          cy.login(user.email, user.password);

          cy.navigateTo("Add Apps", name);

          cy.findByRole("link", { name: "Add SLACK" }).click();

          cy.mockSlackOauth(oauthCode);

          cy.navigateTo("Add Users", name);
          cy.createUser(userToCreate);

          cy.findByRole("main").within(() => {
            cy.findByRole("link", { name: "Accounts" }).click();
            cy.findByRole("link", {
              name: `@${userToCreate.slack.displayName} SLACK - ${slackWorkspace.name}`,
            }).should("exist");
          });
        });
      });
    });
    describe("Users", () => {
      it("Add, edit, offboard and reactivate", () => {
        const user = generateUser();
        const userToCreate = generateUser({
          organization: user.organization,
        });
        const newUserData = generateUser({
          organization: user.organization,
        });

        cy.visit("/");
        cy.findByRole("link", { name: "register" }).click();
        cy.register(user);
        cy.login(user.email, user.password);

        cy.navigateTo("Add Users", name);
        cy.createUser(userToCreate);

        if (name !== FULLSCREEN) {
          cy.findByRole("main").within(() => {
            cy.findByRole("link", { name: "Users" }).click();
          });
        }

        cy.findByRole("navigation", { name: "Directory" }).within(() => {
          cy.findByRole("link", {
            name: `${userToCreate.firstName} ${userToCreate.lastName} ${userToCreate.title}`,
          }).should("exist");
        });

        cy.getUserFromDirectory({ user: userToCreate }, (userRow) =>
          userRow.click()
        );

        cy.findByRole("main").within(() => {
          cy.findByRole("heading", {
            name: `${userToCreate.firstName} ${userToCreate.lastName}`,
          }).should("exist");
        });

        cy.findByRole("main").within(() => {
          cy.findByRole("heading", {
            name: `${userToCreate.firstName} ${userToCreate.lastName}`,
          }).should("exist");

          cy.findByRole("article").within(() => {
            cy.findByText(userToCreate.firstName).should("exist");
            cy.findByText(userToCreate.lastName).should("exist");
            cy.findByText(userToCreate.email).should("exist");
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
            cy.visit("/");
            cy.findByRole("link", { name: "register" }).click();
            cy.register(user);
            cy.login(user.email, user.password);

            cy.navigateTo("Add Users");
            cy.createUser(userToCreate);

            cy.findByRole("navigation", { name: "Directory" }).within(() => {
              cy.findByRole("link", {
                name: `${userToCreate.firstName} ${userToCreate.lastName} ${userToCreate.title}`,
              }).should("exist");
            });

            cy.old_getUserFromDirectory(
              `${userToCreate.firstName} ${userToCreate.lastName} ${userToCreate.title}`,
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

            cy.findByLabelText("Password").type(userToCreate.password);
            cy.findByLabelText("Password Confirmation").type(
              userToCreate.password
            );
            cy.findByRole("button", { name: "Set password" }).click();

            cy.login(userToCreate.email, userToCreate.password);

            cy.findByRole("button", {
              name: `${userToCreate.firstName} ${userToCreate.lastName} ${userToCreate.title}`,
            }).click();
            cy.findByRole("menuitem", { name: "Logout" }).click();

            cy.findByRole("heading", {
              name: "Sign in to your account",
            }).should("exist");

            cy.login(user.email, user.password);

            cy.navigateTo("Users");

            cy.old_getUserFromDirectory(
              `${userToCreate.firstName} ${userToCreate.lastName} ${userToCreate.title}`,
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

            cy.login(userToCreate.email, userToCreate.password);

            cy.findByText("Login Failed").should("exist");
          });
        });
      }
    });
  });
});
