/// <reference types="cypress" />

describe('Register new user', () => {
    it('register user', () => {
        // ON VISITE LA PAGE D'INSCRIPTION UTILISATEUR
        cy.visit('https://keums.ch/login')
        // ON CLIQUE SUR LE BOUTON "ENREGISTREZ-VOUS"
        cy.get('.MuiTypography-body1 > .MuiTypography-root').click()
        // ON SE DIRIGE VERS LA PAGE D'INSCRIPTION UTILISATEUR
        // ----------------------------------------------
        // ON ECRIT "USER" DANS LE CHAMP NOM
        cy.get('#nom').type('User')
        // ON ECRIT "FROM CYPRESS" DANS LE CHAMP PRENOM
        cy.get('#prenom').type('From cypress')
        // ON ECRIT "1992-05-25" DANS LE CHAMP DATE DE NAISSANCE
        cy.get('#dateNaissance').type('1992-05-25')
        // ON ECRIT "USERCYPRESS@GMAIL.COM" DANS LE CHAMP EMAIL
        cy.get('#email').type('usercypress@gmail.com')
        // ON ECRIT "USERCYPRESS123@" DANS LE CHAMP PASSWORD
        cy.get('#password').type('usercypress123@')
        // ON ECRIT "USERCYPRESS123@" DANS LE CHAMP PASSWORDCONFIRMATION
        cy.get('#passwordConfirmation').type('usercypress123@')
        // ON CLIQUE SUR LE BOUTON "S'ENREGISTRER"
        cy.get('form > .MuiGrid-root > .MuiButtonBase-root').click()
        // LA REQUETE D'INSCRIPTION SE LANCE ET
        // ON SE DIRIGE VERS LA PAGE DE DASHBOARD
        // --------------------------------------
        // ON VERIFIE QUE L'URL CONTIENNE "/DASHBOARD"
        // cy.url().should('include', '/dashboard')
        // ON VERIFIE QUE L'URL EGALE "HTTPS://KEUMS.CH/DASHBOARD"
        cy.url().should('eq', 'https://keums.ch/dashboard')
    })
})