import { getGreeting } from '../support/app.po';

describe('web-web-commercial', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to web-web-commercial!');
  });
});
