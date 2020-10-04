describe("The Home Page", () => {
  it("successfully loads", () => {
    cy.visit("/");
    cy.findByText("Learn React").should("exist");
    cy.visit("/api/");
    cy.findByText("The install worked successfully! Congratulations!").should(
      "exist"
    );
  });
});
