describe("The Home Page", () => {
  it("successfully loads web", () => {
    cy.visit("/");
    cy.findByText("Learn React").should("exist");
  });
});
