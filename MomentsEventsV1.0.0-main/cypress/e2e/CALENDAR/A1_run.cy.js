describe('Photographer Availability Scenario', () => {
    it('allows Julian to set his availability', () => {
        // Étape 1: Visite de la page d'accueil
        cy.visit('http://localhost:3000')
        cy.wait(10) // Attente pour voir la page d'accueil

        // Étape 2: Clique sur le bouton pour se connecter
        cy.contains('Se connecter').click()
        cy.wait(10) // Attente pour observer le formulaire de connexion

        // Étape 3: Julian entre ses informations de connexion
        cy.get('input[id=":r1:"]').type('julian@example.com')
        cy.get('input[id=":r3:"]').type('passwordDeJulian123!')
        cy.wait(10) // Attente après avoir saisi les informations de connexion

        // Étape 4: Julian soumet le formulaire de connexion
        cy.contains('Me connecter').click()
        cy.wait(10) // Attente pour vérifier la connexion

        // Étape 5: Vérifier que Julian est redirigé vers la page d'accueil
        cy.url().should('eq', 'http://localhost:3000/')
        cy.wait(10) // Attente après la redirection

        // Étape 6: Vérifier que le bouton "Se connecter" est devenu "Mon profil"
        cy.contains('Mon profil').should('be.visible')
        cy.wait(10) // Attente pour observer le changement de bouton

        // Étape 7: Julian clique sur le bouton "mon profil"
        cy.contains('Mon profil').click()
        cy.wait(10) // Attente après le clic sur "Mon profil"
        cy.url().should('include', '/reservations')

        // Étape 8: Julian clique sur le bouton "Prestations"
        cy.contains('Prestations').click()
        cy.wait(10) // Attente pour voir la page des prestations
        cy.url().should('eq', 'http://localhost:3000/prestations')

        // Étape 9: Julian clique sur le bouton "Disponibilités"
        cy.contains('Disponibilitées').click();
        cy.wait(10); // Attente pour voir le calendrier

        // Étape 10: Julian clique sur le jour 15 avril dans le calendrier
        cy.get('.fc-day[data-date="2024-04-15"]').click();
        cy.wait(10); // Attente pour voir le modal ou le composant de sélection de disponibilité

        // Étape 11: Julian sélectionne la prestation "Photographe" dans le modal
cy.get('#prestation').select('Photographe'); // Remplacez 'Photographe' par la valeur exacte de l'option dans votre select

// Étape 12: Julian sélectionne "Journée entière" pour le 15 avril
// Note: Assurez-vous que la valeur de l'input radio correspond à celle dans le DOM pour "Journée entière"
cy.get('input[type="radio"][value="allDay"]').check();

// Étape 13: Julian confirme la disponibilité pour toute la journée
cy.get('button').contains('Confirmer').click();

// Attendre que le calendrier soit mis à jour
cy.wait(3000); // Ajustez ce temps d'attente selon le temps de réponse de votre application

// Étape 14: Julian sélectionne le 19 avril pour définir une nouvelle disponibilité
// Utilisez l'attribut 'data-date' pour cibler le jour spécifique dans votre calendrier FullCalendar
cy.get(`[data-date="2024-04-19"]`).click();

// Étape 15: Julian sélectionne à nouveau la prestation "Photographe" dans le modal
// Réutilisez la même commande que l'étape 11 s'il s'agit du même élément modal réutilisé.
cy.get('#prestation').select('Photographe');

// Étape 16: Julian sélectionne "Heure(s) spécifique(s)"
// Note: Assurez-vous que la valeur de l'input radio correspond à celle dans le DOM pour "Heure(s) spécifique(s)"
cy.get('input[type="radio"][value="specificTime"]').check();

// Étape 17: Julian sélectionne les heures spécifiques 08:00 et 09:00
// Remplacez 'select[multiple]' par l'identifiant réel ou le sélecteur du champ des heures si nécessaire
cy.get('select[multiple]').select(['08:00', '09:00']);

// Étape 18: Julian confirme la disponibilité pour les heures sélectionnées
cy.get('button').contains('Confirmer').click();

// Attendre que le calendrier soit mis à jour
cy.wait(3000); // Ajustez ce temps d'attente selon le temps de réponse de votre application



    });
});