import GeneralPage from './common.page.js';

class HeaderModal extends GeneralPage {
  constructor() {
    super('Header', 'div.header_container');
  }

  get menuIcon() {
    return cy.get('div.bm-burger-button');
  }

  get mainLogo() {
    return cy.get('div.app_logo');
  }

  get shoppingCartIcon() {
    return cy.get('div.shopping_cart_container');
  }

  get shoppingCartBadge() {
    return cy.get('span.shopping_cart_badge');
  }

  get menuList() {
    return cy.get('div.bm-menu');
  }

  get allItemsLink() {
    return cy.get('a#inventory_sidebar_link');
  }

  get aboutLink() {
    return cy.get('a#about_sidebar_link');
  }

  get logoutLink() {
    return cy.get('a#logout_sidebar_link');
  }

  get resetAppLink() {
    return cy.get('a#reset_sidebar_link');
  }

  clickAllItems() {
    this.menuIcon.click();
    this.allItemsLink.click();
  }

  clickAbout() {
    this.menuIcon.click();
    this.aboutLink.click();
  }

  clickLogout() {
    this.menuIcon.click();
    this.logoutLink.click();
  }

  clickResetAppState() {
    this.menuIcon.click();
    this.resetAppLink.click();
  }
}

export default new HeaderModal();
