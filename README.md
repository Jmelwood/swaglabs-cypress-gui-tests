# Computers Database GUI Tests

## Summary

Automated end-to-end GUI tests for Gatlings' ["Computers database"](https://computer-database.gatling.io) test website, mainly to play around with a simple [Cypress v8](https://cypress.io) automation framework setup. Cypress is both the test runner and asserter, paired with the [Cucumber](https://cucumber.io) test framework.

The goal of these tests are purely demonstrative of techniques for using Cypress with Cucumber, rather than actual testing of the chosen dummy/unfinished website.

## Prerequisites

- Google Chrome (last tested with version 92)
- Node.js (last tested with version LTS 14.17.5)

## How to run tests

1. Clone this repository (`git clone https://github.com/Jmcosel/compdb-cypress-gui-tests.git`)
2. Navigate to the root of the folder and install the dependencies (`cd compdb-cypress-gui-tests && npm i`)
3. Run all tests with the following node command: `npx cypress`
