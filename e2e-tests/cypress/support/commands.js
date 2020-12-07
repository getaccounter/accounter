// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import "@testing-library/cypress/add-commands";

Cypress.Commands.add("register", (email, organization, password) => {
  cy.findByLabelText("Email address").type(email);
  cy.findByLabelText("Org name").type(organization);
  cy.findByLabelText("Password").type(password);
  cy.findByRole("button", { name: "Sign up" }).click();
});

Cypress.Commands.add("login", (email, password) => {
  cy.findByText("Sign in to your account").should("exist");
  cy.findByLabelText("Email address").type(email);
  cy.findByLabelText("Password").type(password);
  cy.findByText("Sign in").click();
});
