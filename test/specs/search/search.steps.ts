import { When, Then } from 'cypress-cucumber-preprocessor/steps';
import SearchPage from '../../pages/search.page';

When(`I search for computer name {string}`, (name: string) => {
  SearchPage.searchFor(name);
});

Then(`at least one computer should be found`, () => {
  // Remove "computers found" and convert to integer, then do comparison
  SearchPage.resultsLabel.then(($reslabel) => {
    const count: number = parseInt($reslabel.text().replace(' computers found', ''));
    expect(count).to.be.greaterThan(0);
  });
});

Then(`the {string} computer contains the name {string} in the list`, (row: string, name: string) => {
  let rowInt: number = parseInt(row.replace(/(\d+)(st|nd|rd|th)/g, '$1'));
  SearchPage.computerTableCell(rowInt, SearchPage.TableColumns.Name).contains(name, { matchCase: false });
});
