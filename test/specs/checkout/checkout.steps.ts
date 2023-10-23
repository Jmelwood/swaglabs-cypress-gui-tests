import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import InventoryPage from '../../pages/inventory.page.js';
import CartPage from '../../pages/cart.page.js';
import HeaderModal from '../../pages/header.modal.js';
import { nameToId } from '../../util/misc.js';

type Item = {
  name: string;
  description: string;
  price: string;
};

const expectedItems: Item[] = [];

Given('I pick {int} item(s) to buy', (count: number) => {
  for (let i = 1; i <= count; i++) {
    let newItem: Item;
    do {
      newItem = InventoryPage.pickItemRandomly();
    } while (
      expectedItems.some((item: Item) => {
        item.name === newItem.name;
      })
    );
    expectedItems.push(newItem);
    expectedItems.forEach((item) => {
      const elementId = nameToId(item.name);
      InventoryPage.clickAddToCart(elementId);
    });
  }
});

When('I click the shopping cart icon', () => {
  HeaderModal.shoppingCartIcon.click();
});

When('I remove my item(s) from the cart', () => {
  expectedItems.forEach((item) => {
    const elementId = nameToId(item.name);
    InventoryPage.clickRemoveFromCart(elementId);
  });
});

Then('I {string} find my item(s) in the cart', (visibility: string) => {
  CartPage.inventoryItems.each((actualItem) => {
    const actualItemName = actualItem.text();
    if (visibility.includes('not')) {
      expectedItems.every((expectedItem) => {
        expectedItem.name !== actualItemName;
      });
    } else {
      expectedItems.some((expectedItem) => {
        expectedItem.name === actualItemName;
      });
    }
  });
});
