import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../../pages/login.page.js';
import type { User } from '../../fixtures/users.js';
import Users from '../../fixtures/users.js';

When('I try to login with the {string} user account', (loginType: string) => {
  LoginPage.login(Users[loginType] as User);
});

Then('I will see an error message specifying I {string}', (errorMsg: string) => {
  LoginPage.errorMsg.should('include.text', errorMsg);
});
