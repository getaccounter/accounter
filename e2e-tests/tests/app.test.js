const faker = require("faker");

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
