import { Given } from 'cypress-cucumber-preprocessor/steps';

Given('I open the main page', () => {
  cy.visit('/');
});
