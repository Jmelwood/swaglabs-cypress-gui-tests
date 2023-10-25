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
}
