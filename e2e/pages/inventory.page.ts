import GeneralPage from './general.page.js';

class InventoryPage extends GeneralPage {
  constructor() {
    super('Inventory', 'div.inventory_container');
  }

  get subheaderLabel() {
    return cy.get('span.title');
  }

  get sortDropdown() {
    return cy.get('select.product_sort_container');
  }

  get inventoryItems() {
    return cy.get('div.inventory_item');
  }

  get inventoryItemImages() {
    return cy.get('div.inventory_item_img > a > img');
  }

  get inventoryItemNames() {
    return cy.get('div.inventory_item_name');
  }

  get inventoryItemDescriptions() {
    return cy.get('div.inventory_item_desc');
  }

  get inventoryItemPrices() {
    return cy.get('div.inventory_item_price');
  }

  inventoryItemLink(itemName: string) {
    return cy.get(`div=${itemName}`);
  }

  open() {
    super.open('inventory.html');
  }

  addToCartButton(itemId: string) {
    return cy.get(`[data-test="add-to-cart-${itemId}"]`);
  }

  removeFromCartButton(itemId: string) {
    return cy.get(`[data-test="remove-${itemId}"]`);
  }

  /**
   * Picks an item randomly from the list of inventory items, to keep test data dynamic.
   * @returns A random element from the inventory items
   */
  pickItemRandomly() {
    return this.inventoryItems.then(($items) => {
      return Cypress._.sample($items.toArray());
    });
  }

  /**
   * Adds the specified item name to the shopping cart.
   * @param itemId The item's id
   */
  clickAddToCart(itemId: string) {
    this.addToCartButton(itemId).click();
  }

  /**
   * Removes the specified item name from the shopping cart.
   * @param itemId The item's id
   */
  clickRemoveFromCart(itemId: string) {
    this.removeFromCartButton(itemId).click();
  }
}

export default new InventoryPage();
