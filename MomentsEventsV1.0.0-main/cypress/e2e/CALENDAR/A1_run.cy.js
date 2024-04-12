describe('Photographer Availability Scenario', () => {
    it('allows Julian to set his availability', () => {
        // Étape 1: Visite de la page d'accueil
        cy.visit('http://localhost:3000')
        cy.wait(3000) // Attente pour voir la page d'accueil

        // Étape 2: Clique sur le bouton pour se connecter
        cy.contains('Se connecter').click()
        cy.wait(3000) // Attente pour observer le formulaire de connexion

        // Étape 3: Julian entre ses informations de connexion
        cy.get('input[id=":r1:"]').type('julian@example.com')
        cy.get('input[id=":r3:"]').type('passwordDeJulian123!')
        cy.wait(3000) // Attente après avoir saisi les informations de connexion

        // Étape 4: Julian soumet le formulaire de connexion
        cy.contains('Me connecter').click()
        cy.wait(3000) // Attente pour vérifier la connexion

        // Étape 5: Vérifier que Julian est redirigé vers la page d'accueil
        cy.url().should('eq', 'http://localhost:3000/')
        cy.wait(3000) // Attente après la redirection

        // Étape 6: Vérifier que le bouton "Se connecter" est devenu "Mon profil"
        cy.contains('Mon profil').should('be.visible')
        cy.wait(3000) // Attente pour observer le changement de bouton

        // Étape 7: Julian clique sur le bouton "mon profil"
        cy.contains('Mon profil').click()
        cy.wait(3000) // Attente après le clic sur "Mon profil"
        cy.url().should('include', '/reservations')

        // Étape 8: Julian clique sur le bouton "Ajouter une prestation"
        cy.contains('Prestations').click()
        cy.wait(3000) // Attente pour voir la page des prestations
        cy.url().should('eq', 'http://localhost:3000/prestations')
        cy.contains('Ajouter une prestation').click()
        cy.wait(3000) // Attente pour observer le formulaire d'ajout de prestation
    });
});
