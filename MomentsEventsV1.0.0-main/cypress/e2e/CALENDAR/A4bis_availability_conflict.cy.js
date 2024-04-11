/// <reference types="cypress" />

describe('Client attempts to book an already booked service', () => {
    before(() => {
      // Amélie logs in
      cy.visit('http://localhost:3000/login'); // Adjust the URL if necessary
      cy.get('input[name="email"]').type('amelie@example.com');
      cy.get('input[name="password"]').type('amelie123@'); // Use the real password
      cy.get('button[type="submit"]').click();
  
      // Assuming there is a redirection to the dashboard after login
      cy.url().should('include', '/dashboard');
    });
  
    it('Amélie attempts to book Julian as a pizzaiolo for March 13, 2024, but he is already booked', () => {
      // Navigate to the search availability page
      cy.visit('http://localhost:3000/search-availability'); // Adjust URL to your app's search page
  
      // Enter Julian's name in the search field and select the specific date
      cy.get('input[name="photographerName"]').type('Julian');
      cy.get('input[name="date"]').type('2024-03-13');
  
      // Submit the search form
      cy.get('form#searchForm').submit();
  
      // Assuming the application shows availability or lack thereof
      cy.get('#availabilityList').should('contain', 'Julian');
      cy.get('#availabilityList').should('contain', '2024-03-13');
  
      // Check if 'Book Now' button is visible or if a message indicates unavailability
      cy.get('button[id="bookNowButton"]').should('not.exist');
      cy.contains('Not available'); // Adjust the text to match what your application would actually show
    });
  });
  