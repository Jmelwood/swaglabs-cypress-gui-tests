Feature: Login/Authentication

  As a user, I will have a login experience that captures the state of my account.

  Background:
    Given I am a new visitor
    And I navigate to the "Login" page

  Scenario: A standard user can log in successfully
    When I try to login with the "standard" user account
    Then I will see the "Inventory" page

  Scenario: A locked out user cannot access the Products page
    When I try to login with the "locked_out" user account
    Then I will see the "Login" page
    And I will see an error message specifying I "has been locked out"

  Scenario: Trying to access a page directly without authentication fails
    When I navigate to the "Inventory" page
    Then I will see the "Login" page
    And I will see an error message specifying I "can only access '/inventory.html' when you are logged in."