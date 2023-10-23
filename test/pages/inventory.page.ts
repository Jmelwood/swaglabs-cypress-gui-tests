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
   * Picks an item randomly, to keep test data dynamic.
   * @returns The chosen item's name, description, and price
   */
  pickItemRandomly() {
    const itemNames: string[] = [],
      itemDescriptions: string[] = [],
      itemPrices: string[] = [];
    this.inventoryItemNames.each((item) => {
      itemNames.push(item.text());
    });
    this.inventoryItemDescriptions.each((item) => {
      itemDescriptions.push(item.text());
    });
    this.inventoryItemPrices.each((item) => {
      itemPrices.push(item.text());
    });
    const choice = chance.integer({ min: 0, max: itemNames.length - 1 });
    const randomItem = {
      name: itemNames[choice],
      description: itemDescriptions[choice],
      price: itemPrices[choice]
    };
    return randomItem;
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
