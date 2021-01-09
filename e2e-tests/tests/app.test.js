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

beforeEach(() => {
  // run these tests as if in a desktop
  // TODO run as well for mobile
  cy.viewport(1280, 720)
})

describe("The Home Page", () => {
  it("redirects to login and let's me log in", () => {
    const user = faker.helpers.userCard();
    const password = faker.internet.password();

    cy.visit("/");
    cy.findByRole("link", { name: "register" }).click();
    cy.register(user.email, user.company.name, password);
    cy.login(user.email, password);
    cy.findByRole("navigation", {name: "Sidebar"}).should("exist");
  });
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

    cy.navigateTo("Add Apps")

    cy.findByRole("link", { name: "Add SLACK" }).click();
    
    cy.mockSlackOauth();

    cy.findByRole("navigation", { name: "Directory" }).within(() => {
      cy.findByRole("link", { name: "SLACK" }).should("exist");
    });
  });
});
