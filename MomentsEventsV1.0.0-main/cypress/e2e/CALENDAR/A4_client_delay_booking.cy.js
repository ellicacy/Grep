describe('Photographer Availability Scenario', () => {
  it('allows Amelie to set his availability', () => {
      // Étape 1: Visite de la page d'accueil
      cy.visit('http://localhost:3000')
      cy.wait(3000) // Attente pour voir la page d'accueil

      // Étape 2: Clique sur le bouton pour se connecter
      cy.contains('Se connecter').click()
      cy.wait(3000) // Attente pour observer le formulaire de connexion

      // Étape 3: Amelie entre ses informations de connexion
      cy.get('input[id=":r1:"]').type('amelie@example.com')
      cy.get('input[id=":r3:"]').type('passwordDeAmelie123!')
      cy.wait(3000) // Attente après avoir saisi les informations de connexion

      // Étape 4: Amelie soumet le formulaire de connexion
      cy.contains('Me connecter').click()
      cy.wait(3000) // Attente pour vérifier la connexion

      // Étape 5: Vérifier que Amelie est redirigé vers la page d'accueil
      cy.url().should('eq', 'http://localhost:3000/')
      cy.wait(3000) // Attente après la redirection

      // Étape 6: Vérifier que le bouton "Se connecter" est devenu "Mon profil"
      cy.contains('Mon profil').should('be.visible')
      cy.wait(3000) // Attente pour observer le changement de bouton

      // Étape 7: Amélie clique sur la date du calendrier dans la barre de recherche et indique le 17 mai
      cy.get('#rechercheOccasionDate').click().type('2024-05-17')
      cy.wait(3000) // Attente pour la saisie de la date


      // Étape 8: Amélie clique sur "Rechercher"
      cy.get('button').contains('Rechercher').click()
      cy.wait(3000) // Attente pour l'affichage des résultats

      // Étape 9: Amélie ferme le formulaire de disponibilité
      cy.get('button').contains('Fermer').click()
      cy.wait(3000) // Attente pour confirmer la fermeture du formulaire

      // Étape 3000: Amélie clique sur "Mon profil"
      cy.contains('Mon profil').click()
      cy.wait(3000) // Attente pour accéder au profil

      // Étape 11: Amélie clique sur "Se déconnecter"
      cy.contains('Se déconnecter').click()
      cy.wait(3000) // Attente pour confirmer la déconnexion
  });
});
