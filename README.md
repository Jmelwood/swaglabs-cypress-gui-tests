# Swaglabs Cypress GUI Tests

## Summary

Automated end-to-end GUI tests for SauceLabs' ["SwagLabs"](https://saucedemo.com) test website, mainly to play around with a simple [Cypress](https://cypress.io) automation framework setup. Cypress is both the test runner and asserter, paired with the [Mocha](https://mochajs.org) test framework.

## Prerequisites

- Google Chrome (last tested with version 118)
- Node.js (last tested with version LTS 18.18.2)

## How to run tests

1. Clone this repository (`git clone https://github.com/Jmelwood/swaglabs-cypress-gui-tests.git`)
2. Navigate to the root of the folder and install the dependencies (`cd swaglabs-cypress-gui-tests && yarn`)
3. Run all tests with the following command: `yarn test`
4. You can also run them headed with `yarn test:gui`
