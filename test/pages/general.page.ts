export default class GeneralPage {
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
   * @param path - Appends the provided text onto the baseUrl.
   */
  open(path: string = '/') {
    cy.visit(path, { failOnStatusCode: false });
  }

  /**
   * Wait for the class to be (in)visible
   * @param visibility - Controls whether you wish for the page to be visible or not.
   */
  waitForPageShown(visibility: boolean = true) {
    return visibility ? this.mainElement.should('be.visible') : this.mainElement.should('not.be.visible');
  }
}
