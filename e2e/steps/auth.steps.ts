import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../pages/login.page.js';
import type { UserType } from '../../cypress/fixtures/users.js';
import Users from '../../cypress/fixtures/users.js';

When('I try to login with the {string} user account', (loginType: UserType) => {
  LoginPage.login(Users[loginType]);
});

Then('I will see an error message specifying I {string}', (errorMsg: string) => {
  LoginPage.errorMsg.should('include.text', errorMsg);
});
