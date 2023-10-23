import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../../pages/login.page.js';
import InventoryPage from '../../pages/inventory.page.js';
import type { User } from '../../fixtures/users.js';
import Users from '../../fixtures/users.js';

// Ensures that no prior authentication in a cookie exists
Given('I am a new visitor', () => {
  cy.clearCookies();
});

// A combination of the login steps above/below
Given('I am logged in with the {string} account', (loginType: string) => {
  cy.clearCookies();
  LoginPage.open();
  LoginPage.login(Users[loginType] as User);
});

When('I navigate to the {string} page', (pageName: string) => {
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

Then('I will see the {string} page', (pageName: string) => {
  switch (pageName) {
    case 'Login':
      LoginPage.waitForPageShown();
      break;
    case 'Inventory':
      InventoryPage.waitForPageShown();
      break;
    default:
      LoginPage.waitForPageShown();
      break;
  }
});
