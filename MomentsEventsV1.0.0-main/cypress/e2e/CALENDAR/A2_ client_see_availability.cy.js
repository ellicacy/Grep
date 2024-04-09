/// <reference types="cypress" />

describe('Client searches for photographer availability', () => {
    before(() => {
      // Simulate Margot logging in
      cy.visit('http://localhost:3000/login'); // Adjust URL if necessary
      cy.get('input[name="email"]').type('margot@example.com');
      cy.get('input[name="password"]').type('margot123@');
      cy.get('button[type="submit"]').click();
  
      // Assuming there is a redirection to the dashboard after login
      cy.url().should('include', '/dashboard');
    });
  
    it('Margot searches for Julian', () => {
      // Navigate to the search page
      cy.visit('http://localhost:3000/search-availability'); // Adjust URL to your app's search page
  
      // Enter Julian's name in the search field
      cy.get('input[name="photographerName"]').type('Julian');
  
      // Submit the search form
      cy.get('form#searchForm').submit();
  
      // Check that Julian's availability is displayed
      // This assumes your application renders Julian's available dates in an element with id `availabilityList`
      cy.get('#availabilityList').should('contain', 'Julian');
  
      // For a more specific test, you could also check for specific dates if known
      // cy.get('#availabilityList').should('contain', '2024-04-15'); // Example date
    });
  });
  