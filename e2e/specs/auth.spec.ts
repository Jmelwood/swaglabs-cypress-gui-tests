import InventoryPage from '../pages/inventory.page.js';
import LoginPage from '../pages/login.page.js';
import Users from '../../cypress/fixtures/users.js';

describe('Login/Authentication', () => {
  beforeEach(() => {
    LoginPage.open();
  });

  it('A standard user can log in successfully', () => {
    LoginPage.login(Users.standard);
    InventoryPage.mainElement.should('be.visible');
  });

  it('A locked out user cannot access the Products page', () => {
    LoginPage.login(Users.locked_out);
    LoginPage.mainElement.should('be.visible');
    LoginPage.errorMsg.should('contain.text', 'locked out');
  });

  it('Trying to access a page directly without authentication fails', () => {
    cy.visit('inventory.html', { failOnStatusCode: false });
    InventoryPage.mainElement.should('not.exist');
    LoginPage.errorMsg.should('contain.text', 'can only access');
  });
});
