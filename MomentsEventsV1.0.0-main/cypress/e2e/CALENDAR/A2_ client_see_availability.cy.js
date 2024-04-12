describe('Client Search for Photographer Availability', () => {
  it('ensures Margot cannot find Julian available on the 17th of March', () => {
      // Étape 1: Margot visite la page d'accueil
      cy.visit('http://localhost:3000')

      // Étape 2: Margot clique sur le bouton pour se connecter
      cy.contains('Se connecter').click()

      // Étape 3: Margot entre ses informations de connexion
      cy.get('input[id=":r0:"]').type('margot@example.com')
      cy.get('input[id=":r1:"]').type('passwordDeMargot123!')

      // Étape 4: Margot soumet le formulaire de connexion
      cy.contains('Me connecter').click()

      // Étape 5: Vérifier que Margot est redirigée vers la page d'accueil
      cy.url().should('eq', 'http://localhost:3000/')

      // Étape 6: Margot spécifie qu'elle cherche un photographe pour le 17 mars
      cy.get('input[name="search-photographer"]').type('photographe 17 mars')
      cy.get('button').contains('Rechercher').click()

      // Étape 7: Vérification que Julian n'apparaît pas dans la liste
      cy.contains('Julian').should('not.exist')

      // Étape 8: Margot retourne sur la page d'accueil
      cy.visit('http://localhost:3000')

      // Étape 9: Margot cherche Julian dans la liste des prestataires
      cy.contains('Prestataires').click()
      cy.contains('Julian').click()

      // Étape 10: Margot vérifie la disponibilité de Julian pour le 17 mars
      cy.get('input[name="date-disponibility-check"]').type('2024-03-17')
      cy.get('button').contains('Vérifier la disponibilité').click()

      // Étape 11: Vérification que Julian n'est pas disponible ce jour-là et affichage des alternatives
      cy.contains('Julian n\'est pas disponible ce jour-là').should('be.visible')
      cy.contains('Les dates les plus proches où Julian est disponible sont').should('be.visible')
  });
});
