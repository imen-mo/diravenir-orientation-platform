# 🔧 GUIDE CONFIGURATION GOOGLE CONSOLE - OAUTH2

## 📋 **PRÉREQUIS**
- Compte Google (Gmail)
- Projet Google Cloud existant ou à créer

## 🚀 **ÉTAPE 1 : ACCÈS GOOGLE CLOUD CONSOLE**

### 1.1 Aller sur Google Cloud Console
```
https://console.cloud.google.com/
```

### 1.2 Sélectionner le Projet
- Si vous avez déjà un projet Diravenir, sélectionnez-le
- Sinon, créez un nouveau projet :
  - Cliquez sur "Select a project" (en haut)
  - Cliquez sur "New Project"
  - Nom : "Diravenir OAuth2"
  - Cliquez sur "Create"

## 🔑 **ÉTAPE 2 : ACTIVATION DES APIs**

### 2.1 Aller dans la Bibliothèque d'APIs
```
Menu de gauche → APIs & Services → Library
```

### 2.2 Rechercher et Activer l'API OAuth2
- Recherchez : "Google+ API" ou "OAuth2 API"
- Cliquez sur l'API trouvée
- Cliquez sur "Enable"

### 2.3 Vérifier l'Activation
```
Menu de gauche → APIs & Services → Enabled APIs
```
Vous devriez voir l'API OAuth2 dans la liste.

## 🎯 **ÉTAPE 3 : CRÉATION DES CREDENTIALS**

### 3.1 Aller dans Credentials
```
Menu de gauche → APIs & Services → Credentials
```

### 3.2 Créer un OAuth 2.0 Client ID
- Cliquez sur "Create Credentials"
- Sélectionnez "OAuth 2.0 Client IDs"

### 3.3 Configuration de l'Application
- **Application type** : Web application
- **Name** : Diravenir Web Client
- **Authorized JavaScript origins** :
  ```
  http://localhost:3000
  http://localhost:8084
  ```

### 3.4 Configuration des URIs de Redirection
Dans **Authorized redirect URIs**, ajoutez :
```
http://localhost:8084/oauth2/authorization/google
http://localhost:3000/oauth2-success
http://localhost:3000/oauth2-failure
```

### 3.5 Créer le Client ID
- Cliquez sur "Create"
- **IMPORTANT** : Notez le Client ID et Client Secret affichés

## 📝 **ÉTAPE 4 : CONFIGURATION DU FICHIER .ENV**

### 4.1 Renommer le Fichier
```
Renommez : frontend/env-oauth2.txt → frontend/.env
```

### 4.2 Vérifier le Contenu
Le fichier `.env` doit contenir :
```bash
VITE_API_URL=http://localhost:8084/api
VITE_GOOGLE_CLIENT_ID=VOTRE_CLIENT_ID_ICI
VITE_GOOGLE_CLIENT_SECRET=VOTRE_CLIENT_SECRET_ICI
```

### 4.3 Mettre à Jour application.properties
Dans `src/main/resources/application.properties`, vérifiez :
```properties
spring.security.oauth2.client.registration.google.client-id=${GOOGLE_CLIENT_ID:VOTRE_CLIENT_ID}
spring.security.oauth2.client.registration.google.client-secret=${GOOGLE_CLIENT_SECRET:VOTRE_CLIENT_SECRET}
```

## 🔒 **ÉTAPE 5 : SÉCURITÉ ET CONFIGURATION**

### 5.1 Vérifier les Scopes
Dans Google Console, vérifiez que les scopes sont configurés :
- `openid`
- `profile`
- `email`

### 5.2 Test des Credentials
- Allez dans "Credentials" → Votre Client OAuth2
- Cliquez sur "Test" pour vérifier la configuration

## 🧪 **ÉTAPE 6 : TEST DE LA CONFIGURATION**

### 6.1 Démarrer le Backend
```bash
mvn spring-boot:run
```

### 6.2 Démarrer le Frontend
```bash
cd frontend
npm start
```

### 6.3 Tester l'Authentification
- Aller sur `http://localhost:3000/login`
- Cliquer sur "Login with Google"
- Vérifier la redirection vers Google
- Tester la connexion

## 🚨 **PROBLÈMES COURANTS ET SOLUTIONS**

### Erreur : "Invalid redirect URI"
- Vérifiez que les URIs dans Google Console correspondent exactement
- Assurez-vous qu'il n'y a pas d'espaces en trop

### Erreur : "OAuth2 client registration not found"
- Vérifiez le fichier `application.properties`
- Vérifiez que les variables d'environnement sont correctes

### Erreur : "Access blocked"
- Vérifiez que l'API OAuth2 est activée
- Vérifiez que les scopes sont configurés

## ✅ **VÉRIFICATION FINALE**

Après configuration, vous devriez avoir :
- ✅ API OAuth2 activée dans Google Console
- ✅ Client OAuth2 créé avec les bonnes URIs
- ✅ Fichier `.env` configuré dans le frontend
- ✅ `application.properties` mis à jour
- ✅ Backend et frontend qui démarrent sans erreur
- ✅ Boutons Google fonctionnels dans Login/Register

## 📞 **SUPPORT**

Si vous rencontrez des problèmes :
1. Vérifiez les logs du backend
2. Vérifiez la console du navigateur
3. Vérifiez la configuration Google Console
4. Consultez le guide de dépannage OAuth2

---

**🎯 Votre authentification Google OAuth2 sera fonctionnelle après ces étapes !**
