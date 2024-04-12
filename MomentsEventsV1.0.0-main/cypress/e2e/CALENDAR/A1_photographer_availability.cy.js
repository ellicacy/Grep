describe('Photographer Availability Scenario', () => {
  it('allows Julian to set his availability', () => {
      // Étape 1: Visite de la page d'accueil
      cy.visit('url: http://localhost:3000')

      // Étape 2: Clique sur le bouton pour se connecter
      cy.contains('Se connecter').click()

      // Étape 3: Julian entre ses informations de connexion
      cy.get('input[id=":r1:"]').type('julian@example.com')
      cy.get('input[id=":r3:"]').type('passwordDeJulian123!')

      // Étape 4: Julian soumet le formulaire de connexion
      cy.contains('Me connecter').click()

      // Étape 5: Vérifier que Julian est redirigé vers la page d'accueil
      cy.url().should('eq', 'http://localhost:3000/')

      // Étape 6: Vérifier que le bouton "Se connecter" est devenu "Mon profil"
      cy.contains('Mon profil').should('be.visible')

      // Étape 7: Julian clique sur le bouton "mon profil"
      cy.contains('Mon profil').click();
      cy.url().should('include', '/reservations');

      // Étape 8: Julian clique sur le bouton "Ajouter une prestation"
      cy.contains('Prestations').click();
      cy.url().should('eq', 'http://localhost:3000/prestations');
      cy.contains('Ajouter une prestation').click();

  });
});