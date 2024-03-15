/// <reference types="cypress" />

describe('Login form', () => {
    it('connect admin', () => {
        // cy.intercept('GET', '/users', []).as('getUsers')
        cy.visit('https://keums.ch/admin')
        cy.get('input[id=":r0:"]').type('admin@gmail.com')
        cy.get('input[id=":r1:"]').type('admin123@')
        // cy.get('input[id=":r1:"]').type('admin@gmail.com')
        // cy.get('input[id=":r3:"]').type('admin123@')
        cy.intercept('POST','/api/loginAdmin').as('loginAdmin')
        cy.get('form > .MuiGrid-root > .MuiButtonBase-root').click()

        
        // cy.wait('@loginAdmin').then((i)=>{
        //     console.log(i)
            
        // })

        // cy.request({
        //     method: 'POST',
        //     url: 'http://localhost:8000/api/loginAdmin',
        //     body: {
        //         personneLogin: 'admin@gmail.com',
        //         password: 'admin123@'
        //     }
        // }).then((res)=>{
        //     console.log(res)
        // })
    })
})