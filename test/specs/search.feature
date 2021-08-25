Feature: Search Computer Database

  @focus
  Scenario: Search for a computer
    Given I open the main page
    When I search for computer name "gateway"
    Then I see a computer named "gateway" in the list