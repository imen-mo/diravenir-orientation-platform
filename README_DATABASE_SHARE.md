# 📊 Partage de Base de Données - DIRAVENIR ORIENTATION SYSTEM

## 🎯 Objectif
Ce dossier contient tous les fichiers nécessaires pour partager la base de données DIRAVENIR avec votre binôme de stage.

## 📁 Contenu du Dossier
- `diravenir_complete_backup.sql` : Backup complet de la base de données
- `restore-database.bat` : Script automatique de restauration
- `README_DATABASE_SHARE.md` : Ce fichier d'instructions

## 🚀 Instructions pour le Binôme

### Prérequis
1. **MySQL installé** sur votre ordinateur
2. **Droits administrateur** pour exécuter les scripts
3. **Java 17+** et **Maven** pour l'application backend

### Étapes de Restauration

#### Option 1 : Script Automatique (Recommandé)
1. Copiez tout ce dossier sur votre ordinateur
2. Clic droit sur `restore-database.bat` → "Exécuter en tant qu'administrateur"
3. Suivez les instructions à l'écran
4. Entrez votre mot de passe MySQL quand demandé

#### Option 2 : Restauration Manuelle
1. Ouvrez MySQL Workbench ou ligne de commande MySQL
2. Créez une base de données : `CREATE DATABASE diravenir_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
3. Restaurez le backup : `mysql -u root -p diravenir_db < diravenir_complete_backup.sql`

### 🔧 Configuration de l'Application

#### Backend (Spring Boot)
1. Modifiez le fichier `src/main/resources/application.properties` :
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/diravenir_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=VOTRE_MOT_DE_PASSE_MYSQL
```

#### Frontend (React)
1. Vérifiez que l'URL de l'API dans `src/services/api.js` pointe vers :
```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

## 📋 Vérification de la Restauration

### Vérifier les Tables
```sql
USE diravenir_db;
SHOW TABLES;
```

### Tables Attendues
- `users` : Utilisateurs du système
- `students` : Profils étudiants
- `programs` : Programmes universitaires
- `universities` : Universités partenaires
- `destinations` : Pays d'études
- `orientation_tests` : Tests d'orientation
- `orientation_results` : Résultats des tests
- `applications` : Candidatures
- `documents` : Documents étudiants
- `chat_sessions` : Sessions de chat

### Vérifier les Données
```sql
SELECT COUNT(*) FROM programs; -- Doit retourner 44 programmes
SELECT COUNT(*) FROM universities; -- Doit retourner plusieurs universités
SELECT COUNT(*) FROM destinations; -- Doit retourner 3 destinations
```

## 🚨 Dépannage

### Erreur de Connexion MySQL
- Vérifiez que MySQL est démarré
- Vérifiez le nom d'utilisateur et mot de passe
- Vérifiez que le port 3306 est libre

### Erreur de Permissions
- Exécutez le script en tant qu'administrateur
- Vérifiez les permissions MySQL de votre utilisateur

### Erreur de Caractères
- Assurez-vous que MySQL utilise UTF8MB4
- Vérifiez la configuration des collations

## 📞 Support
En cas de problème :
1. Vérifiez les logs MySQL
2. Consultez la documentation Spring Boot
3. Contactez votre binôme pour assistance

## 🔄 Mise à Jour
Pour mettre à jour la base de données :
1. Exécutez `share-database.bat` sur l'ordinateur source
2. Partagez le nouveau dossier avec votre binôme
3. Répétez le processus de restauration

---
**Note** : Ce backup contient toutes les données de développement. Ne pas utiliser en production sans vérification préalable.
