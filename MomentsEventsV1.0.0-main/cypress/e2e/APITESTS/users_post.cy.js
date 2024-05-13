/// <reference types="cypress" />

const dataJson = require('../../fixtures/createUserFixture.json')

describe('All actions on users', () => {

    let accessToken = '02bf4104a1394f50a447edfd7debfe0988a3898f071e14c34c558650aae8c46f'
    let randomText = ''
    let testEmail = ''

    it('create user test', () => {

        var pattern = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy'
        for (var i = 0; i < 10; i++) {
            randomText += pattern.charAt(Math.floor(Math.random() * pattern.length))
            testEmail = randomText + '@gmail.com'
        }

        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {
                'authorization': "Bearer " + accessToken
            },
            body: {
                "name": "Test postman",
                "gender": "male",
                "email": testEmail,
                "status": "active"
            }
        }).then((response)=>{
            // cy.log(JSON.stringify(response))
            expect(response.status).to.eq(201)
            expect(response.body).property('email').to.eq(testEmail)
            expect(response.body).property('name').to.eq('Test postman')
            expect(response.body).property('status').to.eq('active')
            expect(response.body).property('gender').to.eq('male')
        })
    })

    it('create user test from fixture', () => {

        var pattern = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy'
        for (var i = 0; i < 10; i++) {
            randomText += pattern.charAt(Math.floor(Math.random() * pattern.length))
            testEmail = randomText + '@gmail.com'
        }

        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {
                'authorization': "Bearer " + accessToken
            },
            body: {
                "name": dataJson.name,
                "gender": dataJson.gender,
                "email": testEmail,
                "status": dataJson.status
            }
        }).then((response)=>{
            // cy.log(JSON.stringify(response))
            expect(response.status).to.eq(201)
            expect(response.body).property('email').to.eq(testEmail)
            expect(response.body).property('name').to.eq('Test postman')
            expect(response.body).property('status').to.eq('active')
            expect(response.body).property('gender').to.eq('female')
        })
    })

    // the best case scenario
    it('create user test from fixture second', () => {

        var pattern = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy'
        for (var i = 0; i < 10; i++) {
            randomText += pattern.charAt(Math.floor(Math.random() * pattern.length))
            testEmail = randomText + '@gmail.com'
        }

        cy.fixture('createUserFixture').then((payload)=>{
            // 1ST CALL : POST -> CREATE A USER
            cy.request({
                method: 'POST',
                url: 'https://gorest.co.in/public/v2/users',
                headers: {
                    'authorization': "Bearer " + accessToken
                },
                body: {
                    "name": payload.name,
                    "gender": payload.gender,
                    "email": testEmail,
                    "status": payload.status
                }
            }).then((response)=>{
                // cy.log(JSON.stringify(response))
                // VERIFY THE RESPONSE FROM THE POST REQUEST
                expect(response.status).to.eq(201)
                expect(response.body).property('email').to.eq(testEmail)
                expect(response.body).property('name').to.eq('Test postman')
                expect(response.body).property('status').to.eq('active')
                expect(response.body).property('gender').to.eq('female')
            }).then((response)=>{
                // START OF THE SECOND PART OF THIS TEST
                // LETS FIND THE USER WE JUST ADDED WITH THE POST REQUEST
                const userId = response.body.id
                cy.log('User id = ' + userId)
                // 2ND CALL : GET -> FIND THE USER WITH ITS ID
                cy.request({
                    method: 'GET',
                    url: 'https://gorest.co.in/public/v2/users/' + userId,
                    headers: {
                        'authorization': "Bearer " + accessToken
                    }
                }).then((response)=>{
                    // VERIFY THE RESPONSE OF THE GET REQUEST
                    expect(response.status).to.eq(200)
                    expect(response.body).property('id').to.eq(userId)
                    expect(response.body).property('name').to.eq(payload.name)
                    expect(response.body).property('status').to.eq(payload.status)
                    expect(response.body).property('gender').to.eq(payload.gender)
                    expect(response.body).property('email').to.eq(testEmail)
                })
            })
        })
    })

})