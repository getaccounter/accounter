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

const generateUser = () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  return {
    organization: faker.company.companyName(),
    firstName,
    lastName,
    email: faker.internet.email(firstName, lastName),
    password: faker.internet.password(),
  };
};

describe("Mobile", () => {
  beforeEach(() => {
    cy.viewport("iphone-5");
  });

  describe("Services", () => {
    it("add slack", () => {
      const user = generateUser();

      mockSlack();

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

      cy.mobileNavigateTo("Add Apps");

      cy.findByRole("link", { name: "Add SLACK" }).click();

      cy.mockSlackOauth();

      cy.findByRole("navigation", { name: "Directory" }).within(() => {
        cy.findByRole("link", { name: "SLACK" }).should("exist");
      });
    });
  });
});

describe("Desktop - window", () => {
  beforeEach(() => {
    cy.viewport(1024, 800);
  });

  describe("Services", () => {
    it("add slack", () => {
      const user = generateUser();

      mockSlack();

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

      cy.navigateTo("Add Apps");

      cy.findByRole("link", { name: "Add SLACK" }).click();

      cy.mockSlackOauth();

      cy.findByRole("navigation", { name: "Directory" }).within(() => {
        cy.findByRole("link", { name: "SLACK" }).should("exist");
      });
    });
  });
});

describe("Desktop - full screen", () => {
  beforeEach(() => {
    cy.viewport("macbook-13");
  });

  describe("Services", () => {
    it("add slack", () => {
      const user = generateUser();

      mockSlack();

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

      cy.navigateTo("Add Apps");

      cy.findByRole("link", { name: "Add SLACK" }).click();

      cy.mockSlackOauth();

      cy.findByRole("navigation", { name: "Directory" }).within(() => {
        cy.findByRole("link", { name: "SLACK" }).should("exist");
      });
    });
  });
});
