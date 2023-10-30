import InventoryPage from '../pages/inventory.page.js';
import HeaderModal from '../pages/header.modal.js';
import LoginPage from '../pages/login.page.js';
import Users from '../../cypress/fixtures/users.js';

describe('Hamburger Menu', () => {
  before(() => {
    LoginPage.open();
    LoginPage.login(Users.standard);
  });

  beforeEach(() => {
    InventoryPage.open();
  });

  it('Shopping cart icon redirects to the Cart page', () => {
    HeaderModal.shoppingCartIcon.click();
    cy.url().should('include', 'cart');
  });

  it('"All Items" correctly redirects back to the Products page', () => {
    // Navigate to a different page
    HeaderModal.shoppingCartIcon.click();
    HeaderModal.clickAllItems();
    cy.url().should('include', 'inventory');
  });

  // Cypress runner has trouble handling the loading of the website for some reason, so it's disabled for now.
  it.skip('"About" correctly redirects to Sauce Labs homepage', () => {
    HeaderModal.clickAbout();
    cy.url().should('include', 'saucelabs.com');
  });

  it('"Logout" deletes session cookie and redirects to Login page', () => {
    HeaderModal.clickLogout();
    LoginPage.mainElement.should('be.visible');
    cy.getCookies().should('have.length', 0);
  });
});
