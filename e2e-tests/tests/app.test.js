const faker = require("faker");

var mockServerClient = require("mockserver-client").mockServerClient;

const mockSlack = () => {
  mockServerClient("mockserver", 1080)
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
          team: {
            id: faker.random.uuid(),
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

describe("Mobile", () => {
  beforeEach(() => {
    cy.viewport("iphone-5");
  });

  describe("Services", () => {
    it("add slack", () => {
      const user = faker.helpers.userCard();
      const password = faker.internet.password();

      mockSlack();

      cy.visit("/");
      cy.findByRole("link", { name: "register" }).click();
      cy.register(user.email, user.company.name, password);
      cy.login(user.email, password);

      cy.mobileNavigateTo("Add Apps");

      cy.findByRole("link", { name: "Add SLACK" }).click();

      cy.mockSlackOauth();

      cy.findByRole("navigation", { name: "Directory" }).within(() => {
        cy.findByRole("link", { name: "SLACK" }).should("exist");
      });
    });
  });
});


describe("Desktop", () => {
  beforeEach(() => {
    cy.viewport("macbook-13");
  });

  describe("Services", () => {
    it("add slack", () => {
      const user = faker.helpers.userCard();
      const password = faker.internet.password();

      mockSlack();

      cy.visit("/");
      cy.findByRole("link", { name: "register" }).click();
      cy.register(user.email, user.company.name, password);
      cy.login(user.email, password);

      cy.navigateTo("Add Apps");

      cy.findByRole("link", { name: "Add SLACK" }).click();

      cy.mockSlackOauth();

      cy.findByRole("navigation", { name: "Directory" }).within(() => {
        cy.findByRole("link", { name: "SLACK" }).should("exist");
      });
    });
  });
});
