import GeneralPage from './general.page.js';
import type { User } from '../../cypress/fixtures/users.js';

class LoginPage extends GeneralPage {
  constructor() {
    super('Login', 'div.login_wrapper');
  }

  get headerLabel() {
    return cy.get('div.login_logo');
  }

  get usernameField() {
    return cy.get('input[data-test="username"]');
  }

  get passwordField() {
    return cy.get('input[data-test="password"]');
  }

  get submitButton() {
    return cy.get('input[data-test="login-button"]');
  }

  get errorMsg() {
    return cy.get('h3[data-test="error"]');
  }

  open() {
    super.open();
  }

  /**
   * Handles the login functionality.
   * @param user A fixture object containing the username/password credentials
   */
  login(user: User) {
    this.usernameField.type(user.username);
    this.passwordField.type(user.password);
    this.submitButton.click();
  }
}

export default new LoginPage();
