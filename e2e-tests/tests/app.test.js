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
    title: faker.name.jobTitle(),
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

  describe("Users", () => {
    it("add user", () => {
      const user = generateUser();
      const userToRegister = generateUser();

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

      cy.mobileNavigateTo("Add Users");

      cy.findByLabelText("First name").type(userToRegister.firstName);
      cy.findByLabelText("Last name").type(userToRegister.lastName);
      cy.findByLabelText("Email address").type(userToRegister.email);
      cy.findByLabelText("Title").type(userToRegister.title);
      cy.findByRole("button", { name: "Create" }).click();

      cy.findByRole("main").within(() => {
        cy.findByRole("heading", {
          name: `${userToRegister.firstName} ${userToRegister.lastName}`,
        }).should("exist");

        cy.findByRole("link", { name: "Users" }).click();
      });

      cy.findByRole("navigation", { name: "Directory" }).within(() => {
        cy.findByRole("link", {
          name: `${userToRegister.firstName} ${userToRegister.lastName} ${userToRegister.title}`,
        });
      });
    });

    it("edit user", () => {
      const user = generateUser();
      const newUserData = generateUser();

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

      cy.mobileNavigateTo("Users");

      cy.findByRole("navigation", { name: "Directory" }).within(() => {
        cy.findByRole("link", {
          name: `${user.firstName} ${user.lastName}`,
        }).click();
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

        cy.findByRole("button", { name: "Edit" }).click();
      });

      cy.findByLabelText("First name").clear().type(newUserData.firstName);
      cy.findByLabelText("Last name").clear().type(newUserData.lastName);
      cy.findByLabelText("Email address").clear().type(newUserData.email);
      cy.findByLabelText("Title").clear().type(newUserData.title);
      cy.findByRole("button", { name: "Update" }).click();

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

        cy.findByRole("link", { name: "Users" }).click();
      });

      cy.findByRole("navigation", { name: "Directory" }).within(() => {
        cy.findByRole("link", {
          name: `${newUserData.firstName} ${newUserData.lastName} ${newUserData.title}`,
        }).should("exist");
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

  describe("Users", () => {
    it("add user", () => {
      const user = generateUser();
      const userToRegister = generateUser();

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

      cy.findByRole("main").within(() => {
        cy.findByRole("heading", {
          name: `${userToRegister.firstName} ${userToRegister.lastName}`,
        }).should("exist");

        cy.findByRole("link", { name: "Users" }).click();
      });

      cy.findByRole("navigation", { name: "Directory" }).within(() => {
        cy.findByRole("link", {
          name: `${userToRegister.firstName} ${userToRegister.lastName} ${userToRegister.title}`,
        });
      });
    });

    it("edit user", () => {
      const user = generateUser();
      const newUserData = generateUser();

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

      cy.navigateTo("Users");

      cy.findByRole("navigation", { name: "Directory" }).within(() => {
        cy.findByRole("link", {
          name: `${user.firstName} ${user.lastName}`,
        }).click();
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

        cy.findByRole("button", { name: "Edit" }).click();
      });

      cy.findByLabelText("First name").clear().type(newUserData.firstName);
      cy.findByLabelText("Last name").clear().type(newUserData.lastName);
      cy.findByLabelText("Email address").clear().type(newUserData.email);
      cy.findByLabelText("Title").clear().type(newUserData.title);
      cy.findByRole("button", { name: "Update" }).click();

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

        cy.findByRole("link", { name: "Users" }).click();
      });

      cy.findByRole("navigation", { name: "Directory" }).within(() => {
        cy.findByRole("link", {
          name: `${newUserData.firstName} ${newUserData.lastName} ${newUserData.title}`,
        }).should("exist");
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

  describe("Users", () => {
    it("add user", () => {
      const user = generateUser();
      const userToRegister = generateUser();

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

      cy.findByRole("navigation", { name: "Directory" }).within(() => {
        cy.findByRole("link", {
          name: `${userToRegister.firstName} ${userToRegister.lastName} ${userToRegister.title}`,
        }).should("exist");
      });

      cy.findByRole("main").within(() => {
        cy.findByRole("heading", {
          name: `${userToRegister.firstName} ${userToRegister.lastName}`,
        }).should("exist");
      });
    });

    it("edit user", () => {
      const user = generateUser();
      const newUserData = generateUser();

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

      cy.navigateTo("Users");

      cy.findByRole("navigation", { name: "Directory" }).within(() => {
        cy.findByRole("link", {
          name: `${user.firstName} ${user.lastName}`,
        }).click();
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

        cy.findByRole("button", { name: "Edit" }).click();
      });

      cy.findByLabelText("First name").clear().type(newUserData.firstName);
      cy.findByLabelText("Last name").clear().type(newUserData.lastName);
      cy.findByLabelText("Email address").clear().type(newUserData.email);
      cy.findByLabelText("Title").clear().type(newUserData.title);
      cy.findByRole("button", { name: "Update" }).click();

      cy.findByRole("navigation", { name: "Directory" }).within(() => {
        cy.findByRole("link", {
          name: `${newUserData.firstName} ${newUserData.lastName} ${newUserData.title}`,
        }).should("exist");
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
