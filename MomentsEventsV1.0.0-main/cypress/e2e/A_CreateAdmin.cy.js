/// <reference types="cypress" />

describe('Login admin', () => {
    it.only('login admin', () => {
        cy.visit('http://localhost:3000/admin')
        cy.get('input[id=":r1:"]').type('admin@gmail.com')
        cy.get('input[id=":r3:"]').type('admin123@')
        cy.get('form > .MuiGrid-root > .MuiButtonBase-root').click()
        cy.get('.css-13rf5hi > :nth-child(1) > .MuiTypography-root').contains('admin admin')
        cy.url().should('include', '/admin/users')
        cy.url().should('eq', 'http://localhost:3000/admin/users')
    })

    it('test table', () => {
        // Les tests suivants seraient similaires, ajuste simplement les URL et tout autre sélecteur spécifique à ton application locale.
    })

    // Plus d'itérations de tests pour les interactions avec la table peuvent être ajoutées ici, avec la même méthode que ci-dessus.
})
