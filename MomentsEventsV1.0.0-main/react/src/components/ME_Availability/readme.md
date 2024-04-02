# MomentsEvent Calendar Component

Ce composant React est conçu pour gérer les disponibilités dans le cadre d'événements avec l'utilisation de calendriers interactifs. Il utilise FullCalendar pour la visualisation et la gestion des événements.

## Installation

Assurez-vous d'avoir Node.js installé sur votre machine.

1. Clonez ce dépôt sur votre machine.
2. Naviguez vers le répertoire contenant ce composant.
3. Installez les dépendances en exécutant la commande suivante :

npm install @fullcalendar/react @fullcalendar/daygrid @fullcalendar/timegrid @fullcalendar/interaction 
npm install axios 
npm install react-modal

Pour etre ne francais:
npm install @fullcalendar/core @fullcalendar/daygrid @fullcalendar/timegrid @fullcalendar/interaction @fullcalendar/core @fullcalendar/core/locales/fr

4. Assurez-vous que votre projet utilise un client axios configuré pour les appels API.

## Utilisation

Pour utiliser ce composant, importez-le dans votre application React comme ceci :

import Calendar from './path/to/Calendar';

Ensuite, vous pouvez l'utiliser dans votre JSX comme n'importe quel autre composant :

<Calendar />

## Fonctionnalités

- Affichage des disponibilités dans un calendrier interactif.
- Ajout d'événements de disponibilité pour des journées entières ou des heures spécifiques.
- Gestion des événements cliquables pour afficher des détails ou prendre des actions supplémentaires.

## Personnalisation

Vous pouvez personnaliser ce composant en ajustant les styles dans le fichier de composant ou en modifiant les options du calendrier FullCalendar selon vos besoins.

## Contribuer

Les contributions sont les bienvenues ! Si vous avez des idées pour améliorer ce composant ou si vous rencontrez des problèmes, veuillez ouvrir une issue ou soumettre une pull request.
