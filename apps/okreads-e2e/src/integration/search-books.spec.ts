describe('When: Use the search feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should be able to search books by title', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);
  });

  it('Then: I should see search results as I am typing', () => {
    cy.get('input[type="search"]').type('ja');
    cy.wait(500);
    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);

    cy.get('input[type="search"]').type('vascript');
    cy.wait(500);
    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);

    cy.get('input[type="search"]').clear();
    cy.wait(500);
    cy.get('.empty').should('be.visible');
  });
});
