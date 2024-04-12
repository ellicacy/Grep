describe('Photographer Availability Scenario', () => {
    it('allows Julian to set his availability', () => {
        // Étape 1: Visite de la page d'accueil
        cy.visit('http://localhost:3000')

        // Étape 2: Clique sur le bouton pour se connecter
        cy.contains('Se connecter').click()

        // Étape 3: Julian entre ses informations de connexion
        // Assure-toi que les ID correspondent exactement à ceux de ton HTML
        cy.get('input[placeholder="Email"]').type('julian@example.com')
        cy.get('input[placeholder="Mot de passe"]').type('passwordDeJulian123!')

        // Étape 4: Julian soumet le formulaire de connexion
        // Assure-toi que le texte du bouton est exactement 'Me connecter'
        cy.wait(2000)
        cy.contains('Me connecter').click()
      cy.intercept('POST','/api/login', {
         statusCode: 200,
        body: {
             personneLogin: 'julian@example.com',
             password: 'passwordDeJulian123!'
         }
     }).then((response)=>{
         console.log(response)
            // cy.visit('/')
        
     })
        
        // Ajouter des vérifications après la connexion pour confirmer le succès
    });
});

