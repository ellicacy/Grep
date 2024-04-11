/// <reference types="cypress" />

describe('Photographer updates his availability settings', () => {
    before(() => {
      // Julian logs in
      cy.visit('http://localhost:3000/login'); // Adjust the URL if necessary
      cy.get('input[name="email"]').type('julian@example.com');
      cy.get('input[name="password"]').type('juliansSecurePassword'); // Use the real password
      cy.get('button[type="submit"]').click();
  
      // Assuming there is a redirection to the dashboard after login
      cy.url().should('include', '/dashboard');
    });
  
    it('Julian updates his pizzaiolo availability, excluding Mondays', () => {
      // Navigate to the availability settings page
      cy.visit('http://localhost:3000/availability-settings'); // Adjust URL to your app's availability settings page
  
      // Julian unchecks the Monday checkbox to indicate he is no longer available on Mondays
      cy.get('input[name="monday"]').uncheck();
  
      // Julian may also update other days or settings if required by the app's logic
      // For example, confirming he's now available on Sundays
      cy.get('input[name="sunday"]').check();
  
      // Submit the updated availability settings
      cy.get('form#availabilityForm').submit();
  
      // Check for a confirmation message or redirection to a confirmation page
      cy.contains('Availability updated successfully'); // Adjust the text to match what your application would actually show
      // Alternatively, check the URL if there is a redirection to an updated confirmation page
      cy.url().should('include', '/availability-updated');
    });
  });
  