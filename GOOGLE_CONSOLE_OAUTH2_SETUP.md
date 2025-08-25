# 🔐 Configuration Google Console OAuth2 - Guide Complet

## 📋 **URIs de Redirection à Configurer dans Google Console**

### **URI Principal (Obligatoire)**
```
http://localhost:8084/oauth2/authorization/google
```

### **URIs Additionnels (Recommandés)**
```
http://localhost:8084/oauth2/authorization/google
http://localhost:3000/oauth2-success
http://localhost:3000/oauth2-failure
```

## 🚀 **Étapes de Configuration dans Google Console**

### **1. Accéder à Google Cloud Console**
- Allez sur [Google Cloud Console](https://console.cloud.google.com/)
- Connectez-vous avec votre compte Google

### **2. Sélectionner le Projet**
- Sélectionnez le projet : `diravenir-oauth2` ou créez-en un nouveau

### **3. Activer l'API Google+**
- Dans le menu, allez à **APIs & Services** > **Library**
- Recherchez "Google+ API" et activez-la

### **4. Configurer l'Écran de Consentement OAuth**
- Allez à **APIs & Services** > **OAuth consent screen**
- Choisissez **External** et cliquez sur **Create**
- Remplissez les informations :
  - **App name**: Diravenir
  - **User support email**: votre email
  - **Developer contact information**: votre email
- Cliquez sur **Save and Continue**

### **5. Créer les Identifiants OAuth2**
- Allez à **APIs & Services** > **Credentials**
- Cliquez sur **+ CREATE CREDENTIALS** > **OAuth 2.0 Client IDs**
- Sélectionnez **Web application**

### **6. Configurer l'Application Web**
- **Name**: Diravenir Web App
- **Authorized JavaScript origins**:
  ```
  http://localhost:3000
  http://localhost:3005
  http://localhost:5173
  ```
- **Authorized redirect URIs**:
  ```
  http://localhost:8084/oauth2/authorization/google
  http://localhost:3000/oauth2-success
  http://localhost:3000/oauth2-failure
  ```

### **7. Récupérer les Identifiants**
- **Client ID**: Copiez le Client ID généré
- **Client Secret**: Copiez le Client Secret généré

## ⚙️ **Mise à Jour de la Configuration**

### **Option 1 : Variables d'Environnement (Recommandée)**
Créez un fichier `.env` à la racine du projet :

```bash
# Google OAuth2 Configuration
GOOGLE_CLIENT_ID=votre_client_id_ici
GOOGLE_CLIENT_SECRET=votre_client_secret_ici

# OAuth2 Redirect URLs
OAUTH2_SUCCESS_REDIRECT_URL=http://localhost:3000/oauth2-success
OAUTH2_FAILURE_REDIRECT_URL=http://localhost:3000/oauth2-failure
```

### **Option 2 : Fichier Properties**
Mettez à jour `src/main/resources/application.properties` :

```properties
# Google OAuth2 Configuration
spring.security.oauth2.client.registration.google.client-id=votre_client_id_ici
spring.security.oauth2.client.registration.google.client-secret=votre_client_secret_ici

# OAuth2 Redirect URLs
app.oauth2.success-redirect-url=http://localhost:3000/oauth2-success
app.oauth2.failure-redirect-url=http://localhost:3000/oauth2-failure
```

## 🔍 **Test de la Configuration**

### **1. Redémarrer l'Application**
```bash
# Arrêter l'application (Ctrl+C)
# Puis redémarrer
mvn spring-boot:run
```

### **2. Tester la Connexion OAuth2**
- Allez sur votre frontend
- Cliquez sur "Se connecter avec Google"
- Vérifiez que vous n'avez plus l'erreur `redirect_uri_mismatch`

### **3. Vérifier les Logs**
Dans les logs de l'application, vous devriez voir :
```
✅ OAuth2 Login réussi
👤 Utilisateur OAuth2: [Nom] ([email])
🔐 Session OAuth2 créée pour l'utilisateur: [email]
🔄 Redirection vers: http://localhost:3000/oauth2-success?...
```

## 🚨 **Dépannage**

### **Erreur : redirect_uri_mismatch**
- Vérifiez que l'URI dans Google Console correspond exactement à : `http://localhost:8084/oauth2/authorization/google`
- Assurez-vous qu'il n'y a pas d'espaces en début/fin
- Vérifiez que le port 8084 est correct

### **Erreur : invalid_client**
- Vérifiez que le Client ID et Client Secret sont corrects
- Assurez-vous que l'API Google+ est activée

### **Erreur : access_denied**
- Vérifiez que l'écran de consentement OAuth est configuré
- Assurez-vous que l'application est en mode "Testing" ou "Production"

## 📱 **Configuration pour la Production**

Quand vous déployez en production, ajoutez ces URIs dans Google Console :

```
https://votre-domaine.com/oauth2/authorization/google
https://votre-domaine.com/oauth2-success
https://votre-domaine.com/oauth2-failure
```

## ✅ **Vérification Finale**

Après configuration, testez avec :
1. ✅ Connexion OAuth2 Google
2. ✅ Redirection vers le frontend
3. ✅ Création de session
4. ✅ Récupération des informations utilisateur

---

**Note**: Gardez vos identifiants OAuth2 secrets et ne les partagez jamais dans le code source public !
