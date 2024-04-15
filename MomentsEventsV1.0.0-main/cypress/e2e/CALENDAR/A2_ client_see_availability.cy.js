describe('Client Search for Photographer Availability', () => {
  it('ensures Margot cannot find Julian available on the 20th of March', () => {
      // Étape 1: Margot visite la page d'accueil
      cy.visit('http://localhost:3000')

      // Étape 2: Margot clique sur le bouton pour se connecter
      cy.contains('Se connecter').click()

      // Étape 3: Margot entre ses informations de connexion
      cy.get('input[id=":r1:"]').type('margot@example.com')
      cy.get('input[id=":r3:"]').type('passwordDeMargot123!')

      // Étape 4: Margot soumet le formulaire de connexion
      cy.contains('Me connecter').click()

      // Étape 5: Vérifier que Margot est redirigée vers la page d'accueil
      cy.url().should('eq', 'http://localhost:3000/')

      // Étape 6: Margot spécifie qu'elle cherche un photographe pour le 20 mars
      cy.get('input[id="rechercheOccasionType"]').type('photographe')
      cy.get('input[id="rechercheOccasionDate"]').type('2024-04-19')
      cy.get('button').contains('Rechercher').click()

      cy.wait(3000) // Attente pour voir les résultats de la recherche

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
