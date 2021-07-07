describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  it('Then I should able to undo removal from reading list', () => {
    cy.get('input[type="search"]').type('javascript');
    cy.get('form').submit();

    cy.get('[data-testing="want-to-read-button"]:not([disabled])')
      .first()
      .click();
    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('.reading-list-item')
      .then(items => items.length)
      .then(length => {
        cy.get('[data-testing="remove-button"]').first().click();
        cy.get('.mat-simple-snackbar button').should('have.length', 1);
        cy.get('.mat-simple-snackbar button').click();

        cy.get('.reading-list-item').then(items => {
          expect(items.length).eq(length);
          cy.get('[data-testing="remove-button"]').first().click();
        });
      });
  });
});
