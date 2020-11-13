describe("The Home Page", () => {
  it("successfully loads web", () => {
    cy.visit("/");
    cy.findByPlaceholderText("username").type("admin");
    cy.findByPlaceholderText("password").type("password");
    cy.findByText("Login").click();
    cy.findByText("Logged in!").should("exist");
  });
});
