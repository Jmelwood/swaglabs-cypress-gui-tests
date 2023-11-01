import { When } from '@badeball/cypress-cucumber-preprocessor';
import HeaderModal from '../pages/header.modal.js';

When('I click on the {string} menu link', (menuItem) => {
  HeaderModal.menuIcon.click();
  switch (menuItem) {
    case 'All Items':
      HeaderModal.allItemsLink.click();
      break;
    case 'About':
      HeaderModal.aboutLink.click();
      break;
    case 'Logout':
      HeaderModal.logoutLink.click();
      break;
    default:
      HeaderModal.allItemsLink.click();
      break;
  }
});
