
describe('Star Wars Character List', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/people/?page=1').as('getCharacters');
    cy.intercept('GET', '**/api/people/1').as('getCharacterDetails');
    cy.visit('/');

    cy.wait('@getCharacters');
  });

  it('should display the Star Wars logo', () => {
    cy.get('img').should('have.attr', 'alt', 'Star Wars Logo');
  });

  it('should display the Character List and navigate', () => {
    cy.get('h3').contains('Character List');

    cy.get('table').within(() => {
      cy.contains('th', 'Name');
      cy.contains('th', 'Gender');
      cy.contains('th', 'Home Planet');
    });
    cy.contains('td', 'Luke Skywalker').should('be.visible').click();
    cy.wait('@getCharacterDetails');
    cy.url().should('include', '/characters/1');

    cy.get('h3').contains('Luke Skywalker').should('be.visible');

    
    cy.get('[data-testid="character-back-button"]').should('be.visible').click();
    cy.url().should('include', '/characters');
    cy.wait('@getCharacters');

  });

  it('should handle search functinality', () => {
    cy.get('[data-testid="character-list-search-input"]').should('be.visible').type('Darth Maul');
    cy.contains('td', 'Darth Maul').should('be.visible');  
  });

  it('should navigate to the next page and back', () => {
    cy.intercept('GET', '**/api/people/?page=2').as('getCharactersPage2');
    cy.get('button').contains('Next Page').should('be.visible').click();
    cy.wait('@getCharactersPage2');
    cy.contains('Current Page: 2').should('be.visible');
    cy.get('button').contains('Previous Page').should('be.visible').click();
    cy.wait('@getCharacters');
    cy.contains('Current Page: 1').should('be.visible');
  });
    
    it('should manage favorites', () => {
      cy.contains('td', 'Luke Skywalker').should('be.visible').click();
      cy.wait('@getCharacterDetails');
      cy.get('[aria-label="toggle favorites button"]').should('be.visible').click();
      cy.contains('Favorites').should('be.visible').click();
      cy.url().should('include', '/favorites');
      cy.contains('td', 'Luke Skywalker').should('be.visible');
      cy.get('[aria-label="remove from favorites button"]').should('be.visible').click();
      cy.contains('td', 'Luke Skywalker').should('not.exist');
    });
});