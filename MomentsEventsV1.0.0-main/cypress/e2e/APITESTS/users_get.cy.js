/// <reference types="cypress" />

// before(()=>{
//     cy.log('1 before')
// })

// beforeEach(()=>{
//     cy.log('1 beforeEach')
// })

describe('All actions on users', () => {

    let accessToken = '02bf4104a1394f50a447edfd7debfe0988a3898f071e14c34c558650aae8c46f'

    // it.only('get users', () => {
    it('get users', () => {
        cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {
                'authorization': "Bearer " + accessToken
            }
        }).then((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body[0].id).to.eq(1106622)
        })
    })

    it('get user by id', () => {
        cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public/v2/users/1105907',
            headers: {
                'authorization': "Bearer " + accessToken
            }
        }).then((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body.name).to.eq("Diptendu Joshi")
            expect(response.body.email).to.eq("joshi_diptendu@kutch.test")
            expect(response.body.gender).to.eq("male")
            expect(response.body.status).to.eq("active")
        })
    })

    
})