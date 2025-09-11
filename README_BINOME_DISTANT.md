# 🌐 Guide pour Binôme Distant - DIRAVENIR ORIENTATION SYSTEM

## 🎯 Objectif
Ce guide est spécialement conçu pour partager la base de données DIRAVENIR avec votre binôme qui travaille à distance.

## 📦 Contenu du Partage
- `diravenir_complete_backup.sql` : Backup complet de la base de données
- `restore-database-remote.bat` : Script de restauration optimisé pour le travail distant
- `CONFIGURATION_GUIDE.txt` : Guide de configuration rapide
- `README_BINOME_DISTANT.md` : Ce guide complet

## 🚀 Installation Rapide

### 1. Prérequis
- **MySQL** installé et configuré
- **Java 17+** et **Maven** pour le backend
- **Node.js** et **npm** pour le frontend
- **Git** (optionnel, pour cloner le projet)

### 2. Restauration de la Base de Données
```bash
# Exécutez le script de restauration
restore-database-remote.bat
```

### 3. Configuration Backend
Modifiez `src/main/resources/application.properties` :
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/diravenir?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=VOTRE_MOT_DE_PASSE_MYSQL
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false
```

### 4. Configuration Frontend
Vérifiez `src/services/api.js` :
```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

## 🔧 Démarrage de l'Application

### Backend (Terminal 1)
```bash
cd backend
mvn spring-boot:run
```
**URL** : http://localhost:8080

### Frontend (Terminal 2)
```bash
cd frontend
npm install
npm start
```
**URL** : http://localhost:3000

## ✅ Vérification

### Test de Connexion API
```bash
curl http://localhost:8080/api/programs
```

### Vérification Base de Données
```sql
USE diravenir;
SHOW TABLES;
SELECT COUNT(*) as 'Total Programs' FROM programs;
SELECT COUNT(*) as 'Total Universities' FROM universities;
```

## 🌐 Méthodes de Partage Recommandées

### 1. **Google Drive** (Recommandé)
- Uploadez l'archive ZIP
- Partagez le lien avec votre binôme
- **Avantage** : Accès permanent, versioning

### 2. **WeTransfer** (Simple)
- Allez sur https://wetransfer.com
- Uploadez l'archive (gratuit jusqu'à 2GB)
- Envoyez le lien par WhatsApp/Email
- **Avantage** : Simple, pas besoin de compte

### 3. **GitHub** (Professionnel)
- Créez un repository privé
- Commitez l'archive dans une branche `database-share`
- Partagez le lien de téléchargement
- **Avantage** : Versioning, historique

### 4. **OneDrive** (Microsoft)
- Uploadez sur OneDrive
- Partagez le lien
- **Avantage** : Intégration Windows

## 📱 Communication avec votre Binôme

### Messages Types à Envoyer
```
📊 Base de données DIRAVENIR prête !

🔗 Lien de téléchargement : [LIEN]
📁 Fichier : diravenir_database_share.zip
📋 Instructions : README_BINOME_DISTANT.md

✅ Après installation :
- Backend : http://localhost:8080
- Frontend : http://localhost:3000

❓ Besoin d'aide ? Contactez-moi !
```

## 🚨 Dépannage Commun

### Problème : MySQL ne démarre pas
```bash
# Windows
net start mysql
# Ou redémarrez le service MySQL
```

### Problème : Port 8080 occupé
```bash
# Trouvez le processus
netstat -ano | findstr :8080
# Tuez le processus
taskkill /PID [PID] /F
```

### Problème : Base de données corrompue
```bash
# Supprimez et recréez
mysql -u root -p -e "DROP DATABASE diravenir;"
# Puis relancez le script de restauration
```

## 🔄 Synchronisation Continue

### Pour Mettre à Jour la Base
1. Exécutez `share-database-remote.bat`
2. Partagez la nouvelle archive
3. Votre binôme doit refaire la restauration

### Communication des Changements
```
🔄 Mise à jour base de données disponible !

📅 Date : [DATE]
📝 Changements : [DESCRIPTION]
🔗 Nouveau lien : [LIEN]

⚠️ Remplacez votre base actuelle par cette nouvelle version.
```

## 📞 Support Technique

### En Cas de Problème
1. **Vérifiez les logs** :
   - Backend : `logs/application.log`
   - MySQL : Event Viewer (Windows)

2. **Tests de connectivité** :
   ```bash
   # Test MySQL
   mysql -u root -p -e "SELECT 1;"
   
   # Test API
   curl http://localhost:8080/api/health
   ```

3. **Contactez votre binôme** avec :
   - Message d'erreur exact
   - Screenshot si possible
   - Configuration système (OS, versions)

## 🎯 Checklist de Démarrage

- [ ] MySQL installé et démarré
- [ ] Base de données restaurée
- [ ] Backend démarré sur port 8080
- [ ] Frontend démarré sur port 3000
- [ ] Test API réussi
- [ ] Application accessible dans le navigateur

---
**💡 Conseil** : Gardez ce guide ouvert pendant l'installation pour suivre chaque étape !
