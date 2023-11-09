Feature: Products Page
  As a user, I can view all the available products in inventory, learn more details about each one, and select items for purchase.

  Background:
    Given I am logged into the website as the "standard" user

  Scenario: Each product entry is fully loaded
    Given At least 1 inventory item is visible
    When I observe the image and description for each item
    Then There is a value loaded for each item

  Scenario: The item information on the inventory list matches its linked details page
    Given At least 1 inventory item is visible
    When I select an item at random from the product page
    Then The values on the item's details page matches those from the products list

  Scenario: Adding and removing an item to/from the cart is registered successfully
    Given At least 1 inventory item is visible
    When I select an item at random from the product page
    And I add this item to my shopping cart
    Then The shopping cart badge reports there is 1 item added to the cart
    And The text of the clicked button changes to "Remove"
    When I remove this item from my shopping cart
    Then The shopping cart badge reports there are 0 items added to the cart
    And The text of the clicked button changes to "Add to cart"

  Scenario: The sort dropdown rearranges the product list as expected
    Given At least 2 inventory items are visible
    When I change the product sorting order to "az"
    Then The products are sorted by "az"
    When I change the product sorting order to "za"
    Then The products are sorted by "za"
    When I change the product sorting order to "hilo"
    Then The products are sorted by "hilo"
    When I change the product sorting order to "lohi"
    Then The products are sorted by "lohi"