describe("The Home Page", () => {
  it("redirects to login and let's me log in", () => {
    cy.visit("/");
    cy.login();
    cy.findByRole("heading", { name: "Services" }).should("exist");

    cy.findByRole("navigation").within(() => {
      cy.findByRole("link", { name: "Users" }).click();
    });

    cy.findByRole("heading", { name: "Users" }).should("exist");
  });
});
