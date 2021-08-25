import { Then, When } from 'cypress-cucumber-preprocessor/steps';

When(`I search for computer name {string}`, (name: string) => {
  cy.get('#searchbox').type(name);
  cy.get('#searchsubmit').click();
});

Then(`I see a computer named {string} in the list`, (name: string) => {
  cy.get('.computers tbody a:nth-child(1)').contains(name, { matchCase: false });
});
