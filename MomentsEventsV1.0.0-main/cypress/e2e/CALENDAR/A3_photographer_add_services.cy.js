/// <reference types="cypress" />

describe('Photographer adds services', () => {
    before(() => {
      // Julian logs in
      cy.visit('http://localhost:3000/login'); // Adjust URL if necessary
      cy.get('input[name="email"]').type('julian@example.com');
      cy.get('input[name="password"]').type('juliansPassword'); // Use the real password
      cy.get('button[type="submit"]').click();
  
      // Assuming there is a redirection to the dashboard after login
      cy.url().should('include', '/dashboard');
    });
  
    it('Julian adds a pizzaiolo service', () => {
      // Navigate to the add service page
      cy.visit('http://localhost:3000/add-service'); // Adjust URL to your app's add service page
  
      // Fill out the form for a new pizzaiolo service
      cy.get('input[name="serviceName"]').type('Prestation Pizzaiolo');
      cy.get('textarea[name="serviceDescription"]').type('Je propose mes services de pizzaiolo pour vos événements. Pizza délicieuse garantie !');
      cy.get('input[name="servicePrice"]').type('150'); // Assuming this is a fixed price service
      cy.get('select[name="serviceCategory"]').select('Pizzaiolo'); // Assuming the category needs to be selected from a dropdown
      // Add any other necessary form fields here
  
      // Submit the service addition form
      cy.get('form#addServiceForm').submit();
  
      // Check for a confirmation message or redirection to a confirmation page
      cy.contains('Votre prestation a été ajoutée avec succès');
      // Adjust the text to match what your application would actually show
    });
  });
  