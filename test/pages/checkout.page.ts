import GeneralPage from './general.page.js';

class CheckoutPage extends GeneralPage {
  constructor() {
    super('Checkout', 'div.checkout_info_container');
  }

  get headerLabel() {
    return cy.get('span.title');
  }

  get firstNameField() {
    return cy.get('input[data-test="firstName"]');
  }

  get lastNameField() {
    return cy.get('input[data-test="lastName"]');
  }

  get zipCodeField() {
    return cy.get('input[data-test="postalCode"]');
  }

  get fieldErrorContainer() {
    return cy.get('div.error-message-container');
  }

  get subtotalLabel() {
    return cy.get('div.summary_subtotal_label');
  }

  get taxLabel() {
    return cy.get('div.summary_tax_label');
  }

  get totalLabel() {
    return cy.get('div.summary_total_label');
  }

  get continueButton() {
    return cy.get('input[data-test="continue"]');
  }

  get cancelButton() {
    return cy.get('button[data-test="cancel"]');
  }

  get finishButton() {
    return cy.get('button[data-test="finish"]');
  }

  get returnToInventoryButton() {
    return cy.get('button[data-test="back-to-products"]');
  }

  get completeContainer() {
    return cy.get('div.checkout_complete_container');
  }

  get completePonyImage() {
    return cy.get('img.pony_express');
  }

  /**
   * Fills out the fields and then submits to the next checkout step
   * @param customerInfo - An object that includes the full name and zip code of the customer's information.
   */
  fillFields(customerInfo: { firstName: string; lastName: string; zipCode: string }) {
    this.firstNameField.type(customerInfo.firstName);
    this.lastNameField.type(customerInfo.lastName);
    this.zipCodeField.type(customerInfo.zipCode);
  }
}

export default new CheckoutPage();
