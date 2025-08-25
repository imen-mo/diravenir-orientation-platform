# 🚀 Guide de Déploiement - Système d'Authentification Diravenir

## 🎯 **Objectif**
Déployer un système d'authentification professionnel et sécurisé avec JWT, OAuth2, et vérification email.

## 📋 **Étapes de Déploiement**

### **ÉTAPE 1 : Préparation de l'Environnement**

#### **1.1 Vérifier les Dépendances Maven**
```bash
# Vérifier que le pom.xml contient toutes les dépendances
mvn dependency:tree | grep -E "(security|jwt|oauth2)"
```

#### **1.2 Créer le Fichier .env**
```bash
# Copier le fichier d'exemple
cp env.example .env

# Éditer avec vos vraies valeurs
nano .env
```

### **ÉTAPE 2 : Configuration de la Base de Données**

#### **2.1 Vérifier la Structure des Tables**
```sql
-- Vérifier que la table utilisateur existe
SHOW TABLES LIKE 'utilisateurs';

-- Vérifier la structure
DESCRIBE utilisateurs;

-- Vérifier les contraintes
SHOW CREATE TABLE utilisateurs;
```

#### **2.2 Créer un Utilisateur Admin**
```sql
-- Insérer un utilisateur admin (mot de passe hashé avec BCrypt)
INSERT INTO utilisateurs (nom, prenom, email, password, role, compte_actif, date_creation) 
VALUES (
    'Admin', 
    'System', 
    'admin@diravenir.com', 
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3ZxQQxq6.q', -- admin123
    'ADMIN', 
    true, 
    NOW()
);
```

### **ÉTAPE 3 : Configuration Email**

#### **3.1 Configuration Gmail**
```bash
# 1. Aller sur votre compte Gmail
# 2. Activer l'authentification à 2 facteurs
# 3. Générer un mot de passe d'application
# 4. Utiliser ce mot de passe dans MAIL_PASSWORD
```

#### **3.2 Variables d'Environnement Email**
```bash
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=votre_email@gmail.com
MAIL_PASSWORD=votre_mot_de_passe_application
```

### **ÉTAPE 4 : Configuration JWT**

#### **4.1 Générer une Clé Secrète**
```bash
# Option 1: OpenSSL (recommandé)
openssl rand -base64 64

# Option 2: En ligne (moins sécurisé)
# https://generate-secret.vercel.app/64
```

#### **4.2 Variables d'Environnement JWT**
```bash
JWT_SECRET=votre-clé-secrète-générée-64-caractères
JWT_EXPIRATION=86400000
JWT_REFRESH_EXPIRATION=604800000
```

### **ÉTAPE 5 : Configuration OAuth2 Google**

#### **5.1 Créer un Projet Google Cloud**
```bash
# 1. Aller sur https://console.cloud.google.com/
# 2. Créer un nouveau projet
# 3. Activer l'API Google+ 
# 4. Aller dans "Identifiants"
```

#### **5.2 Créer des Identifiants OAuth2**
```bash
# 1. "Créer des identifiants" > "ID client OAuth 2.0"
# 2. Type d'application: Application Web
# 3. URIs de redirection autorisés:
#    - http://localhost:8084/login/oauth2/code/google
#    - https://votre-domaine.com/login/oauth2/code/google
```

#### **5.3 Variables d'Environnement OAuth2**
```bash
GOOGLE_CLIENT_ID=votre-client-id
GOOGLE_CLIENT_SECRET=votre-client-secret
```

### **ÉTAPE 6 : Démarrage de l'Application**

#### **6.1 Compiler le Projet**
```bash
# Nettoyer et compiler
mvn clean compile

# Vérifier qu'il n'y a pas d'erreurs
mvn verify
```

#### **6.2 Démarrer l'Application**
```bash
# Démarrer Spring Boot
mvn spring-boot:run

# Ou avec Java directement
java -jar target/diravenir1-0.0.1-SNAPSHOT.jar
```

### **ÉTAPE 7 : Tests de Validation**

#### **7.1 Test de Santé**
```bash
# Test du service d'authentification
curl http://localhost:8084/api/auth/health

# Test de la base de données
curl http://localhost:8084/api/health
```

#### **7.2 Test d'Inscription**
```bash
curl -X POST http://localhost:8084/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Test",
    "prenom": "User",
    "email": "test@example.com",
    "password": "Test123!",
    "telephone": "0123456789"
  }'
```

#### **7.3 Test de Connexion**
```bash
curl -X POST http://localhost:8084/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!"
  }'
```

## 🔍 **Points de Vérification**

### **Backend**
- [ ] Application démarre sans erreur
- [ ] Tables de base de données créées
- [ ] Endpoints d'authentification accessibles
- [ ] JWT généré correctement
- [ ] Email de bienvenue envoyé

### **Sécurité**
- [ ] Mots de passe hashés avec BCrypt
- [ ] Tokens JWT signés avec HS512
- [ ] Endpoints protégés par rôles
- [ ] CORS configuré correctement
- [ ] Validation des entrées

### **Email**
- [ ] Configuration SMTP valide
- [ ] Email de bienvenue envoyé
- [ ] Pas d'erreurs dans les logs

## 🐛 **Résolution de Problèmes**

### **Problème : "Bean not found"**
**Solution** : Vérifier que toutes les dépendances sont dans le pom.xml

### **Problème : "Table doesn't exist"**
**Solution** : Vérifier la configuration Hibernate et la base de données

### **Problème : "JWT signature invalid"**
**Solution** : Vérifier que JWT_SECRET est correctement configuré

### **Problème : "Email not sent"**
**Solution** : Vérifier la configuration SMTP et les logs

## ✅ **Checklist de Déploiement**

- [ ] Dépendances Maven ajoutées
- [ ] Configuration Spring Security créée
- [ ] Service JWT implémenté
- [ ] Service d'authentification créé
- [ ] Contrôleur d'authentification créé
- [ ] DTOs d'authentification créés
- [ ] Filtre JWT implémenté
- [ ] Configuration email mise à jour
- [ ] Variables d'environnement configurées
- [ ] Base de données initialisée
- [ ] Tests de validation réussis

## 🎉 **Résultat Final**

**Le système d'authentification est maintenant :**
1. ✅ **Professionnel** : Architecture Spring Security complète
2. ✅ **Sécurisé** : JWT HS512, BCrypt, validation stricte
3. ✅ **Fonctionnel** : Inscription, connexion, vérification email
4. ✅ **Configurable** : Variables d'environnement pour tous les secrets
5. ✅ **Testable** : Endpoints de test et validation

---

**🚀 Déploiement réussi = Système d'authentification professionnel et sécurisé !**
