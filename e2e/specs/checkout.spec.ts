import InventoryPage from '../pages/inventory.page.js';
import HeaderModal from '../pages/header.modal.js';
import CartPage from '../pages/cart.page.js';
import LoginPage from '../pages/login.page.js';
import CheckoutPage from '../pages/checkout.page.js';
import Users from '../../cypress/fixtures/users.js';

describe('Checkout', () => {
  before(() => {
    LoginPage.open();
    LoginPage.login(Users.standard);
  });

  beforeEach(() => {
    InventoryPage.open();
  });

  afterEach(() => {
    HeaderModal.clickResetAppState();
  });

  it('Adding/removing various items to/from the cart shows/removes the item(s) from the summary page', () => {
    // Add/remove different items at random
    const expectedItems: string[] = [];
    for (let i = 0; i < 5; i++) {
      InventoryPage.pickItemRandomly().then(($invItem) => {
        cy.wrap($invItem)
          .find('div.inventory_item_name')
          .then(($invItemName) => {
            if (!expectedItems.includes($invItemName.text())) {
              expectedItems.push($invItemName.text());
              cy.wrap($invItem).find('[data-test*="add-to-cart"]').click();
            }
          });
      });
    }
    HeaderModal.shoppingCartIcon.click();
    CartPage.inventoryItems.then(($cartItemsBefore) => {
      cy.wrap($cartItemsBefore)
        .find('div.inventory_item_name')
        .then(($cartItemNamesBefore) => {
          const cartItemNamesBefore = $cartItemNamesBefore.toArray();
          for (const expectedItemName of expectedItems) {
            const foundCartItemBefore = cartItemNamesBefore.find((item) => {
              return item.innerText === expectedItemName;
            });
            cy.wrap(foundCartItemBefore).should('exist');
            cy.wrap(foundCartItemBefore).parent().parent().find('button[data-test*="remove-"]').click();
          }
          CartPage.inventoryItems.should('not.exist');
        });
    });
  });

  it('User can navigate through the happy path flow without issue', () => {
    /**
     * The following assertions are tested in this flow:
     * - Item total (across two items), and the 8% tax, are calculated correctly
     * - The cart is reset when checkout is finished
     */
    let itemPrice1: number, itemPrice2: number;
    InventoryPage.pickItemRandomly().then(($invItem1) => {
      cy.wrap($invItem1)
        .find('div.inventory_item_price')
        .then(($invItemPrice) => {
          itemPrice1 = parseFloat($invItemPrice.text().replace('$', ''));
          cy.wrap($invItem1).find('[data-test*="add-to-cart"]').click();
        });
    });
    InventoryPage.pickItemRandomly().then(($invItem2) => {
      cy.wrap($invItem2)
        .find('div.inventory_item_price')
        .then(($invItemPrice) => {
          itemPrice2 = parseFloat($invItemPrice.text().replace('$', ''));
          cy.wrap($invItem2).find('[data-test*="add-to-cart"]').click();
        });
    });
    HeaderModal.shoppingCartIcon.click();
    CartPage.checkoutButton.click();
    CheckoutPage.fillFields(Users.standard);
    CheckoutPage.continueButton.click().then(() => {
      const expectedSubtotal = itemPrice1 + itemPrice2;
      const expectedTax = expectedSubtotal * 0.08;
      const expectedTotal = expectedSubtotal + expectedTax;
      CheckoutPage.subtotalLabel.should('contain.text', expectedSubtotal.toFixed(2));
      CheckoutPage.taxLabel.should('contain.text', expectedTax.toFixed(2));
      CheckoutPage.totalLabel.should('contain.text', expectedTotal.toFixed(2));
      CheckoutPage.finishButton.click();
      CheckoutPage.completePonyImage.should('be.visible');
      CheckoutPage.returnToInventoryButton.click();
      // If the bage isn't displayed, then no items are registered as added
      HeaderModal.shoppingCartBadge.should('not.exist');
    });
  });

  it('Field information is required to checkout', () => {
    InventoryPage.pickItemRandomly().find('[data-test*="add-to-cart"]').click();
    HeaderModal.shoppingCartIcon.click();
    CartPage.checkoutButton.click();
    CheckoutPage.continueButton.click();
    // Verify the error container appesrs, and that a label from the next screen doesn't appear
    CheckoutPage.fieldErrorContainer.should('be.visible');
    CheckoutPage.subtotalLabel.should('not.exist');
  });
});
