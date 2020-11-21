describe("The Home Page", () => {
  it("redirects to login and let's me log in", () => {
    cy.visit("/");
    cy.login();
    cy.findByRole("heading").within(() => {
      cy.findByText("Services").should("exist");
    });

    cy.findByRole("navigation").within(() => {
      cy.findByText("Users").click();
    });

    cy.findByRole("heading").within(() => {
      cy.findByText("Users").should("exist");
    });
  });
});
