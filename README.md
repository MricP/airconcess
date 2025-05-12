✈️ AirConcess
AirConcess est une application web de gestion de concessionnaire d’aéronefs, développée dans le cadre d’un projet SAÉ du BUT 2 Informatique. Elle permet la consultation, la vente et l’administration d’un parc d’aéronefs via une interface moderne et responsive.

🗂️ Architecture du projet
bash
Copier
Modifier
/frontend
├── /components       # Composants React réutilisables
├── /hooks            # Hooks personnalisés
├── /pages            # Pages principales de l'application
├── /services         # Appels API et services externes
├── /style            # Fichiers CSS/SCSS

/backend
├── /config           # Fichiers de configuration (base de données, etc.)
├── /controllers      # Logique métier et gestion des requêtes
├── /data             # Données statiques ou fixtures
├── /middlewares      # Middlewares pour la gestion des requêtes
├── /merge            # Scripts de fusion ou de migration
├── /models           # Modèles de données (ORM)
├── /public           # Fichiers accessibles publiquement (index.php, assets)
├── /utils            # Fonctions utilitaires
├── /vendor           # Dépendances PHP (gérées par Composer)
🚀 Fonctionnalités principales
🔍 Catalogue : Consultation des aéronefs disponibles à la vente.

🛒 Rendez-vous : Prenez rendez-vous pour pouvoir acheter votre aéronef.

🧑‍💼 Administration : Interface pour gérer le stock, les ventes et les utilisateurs.

📊 Statistiques : Visualisation des ventes et des performances.

🔐 Authentification : Gestion des sessions pour les clients et les administrateurs.

🛠️ Technologies utilisées
Frontend
React – Bibliothèque JavaScript pour la construction d'interfaces utilisateur.

React Router – Gestion de la navigation entre les pages.

Axios – Requêtes HTTP vers le backend.


Backend
PHP 8+ – Langage de script côté serveur.

Composer – Gestionnaire de dépendances PHP.

MySQL – Système de gestion de base de données relationnelle.

WampServer – Environnement de développement local pour Windows.


⚙️ Installation et configuration
Prérequis
Node.js (v14 ou supérieure)

PHP (v8.0 ou supérieure)

Composer

MySQL ou un autre SGBD compatible

WampServer installé sur votre machine Windows

Étapes d'installation
Cloner le dépôt :

bash
Copier
Modifier
git clone https://forge.univ-lyon1.fr/matheo.flores/airconcess.git
cd airconcess
Configurer le backend :
Copier le dossier /backend dans le répertoire www de WampServer (par défaut C:/wamp64/www/).

Démarrer WampServer et s'assurer que le serveur Apache et MySQL sont en cours d'exécution.

Accéder à http://localhost/phpmyadmin pour créer une base de données nommée airconcess.

Importer le fichier airconcess.sql (situé dans /backend/data/) pour initialiser la base de données.

Configurer les paramètres de connexion à la base de données dans le fichier /backend/config/db.php.

Configurer le frontend :

bash
Copier
Modifier
cd ../frontend
npm install
npm start
L'application sera accessible sur http://localhost:3000.

🔄 Communication entre le frontend et le backend
Le frontend React communique avec le backend PHP via des requêtes HTTP (Axios). Les endpoints sont définis dans le backend et exposés via des routes RESTful. Assurez-vous que le backend est en cours d'exécution avant de lancer le frontend pour éviter les erreurs de connexion.

📁 Structure des répertoires détaillée
Frontend
/components : Composants UI réutilisables (boutons, cartes, modales, etc.).

/hooks : Hooks personnalisés pour la gestion de l'état et des effets secondaires.

/pages : Pages principales de l'application (Accueil, Catalogue, Panier, etc.).

/services : Modules pour les appels API et la gestion des données.

/style : Fichiers de styles globaux et spécifiques aux composants.

Backend
/config : Fichiers de configuration, notamment pour la base de données.

/controllers : Logique métier et gestion des requêtes entrantes.

/data : Données statiques ou fichiers de migration.

/middlewares : Middlewares pour la validation, l'authentification, etc.

/merge : Scripts pour la fusion de données ou la migration.

/models : Modèles de données représentant les entités de la base.

/public : Point d'entrée de l'application backend (index.php) et fichiers accessibles publiquement.

/utils : Fonctions utilitaires partagées.

/vendor : Dépendances PHP installées via Composer.

🔄 Communication entre le frontend et le backend
Le frontend React communique avec le backend PHP via des requêtes HTTP (Axios). Les endpoints sont définis dans le backend et exposés via des routes RESTful. Assurez-vous que le backend est en cours d'exécution avant de lancer le frontend pour éviter les erreurs de connexion.

📄 Licence
Ce projet est réalisé dans le cadre pédagogique de l’IUT Lyon 1 – BUT Informatique. Il n’est pas destiné à une utilisation commerciale.
