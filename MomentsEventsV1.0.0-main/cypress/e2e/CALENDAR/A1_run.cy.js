describe('Photographer Availability Scenario', () => {
    it('allows Julian to set his availability', () => {
        // Étape 1: Visite de la page d'accueil
        cy.visit('url: http://localhost:3000')

        // Étape 2: Clique sur le bouton pour se connecter
        cy.contains('Se connecter').click()

        // Étape 3: Julian entre ses informations de connexion
        cy.get('input[id=":r1:"]').type('julian@example.com')
        cy.get('input[id=":r3:"]').type('passwordDeJulian123!')
        // cy.get('input[id=":r1:"]').type('admin@gmail.com')
        // cy.get('input[id=":r3:"]').type('admin123@')

        // Étape 4: Julian soumet le formulaire de connexion
        cy.contains('Me connecter').click()

        

        
    });
});
