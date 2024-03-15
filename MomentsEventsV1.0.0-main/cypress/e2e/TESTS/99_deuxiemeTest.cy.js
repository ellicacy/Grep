/// <reference types="cypress" />

it('Mon premier test', () => {
    const sentArgs = { personneLogin: 'admin@gmail.com', password: 'admin123@' }
    cy.origin(
        'http://localhost:3000',
        // Send the args here...
        { args: sentArgs },
        // ...and receive them at the other end here!
        ({ personneLogin, password }) => {
            cy.visit('/login')
            cy.get('input[id=":r1:"]').type(personneLogin)
            cy.get('input[id=":r3:"]').type(password)
            cy.contains('button', 'Me connecter').click()
        }
    )
})