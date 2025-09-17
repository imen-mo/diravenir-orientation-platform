# 🎓 DIRAVENIR - Plateforme d'Orientation \

## 📋 Résumé Exécutif

**Plateforme web d'orientation post-bac développée en binôme pour la 2ème édition de la compétition EMSI - Stage DIRAVENIR (juillet-septembre 2024).** Système d'évaluation psychométrique avec 14 questions, algorithmes de matching avancés, et aide complète pour postuler dans des universités internationales (Chine, Chypre, Roumanie) avec ou sans bourses d'études. Application full-stack avec authentification sécurisée, chat temps réel, et génération de rapports PDF.

## 📖 Description du Projet

DIRAVENIR est une plateforme web complète d'orientation post-bac qui aide les étudiants à découvrir leur voie professionnelle idéale et à postuler dans des universités internationales (Chine, Chypre, Roumanie) avec ou sans bourses d'études. La plateforme combine un système d'évaluation psychométrique avancé avec une base de données étendue de programmes universitaires et un accompagnement complet pour les candidatures.

## 🎯 Contexte du Projet

Ce projet a été développé dans le cadre de la **2ème édition de la compétition EMSI** pour un stage chez DIRAVENIR (10 juillet - 10 septembre 2024). L'objectif était de créer une solution innovante d'orientation scolaire et professionnelle permettant aux étudiants de découvrir leur profil idéal et de recevoir des recommandations personnalisées de programmes universitaires.

**Mission** : Concevoir et implémenter un système d'orientation intelligent avec test psychométrique, calculs de profil avancés, base de données de programmes internationaux, et accompagnement complet pour les candidatures universitaires en Chine, Chypre et Roumanie avec ou sans bourses d'études.

## ✅ Tâches Accomplies par le Binôme

- **Développement Backend** : API Spring Boot avec authentification JWT et OAuth2
- **Système d'Orientation** : Test psychométrique avec 14 questions et algorithmes de matching
- **Interface Frontend** : Application React moderne avec design responsive
- **Base de Données** : Modélisation MySQL avec gestion automatique Hibernate
- **Chat Temps Réel** : Communication instantanée via WebSocket
- **Génération PDF** : Rapports d'orientation personnalisés automatiques
- **Gestion Programmes** : Interface d'administration pour universités (Chine, Chypre, Roumanie) avec gestion des bourses et traitement des candidatures
- **Sécurité** : Protection des routes, validation des données, rate limiting

## 🛠️ Technologies Utilisées

- **Backend** : Java 17, Spring Boot, Spring Security, MySQL, JWT, OAuth2, WebSocket
- **Frontend** : React 19, Vite, Tailwind CSS, Chart.js, Axios
- **Outils** : Maven, Git, Spring Mail, iText PDF, Apache POI

## 🏗️ Architecture du Projet

### Structure Générale
```
diravenir1/
├── 📁 src/main/java/com/diravenir/          # Backend Spring Boot
│   ├── 📁 config/                          # Configuration
│   ├── 📁 controller/                      # Contrôleurs REST
│   ├── 📁 dto/                            # Data Transfer Objects
│   ├── 📁 Entities/                       # Entités JPA
│   ├── 📁 exception/                      # Gestion d'erreurs
│   ├── 📁 filter/                         # Filtres de sécurité
│   ├── 📁 mapper/                         # Mappers DTO/Entity
│   ├── 📁 repository/                     # Repositories JPA
│   ├── 📁 service/                        # Services métier
│   └── Diravenir1Application.java         # Point d'entrée
├── 📁 frontend/                           # Frontend React
│   ├── 📁 src/
│   │   ├── 📁 components/                 # Composants React
│   │   ├── 📁 pages/                      # Pages de l'application
│   │   ├── 📁 services/                   # Services API
│   │   ├── 📁 contexts/                   # Contextes React
│   │   ├── 📁 hooks/                      # Hooks personnalisés
│   │   ├── 📁 data/                       # Données statiques
│   │   ├── 📁 styles/                     # Styles CSS
│   │   └── 📁 config/                     # Configuration
│   ├── package.json                       # Dépendances Node.js
│   └── vite.config.js                     # Configuration Vite
├── 📄 pom.xml                            # Configuration Maven
├── 📄 application.properties              # Configuration Spring Boot
└── 📄 README.md                          # Ce fichier
```


## 🚀 Prérequis Système

