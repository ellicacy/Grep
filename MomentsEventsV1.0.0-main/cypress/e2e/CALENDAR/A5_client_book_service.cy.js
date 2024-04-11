/// <reference types="cypress" />

describe('Client books a service after checking availability', () => {
    before(() => {
      // Arthur logs in
      cy.visit('http://localhost:3000/login'); // Adjust the URL if necessary
      cy.get('input[name="email"]').type('arthur@example.com');
      cy.get('input[name="password"]').type('arthurPassword'); // Use the real password
      cy.get('button[type="submit"]').click();
  
      // Assuming there is a redirection to the dashboard after login
      cy.url().should('include', '/dashboard');
    });
  
    it('Arthur books Julian as a pizzaiolo for March 13, 2024', () => {
      // Navigate to the search availability page
      cy.visit('http://localhost:3000/search-availability'); // Adjust URL to your app's search page
  
      // Enter Julian's name in the search field and select the specific date
      cy.get('input[name="photographerName"]').type('Julian');
      cy.get('input[name="date"]').type('2024-03-13');
  
      // Submit the search form
      cy.get('form#searchForm').submit();
  
      // Assuming the application shows availability and a 'Book Now' button for that specific date
      cy.get('#availabilityList').should('contain', 'Julian');
      cy.get('#availabilityList').should('contain', '2024-03-13');
  
      // Click the 'Book Now' button to book the service
      cy.get('button[id="bookNowButton"]').click();
  
      // Check for a confirmation message or redirection to a confirmation page
      cy.contains('Booking confirmed'); // Adjust the text to match what your application would actually show
      // Alternatively, check the URL if there is a redirection to a booking confirmation page
      cy.url().should('include', '/booking-confirmation');
    });
  });
  