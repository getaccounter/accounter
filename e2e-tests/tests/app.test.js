describe("The Home Page", () => {
  it("redirects to login and let's me log in", () => {
    cy.visit("/");
    cy.findByPlaceholderText("username").type("admin");
    cy.findByPlaceholderText("password").type("password");
    cy.findByText("Login").click();
    cy.findByText("Dashboard").should("exist");
  });
});
