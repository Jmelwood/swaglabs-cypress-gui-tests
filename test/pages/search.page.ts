import GeneralPage from './general.page';

enum TableColumns {
  Name = 1,
  Introduced,
  Discontinued,
  Company
}

class SearchPage extends GeneralPage {
  static readonly TableColumns = TableColumns;

  static get resultsLabel() {
    return this.mainElement.find(`h1`);
  }

  static get searchField() {
    return cy.get(`#searchbox`);
  }

  static get searchButton() {
    return cy.get(`#searchsubmit`);
  }

  static get addComputerButton() {
    return cy.get(`#add`);
  }

  static get computerNameTableHeader() {
    return cy.get(`th.col-name > a`);
  }

  static get introducedTableHeader() {
    return cy.get(`th.col-introduced > a`);
  }

  static get discontinuedTableHeader() {
    return cy.get(`th.col-discontinued > a`);
  }

  static get companyTableHeader() {
    return cy.get(`th.col-company > a`);
  }

  /**
   * Returns the table cell specified.
   * @param {Number} row - Which row?
   * @param {Number} col - Which column?
   * @returns {Cypress.Chainable<any>} - The Cypress element for the given table cell.
   */
  static computerTableCell(row: number, col: number): Cypress.Chainable<any> {
    return cy.get(`table.computers > tbody > tr:nth-child(${row}) > td:nth-child(${col})`);
  }

  /**
   * Input and search for the provided search term.
   * @param {String} name - The computer name to search for.
   */
  static searchFor(name: string) {
    this.searchField.type(name);
    this.searchButton.click();
  }
}

export default SearchPage;
