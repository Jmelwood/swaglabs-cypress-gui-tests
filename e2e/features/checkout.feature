Feature: Checkout from store
  As a user, I can finish my shopping and pay for the items I added to my cart.

  Background:
    Given I am logged into the website as the "standard" user

  Scenario: The checkout page reflects the items I chose from the inventory item
    Given I randomly add 5 items to my shopping cart
    When I click on the shopping cart icon
    Then I see all of the items I added from the inventory page

  Scenario: User can complete their shopping experience successfully
    Given I randomly add 2 items to my shopping cart
    And I click on the shopping cart icon
    When I click the checkout button
    Then I can fill out the "standard" personal information on the checkout page
    When I click the continue button
    Then All the calculated amounts are accurate
    When I click the finish button
    Then The final submission is successfully processed

  Scenario: Field information is required to checkout
    Given I randomly add 1 item to my shopping cart
    And I click on the shopping cart icon
    And I click the checkout button
    When I click the continue button
    Then I should not advance to the order summary page
    And I will see an error message specifying that "First Name is required"