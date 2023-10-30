import InventoryPage from '../pages/inventory.page.js';
import ItemPage from '../pages/item.page.js';
import HeaderModal from '../pages/header.modal.js';
import LoginPage from '../pages/login.page.js';
import Users from '../../cypress/fixtures/users.js';

describe('Products Page', () => {
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

  it('Each product entry is fully loaded', () => {
    InventoryPage.inventoryItems.should('have.length.gte', 1);
    // Check that all images are valid
    InventoryPage.inventoryItemImages.each(($inventoryItemImage) => {
      expect($inventoryItemImage)
        .to.have.attr('src')
        .match(/static\/media/);
      const imageUrl = $inventoryItemImage.attr('src');
      cy.request(imageUrl!).should('have.property', 'status', 200);
    });
    // Check that all descriptions are filled with text
    InventoryPage.inventoryItemDescriptions.each(($inventoryItemDesc) => {
      cy.wrap($inventoryItemDesc).should('not.be.empty');
    });
  });

  it('The item information on the inventory list matches its linked details page', () => {
    // Pick an item at random
    InventoryPage.pickItemRandomly().then(($invItem) => {
      // Record the "expected" values for the chosen item
      let itemName = '',
        itemDesc = '',
        itemPrice = '',
        itemImage = '';
      cy.wrap($invItem)
        .find('div.inventory_item_name')
        .then(($el) => {
          itemName = $el.text();
        });
      cy.wrap($invItem)
        .find('div.inventory_item_desc')
        .then(($el) => {
          itemDesc = $el.text();
        });
      cy.wrap($invItem)
        .find('div.inventory_item_price')
        .then(($el) => {
          itemPrice = $el.text();
        });
      cy.wrap($invItem)
        .find('div.inventory_item_img > a > img')
        .then(($el) => {
          itemImage = $el.attr('src')!;
        });
      // Compare the values to those on the details page
      cy.wrap($invItem).find('div.inventory_item_name').parent().click();
      ItemPage.itemName.then(($itemName) => {
        expect($itemName).to.contain.text(itemName);
      });
      ItemPage.itemDescription.then(($itemDesc) => {
        expect($itemDesc).to.contain.text(itemDesc);
      });
      ItemPage.itemPrice.then(($itemPrice) => {
        expect($itemPrice).to.contain.text(itemPrice);
      });
      ItemPage.itemImage.then(($itemImage) => {
        expect($itemImage).to.have.attr('src').eql(itemImage);
      });
    });
  });

  it('Adding and removing an item to/from the cart is registered/remembered successfully', () => {
    // Pick an item at random
    InventoryPage.pickItemRandomly().then(($invItem1) => {
      // Remember the name of the inventory item, as it has to be re-found after navigating through pages
      cy.wrap($invItem1)
        .find('div.inventory_item_name')
        .then(($invItemName) => {
          const invItemName = $invItemName.text();
          cy.wrap($invItem1).find('[data-test*="add-to-cart"]').click();
          HeaderModal.shoppingCartBadge.invoke('text').should('eq', '1');
          // The text for the item detail's "cart" button should be to "remove", rather than "add"
          cy.wrap($invItem1).find('div.inventory_item_name').parent().click();
          cy.get(`button[data-test*="remove"]`).should('be.visible');
          // Return back to inventory page and actually remove it
          ItemPage.backButton.click();
          // Get new instance of $invItem
          InventoryPage.inventoryItems.contains(invItemName).parent().parent().parent().as('invItem2');
          cy.get('@invItem2').find(`button[data-test*="remove"]`).click();
          HeaderModal.shoppingCartBadge.should('not.exist');
          // The text for the item detail's "cart" button should be to "add" once more, rather than "remove"
          cy.get('@invItem2').find('div.inventory_item_name').parent().click();
          cy.get(`button[data-test*="add-to-cart"]`).should('be.visible');
        });
    });
  });

  it('The sort dropdown rearranges the product list as expected', () => {
    // First check the default, item names (A-Z)
    InventoryPage.inventoryItemNames.then(($items) => {
      const values = [...$items].map((item) => item.innerText);
      expect(values).to.have.ordered.members([...values].sort((a, b) => (b > a ? -1 : 1)));
    });
    // Check item names (Z-A)
    InventoryPage.sortDropdown.select('za');
    InventoryPage.inventoryItemNames.then(($items) => {
      const values = [...$items].map((item) => item.innerText);
      expect(values).to.have.ordered.members([...values].sort((a, b) => (a > b ? -1 : 1)));
    });
    // Check item prices (low -> high)
    InventoryPage.sortDropdown.select('lohi');
    InventoryPage.inventoryItemPrices.then(($items) => {
      const values = [...$items].map((item) => parseFloat(item.innerText.replace('$', '')));
      expect(values).to.have.ordered.members([...values].sort((a, b) => a - b));
    });
    // Check item prices (high -> low)
    InventoryPage.sortDropdown.select('hilo');
    InventoryPage.inventoryItemPrices.then(($items) => {
      const values = [...$items].map((item) => parseFloat(item.innerText.replace('$', '')));
      expect(values).to.have.ordered.members([...values].sort((a, b) => b - a));
    });
  });
});