### Logiciels Requis
- **Java 17** ou supérieur
- **Node.js 18** ou supérieur
- **npm** ou **yarn**
- **MySQL 8.0** ou supérieur
- **Maven 3.6** ou supérieur
- **Git**

### Outils de Développement Recommandés
- **IDE**: IntelliJ IDEA, Eclipse, ou VS Code
- **Navigateur**: Chrome, Firefox, Safari (dernières versions)
- **Base de données**: MySQL Workbench ou phpMyAdmin

## 📦 Installation et Configuration

### 1. Cloner le Projet
```bash
git clone [URL_DU_REPOSITORY]
cd diravenir1
```

### 2. Configuration de la Base de Données

#### Créer la Base de Données MySQL
```sql
CREATE DATABASE diravenir CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'diravenir_user'@'localhost' IDENTIFIED BY 'votre_mot_de_passe';
GRANT ALL PRIVILEGES ON diravenir.* TO 'diravenir_user'@'localhost';
FLUSH PRIVILEGES;
```

#### Configuration des Propriétés
Modifiez le fichier `application.properties` avec vos paramètres :

```properties
# Base de données
spring.datasource.url=jdbc:mysql://localhost:3306/diravenir?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=diravenir_user
spring.datasource.password=votre_mot_de_passe

# Email (Gmail)
spring.mail.username=votre_email@gmail.com
spring.mail.password=votre_mot_de_passe_application

# OAuth2 Google
spring.security.oauth2.client.registration.google.client-id=votre_client_id
spring.security.oauth2.client.registration.google.client-secret=votre_client_secret
```

### 3. Installation des Dépendances Backend
```bash
# Dans le répertoire racine
mvn clean install
```

### 4. Installation des Dépendances Frontend
```bash
# Aller dans le dossier frontend
cd frontend
npm install
```

## 🎯 Démarrage de l'Application

### 1. Démarrer le Backend (Spring Boot)
```bash
# Dans le répertoire racine
mvn spring-boot:run
```
Le backend sera accessible sur : `http://localhost:8084`

### 2. Démarrer le Frontend (React)
```bash
# Dans le dossier frontend
npm run dev
```
Le frontend sera accessible sur : `http://localhost:5173`

## 🔧 Configuration Avancée

### Variables d'Environnement Frontend
Créez un fichier `.env.local` dans le dossier `frontend/` :
```env
VITE_API_BASE_URL=http://localhost:8084
VITE_PORT=5173
```

### Configuration CORS
Le CORS est configuré pour permettre les connexions depuis :
- `http://localhost:3000`
- `http://localhost:5173`
- `http://localhost:5174`

### Configuration de Sécurité
- **JWT** : Authentification par tokens
- **OAuth2** : Connexion Google
- **Rate Limiting** : Protection contre les abus
- **Validation** : Validation des données d'entrée

## 🚀 Fonctionnalités Principales

- **Test d'Orientation** : 14 questions psychométriques avec algorithmes de matching avancés
- **Programmes Universitaires** : Base de données internationale (Chine, Chypre, Roumanie) avec recherche et filtres
- **Aide aux Candidatures** : Accompagnement complet pour postuler dans les universités en Chine, Chypre et Roumanie
- **Gestion des Bourses** : Information et traitement des candidatures avec ou sans bourses d'études
- **Authentification** : JWT + OAuth2 Google pour une connexion sécurisée
- **Chat Temps Réel** : Communication instantanée avec les conseillers via WebSocket
- **Rapports PDF** : Génération automatique de rapports d'orientation personnalisés

## 🏆 Défis Techniques Relevés

- **Algorithmes d'Orientation** : Distance euclidienne pondérée avec 17 piliers psychométriques
- **Gestion Internationale** : Système de candidatures pour universités en Chine, Chypre, Roumanie avec gestion des bourses
- **Architecture Temps Réel** : WebSocket pour chat instantané et notifications push
- **Sécurité Avancée** : JWT + OAuth2 avec rate limiting et protection des routes

## 🗄️ Base de Données

- **MySQL 8.0** : Base `diravenir` avec gestion automatique Hibernate
- **Tables Principales** : users, students, programs, applications, scholarships, orientation_questions/answers/results, chat_sessions/messages
- **Création Automatique** : Tables créées au démarrage avec `ddl-auto=update`

### Installation
1. **Créer la base MySQL** : `CREATE DATABASE diravenir;`
2. **Configurer** : Modifier `application.properties` avec vos paramètres
3. **Démarrage** : Hibernate crée automatiquement les tables au premier lancement

