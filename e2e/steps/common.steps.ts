import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../pages/login.page.js';
import InventoryPage from '../pages/inventory.page.js';

// Ensures that no prior authentication in a cookie exists
Given('I am a new visitor', () => {
  cy.clearCookies();
});

When('I navigate to the {string} page', (pageName) => {
  switch (pageName) {
    case 'Login':
      LoginPage.open();
      break;
    case 'Inventory':
      InventoryPage.open();
      break;
    default:
      LoginPage.open();
      break;
  }
});

Then('I will see the {string} page', (pageName) => {
  switch (pageName) {
    case 'Login':
      LoginPage.mainElement.should('be.visible');
      break;
    case 'Inventory':
      InventoryPage.mainElement.should('be.visible');
      break;
    default:
      LoginPage.mainElement.should('be.visible');
      break;
  }
});

Then('I will not see the {string} page', (pageName) => {
  switch (pageName) {
    case 'Login':
      LoginPage.mainElement.should('not.exist');
      break;
    case 'Inventory':
      InventoryPage.mainElement.should('not.exist');
      break;
    default:
      LoginPage.mainElement.should('not.exist');
      break;
  }
});
