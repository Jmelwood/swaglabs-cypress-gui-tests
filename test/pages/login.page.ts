import { User } from '../fixtures/users';
import Page from './page';

class LoginPage extends Page {
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
    return cy.get('input#login-button');
  }

  get robotImage() {
    return cy.get('div.bot_column');
  }

  get errorMsg() {
    return cy.get('h3[data-test="error"]');
  }

  open() {
    super.open();
  }

  /**
   * Handles the login functionality.
   * @param {User} user
   */
  login(user: User) {
    this.usernameField.type(user.username);
    this.passwordField.type(user.password);
    this.submitButton.click();
  }
}

export default new LoginPage();
