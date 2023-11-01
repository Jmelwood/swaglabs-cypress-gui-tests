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

  /**
   * Removes the specified item name from the shopping cart.
   * @param itemName - The name of the item to be removed.
   */
  clickRemoveFromCart(itemName: string) {
    const itemId = itemName.replace(/\s/g, '-').toLowerCase();
    this.removeFromCartButton(itemId).click();
  }

  open() {
    super.open('cart.html');
  }
}

export default new CartPage();
