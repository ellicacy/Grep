/// <reference types="cypress" />

describe('Photographer updates availability', () => {

    let accessToken; // Assume this is set correctly through login before tests run
  
    before(() => {
      // Log in as Julian the photographer and set accessToken for authorization.
      // This assumes a 'login' route that returns an accessToken upon successful login.
      cy.request('POST', '/api/login', { email: 'julian@example.com', password: 'password' })
        .then((response) => {
          expect(response.body).to.have.property('token'); // Assuming the token is returned as 'token'
          accessToken = response.body.token; // Update the variable to match the API response structure
        });
    });
  
    it('Julian updates his availability', () => {
      const availabilityId = 1; // This would be the ID of Julian's availability entry
      const newAvailability = {
        // Define the new availability data structure according to your application's API
        dateTime: '2024-04-15T09:00:00Z', // Example date and time
        idPrestation: 123, // Assuming an ID of a specific service/prestation is required
      };
  
      // PUT request to update Julian's availability
      cy.request({
        method: 'PUT',
        url: `/api/availabilities/${availabilityId}`,
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        body: newAvailability
      }).then((response) => {
        expect(response.status).to.eq(200); // Or the appropriate success status code
        // Verify some properties to confirm the update was successful
        // The verification might need adjustments to match your application's response structure
        expect(response.body.dateTime).to.equal(newAvailability.dateTime);
        expect(response.body.idPrestation).to.equal(newAvailability.idPrestation);
      });
    });
});
