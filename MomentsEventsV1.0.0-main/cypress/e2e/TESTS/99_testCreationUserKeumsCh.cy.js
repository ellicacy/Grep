/// <reference types="cypress" />

describe('Create user', () => {
    it('create user', () => {

        // cy.visit('https://keums.ch/login')

        // cy.url().should('include', '/admin/users')
        // cy.url().should('eq', 'https://keums.ch/admin/users')

        // cy.task(
        //     'insertUser',
        //     'INSERT INTO users (personneLogin,password,personneNom) VALUES ("testCYPRESS@gmail.com","TEST123@","TEST CYPRESS")'    
        // )
        // .then((res) => {
        //     console.log(res)
        // })

        cy.visit('https://keums.ch/login')

        // cy.request({
        //     method: 'POST',
        //     url: 'https://api.keums.ch/api/login',
        //     body: {
        //         personneLogin: 'admin@gmail.com',
        //         password: 'admin123@'
        //     }
        // })

        cy.intercept({
            method: 'POST',
            url: 'https://api.keums.ch/api/login'
        }).as('login')

        cy.get('input[id=":r0:"]').type('admin@gmail.com')
        cy.get('input[id=":r1:"]').type('admin123@')
        cy.get('form > .MuiGrid-root > .MuiButtonBase-root').click()

        cy.wait('@login').then((res)=>{
            // console.log('RESPONSE = ')
            // console.log('statusCode = ')
            // console.log(res.response.statusCode)
            expect(res.response.statusCode).to.eq(200)
        })
        // cy.visit('https://keums.ch')
    })
})