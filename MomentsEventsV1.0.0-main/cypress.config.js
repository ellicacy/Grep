const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // baseUrl: 'http://localhost:8000',
  // env: {
  //   frontendUrl: 'http://localhost:3000'
  // },
  e2e: {
    baseUrl: 'http://localhost:3000',
    env: {
      backendUrl: 'http://localhost:8000',
    },
    failOnStatusCode: false,
    defaultCommandTimeout: 10000,
    watchForFileChanges: false,
    chromeWebSecurity: false,
    experimentalSessionAndOrigin: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        'test': () => {
          return 'Je suis le test :)'
        },
        'insertUser': () => {
          return 'INSERT USER :D'
        }
      })
    },
  },
});
