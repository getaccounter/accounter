const faker = require("faker");

const mockServerClient = require("mockserver-client").mockServerClient;

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

// TODO: offboarding, adding admin

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
    it("Add, edit and offboard", () => {
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

      cy.mobileNavigateTo("Add Users");

      cy.findByLabelText("First name").type(userToRegister.firstName);
      cy.findByLabelText("Last name").type(userToRegister.lastName);
      cy.findByLabelText("Email address").type(userToRegister.email);
      cy.findByLabelText("Title").type(userToRegister.title);
      cy.findByRole("button", { name: "Create" }).click();

      cy.wait(500);

      cy.findByRole("main").within(() => {
        cy.findByRole("heading", {
          name: `${userToRegister.firstName} ${userToRegister.lastName}`,
        }).should("exist");

        cy.findByRole("link", { name: "Users" }).click();
      });

      cy.findByRole("navigation", { name: "Directory" }).within(() => {
        cy.findByRole("link", {
          name: `${userToRegister.firstName} ${userToRegister.lastName} ${userToRegister.title}`,
        }).should("exist");
      });

      cy.getUserFromDirectory(
        `${userToRegister.firstName} ${userToRegister.lastName} ${userToRegister.title}`,
        (user) => user.click()
      );

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

      cy.getUserFromDirectory(
        `${newUserData.firstName} ${newUserData.lastName} ${newUserData.title}`,
        (user) => user.click()
      );

      cy.findByRole("main").within(() => {
        cy.findByRole("link", { name: "Offboard" }).click();
        cy.findByRole("link", { name: "Users" }).click();
      });

      cy.findByRole("navigation", { name: "Directory" }).within(() => {
        cy.findByRole("link", {
          name: `${newUserData.firstName} ${newUserData.lastName} ${newUserData.title}`,
        }).should("not.exist");
      });

      cy.findByRole("button", { name: "Filter" }).click();
      cy.findByRole("checkbox", { name: "Offboarded" }).click();

      cy.getUserFromDirectory(
        `${newUserData.firstName} ${newUserData.lastName} ${newUserData.title}`,
        (user) => {
          user.should("exist");
          user.click();
        }
      );

      cy.findByRole("main").within(() => {
        cy.findByRole("link", { name: "Reactivate" }).click();
        cy.findByRole("link", { name: "Users" }).click();
      });

      cy.findByRole("button", { name: "Filter" }).click();
      cy.findByRole("checkbox", { name: "Offboarded" }).click();

      cy.getUserFromDirectory(
        `${newUserData.firstName} ${newUserData.lastName} ${newUserData.title}`,
        (user) => user.should("exist")
      );
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

      cy.navigateTo("Add Users");

      cy.findByLabelText("First name").type(userToRegister.firstName);
      cy.findByLabelText("Last name").type(userToRegister.lastName);
      cy.findByLabelText("Email address").type(userToRegister.email);
      cy.findByLabelText("Title").type(userToRegister.title);
      cy.findByRole("button", { name: "Create" }).click();
      cy.wait(500);
      cy.findByRole("main").within(() => {
        cy.findByRole("heading", {
          name: `${userToRegister.firstName} ${userToRegister.lastName}`,
        }).should("exist");

        cy.findByRole("link", { name: "Users" }).click();
      });

      cy.getUserFromDirectory(
        `${userToRegister.firstName} ${userToRegister.lastName} ${userToRegister.title}`,
        (user) => {
          user.should("exist");
          user.click();
        }
      );

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

      cy.getUserFromDirectory(
        `${newUserData.firstName} ${newUserData.lastName} ${newUserData.title}`,
        (user) => user.should("exist")
      );

      cy.getUserFromDirectory(
        `${newUserData.firstName} ${newUserData.lastName} ${newUserData.title}`,
        (user) => user.click()
      );

      cy.findByRole("main").within(() => {
        cy.findByRole("link", { name: "Offboard" }).click();
        cy.findByRole("link", { name: "Users" }).click();
      });

      cy.getUserFromDirectory(
        `${newUserData.firstName} ${newUserData.lastName} ${newUserData.title}`,
        (user) => user.should("not.exist")
      );

      cy.findByRole("button", { name: "Filter" }).click();
      cy.findByRole("checkbox", { name: "Offboarded" }).click();

      cy.getUserFromDirectory(
        `${newUserData.firstName} ${newUserData.lastName} ${newUserData.title}`,
        (user) => {
          user.should("exist");
          user.click();
        }
      );

      cy.findByRole("main").within(() => {
        cy.findByRole("link", { name: "Reactivate" }).click();
        cy.findByRole("link", { name: "Users" }).click();
      });

      cy.findByRole("button", { name: "Filter" }).click();
      cy.findByRole("checkbox", { name: "Offboarded" }).click();

      cy.getUserFromDirectory(
        `${newUserData.firstName} ${newUserData.lastName} ${newUserData.title}`,
        (user) => user.should("exist")
      );
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

      cy.findByRole("main").within(() => {
        cy.findByRole("heading", {
          name: `${userToRegister.firstName} ${userToRegister.lastName}`,
        }).should("exist");
      });

      cy.getUserFromDirectory(
        `${userToRegister.firstName} ${userToRegister.lastName} ${userToRegister.title}`,
        (user) => user.click()
      );

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

      cy.getUserFromDirectory(
        `${newUserData.firstName} ${newUserData.lastName} ${newUserData.title}`,
        (user) => user.should("exist")
      );

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

      cy.getUserFromDirectory(
        `${newUserData.firstName} ${newUserData.lastName} ${newUserData.title}`,
        (user) => user.should("not.exist")
      );

      cy.findByRole("button", { name: "Filter" }).click();
      cy.findByRole("checkbox", { name: "Offboarded" }).click();

      cy.getUserFromDirectory(
        `${newUserData.firstName} ${newUserData.lastName} ${newUserData.title}`,
        (user) => {
          user.should("exist");
          user.click();
        }
      );

      cy.findByRole("main").within(() => {
        cy.findByRole("link", { name: "Reactivate" }).click();
      });

      cy.findByRole("button", { name: "Filter" }).click();
      cy.findByRole("checkbox", { name: "Offboarded" }).click();

      cy.getUserFromDirectory(
        `${newUserData.firstName} ${newUserData.lastName} ${newUserData.title}`,
        (user) => user.should("exist")
      );
    });

    describe("Add user and then make him admin", () => {
      const user = generateUser({
        organization: "Greenfelder and Volkman",
        firstName: "Peter",
        lastName: "Greenfelder",
        email: "Peter@petergreenfelder.internet",
        title: "Jefe",
        password: "mysecretpassword"
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

        cy.getUserFromDirectory(
          `${userToRegister.firstName} ${userToRegister.lastName} ${userToRegister.title}`,
          (user) => user.click()
        );

        cy.findByRole("button", { name: "Make admin" }).click();

        cy.findByRole("button", {
          name: `${user.firstName} ${user.lastName}`,
        }).click();
        cy.findByRole("menuitem", { name: "Logout" }).click();

        cy.findByRole("heading", { name: "Sign in to your account" }).should(
          "exist"
        );
      });

      it("part 2", () => {
        cy.visit("http://mailserver:8025/");
        cy.findByText(
          `${user.firstName} invited you to join ${user.organization} on accounter.io`
        ).click();
        cy.getMailHogEmailContent()
          .findByRole("link", { name: "Join" })
          .then((link) => {
            cy.saveResetUrl(link.attr("href").replace("localhost", "loadbalancer"))
          });
      });

      it("part 3", function () {
        cy.loadResetUrl().then(url => {
          cy.visit(url)
        })

        cy.findByLabelText("Password").type(userToRegister.password);
        cy.findByLabelText("Password Confirmation").type(userToRegister.password);
        cy.findByRole("button", { name: "Set password" }).click();


        cy.login(userToRegister.email, userToRegister.password);
        
        cy.findByRole("button", {
          name: `${userToRegister.firstName} ${userToRegister.lastName} ${userToRegister.title}`,
        }).click();
        cy.findByRole("menuitem", { name: "Logout" }).click();
        
        cy.findByRole("heading", { name: "Sign in to your account" }).should(
          "exist"
        );

        cy.login(user.email, user.password);
        
        cy.navigateTo("Users");

        cy.getUserFromDirectory(
          `${userToRegister.firstName} ${userToRegister.lastName} ${userToRegister.title}`,
          (user) => user.click()
        );
        
        cy.findByRole("button", { name: "Remove admin" }).click();

        cy.findByRole("button", {
          name: `${user.firstName} ${user.lastName}`,
        }).click();
        cy.findByRole("menuitem", { name: "Logout" }).click();

        cy.findByRole("heading", { name: "Sign in to your account" }).should(
          "exist"
        );

        cy.login(userToRegister.email, userToRegister.password);

        cy.findByText("Login Failed").should("exist")
      });
    });
  });
});
