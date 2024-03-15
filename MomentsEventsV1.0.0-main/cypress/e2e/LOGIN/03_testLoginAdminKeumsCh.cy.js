/// <reference types="cypress" />

describe('Login admin', () => {

    // beforeEach(function() {
    //     cy.visit('https://keums.ch/admin')
    //     cy.get('input[id=":r0:"]').type('admin@gmail.com')
    //     cy.get('input[id=":r1:"]').type('admin123@')
    //     cy.get('form > .MuiGrid-root > .MuiButtonBase-root').click()
    //     cy.get('.css-y4ukhu > :nth-child(1) > .MuiTypography-root').contains('admin admin')
    //     cy.url().should('include', '/admin/users')
    //     cy.url().should('eq', 'https://keums.ch/admin/users')
    // })

    it.only('login admin', () => {
        cy.visit('https://keums.ch/admin')
        cy.get('input[id=":r0:"]').type('admin@gmail.com')
        cy.get('input[id=":r1:"]').type('admin123@')
        cy.get('form > .MuiGrid-root > .MuiButtonBase-root').click()
        cy.get('.css-13rf5hi > :nth-child(1) > .MuiTypography-root').contains('admin admin')
        cy.url().should('include', '/admin/users')
        cy.url().should('eq', 'https://keums.ch/admin/users')
    })

    // it('login admin', () => {
    //     cy.visit('https://keums.ch/admin')
    //     cy.get('input[id=":r0:"]').type('admin@gmail.com')
    //     cy.get('input[id=":r1:"]').type('admin123@')
    //     cy.get('form > .MuiGrid-root > .MuiButtonBase-root').click()
    //     cy.get('.css-y4ukhu > :nth-child(1) > .MuiTypography-root').contains('admin admin')
    //     cy.url().should('include', '/admin/users')
    //     cy.url().should('eq', 'https://keums.ch/admin/users')
    // })

    it('test table', () => {
        // GET ALL TR OF TABLE
        cy.get('.card > table > tbody > tr').should('have.length', 8)
        // GET ALL TD FROM 1ST TR OF TABLE
        cy.get('.card > table > tbody > tr:eq(0) > td').should('have.length', 8)
        // GET THE WHOLE 
        cy.get('.card > table > tbody > tr').each(($row,$index,$rows)=>{
            // convert html to cy element
            cy.wrap($row).within(()=>{
                cy.get('td').each(($cellData,$index,$colomns)=>{
                    cy.log($cellData.text())
                })
            })
        })
    })

    it('test table get single row', () => {
        // cy.get('.card > table > tbody > tr').eq(0).within(()=>{
        cy.get('.card > table > tbody > tr').first().within(()=>{
            cy.get('td').eq(3).should('contain.text','joel.lucas@yumytech.ch')
        })
    })

    it('get specific cell value based on another cell', () => {
        cy.get('.card > table').contains('usertest@gmail.com').parent().within(()=>{
            cy.get('td').eq(5).then((role)=>{
                cy.log(role.text())
            })
            cy.get('td').eq(7).then((actions)=>{
                cy.log(actions.text())
                cy.log(actions.html())
                cy.get('button')
                .should('have.class', 'btn-delete')
                .then(($button) => {
                    // $button is yielded
                    cy.log($button)
                    cy.wrap($button).click()
                })
                // cy.get('button').then((btn)=>{
                //     cy.log(btn)
                // })
            })
        })
    })

})