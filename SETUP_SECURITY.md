# 🔐 Configuration des Fonctionnalités de Sécurité - Diravenir

## 📋 Fonctionnalités Implémentées

### ✅ **Vérification Email**
- Envoi automatique d'email de vérification lors de l'inscription
- Token de vérification sécurisé avec expiration (24h)
- Endpoint de vérification : `GET /api/auth/verify-email?token=xxx`

### ✅ **HTTPS/SSL**
- Configuration SSL/TLS pour le chiffrement des données
- Certificat auto-signé pour le développement
- Redirection HTTPS en production

### ✅ **reCAPTCHA**
- Intégration Google reCAPTCHA v3
- Validation côté serveur et client
- Protection contre les bots et attaques automatisées

### ✅ **Login avec Google (OAuth2)**
- Authentification OAuth2 avec Google
- Création automatique de compte pour les nouveaux utilisateurs
- Gestion des utilisateurs existants

### ✅ **Réinitialisation de Mot de Passe**
- Demande de réinitialisation par email
- Token sécurisé avec expiration (1h)
- Endpoint : `POST /api/auth/forgot-password`

## 🚀 Configuration Rapide

### 1. **Variables d'Environnement**

Créez votre fichier `.env` :

```bash
# Copier le fichier d'exemple
cp env.example .env

# Éditer avec vos vraies valeurs
nano .env
```

### 2. **Configuration Email (Gmail)**

```bash
# 1. Activer l'authentification à 2 facteurs sur votre Gmail
# 2. Aller dans "Sécurité" > "Mots de passe d'application"
# 3. Générer un mot de passe d'application
# 4. Utiliser ce mot de passe dans MAIL_PASSWORD

MAIL_USERNAME=votre_email@gmail.com
MAIL_PASSWORD=votre_mot_de_passe_application
```

### 3. **Configuration Google OAuth2**

```bash
# 1. Aller sur https://console.cloud.google.com/
# 2. Créer un nouveau projet
# 3. Activer l'API Google+ 
# 4. Aller dans "Identifiants" > "Créer des identifiants" > "ID client OAuth 2.0"
# 5. Ajouter les URIs de redirection autorisés :
#    - http://localhost:8084/login/oauth2/code/google
#    - https://votre-domaine.com/login/oauth2/code/google

GOOGLE_CLIENT_ID=votre_client_id
GOOGLE_CLIENT_SECRET=votre_client_secret
```

### 4. **Configuration reCAPTCHA**

```bash
# 1. Aller sur https://www.google.com/recaptcha/admin
# 2. Créer un nouveau site
# 3. Choisir reCAPTCHA v3
# 4. Ajouter vos domaines
# 5. Récupérer les clés

RECAPTCHA_SECRET=votre_recaptcha_secret_key
```

### 5. **Configuration HTTPS (Développement)**

```bash
# Générer un certificat SSL auto-signé
chmod +x generate-ssl-cert.sh
./generate-ssl-cert.sh

# Activer HTTPS dans .env
SSL_ENABLED=true
SSL_KEYSTORE_PASSWORD=diravenir123
```

## 🔧 Intégration Frontend

### 1. **Composant reCAPTCHA**

```jsx
import ReCaptcha from './components/ReCaptcha';

// Dans votre formulaire
<ReCaptcha 
  onVerify={(token) => {
    // Envoyer le token avec votre requête
    console.log('reCAPTCHA token:', token);
  }}
/>
```

### 2. **Composant Google Login**

```jsx
import GoogleLogin from './components/GoogleLogin';

// Dans votre page de connexion
<GoogleLogin 
  onSuccess={(user) => {
    console.log('Utilisateur connecté:', user);
  }}
  onError={(error) => {
    console.error('Erreur de connexion:', error);
  }}
/>
```

## 🧪 Tests des Fonctionnalités

### 1. **Test de l'Inscription avec Vérification Email**

```bash
# 1. Inscription
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

# 2. Vérifier votre email pour le lien de vérification
# 3. Cliquer sur le lien ou utiliser l'endpoint directement
```

### 2. **Test du Login Google**

```bash
# 1. Aller sur http://localhost:8084/oauth2/authorization/google
# 2. Se connecter avec votre compte Google
# 3. Vérifier la redirection et la création du compte
```

### 3. **Test de la Réinitialisation de Mot de Passe**

```bash
# 1. Demande de réinitialisation
curl -X POST http://localhost:8084/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'

# 2. Vérifier votre email pour le lien de réinitialisation
# 3. Utiliser le token pour réinitialiser le mot de passe
```

## 🔍 Dépannage

### **Problèmes Email**

```bash
# Vérifier les logs
tail -f logs/application.log | grep "Email"

# Erreurs courantes :
# - MAIL_PASSWORD incorrect (utiliser un mot de passe d'application)
# - Authentification à 2 facteurs non activée
# - Port SMTP bloqué (utiliser 587 ou 465)
```

### **Problèmes OAuth2**

```bash
# Vérifier la configuration Google
# - URIs de redirection corrects
# - API Google+ activée
# - Identifiants OAuth2 valides

# Erreurs courantes :
# - "redirect_uri_mismatch" : URI de redirection incorrect
# - "invalid_client" : Client ID/Secret incorrects
```

### **Problèmes reCAPTCHA**

```bash
# Vérifier la configuration
# - Clé secrète correcte
# - Domaine autorisé
# - reCAPTCHA v3 activé

# Erreurs courantes :
# - "invalid-input-secret" : Clé secrète incorrecte
# - "timeout-or-duplicate" : Token expiré ou dupliqué
```

## 🚨 Sécurité en Production

### **1. Certificat SSL Valide**

```bash
# Utiliser Let's Encrypt ou un certificat commercial
# Ne JAMAIS utiliser un certificat auto-signé en production
```

### **2. Variables d'Environnement Sécurisées**

```bash
# Utiliser un gestionnaire de secrets (HashiCorp Vault, AWS Secrets Manager)
# Ne jamais commiter les vraies valeurs dans le code
```

### **3. Monitoring et Logs**

```bash
# Surveiller les tentatives d'authentification
# Configurer des alertes pour les activités suspectes
# Sauvegarder les logs de sécurité
```

## 📞 Support

En cas de problème :
1. Vérifier les logs de l'application
2. Consulter la documentation de chaque service
3. Tester avec des données de test
4. Contacter l'équipe de développement

---

**✅ Votre application est maintenant sécurisée avec toutes les fonctionnalités modernes !** 