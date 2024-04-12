/// <reference types="cypress" />

describe('Client books multiple services at once', () => {
    before(() => {
      // Marc logs in
      cy.visit('http://localhost:3000/login'); // Adjust the URL if necessary
      cy.get('input[name="email"]').type('marc@example.com');
      cy.get('input[name="password"]').type('marcPassword'); // Use the real password
      cy.get('button[type="submit"]').click();
  
      // Assuming there is a redirection to the dashboard after login
      cy.url().should('include', '/dashboard');
    });
  
    it('Marc books multiple services provided by Julian', () => {
      // Navigate to the service booking page
      cy.visit('http://localhost:3000/services'); // Adjust URL to your app's services page
  
      // Select multiple services by Julian
      // Assuming services are listed with checkboxes or similar elements
      cy.get('input[name="service1"]').check(); // Check the first service
      cy.get('input[name="service2"]').check(); // Check the second service
      cy.get('input[name="service3"]').check(); // Check the third service
  
      // Enter any required information, such as date, time, or special requests
      cy.get('input[name="date"]').type('2024-05-20'); // Set a common date for all services
  
      // Submit the booking form
      cy.get('form#bookingForm').submit();
  
      // Check for a confirmation message or redirection to a confirmation page
      cy.contains('Booking confirmed for multiple services'); // Adjust the text to match what your application would actually show
      // Alternatively, check the URL if there is a redirection to a booking confirmation page
      cy.url().should('include', '/booking-confirmation');
    });
  });
  