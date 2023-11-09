import GeneralPage from './common.page.js';

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

  get inventoryItemImageSelector() {
    return 'div.inventory_item_img > a > img';
  }

  get inventoryItemNames() {
    return cy.get('div.inventory_item_name');
  }

  get inventoryItemSelector() {
    return 'div.inventory_item_name';
  }

  get inventoryItemDescriptions() {
    return cy.get('div.inventory_item_desc');
  }

  get inventoryItemDescriptionSelector() {
    return 'div.inventory_item_desc';
  }

  get inventoryItemPrices() {
    return cy.get('div.inventory_item_price');
  }

  get inventoryItemPriceSelector() {
    return 'div.inventory_item_price';
  }

  inventoryItemLink(itemName: string) {
    return cy.get(`div=${itemName}`);
  }

  open() {
    super.open('inventory.html');
  }

  get addToCartButtonSelector() {
    return '[data-test*="add-to-cart"]';
  }

  addToCartButton(itemId: string) {
    return cy.get(`[data-test="add-to-cart-${itemId}"]`);
  }

  removeFromCartButton(itemId: string) {
    return cy.get(`[data-test="remove-${itemId}"]`);
  }

  get removeFromCartButtonSelector() {
    return 'button[data-test*="remove"]';
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
}

export default new InventoryPage();
