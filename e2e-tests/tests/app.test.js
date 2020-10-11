describe("The Home Page", () => {
  it("successfully loads web", () => {
    cy.visit("/");
    cy.findByText("Learn React").should("exist");
  });
  it("successfully loads server", () => {
    cy.visit("/api/");
    cy.findByText("Api Root").should("exist");
  });
});
