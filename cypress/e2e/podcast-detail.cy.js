describe('Podcast Navigation', () => {
  it('should navigate to podcast detail page and show episodes', () => {
    cy.visit('/');

    cy.wait(20000);

    cy.get('a[href="/podcast/1535809341"]').click();

    cy.wait(20000);

    cy.get('h4').contains('Episodes').should('exist');
    cy.get('a').contains('Episode 756').should('exist');
  });

  it('should navigate back to the homepage', () => {
    cy.visit('/podcast/11535809341');
    cy.get('a').contains('PodcastApp').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
