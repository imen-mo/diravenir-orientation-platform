# 🔒 Guide de Sécurité - Diravenir

## 🚨 Mesures de Sécurité Implémentées

### 1. **Authentification et Autorisation**
- ✅ **JWT (JSON Web Tokens)** avec signature HS512
- ✅ **BCrypt** pour le hachage des mots de passe (force 12)
- ✅ **Gestion des rôles** dynamique (USER, ADMIN, etc.)
- ✅ **Expiration automatique** des tokens (24h par défaut)
- ✅ **Validation des tokens** côté serveur
- ✅ **OAuth2 Google Login** intégré
- ✅ **Vérification email** obligatoire
- ✅ **Réinitialisation de mot de passe** par email

### 2. **Protection contre les Attaques**
- ✅ **Rate Limiting** : 60 requêtes/minute, 10 inscriptions/heure
- ✅ **Protection contre les tentatives de login** : Blocage après 5 échecs
- ✅ **reCAPTCHA** intégré pour login et inscription
- ✅ **Validation des entrées** stricte avec Bean Validation
- ✅ **Protection CSRF** (désactivée pour API stateless)
- ✅ **CORS** configuré de manière sécurisée

### 3. **Validation des Données**
- ✅ **Validation email** avec regex stricte
- ✅ **Politique de mots de passe forts** :
  - Minimum 8 caractères
  - Au moins une majuscule
  - Au moins une minuscule
  - Au moins un chiffre
  - Au moins un caractère spécial
- ✅ **Validation des noms** (lettres, espaces, tirets, apostrophes)
- ✅ **Normalisation des données** (trim, lowercase)

### 4. **Gestion des Erreurs**
- ✅ **Messages d'erreur génériques** (pas d'information leakage)
- ✅ **Logging sécurisé** avec niveaux appropriés
- ✅ **Gestionnaire d'exceptions global**
- ✅ **Codes de statut HTTP appropriés**

### 5. **Configuration Sécurisée**
- ✅ **Variables d'environnement** pour les secrets
- ✅ **Clés JWT** configurables et sécurisées
- ✅ **Configuration CORS** restrictive
- ✅ **Headers de sécurité** appropriés
- ✅ **HTTPS** configuré et sécurisé
- ✅ **Configuration email** SMTP sécurisée

## 🔧 Configuration Requise

### Variables d'Environnement

Créez un fichier `.env` basé sur `env.example` :

```bash
# Copiez le fichier d'exemple
cp env.example .env

# Éditez avec vos vraies valeurs
nano .env
```

### Variables Obligatoires

```bash
# Base de données
DB_USERNAME=your_db_username
DB_PASSWORD=your_secure_db_password

# JWT (GÉNÉREZ UNE CLÉ SÉCURISÉE !)
JWT_SECRET=your-super-secure-jwt-secret-key-256-bits-minimum-required-for-hs512-algorithm

# reCAPTCHA
RECAPTCHA_SECRET=your_recaptcha_secret_key

# Email (Gmail)
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_app_password

# Google OAuth2
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# HTTPS (optionnel en développement)
SSL_ENABLED=false
SSL_KEYSTORE_PASSWORD=your_keystore_password
```

## 🛡️ Bonnes Pratiques de Sécurité

### 1. **Génération de Clés Sécurisées**

```bash
# Générer une clé JWT sécurisée (256 bits minimum)
openssl rand -base64 64

# Ou utiliser un générateur en ligne sécurisé
```

### 2. **Configuration de la Base de Données**

```sql
-- Créer un utilisateur dédié avec privilèges limités
CREATE USER 'diravenir_user'@'localhost' IDENTIFIED BY 'strong_password';
GRANT SELECT, INSERT, UPDATE, DELETE ON diravenir.* TO 'diravenir_user'@'localhost';
FLUSH PRIVILEGES;
```

### 3. **Configuration Email (Gmail)**

```bash
# 1. Activer l'authentification à 2 facteurs sur votre compte Gmail
# 2. Générer un mot de passe d'application
# 3. Utiliser ce mot de passe dans MAIL_PASSWORD
```

### 4. **Configuration Google OAuth2**

```bash
# 1. Aller sur Google Cloud Console
# 2. Créer un projet
# 3. Activer l'API Google+ 
# 4. Créer des identifiants OAuth2
# 5. Ajouter les URIs de redirection autorisés
```

### 5. **Configuration du Serveur**

```bash
# Désactiver les informations de version
server.error.include-stacktrace=never
server.error.include-message=never

# Configurer HTTPS en production
server.ssl.enabled=true
server.ssl.key-store=classpath:keystore.p12
server.ssl.key-store-password=your_keystore_password

# Générer un certificat SSL auto-signé pour le développement
keytool -genkeypair -alias diravenir -keyalg RSA -keysize 2048 -storetype PKCS12 -keystore keystore.p12 -validity 3650
```

## 🔍 Tests de Sécurité

### 1. **Test des Endpoints**

```bash
# Test d'inscription avec données valides
curl -X POST http://localhost:8084/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123!",
    "confirmPassword": "SecurePass123!",
    "nom": "Doe",
    "prenom": "John",
    "recaptchaToken": "valid_token"
  }'

# Test de connexion
curl -X POST http://localhost:8084/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123!",
    "recaptchaToken": "valid_token"
  }'
```

### 2. **Test du Rate Limiting**

```bash
# Tester le rate limiting (60 requêtes/minute)
for i in {1..65}; do
  curl -X POST http://localhost:8084/api/auth/signin \
    -H "Content-Type: application/json" \
    -d '{"email": "test@example.com", "password": "wrong", "recaptchaToken": "token"}'
done
```

## 🚨 Points d'Attention

### 1. **En Production**
- ✅ Utilisez HTTPS uniquement
- ✅ Configurez un reverse proxy (Nginx/Apache)
- ✅ Activez les logs de sécurité
- ✅ Surveillez les tentatives d'attaque
- ✅ Mettez à jour régulièrement les dépendances

### 2. **Maintenance**
- ✅ Changez régulièrement les clés JWT
- ✅ Surveillez les logs d'erreur
- ✅ Testez régulièrement la sécurité
- ✅ Sauvegardez la base de données

### 3. **Monitoring**
- ✅ Surveillez les tentatives de connexion échouées
- ✅ Surveillez les inscriptions suspectes
- ✅ Surveillez les requêtes anormales
- ✅ Configurez des alertes de sécurité

## 📞 Support Sécurité

En cas de problème de sécurité :
1. Ne partagez JAMAIS les logs ou informations sensibles
2. Contactez l'équipe de développement
3. Documentez l'incident
4. Appliquez les correctifs nécessaires

---

**⚠️ IMPORTANT :** Ce guide doit être mis à jour régulièrement avec les nouvelles menaces et bonnes pratiques de sécurité. 