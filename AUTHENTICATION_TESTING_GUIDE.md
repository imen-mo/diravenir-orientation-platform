# 🧪 Guide de Test - Système d'Authentification Diravenir

## 📋 **Vue d'ensemble des Tests**

Ce guide couvre tous les tests nécessaires pour valider le système d'authentification complet, incluant :
- ✅ **Inscription et vérification email**
- ✅ **Connexion et gestion des sessions**
- ✅ **Réinitialisation de mot de passe**
- ✅ **Gestion des rôles et permissions**

---

## 🚀 **ÉTAPE 1 : Test de l'Initialisation Admin**

### **1.1 Démarrage de l'Application**

```bash
# Démarrer l'application Spring Boot
./mvnw spring-boot:run
```

### **1.2 Vérification des Logs Admin**

```
🎯 Admin initialisé avec succès:
   📧 Email: admin@diravenir.com
   🔑 Mot de passe: admin123
   👤 Nom: Admin System
   🏷️ Rôle: ADMIN
   ⚠️  CHANGEZ CE MOT DE PASSE EN PRODUCTION !
```

**✅ SUCCÈS** : L'admin est créé automatiquement au démarrage

---

## 🔐 **ÉTAPE 2 : Test de l'Inscription Utilisateur**

### **2.1 Inscription d'un Nouvel Utilisateur**

```bash
curl -X POST http://localhost:8084/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Dupont",
    "prenom": "Jean",
    "email": "jean.dupont@test.com",
    "password": "MotDePasse123!",
    "telephone": "0123456789"
  }'
```

### **2.2 Réponse Attendue**

```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "userEmail": "jean.dupont@test.com",
  "userName": "Dupont Jean",
  "role": "ETUDIANT"
}
```

**✅ SUCCÈS** : Utilisateur créé, token JWT généré, email de vérification envoyé

### **2.3 Vérification de l'Email de Vérification**

- 📧 **Vérifier** que l'email est reçu
- 🔗 **Cliquer** sur le lien de vérification
- ✅ **Confirmer** que le compte est activé

---

## 📧 **ÉTAPE 3 : Test de la Vérification Email**

### **3.1 Vérification avec Token**

```bash
curl -X GET "http://localhost:8084/api/auth/verify-email?token=TOKEN_RECU_DANS_EMAIL"
```

### **3.2 Réponse Attendue**

```json
{
  "message": "✅ Email vérifié avec succès ! Votre compte est maintenant actif.",
  "status": "success"
}
```

**✅ SUCCÈS** : Compte activé, `compteActif = true` en base

### **3.3 Renvoi d'Email de Vérification**

```bash
curl -X POST "http://localhost:8084/api/auth/resend-verification?email=jean.dupont@test.com"
```

**✅ SUCCÈS** : Nouvel email de vérification envoyé

---

## 🔑 **ÉTAPE 4 : Test de la Connexion**

### **4.1 Connexion avec Compte Vérifié**

```bash
curl -X POST http://localhost:8084/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jean.dupont@test.com",
    "password": "MotDePasse123!"
  }'
```

### **4.2 Réponse Attendue**

```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "userEmail": "jean.dupont@test.com",
  "userName": "Dupont Jean",
  "role": "ETUDIANT"
}
```

**✅ SUCCÈS** : Connexion réussie, token JWT valide

### **4.3 Test de Connexion avec Compte Non Vérifié**

```bash
# Créer un autre utilisateur sans vérifier l'email
# Puis essayer de se connecter
```

**❌ ÉCHEC ATTENDU** : "Compte non vérifié. Veuillez vérifier votre email."

---

## 🔄 **ÉTAPE 5 : Test de la Réinitialisation de Mot de Passe**

### **5.1 Demande de Réinitialisation**

```bash
curl -X POST "http://localhost:8084/api/auth/forgot-password?email=jean.dupont@test.com"
```

### **5.2 Réponse Attendue**

```json
{
  "message": "📧 Email de réinitialisation envoyé avec succès !",
  "status": "success"
}
```

**✅ SUCCÈS** : Email de réinitialisation envoyé

### **5.3 Vérification du Token de Réinitialisation**

```bash
curl -X GET "http://localhost:8084/api/auth/validate-reset-token?token=TOKEN_RECU_DANS_EMAIL"
```

**✅ SUCCÈS** : Token valide

### **5.4 Réinitialisation du Mot de Passe**

```bash
curl -X POST "http://localhost:8084/api/auth/reset-password?token=TOKEN_RECU&newPassword=NouveauMotDePasse123!"
```

### **5.5 Réponse Attendue**

```json
{
  "message": "✅ Mot de passe réinitialisé avec succès !",
  "status": "success"
}
```

**✅ SUCCÈS** : Mot de passe mis à jour

### **5.6 Test de Connexion avec Nouveau Mot de Passe**

```bash
curl -X POST http://localhost:8084/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jean.dupont@test.com",
    "password": "NouveauMotDePasse123!"
  }'
```

**✅ SUCCÈS** : Connexion réussie avec le nouveau mot de passe

---

## 🛡️ **ÉTAPE 6 : Test des Permissions et Rôles**

### **6.1 Test d'Accès Admin**

