# Moments Events

Ce fichier README contient toutes les instructions pour installer et utiliser l'application web Moments Events.

## Prérequis
1. Installer PHP https://www.php.net/manual/en/install.macosx.packages.php
2. Installer Composer https://getcomposer.org/download/
3. Installer SQLITE


## Installation de l'application web en local


1. Télécharger et Dézipper le projet.
2. Ouvrir le projet avec Visual Studio Code.
3. Ouvrir le terminal dans Visual Studio Code.
4. Exécuter la commande `composer install` pour installer Composer, en veillant à bien être à la racine du projet.
5. Configurer le fichier `.env` (à la racine du projet) pour faire fonctionner l'application (connexion Payrexx, connexion base de données, connexion service mail).
6. Exécuter la commande `php artisan migrate` pour effectuer les migrations de la base de données (répondre Y si demandé).
7. Exécuter la commande `php artisan serve` pour lancer le serveur Laravel.
8. Installer les dépendances de React.
9. Ouvrir un nouveau terminal dans Visual Studio Code en cliquant sur "+".
10. Se placer dans le dossier /react en exécutant la commande `cd react`.
11. Exécuter la commande `npm install --force` pour installer les dépendances de React, en vérifiant d’être sur le dossier /react.
12. Exécuter la commande `npm run dev` pour lancer le serveur React.

### Les dépendances du projet

* Une fois la commande `composer install` effectuée, vous pouvez consulter les dépendances PHP dans le fichier `/composer.lock` qui se trouve à la racine du projet Laravel.
* Une fois la commande `npm install --force` effectuée, vous pouvez consulter les dépendances Javascript dans le fichier `/package-lock.json` qui se trouve à la racine du répertoire de React.

## Installation de l'application web en ligne

### Prérequis

* Un hébergement web mutualisé chez Infomaniak dans notre cas.
* Les informations de connexion FTP (hôte, nom d'utilisateur, mot de passe).
* Les informations de connexion à la base de données (hôte, nom d'utilisateur, mot de passe, nom de la base de données).
* Un emplacement pour le domaine principal (partie frontend) momentsevents.ch.
* Un emplacement pour le sous domaine (partie api) api.momentsevents.ch.
* Installer composer dans le serveur.

Le site web momentsevents.ch contiendra un lien symbolique vers l’API (api.momentsevents.ch) afin de sécuriser les données de configuration du fichier d’environnement.

### Installation de momentsevents.ch

1. Ouvrir le projet dans un éditeur de texte (Visual Studio).
2. Ouvrir un terminal.
3. Se diriger dans le répertoire react du projet (depuis la racine, faire `cd react`).
4. Lancer la commande `npm run build` (qui créé un répertoire dist à la racine du répertoire react).
5. Récupérer le contenu du répertoire dist.
6. Téléverser les fichiers sur l’emplacement du site web.

    a. Ouvrir un client FTP (comme FileZilla).
    
    b. Se connecter à l’hébergement web mutualisé chez Infomaniak à l’aide de l’identifiant de l’utilisateur FTP, le mot de passe associé et l’adresse du serveur (host).
    
    c. Téléverser tous les fichiers de l’application à l’emplacement de momentse

vents.ch.

### Installation de api.momentsevents.ch

1. Créer une base de données sur l’interface Infomaniak.
2. Configurer les variables d’environnement dans le fichier .env depuis un éditeur de texte.
```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1 # remplacer par le host de l’hébergement
DB_PORT=3306
DB_DATABASE=nom_de_la_base_de_donnees
DB_USERNAME=nom_utilisateur
DB_PASSWORD=mot_de_passe
```
3. Se connecter en SSH.
4. Se diriger sur le répertoire racine du site Laravel (api.momentsevents.ch).
5. Exécuter la commande `php artisan migrate` afin d’installer toutes les tables de la base de données.

### Configuration des emails

Il est nécessaire d’adapter le code afin que le système d’envoi d’email soit fonctionnel. Pour cela, suivez les étapes suivantes : 

1. Ouvrir le fichier .env à la racine du projet.
2. Modifier les lignes 49 à 56 afin qu’elles correspondent aux valeurs de votre email (l’exemple actuel contient les valeurs nécessaires pour Gmail).
```bash
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=465
MAIL_USERNAME=adresse mail complète
MAIL_PASSWORD=votre mot de passe (ou clé api)
MAIL_ENCRYPTION=ssl
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"
```
La variable `APP_NAME`, qui est possible de modifier, contient par défaut la valeur suivante : `APP_NAME='Sparkling Events'`.

### Configuration Payrexx

La clé API de Payrexx est contenue dans le fichier .env, si celle-ci est modifier depuis le panel d’administration de Payrexx, il est important de l’adapte ainsi :

1. Se rendre dans le fichier .env.
2. Éditer la ligne `YOUR_PAYREXX_API_KEY=VOTRE CLE`.

### Lancer l'application

Ouvrir un navigateur web et accéder à l'adresse http://momentsevents.ch pour accéder à l'application.

## Installation des tests pour l’application web

### Tests unitaires et d'intégration

Les tests d’intégration et unitaires se font grâce à Laravel avec PHP. Lors de la création du projet Laravel, un onglet « test » dans l’explorateur de fichier de votre IDE est créée. Il n’y a donc rien de plus à faire. 

Nous avons créé nos tests en créant un fichier directement dans l’onglet « test » mais vous pouvez également le faire en ligne de commande dans le terminal.

Pour lancer ces tests, utilisez la commande suivante dans le terminal à la racine du projet : 

```bash
php artisan test
```

### Tests de bout en bout

Les tests de bout en bout seront effectués à l’aide de Cypress, une bibliothèque de tests automatisés en JavaScript.

1. A la racine du projet, utilisez la commande suivante dans le terminal de visual studio code pour installer Cypress via npm : 
```bash
npm install cypress --save-dev
```
2. Ouvrir l’application Cypress.
```bash
npx cypress open
```
Cette commande ouvrira une nouvelle

 fenêtre. Choisissez E2E Testing puis le navigateur sur lequel vous souhaitez lancer les tests.

Dès lors vous serez en mesure de voir les tests déjà faits et de les lancer en cliquant sur un fichier (nomDuFichier.cy.js).

Dans l’explorateur de fichier de votre IDE doit se trouver un onglet « cypress » et dans cet onglet se trouvent les tests « e2e ». C’est ici que vous pouvez écrire ou modifier les tests.
