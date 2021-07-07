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

  it('Then: I should be able to mark a book as finished', () => {
    cy.get('input[type="search"]').type('javascript');
    cy.get('form').submit();
    cy.get('[data-testing="want-to-read-button"]:not([disabled])')
      .first()
      .click();

    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('[data-testing="unfinished-books"]').should(
      'have.length.at.least',
      1
    );
    cy.get('[data-testing="finish-button"]').first().click();
    cy.get('[data-testing="finished-books"]').should('have.length.at.least', 1);
    cy.get('[data-testing="finished-books"] [data-testing="remove-button"]')
      .first()
      .click();
  });
});