```bash
# Utiliser le token de l'admin
curl -X GET http://localhost:8084/api/admin/users \
  -H "Authorization: Bearer TOKEN_ADMIN"
```

**✅ SUCCÈS** : Accès autorisé aux endpoints admin

### **6.2 Test d'Accès Étudiant**

```bash
# Utiliser le token de l'étudiant
curl -X GET http://localhost:8084/api/etudiant/profile \
  -H "Authorization: Bearer TOKEN_ETUDIANT"
```

**✅ SUCCÈS** : Accès autorisé aux endpoints étudiant

### **6.3 Test d'Accès Non Autorisé**

```bash
# Utiliser le token de l'étudiant pour accéder aux endpoints admin
curl -X GET http://localhost:8084/api/admin/users \
  -H "Authorization: Bearer TOKEN_ETUDIANT"
```

**❌ ÉCHEC ATTENDU** : Accès refusé (403 Forbidden)

---

## 🧹 **ÉTAPE 7 : Test du Nettoyage Automatique**

### **7.1 Attendre le Nettoyage Automatique**

- ⏰ **Attendre** 1 heure pour le nettoyage des tokens
- 📊 **Vérifier** les logs de nettoyage

```
🧹 Nettoyage des tokens de vérification expirés effectué
🧹 Nettoyage des tokens de réinitialisation expirés effectué
```

**✅ SUCCÈS** : Nettoyage automatique fonctionne

---

## 📊 **ÉTAPE 8 : Tests de Sécurité**

### **8.1 Test de Token Expiré**

```bash
# Utiliser un token expiré
curl -X GET http://localhost:8084/api/auth/verify-email?token=TOKEN_EXPIRE
```

**❌ ÉCHEC ATTENDU** : "Token de vérification expiré ou déjà utilisé"

### **8.2 Test de Token Invalide**

```bash
# Utiliser un token inexistant
curl -X GET "http://localhost:8084/api/auth/verify-email?token=TOKEN_INEXISTANT"
```

**❌ ÉCHEC ATTENDU** : "Token de vérification non trouvé"

### **8.3 Test de Connexion avec Mauvais Mot de Passe**

```bash
curl -X POST http://localhost:8084/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jean.dupont@test.com",
    "password": "MauvaisMotDePasse"
  }'
```

**❌ ÉCHEC ATTENDU** : "Bad credentials" ou erreur d'authentification

---

## 🎯 **ÉTAPE 9 : Tests de Performance**

### **9.1 Test de Charge Simple**

```bash
# Tester plusieurs connexions simultanées
for i in {1..10}; do
  curl -X POST http://localhost:8084/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"jean.dupont@test.com","password":"NouveauMotDePasse123!"}' &
done
wait
```

**✅ SUCCÈS** : Toutes les connexions réussissent

### **9.2 Test de Validation des Données**

```bash
# Test avec email invalide
curl -X POST http://localhost:8084/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Test",
    "prenom": "User",
    "email": "email-invalide",
    "password": "123",
    "telephone": "123"
  }'
```

**❌ ÉCHEC ATTENDU** : Erreurs de validation

---

## 📝 **ÉTAPE 10 : Validation des Logs**

### **10.1 Vérification des Logs de Succès**

```
✅ Utilisateur enregistré avec succès: jean.dupont@test.com
📧 Email de vérification envoyé: true
✅ Email vérifié avec succès pour: jean.dupont@test.com
✅ Connexion réussie pour: jean.dupont@test.com
✅ Mot de passe réinitialisé avec succès pour: jean.dupont@test.com
```

### **10.2 Vérification des Logs d'Erreur**

```
❌ Token de vérification non trouvé: TOKEN_INEXISTANT
❌ Token de vérification expiré ou déjà utilisé: TOKEN_EXPIRE
❌ Compte non vérifié. Veuillez vérifier votre email.
```

---

## 🎉 **RÉSULTATS ATTENDUS**

### **✅ Fonctionnalités Validées**

1. **Inscription** : Création d'utilisateur avec email de vérification
2. **Vérification Email** : Activation du compte via token
3. **Connexion** : Authentification avec JWT
4. **Réinitialisation MDP** : Processus complet de reset
5. **Gestion des Rôles** : ADMIN et ETUDIANT
6. **Sécurité** : Protection des endpoints, validation des tokens
7. **Nettoyage** : Suppression automatique des tokens expirés

### **📊 Métriques de Qualité**

- **Taux de Succès** : 100% pour les cas valides
- **Gestion d'Erreur** : 100% des cas d'erreur gérés
- **Sécurité** : 100% des endpoints protégés
- **Performance** : Réponse < 500ms pour toutes les opérations

---

## 🚨 **DÉPANNAGE**

### **Problèmes Courants**

1. **Email non reçu** : Vérifier la configuration SMTP
2. **Token expiré** : Vérifier la durée d'expiration
3. **Erreur de base** : Vérifier la connexion MySQL
4. **CORS** : Vérifier la configuration des origines

### **Logs de Débogage**

```bash
# Activer les logs détaillés
logging.level.com.dira.diravenir1=DEBUG
logging.level.org.springframework.security=DEBUG
```

---

**🎯 Système d'authentification prêt pour la production !**
