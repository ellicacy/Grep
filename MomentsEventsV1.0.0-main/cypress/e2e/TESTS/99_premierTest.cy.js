/// <reference types="cypress" />

it('Mon premier test', () => {

    // cy.visit({
    //     url: 'http://localhost:3000',
    //     method: 'GET'
    // })

    // cy.visit('http://localhost:3000')
    cy.visit('https://keums.ch')

    // cy.on('uncaught:exception', (err, runnable) => { return false; })
    // cy.get('.MuiGrid-grid-sm-2\.4').click()

    // cy.get('.MuiGrid-grid-sm-2\.4 > .MuiTypography-root')

    cy.contains('Se connecter').click()

    // cy.origin('http://localhost:3000', ()=>{
        cy.get('input[id=":r0:"]').type('admin@gmail.com')

        cy.get('input[id=":r1:"]').type('admin123@')
    
        // cy.get('input[id=":r1:"]').type('admin@gmail.com')
    
        // cy.get('input[id=":r3:"]').type('admin123@')
    
        // cy.wait(2000)
        // cy.contains('Me connecter').click()
        cy.contains('Me connecter').click()
        // cy.contains('Me connecter').click()
        // cy.wait(4000)
    // })
    
    // cy.contains('Me connecter').click()
    // cy.get('form').contains('Me connecter').click()
    // cy.get('form').submit()
    // cy.wait(2000)
    // cy.intercept('POST', 'http://localhost:3000/api/login')
})