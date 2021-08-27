class GeneralPage {
  static get mainElement() {
    return cy.get(`#main`);
  }

  static get headerLink() {
    return cy.get('.topbar > h1 > a');
  }

  /**
   * Open the class's page.
   * @param {String} path - Appends the provided text onto the baseUrl.
   */
  static open(path: string = '/') {
    cy.visit(path);
    this.waitForPageShown();
  }

  /**
   * Wait for the class to be (in)visible.
   * @param {Boolean} visibility - Controls whether you wish for the page to be visible or not.
   */
  static waitForPageShown(visibility: boolean = true) {
    return visibility ? this.mainElement.should('be.visible') : this.mainElement.should('not.be.visible');
  }
}

export default GeneralPage;
