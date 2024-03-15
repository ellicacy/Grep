/// <reference types="cypress" />

const dataJsonSparkling = require('../../fixtures/createUserSparklingFixture.json')

before(()=>{
    cy.log('!!!!!!!!!!!!!!!!!!!!!!!')
    cy.log('!!! Début des tests !!!')
    cy.log('!!!!!!!!!!!!!!!!!!!!!!!')
})

after(()=>{
    cy.log('!!!!!!!!!!!!!!!!!!!!!!!')
    cy.log('!!! Fin des tests !!!')
    cy.log('!!!!!!!!!!!!!!!!!!!!!!!')
})

beforeEach(()=>{
    cy.log('Début d\'un nouveau test')
})

afterEach(()=>{
    cy.log('Fin du test ...')
})

describe('POST ON USERS', () => {

    let accessToken = '173|ZrjzezMEhlU8h7KQ3R5H6WdAA2vPp29xCRbI0uHc'
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
            url: 'https://api.keums.ch/api/users',
            headers: {
                'authorization': "Bearer " + accessToken
            },
            body: {
                'personneNom': 'Cypress',
                'personnePrenom': 'User',
                'personneLogin': testEmail,
                'personneDateNaissance': '1992-05-25',
                'password': 'cypressuser123@',
                'password_confirmation': 'cypressuser123@',
                'role': 'user'
            }
        }).then((response)=>{
            cy.log(JSON.stringify(response))
            expect(response.status).to.eq(201)
            expect(response.body).property('personneLogin').to.eq(testEmail)
            expect(response.body).property('personneNom').to.eq('Cypress')
            expect(response.body).property('personnePrenom').to.eq('User')
            expect(response.body).property('personneDateNaissance').to.eq('1992-05-25')
            expect(response.body).property('role').to.eq('user')
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
            url: 'https://api.keums.ch/api/users',
            headers: {
                'authorization': "Bearer " + accessToken
            },
            body: {
                "personneNom": dataJsonSparkling.personneNom,
                "personnePrenom": dataJsonSparkling.personnePrenom,
                "personneLogin": testEmail,
                "personneDateNaissance": dataJsonSparkling.personneDateNaissance,
                "password": dataJsonSparkling.password,
                "password_confirmation": dataJsonSparkling.password_confirmation,
                "role": dataJsonSparkling.role
            }
        }).then((response)=>{
            // cy.log(JSON.stringify(response))
            expect(response.status).to.eq(201)
            expect(response.body).property('personneLogin').to.eq(testEmail)
            expect(response.body).property('personneNom').to.eq(dataJsonSparkling.personneNom)
            expect(response.body).property('personnePrenom').to.eq(dataJsonSparkling.personnePrenom)
            expect(response.body).property('personneDateNaissance').to.eq(dataJsonSparkling.personneDateNaissance)
            expect(response.body).property('role').to.eq(dataJsonSparkling.role)
        })
    })

    // the best case scenario best
    it('create user test from fixture best', () => {

        var pattern = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy'
        for (var i = 0; i < 10; i++) {
            randomText += pattern.charAt(Math.floor(Math.random() * pattern.length))
            testEmail = randomText + '@gmail.com'
        }

        cy.fixture('createUserSparklingFixture').then((payload)=>{
            // 1ST CALL : POST -> CREATE A USER
            cy.request({
                method: 'POST',
                url: 'https://api.keums.ch/api/users',
                headers: {
                    'authorization': "Bearer " + accessToken
                },
                body: {
                    "personneNom": payload.personneNom,
                    "personnePrenom": payload.personnePrenom,
                    "personneLogin": testEmail,
                    "personneDateNaissance": payload.personneDateNaissance,
                    "password": payload.password,
                    "password_confirmation": payload.password_confirmation,
                    "role": payload.role
                }
            }).then((response)=>{
                // cy.log(JSON.stringify(response))
                // VERIFY THE RESPONSE FROM THE POST REQUEST
                expect(response.status).to.eq(201)
                expect(response.body).property('personneLogin').to.eq(testEmail)
                expect(response.body).property('personneNom').to.eq(payload.personneNom)
                expect(response.body).property('personnePrenom').to.eq(payload.personnePrenom)
                expect(response.body).property('personneDateNaissance').to.eq(payload.personneDateNaissance)
                expect(response.body).property('role').to.eq(payload.role)
            }).then((response)=>{
                // START OF THE SECOND PART OF THIS TEST
                // LETS FIND THE USER WE JUST ADDED WITH THE POST REQUEST
                const userId = response.body.idPersonne
                cy.log('User id = ' + userId)
                // 2ND CALL : GET -> FIND THE USER WITH ITS ID
                cy.request({
                    method: 'GET',
                    url: 'https://api.keums.ch/api/users/' + userId,
                    headers: {
                        'authorization': "Bearer " + accessToken
                    }
                }).then((response)=>{
                    // VERIFY THE RESPONSE OF THE GET REQUEST
                    expect(response.status).to.eq(200)
                    expect(response.body).property('idPersonne').to.eq(userId)
                    expect(response.body).property('personneLogin').to.eq(testEmail)
                    expect(response.body).property('personneNom').to.eq(payload.personneNom)
                    expect(response.body).property('personnePrenom').to.eq(payload.personnePrenom)
                    expect(response.body).property('personneDateNaissance').to.eq(payload.personneDateNaissance)
                    expect(response.body).property('role').to.eq(payload.role)
                })
            })
        })
    })
})