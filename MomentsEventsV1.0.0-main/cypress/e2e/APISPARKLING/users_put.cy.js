/// <reference types="cypress" />

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

describe('PUT ON USERS', () => {

    let accessToken = '174|A6yFIGmPmYzZ6qFRjoXYB3rYsJNvwlqApxQzFI5u'
    let randomText = ''
    let testEmail = ''

    it('create user test and update it', () => {

        var pattern = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy'
        for (var i = 0; i < 10; i++) {
            randomText += pattern.charAt(Math.floor(Math.random() * pattern.length))
            testEmail = randomText + '@gmail.com'
        }
        cy.log('Début de la requête POST sur users avec un payload')
        // 1ST CALL : POST -> CREATE A USER
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
            // cy.log('res1')
            // cy.log(JSON.stringify(response))
            // cy.log(JSON.stringify(response.body.idPersonne))
            // VERIFY THE RESPONSE FROM THE POST REQUEST
            // cy.log('RESPONSE.STATUS == 201')
            expect(response.status).to.eq(201)
            // cy.log('RESPONSE.BODY.PERSONNELOGIN == $TESTMAIL')
            expect(response.body).property('personneLogin').to.eq(testEmail)
            // cy.log('RESPONSE.BODY.PERSONNENOM == CYPRESS')
            expect(response.body).property('personneNom').to.eq('Cypress')
            // cy.log('RESPONSE.BODY.PERSONNEPRENOM == USER')
            expect(response.body).property('personnePrenom').to.eq('User')
            // cy.log('RESPONSE.BODY.PERSONNEDATENAISSANCE == 1992-05-25')
            expect(response.body).property('personneDateNaissance').to.eq('1992-05-25')
            // cy.log('RESPONSE.BODY.ROLE == USER')
            expect(response.body).property('role').to.eq('user')
            // const idUser = response.body.idPersonne
            // return idUser
        }).then((response)=>{
            // cy.log('res2')
            // cy.log(JSON.stringify(response))
            // START OF THE SECOND PART OF THIS TEST
            // LETS FIND THE USER WE JUST ADDED WITH THE POST REQUEST
            const userId = response.body.idPersonne
            
            cy.log('Début de la requête PUT sur user id = ' + userId)
            // 2ND CALL : PUT -> UPDATE THE USER WITH ITS ID
            cy.request({
                method: 'PUT',
                url: 'https://api.keums.ch/api/users/' + userId,
                headers: {
                    'authorization': "Bearer " + accessToken
                },
                body: {
                    'personneNom': 'Cypress put',
                    'personnePrenom': 'User put',
                    'personneLogin': testEmail,
                    'personneDateNaissance': '1993-03-23',
                    'password': 'cypressuser12@',
                    'password_confirmation': 'cypressuser12@',
                    'role': 'prestataire'
                }
            }).then((response)=>{
                // VERIFY THE RESPONSE OF THE PUT REQUEST
                // cy.log('RESPONSE.STATUS == 200')
                expect(response.status).to.eq(200)
                // cy.log('RESPONSE.BODY.IDPERSONNE == $USERID (REPONSE DE LA REQUETE POST)')
                expect(response.body).property('idPersonne').to.eq(userId)
                // cy.log('RESPONSE.BODY.PERSONNELOGIN == $TESTMAIL')
                expect(response.body).property('personneLogin').to.eq(testEmail)
                // cy.log('RESPONSE.BODY.PERSONNENOM == CYPRESS PUT')
                expect(response.body).property('personneNom').to.eq('Cypress put')
                // cy.log('RESPONSE.BODY.PERSONNEPRENOM == USER PUT')
                expect(response.body).property('personnePrenom').to.eq('User put')
                // cy.log('RESPONSE.BODY.PERSONNEDATENAISSANCE == 1993-03-23')
                expect(response.body).property('personneDateNaissance').to.eq('1993-03-23')
                // cy.log('RESPONSE.BODY.ROLE == PRESTATAIRE')
                expect(response.body).property('role').to.eq('prestataire')
            })
        })
    })
})