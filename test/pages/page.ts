export default abstract class Page {
  name: string;
  selector: string;

  constructor(name: string, selector: string) {
    this.name = name;
    this.selector = selector;
  }

  get mainElement() {
    return cy.get(this.selector);
  }

  /**
   * Open the class's page.
   * @param {String} path - Appends the provided text onto the baseUrl.
   */
  open(path: string = '/') {
    cy.visit(path, { failOnStatusCode: false });
  }

  /**
   * Wait for the class to be (in)visible
   * @param {Boolean} visibility - Controls whether you wish for the page to be visible or not.
   */
  isPageShown(visibility: boolean = true) {
    return visibility ? this.mainElement.should('be.visible') : this.mainElement.should('not.be.visible');
  }
}
