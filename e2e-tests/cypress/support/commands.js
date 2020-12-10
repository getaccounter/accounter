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
import querystring from "querystring";

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

Cypress.Commands.add("mockSlackOauth", () => {
  // can we somehow prevent from going to the slack page by intercepting the new route
  // and routing back to the handler page immedietly?
  cy.url().should("include", "https://slack.com");
  cy.url().then((url) => {
    // have to do if-else, cause locally slack redirects to /workspace-signin, on github actions it does not though
    if (url.includes("/workspace-signin")) {
      const [, qs] = url.split("?");
      const [, redirQs] = querystring.parse(qs).redir.split("?");
      const { state } = querystring.parse(redirQs);
      cy.visit(`/slack/oauth/callback?code=some-mock-code&state=${state}`);
    } else {
      const [, qs] = url.split("?");
      const { state } = querystring.parse(qs);
      cy.visit(`/slack/oauth/callback?code=some-mock-code&state=${state}`);
    }
  });
});
