/// <reference types="cypress" />
/// <reference types="../support" />

import HomePageObject from '../support/pages/home.pageObject';

describe('Settings page', () => {
  const homePage = new HomePageObject();

  let user;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser')
      .then((generateUser) => {
        user = generateUser;
      })
      .then(() => cy.login(user.email, user.username, user.password));
    homePage.visit('/settings');
  });

  it('should provide an ability to update username', () => {
    cy.getByDataCy('username').clear().type('Mariia');
    cy.getByDataCy('save-settings').click();
    cy.getByDataCy('profile-link').should('contain.text', 'mariia');
  });

  it('should provide an ability to update bio', () => {
    cy.getByDataCy('bio').clear().type('my life');
    cy.getByDataCy('save-settings').click();
    cy.contains('my life');
  });

  it('should provide an ability to update an email', () => {
    cy.getByDataCy('email').clear().type('new@gmail.com');
    cy.getByDataCy('save-settings').click();
    homePage.visit('/settings');
    // cy.contains('new@gmail.com');
    cy.getByDataCy('email').should('have.value', 'new@gmail.com');
  });

  it('should provide an ability to update password', () => {
    cy.getByDataCy('password').clear().type('newPass');
    cy.getByDataCy('save-settings').click();
  });

  it('should provide an ability to log out', () => {
    cy.getByDataCy('log-out').click();

    cy.getByDataCy('profile-link').should('not.exist');

    cy.getByDataCy('sign-in').should('be.visible');
  });
})
