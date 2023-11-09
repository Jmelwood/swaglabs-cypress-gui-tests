import GeneralPage from './common.page.js';

class CartPage extends GeneralPage {
  constructor() {
    super('Cart', 'div.cart_contents_container');
  }

  get inventoryItems() {
    return cy.get('div.cart_item');
  }

  get inventoryItemNames() {
    return cy.get('div.inventory_item_name');
  }

  get inventoryItemSelector() {
    return 'div.inventory_item_name';
  }

  inventoryItemLink(itemName: string) {
    return cy.get(`div=${itemName}`);
  }

  get checkoutButton() {
    return cy.get('button[data-test="checkout"]');
  }

  get cancelButton() {
    return cy.get('button[data-test="continue-shopping"]');
  }

  removeFromCartButton(itemId: string) {
    return cy.get(`button[data-test="remove-${itemId}"]`);
  }

  get removeFromCartButtonSelector() {
    return 'button[data-test*="remove"]';
  }

  open() {
    super.open('cart.html');
  }
}

export default new CartPage();
