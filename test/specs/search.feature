Feature: Search Computer Database

  Scenario: Search for a computer
    Given I open the main page
    When I search for computer name "apple"
    Then at least one computer should be found
    And the "1st" computer contains the name "apple" in the list