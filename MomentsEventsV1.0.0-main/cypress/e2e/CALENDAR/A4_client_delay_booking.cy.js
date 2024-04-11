/// <reference types="cypress" />

describe('Client checks availability but delays booking', () => {
    before(() => {
      // Amélie logs in
      cy.visit('http://localhost:3000/login'); // Adjust the URL if necessary
      cy.get('input[name="email"]').type('amelie@example.com');
      cy.get('input[name="password"]').type('amelie123@'); // Use the real password
      cy.get('button[type="submit"]').click();
  
      // Assuming there is a redirection to the dashboard after login
      cy.url().should('include', '/dashboard');
    });
  
    it('Amélie checks Julian’s availability for March 15 but does not book immediately', () => {
      // Navigate to the search page
      cy.visit('http://localhost:3000/search-availability'); // Adjust URL to your app's search page
  
      // Enter Julian's name in the search field
      cy.get('input[name="photographerName"]').type('Julian');
  
      // Select the specific date
      cy.get('input[name="date"]').type('2024-03-15');
  
      // Submit the search form
      cy.get('form#searchForm').submit();
  
      // Assuming the application shows availability and a 'Book Now' button for that specific date
      cy.get('#availabilityList').should('contain', 'Julian');
      cy.get('#availabilityList').should('contain', '2024-03-15');
  
      // Check if 'Book Now' button is visible but do not click
      cy.get('button[id="bookNowButton"]').should('be.visible');
  
      // Optionally, simulate Amélie waiting or navigating away
      cy.wait(5000); // Wait for 5 seconds
      cy.visit('http://localhost:3000/another-page'); // Navigates away, adjust to a valid page
  
      // Further logic can be added here depending on the application's flow
    });
  });
  