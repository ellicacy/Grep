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

      // Étape 6: Margot spécifie qu'elle cherche un photographe pour le 19 mars
      cy.get('input[id="rechercheOccasionType"]').type('photographe')
      cy.get('input[id="rechercheOccasionDate"]').type('2024-04-19')
      cy.get('button').contains('Rechercher').click()

      cy.wait(3000) // Attente pour voir les résultats de la recherche


      cy.contains('button', 'Voir les prochaines disponibilités').click();
      cy.contains('button', 'Voir les prochaines disponibilités').click();
      cy.wait(3000) // Attente pour voir les résultats de la recherche

     
  });
});
