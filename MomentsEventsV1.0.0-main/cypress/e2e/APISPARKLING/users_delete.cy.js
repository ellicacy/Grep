/// <reference types="cypress" />

describe('DELETE ON USERS', () => {

    let accessToken = '173|ZrjzezMEhlU8h7KQ3R5H6WdAA2vPp29xCRbI0uHc'
    let randomText = ''
    let testEmail = ''

    it('create user test and delete it', () => {

        var pattern = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy'
        for (var i = 0; i < 10; i++) {
            randomText += pattern.charAt(Math.floor(Math.random() * pattern.length))
            testEmail = randomText + '@gmail.com'
        }

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
            // cy.log(JSON.stringify(response))
            // VERIFY THE RESPONSE FROM THE POST REQUEST
            expect(response.status).to.eq(201)
            expect(response.body).property('personneLogin').to.eq(testEmail)
            expect(response.body).property('personneNom').to.eq('Cypress')
        }).then((response)=>{
            // START OF THE SECOND PART OF THIS TEST
            // LETS FIND THE USER WE JUST ADDED WITH THE POST REQUEST
            const userId = response.body.idPersonne
            cy.log('User id = ' + userId)
            // 2ND CALL : DELETE -> DELETE THE USER WITH ITS ID
            cy.request({
                method: 'DELETE',
                url: 'https://api.keums.ch/api/users/' + userId,
                headers: {
                    'authorization': "Bearer " + accessToken
                }
            }).then((response)=>{
                // VERIFY THE RESPONSE OF THE GET REQUEST
                expect(response.status).to.eq(204)
                // cy.log(JSON.stringify(response))
                expect(response.body).to.eq('')
            })
        })
    })
})