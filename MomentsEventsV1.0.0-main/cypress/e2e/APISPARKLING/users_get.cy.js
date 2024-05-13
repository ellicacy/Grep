/// <reference types="cypress" />

// before(()=>{
//     cy.log('1 before')
// })

// beforeEach(()=>{
//     cy.log('1 beforeEach')
// })

describe('GET ON USERS', () => {

    let accessToken = '172|itLHOJOrAeWzmuvUGTRMKGvJw9ERiXnQV84wwPRA'

    // it.only('get users', () => {
    it('get users', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.keums.ch/api/users',
            headers: {
                'authorization': "Bearer " + accessToken
            }
        }).then((response)=>{
            expect(response.status).to.eq(200)
            // cy.log(JSON.stringify(response))
            expect(response.body.data[0].idPersonne).to.eq(9)
            expect(response.body.data[0].personneLogin).to.eq('joel.lucas@yumytech.ch')
            // const users = response.body.data
            // return users
        })
        // .then((res)=>{
        //     const joel = res.find((u)=>{
        //         return u.idPersonne == 9
        //     })
        //     // cy.log(JSON.stringify(res))
        //     expect(joel.idPersonne).to.eq(9)
        //     expect(joel.personneLogin).to.eq('joel.lucas@yumytech.ch')
        // })
    })

    // it('get user by id', () => {
    it('get user by id', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.keums.ch/api/users/9',
            headers: {
                'authorization': "Bearer " + accessToken
            }
        }).then((response)=>{
            expect(response.status).to.eq(200)
            // cy.log(JSON.stringify(response))
            expect(response.body.idPersonne).to.eq(9)
            expect(response.body.personneLogin).to.eq('joel.lucas@yumytech.ch')
        })
    })

    
})