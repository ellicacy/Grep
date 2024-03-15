/// <reference types="cypress" />

describe('Login form', () => {
    it('gets all users', () => {
        // cy.intercept('GET', '/users', []).as('getUsers')
        cy.visit('http://localhost:3000/admin/users')

    })
})