describe('User Registration Scenario', () => {
    it('allows a new user to register', () => {
        // L'utilisateur test visite la page d'accueil et clique sur "Se connecter"
        cy.visit('http://localhost:3000')
        cy.wait(3000) // Délai pour la démonstration
        cy.contains('Se connecter').click()
        cy.wait(3000) // Délai pour la démonstration
        
        // L'utilisateur test est redirigé vers la page de connexion et clique sur "Enregistrez-vous"
        cy.url().should('include', '/login')
        cy.contains('Enregistrez-vous').click()
        cy.wait(3000) // Délai pour la démonstration
        cy.url().should('include', '/signup')

        // L'utilisateur test remplit le formulaire d'inscription
        cy.get('input#nom').type('Test')
        cy.get('input#prenom').type('Margot')
        cy.get('input#dateNaissance').type('1998-09-17') // Saisie directe de la date
        cy.wait(3000) // Délai pour la démonstration

        // L'utilisateur test remplit le reste du formulaire
        cy.get('input#email').type('margot@example.com')
        cy.get('input#password').type('passwordDeMargot123!')
        cy.get('input#passwordConfirmation').type('passwordDeMargot123!')
        cy.wait(3000) // Délai pour la démonstration

        // L'utilisateur test soumet le formulaire d'inscription
        cy.get('button').contains("S'enregistrer").click()
        cy.wait(3000) // Délai pour la démonstration

        // L'utilisateur test est redirigé vers la page d'accueil et le bouton "Se connecter" est devenu "Mon profil"
        cy.url().should('eq', 'http://localhost:3000/')
        cy.contains('Mon profil').should('be.visible')
        cy.wait(3000) // Délai pour la démonstration
    });
});
