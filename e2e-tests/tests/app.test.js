describe("The Home Page", () => {
  it("successfully loads web", () => {
    cy.visit("/");
    cy.findByText("Learn React").should("exist");
  });
  it("successfully loads server", () => {
    cy.visit("/api/");
    cy.findByText("The install worked successfully! Congratulations!").should(
      "exist"
    );
  });
});
