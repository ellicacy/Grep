/// <reference types="cypress" />

// it('Mon troisieme test', () => {
    // cy.visit('http://localhost:3000')
    // cy.visit('/')
    // cy.contains('Se connecter').click()
    // cy.origin('http://localhost:3000/login', () =>{
    // cy.get('input[id=":r1:"]').type('admin@gmail.com')
    // cy.get('input[id=":r3:"]').type('admin123@')
    describe('Login form', () => {
        it('submits successfully', () => {
          cy.visit('http://localhost:3000/login');
        //   cy.get('input[name="email"]').type('test@example.com');
        //   cy.get('input[name="password"]').type('password123');
          cy.get('input[id=":r1:"]').type('admin@gmail.com')
          cy.get('input[id=":r3:"]').type('admin123@')
          // cy.intercept({
          //   method: 'POST',
          //   url: 'http://localhost:8000/api/login'
          // }).as('login')
          // cy.intercept('POST','/api/login',{
          //       statusCode: 200,
          //       body: {
          //           personneLogin: 'admin@gmail.com',
          //           password: 'admin123@'
          //       }
          //   }).then((response)=>{
          //       console.log(response)
          //       // cy.visit('/')
          //   }).as('login')
          cy.intercept('POST','/api/login',{
            statusCode: 200,
            body: {
                personneLogin: 'admin@gmail.com',
                password: 'admin123@'
            }
        }).as('login')
          // cy.get('form').submit()
          cy.get('form > .MuiGrid-root > .MuiButtonBase-root').click()
          // cy.origin('http://localhost:8000/api/login', () => {
          //       console.log('OKAYYYYYYYYYYY :D')
          // });
          cy.wait('@login').then((intercept)=>{
            console.log('intercept = ')
            console.log(intercept)
          })
        //   cy.url().should('include', '/');
        });
      });
    // cy.wait(2000)
    // cy.contains('Me connecter').click()
    // cy.intercept('POST','/api/login', {
    //     statusCode: 200,
    //     body: {
    //         personneLogin: 'admin@gmail.com',
    //         password: 'admin123@'
    //     }
    // }).then((response)=>{
    //     console.log(response)
    //     // cy.visit('/')
    // })
    // cy.request('POST', 'http://localhost:8000/api/login', {
    //     personneLogin: 'admin@gmail.com',
    //     password: 'admin123@',
    // }).then((response) => {
    //     console.log('RESPONSE = ')
    //     console.log(response)
    // })
    // cy.route('POST', '/api/login', {
    //     personneLogin: 'admin@gmail.com',
    //     password: 'admin123@'
    // })
    // cy.origin('http://localhost:8000/api/login', () => {
    //     console.log('OKAYYYYYYYYYYY :D')
    // cy.request('POST', '/api/login', {
    //     personneLogin: 'admin@gmail.com',
    //     password: 'admin123@'
    // })

    // cy.visit('/')
        
    // })
    // })
    
    // cy.on('uncaught:exception', (err, runnable) => { return false; })
    // cy.origin('http://localhost:8000/api/login', () => {
    //     cy.request({
    //         method: 'POST',
    //         url: 'http://localhost:8000/api/login',
    //         body: {
    //             'personneLogin': 'admin@gmail.com',
    //             'password': 'admin123@'
    //         },
    //         headers: {
    //             'content-type': 'application/json',
    //             // 'accept': 'application/json',
    //         }
    //     }).then((response)=>{
    //         console.log(response)
    //     })
    // })

    
    // cy.visit({
    //     url: 'http://localhost:3000',
    //     method: 'GET'
    // })

    // cy.visit('http://localhost:3000')
    // cy.visit('https://keums.ch')

    // cy.on('uncaught:exception', (err, runnable) => { return false; })
    // cy.get('.MuiGrid-grid-sm-2\.4').click()

    // cy.get('.MuiGrid-grid-sm-2\.4 > .MuiTypography-root')

    // cy.contains('Se connecter').click()

    // cy.origin('http://localhost:3000', ()=>{
    // cy.get('input[id=":r0:"]').type('admin@gmail.com')

    // cy.get('input[id=":r1:"]').type('admin123@')

    // cy.get('input[id=":r1:"]').type('admin@gmail.com')

    // cy.get('input[id=":r3:"]').type('admin123@')

    // cy.wait(2000)
    // cy.contains('Me connecter').click()

// })