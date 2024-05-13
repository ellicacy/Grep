/// <reference types="cypress" />

describe('Login user', () => {
    it('login user', () => {

        cy.visit('https://keums.ch/login')
        cy.get('input[id=":r0:"]').type('user@gmail.com')
        cy.get('input[id=":r1:"]').type('user123@')
        cy.get('form > .MuiGrid-root > .MuiButtonBase-root').click()
        cy.url().should('include', '/dashboard')
        cy.url().should('eq', 'https://keums.ch/dashboard')
    })
})