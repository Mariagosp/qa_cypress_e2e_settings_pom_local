/// <reference types="cypress" />
/// <reference types="../support" />

import HomePageObject from "../support/pages/home.pageObject";

describe('Settings page', () => {
  const homePage = new HomePageObject();

  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.login(user.email, user.username, user.password);
  });

  it.only('should provide an ability to update username', () => {
    homePage.visit('/settings');
    cy.getByDataCy('username').clear().type('Mariia');
    cy.getByDataCy('save-settings').click();
    // cy.getByDataCy('save-settings').click();
  });

  it('should provide an ability to update bio', () => {

  });

  it('should provide an ability to update an email', () => {

  });

  it('should provide an ability to update password', () => {

  });

  it('should provide an ability to log out', () => {

  });
});
