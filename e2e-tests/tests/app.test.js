const faker = require("faker");

var mockServerClient = require("mockserver-client").mockServerClient;

const mockSlack = () => {
  mockServerClient("localhost", 1080)
    .mockAnyResponse({
      httpRequest: {
        method: "POST",
        path: "/api/oauth.v2.access",
      },
      httpResponse: {
        body: {
          ok: true,
          authed_user: {
            access_token: "some-token",
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

describe("The Home Page", () => {
  it("redirects to login and let's me log in", () => {
    const user = faker.helpers.userCard();
    const password = faker.internet.password();

    cy.visit("/");
    cy.findByRole("link", { name: "register" }).click();
    cy.register(user.email, user.company.name, password);
    cy.login(user.email, password);
    cy.findByRole("heading", { name: "Services" }).should("exist");

    cy.findByRole("navigation").within(() => {
      cy.findByRole("link", { name: "Users" }).click();
    });

    cy.findByRole("heading", { name: "Users" }).should("exist");
  });
});

describe.only("Services", () => {
  it("add slack", () => {
    const user = faker.helpers.userCard();
    const password = faker.internet.password();

    mockSlack();

    cy.visit("/");
    cy.findByRole("link", { name: "register" }).click();
    cy.register(user.email, user.company.name, password);
    cy.login(user.email, password);
    cy.findByRole("heading", { name: "Services" }).should("exist");

    cy.findByRole("list", { name: "more-services" }).within(() => {
      cy.findByRole("listitem", { name: "SLACK" }).click();
    });

    cy.mockSlackOauth();

    cy.findByRole("list", { name: "integrations" }).within(() => {
      cy.findByRole("listitem", { name: "SLACK" }).should("exist");
    });
  });
});
