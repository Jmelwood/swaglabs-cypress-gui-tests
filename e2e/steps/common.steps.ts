import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../pages/login.page.js';
import InventoryPage from '../pages/inventory.page.js';
import HeaderModal from '../pages/header.modal.js';
import type { UserType } from '../../cypress/fixtures/users.js';
import Users from '../../cypress/fixtures/users.js';
import CartPage from '../pages/cart.page.js';

export interface CustomContext extends Mocha.Context {
  expectedItemNames: string[];
  expectedItemPrices: number[];
}

Given('I need to skip this test for now', () => {
  return 'skipped';
});

// Ensures that no prior authentication in a cookie exists
Given('I am a new visitor', () => {
  cy.clearCookies();
});

Given('I am logged into the website as the {string} user', (loginType: UserType) => {
  LoginPage.open();
  LoginPage.login(Users[loginType]);
});

When('I click on the shopping cart icon', () => {
  HeaderModal.shoppingCartIcon.click();
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
    case 'Cart':
      CartPage.mainElement.should('be.visible');
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
    case 'Cart':
      CartPage.mainElement.should('not.exist');
      break;
    default:
      LoginPage.mainElement.should('not.exist');
      break;
  }
});

Then("{string} is part of the page's URL", (urlPart) => {
  cy.url().should('include', urlPart);
});

Then('I do not have an authentication token', () => {
  cy.getCookies().should('have.length', 0);
});
