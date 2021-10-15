import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import LoginPage from '../../pages/login.page';
import InventoryPage from '../../pages/inventory.page';

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
      LoginPage.isPageShown();
      break;
    case 'Inventory':
      InventoryPage.isPageShown();
      break;
    default:
      LoginPage.isPageShown();
      break;
  }
});