### Ajout de Programmes et Candidatures
- **Interface Admin** : `http://localhost:8084/admin` pour gérer les programmes et candidatures
- **Ajout Manuel** : Formulaire de création avec détails complets (frais, bourses, critères)
- **Gestion Candidatures** : Traitement des applications pour Chine, Chypre, Roumanie
- **Import Excel** : Import en masse des programmes avec informations de bourses

## 🔐 Sécurité

- **Authentification JWT** : Tokens sécurisés pour l'authentification
- **OAuth2 Google** : Connexion sociale intégrée
- **Gestion des Rôles** : Étudiant, Conseiller, Administrateur avec permissions
- **Protection des Routes** : API sécurisées avec autorisation basée sur les rôles

## 🧪 Tests et Performance

- **Tests Backend** : Tests unitaires et d'intégration pour les services et API
- **Tests Frontend** : Tests de composants React et validation des fonctionnalités
- **Optimisation** : Pagination des données, compression des réponses, et chargement optimisé
- **Performance** : Code splitting, lazy loading, et optimisation des bundles

## 🚀 Déploiement

- **Environnement de Production** : MySQL, serveur Java, build Vite, Nginx
- **Variables d'Environnement** : Configuration séparée pour production
- **SSL/HTTPS** : Certificats sécurisés pour la production
- **Build Frontend** : `npm run build` pour la version optimisée

## 🐛 Dépannage

- **Base de Données** : Vérifier que MySQL est démarré et accessible
- **CORS** : Vérifier la configuration dans `application.properties`
- **Frontend** : Nettoyer le cache npm et réinstaller les dépendances
- **Logs** : Consulter les logs Spring Boot pour diagnostiquer les erreurs

## 📚 Documentation API

### Endpoints Principaux
- **Authentification** : `/api/auth/login`, `/api/auth/register`, `/api/auth/refresh`
- **Orientation** : `/api/orientation/questions`, `/api/orientation/submit`, `/api/orientation/results`
- **Programmes** : `/api/programs`, `/api/programs/search`, `/api/programs/{id}`
- **Applications** : `/api/applications/submit`, `/api/applications/status`, `/api/applications/documents`
- **Bourses** : `/api/scholarships`, `/api/scholarships/eligibility`, `/api/scholarships/apply`
- **Chat** : `/api/chat/sessions`, `/api/chat/messages`, `WebSocket /ws/chat`

## 🤝 Contribution

- **Code Style** : Suivre les conventions Java/JavaScript
- **Commits** : Messages clairs et descriptifs
- **Tests** : Écrire des tests pour les nouvelles fonctionnalités
- **Documentation** : Mettre à jour la documentation

## 👥 Équipe du Projet

### Développeurs
- **Développeur Principal** : Imane Mourid
- **Développeur Binôme** : Meryeme Bouzaid

### Encadrement
- **Encadrante** : Mme Chaimae Taoussi
- **Entreprise** : DIRAVENIR
- **Compétition** : 2ème édition EMSI - Stage DIRAVENIR (10 juillet - 10 septembre 2024)


### Ressources Utiles
- **Documentation Spring Boot** : https://spring.io/projects/spring-boot
- **Documentation React** : https://reactjs.org/docs
- **Documentation MySQL** : https://dev.mysql.com/doc/

## 📄 Licence

Ce projet a été développé dans le cadre d'une compétition de l'EMSI  chez DIRAVENIR. Tous les droits sont réservés à DIRAVENIR.

## 📈 Résultats et Impacts

- ✅ **Système complet** : Test d'orientation, base de programmes, candidatures universitaires, chat temps réel
- ✅ **Partenariats internationaux** : Applications pour universités en Chine, Chypre, Roumanie avec gestion des bourses
- ✅ **Technologies maîtrisées** : Spring Boot, React, MySQL, JWT, WebSocket, génération PDF
- ✅ **Compétences développées** : Architecture full-stack, algorithmes, gestion internationale, travail en équipe

## 🎉 Remerciements

Merci à **Mme Chaimae Taoussi** pour son encadrement exceptionnel et son soutien tout au long de ce projet de compétition. Merci également à **Meryeme Bouzaid** pour la collaboration en binôme et à toute l'équipe **DIRAVENIR** pour cette opportunité d'apprentissage et de développement professionnel.

---

**DIRAVENIR** - Votre avenir commence ici ! 🚀
