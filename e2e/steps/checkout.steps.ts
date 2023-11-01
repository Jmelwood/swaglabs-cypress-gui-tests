import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import InventoryPage from '../pages/inventory.page.js';
import CartPage from '../pages/cart.page.js';
import CheckoutPage from '../pages/checkout.page.js';
import HeaderModal from '../pages/header.modal.js';
import type { UserType } from '../../cypress/fixtures/users.js';
import Users from '../../cypress/fixtures/users.js';
import type { CustomContext } from './common.steps.js';

Given('I randomly add {int} item(s) to my shopping cart', function (this: CustomContext, itemAmt: number) {
  this.expectedItemNames = [];
  this.expectedItemPrices = [];
  for (let i = 0; i < itemAmt; i++) {
    InventoryPage.pickItemRandomly().then(($invItem) => {
      cy.wrap($invItem)
        .find('div.inventory_item_name')
        .then(($invItemName) => {
          if (!this.expectedItemNames.includes($invItemName.text())) {
            this.expectedItemNames.push($invItemName.text());
            cy.wrap($invItem).find('[data-test*="add-to-cart"]').click();
          }
        });
      cy.wrap($invItem)
        .find('div.inventory_item_price')
        .then(($invItemPrice) => {
          this.expectedItemPrices.push(parseFloat($invItemPrice.text().replace('$', '')));
        });
    });
  }
});

When('I click the checkout button', () => {
  CartPage.checkoutButton.click();
});

When('I click the continue button', () => {
  CheckoutPage.continueButton.click();
});

When('I click the finish button', () => {
  CheckoutPage.finishButton.click();
});

Then('I see all of the items I added from the inventory page', function (this: CustomContext) {
  CartPage.inventoryItems.then(($cartItems) => {
    cy.wrap($cartItems)
      .find('div.inventory_item_name')
      .then(($cartItemNames) => {
        const cartItemNames = $cartItemNames.toArray();
        for (const expectedItemName of this.expectedItemNames) {
          const foundCartItem = cartItemNames.find((item) => {
            return item.innerText === expectedItemName;
          });
          cy.wrap(foundCartItem).should('exist');
        }
      });
  });
});

Then('I can fill out the {string} personal information on the checkout page', (loginType: UserType) => {
  CheckoutPage.fillFields(Users[loginType]);
});

Then('I should not advance to the order summary page', () => {
  CheckoutPage.subtotalLabel.should('not.exist');
});

Then('I will see an error message specifying that {string}', (errorMsg: string) => {
  CheckoutPage.fieldErrorContainer.should('be.visible').and('include.text', errorMsg);
});

Then('All the calculated amounts are accurate', function (this: CustomContext) {
  const expectedSubtotal = this.expectedItemPrices.reduce((prev, curr) => prev + curr, 0);
  const expectedTax = expectedSubtotal * 0.08;
  const expectedTotal = expectedSubtotal + expectedTax;
  CheckoutPage.subtotalLabel.should('contain.text', expectedSubtotal.toFixed(2));
  CheckoutPage.taxLabel.should('contain.text', expectedTax.toFixed(2));
  CheckoutPage.totalLabel.should('contain.text', expectedTotal.toFixed(2));
});

Then('The final submission is successfully processed', () => {
  CheckoutPage.completePonyImage.should('be.visible');
  CheckoutPage.returnToInventoryButton.click();
  // If the bage isn't displayed, then no items are registered as added
  HeaderModal.shoppingCartBadge.should('not.exist');
});
