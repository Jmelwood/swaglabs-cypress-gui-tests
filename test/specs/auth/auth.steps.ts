import { When, Then } from 'cypress-cucumber-preprocessor/steps';
import LoginPage from '../../pages/login.page';
import Users from '../../fixtures/users';

When('I try to login with the {string} user account', (loginType) => {
  LoginPage.login(Users[loginType]);
});

Then('I will see an error message specifying I {string}', (errorMsg) => {
  LoginPage.errorMsg.should('include.text', errorMsg);
});
