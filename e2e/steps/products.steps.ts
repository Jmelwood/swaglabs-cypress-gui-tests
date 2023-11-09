import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import InventoryPage from '../pages/inventory.page.js';
import ItemPage from '../pages/item.page.js';
import HeaderModal from '../pages/header.modal.js';
import type { CustomContext } from './common.steps.js';

Given('At least {int} inventory item(s) is/are visible', (itemAmt: number) => {
  InventoryPage.inventoryItems.should('have.length.gte', itemAmt);
});

When('I observe the image and description for each item', () => {
  InventoryPage.inventoryItemImages.as('inventoryItemImages');
  InventoryPage.inventoryItemDescriptions.as('inventoryItemDescriptions');
});

When('I select an item at random from the product page', function (this: CustomContext) {
  // Record the "expected" values for the chosen item to be passed in context
  this.expectedItemNames = [];
  this.expectedItemDescs = [];
  this.expectedItemPrices = [];
  this.expectedItemImages = [];
  InventoryPage.pickItemRandomly()
    .as('randomItem')
    .then(($invItem) => {
      cy.wrap($invItem)
        .find(InventoryPage.inventoryItemSelector)
        .then(($el) => {
          this.expectedItemNames.push($el.text());
        });
      cy.wrap($invItem)
        .find(InventoryPage.inventoryItemDescriptionSelector)
        .then(($el) => {
          this.expectedItemDescs.push($el.text());
        });
      cy.wrap($invItem)
        .find(InventoryPage.inventoryItemPriceSelector)
        .then(($el) => {
          this.expectedItemPrices.push($el.text());
        });
      cy.wrap($invItem)
        .find(InventoryPage.inventoryItemImageSelector)
        .then(($el) => {
          this.expectedItemImages.push($el.attr('src')!);
        });
    });
});

When('I add this item to my shopping cart', () => {
  cy.get('@randomItem').find(InventoryPage.addToCartButtonSelector).click();
});

When('I remove this item from my shopping cart', () => {
  cy.get('@randomItem').find(InventoryPage.removeFromCartButtonSelector).click();
});

When('I change the product sorting order to {string}', (sortingOrder: string) => {
  InventoryPage.sortDropdown.select(sortingOrder);
});

Then('There is a value loaded for each item', () => {
  // Check that all images are valid
  cy.get('@inventoryItemImages').each(($inventoryItemImage) => {
    expect($inventoryItemImage)
      .to.have.attr('src')
      .match(/static\/media/);
    const imageUrl = $inventoryItemImage.attr('src');
    cy.request(imageUrl!).should('have.property', 'status', 200);
  });
  // Check that all descriptions are filled with text
  cy.get('@inventoryItemDescriptions').each(($inventoryItemDesc) => {
    cy.wrap($inventoryItemDesc).should('not.be.empty');
  });
});

Then("The values on the item's details page matches those from the products list", function (this: CustomContext) {
  // Compare the values to those on the details page
  cy.get('@randomItem').find(InventoryPage.inventoryItemSelector).parent().click();
  ItemPage.itemName.then(($itemName) => {
    expect($itemName.text()).to.be.oneOf(this.expectedItemNames);
  });
  ItemPage.itemDescription.then(($itemDesc) => {
    expect($itemDesc.text()).to.be.oneOf(this.expectedItemDescs);
  });
  ItemPage.itemPrice.then(($itemPrice) => {
    expect($itemPrice.text()).to.be.oneOf(this.expectedItemPrices);
  });
  ItemPage.itemImage.then(($itemImage) => {
    expect($itemImage).to.have.attr('src').be.oneOf(this.expectedItemImages);
  });
});

Then('The shopping cart badge reports there is/are {int} item(s) added to the cart', (itemAmt: number) => {
  if (itemAmt < 1) {
    HeaderModal.shoppingCartBadge.should('not.exist');
  } else {
    HeaderModal.shoppingCartBadge.invoke('text').should('eq', itemAmt.toString());
  }
});

Then('The text of the clicked button changes to {string}', (buttonText: string) => {
  switch (buttonText) {
    case 'Add to cart':
      cy.get('@randomItem').find(InventoryPage.addToCartButtonSelector).should('be.visible');
      break;
    case 'Remove':
      cy.get('@randomItem').find(InventoryPage.removeFromCartButtonSelector).should('be.visible');
      break;
    default:
      break;
  }
});

Then('The products are sorted by {string}', (sortingOrder: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let sortingFn: ((a: any, b: any) => number) | undefined;
  switch (sortingOrder) {
    case 'az':
      sortingFn = (a: string, b: string) => (b > a ? -1 : 1);
      break;
    case 'za':
      sortingFn = (a: string, b: string) => (a > b ? -1 : 1);
      break;
    case 'lohi':
      sortingFn = (a: number, b: number) => a - b;
      break;
    case 'hilo':
      sortingFn = (a: number, b: number) => b - a;
      break;
  }
  if (sortingOrder === 'hilo' || sortingOrder === 'lohi') {
    InventoryPage.inventoryItemPrices.as('itemValues');
  } else {
    InventoryPage.inventoryItemNames.as('itemValues');
  }
  cy.get('@itemValues').then(($items) => {
    let values: string[] | number[] = [...$items].map((item) => item.innerText);
    if (sortingOrder === 'hilo' || sortingOrder === 'lohi') {
      values = values.map((item) => parseFloat(item.replace('$', '')));
    }
    expect(values).to.have.ordered.members([...values].sort(sortingFn));
  });
});
