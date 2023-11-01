Feature: Menu Bar
  As a user, I can interact with the menu bar to take general actions, like managing login/app state.

  Background:
    Given I am logged into the website as the "standard" user

  Scenario: User navigates to their shopping cart
    When I click on the shopping cart icon
    Then I will see the "Cart" page

  Scenario: User can return back to the inventory list page
    # Need to navigate elsewhere first to ensure this button actually works
    Given I click on the shopping cart icon
    When I click on the "All Items" menu link
    Then I will see the "Inventory" page
    And "inventory" is part of the page's URL

  Scenario: User can learn more about the website
    # Cypress runner has trouble handling the loading of the website for some reason, so it's disabled for now.
    Given I need to skip this test for now
  # When I click on the "About" menu link
  # Then "saucelabs.com" is part of the page's URL

  Scenario: User can successfully log out and return to the login page
    When I click on the "Logout" menu link
    Then I will see the "Login" page
    And I do not have an authentication token