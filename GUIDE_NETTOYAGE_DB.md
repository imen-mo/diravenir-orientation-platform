# 🧹 Guide de Nettoyage de la Base de Données DirAvenir

## 🚨 **Problème Identifié**

Vous avez créé plusieurs utilisateurs de test (`test1@example.com`, `test8@example.com`, etc.) qui causent des conflits dans le système d'authentification.

## 🧪 **Solutions Disponibles**

### **Option 1 : Nettoyage Complet (Recommandé)**

#### **Étapes :**
1. **Arrêter le backend** (Ctrl+C)
2. **Exécuter le script de nettoyage :**
   ```bash
   mysql -u root -p diravenir < cleanup-test-users.sql
   ```
3. **Redémarrer le backend :**
   ```bash
   mvn spring-boot:run -Dspring-boot.run.profiles=dev
   ```

#### **Ce que fait le script :**
- ✅ Supprime tous les utilisateurs avec `@example.com`
- ✅ Supprime tous les tokens de vérification
- ✅ Supprime toutes les données liées (candidatures, témoignages)
- ✅ Réinitialise les compteurs d'auto-increment
- ✅ Nettoie complètement la base de données

### **Option 2 : Utilisateur de Test Unique**

#### **Étapes :**
1. **Exécuter le script de test :**
   ```bash
   mysql -u root -p diravenir < test-auth-clean.sql
   ```
2. **Utiliser les credentials :**
   - **Email :** `testuser@diravenir.com`
   - **Mot de passe :** `test123`
   - **Statut :** Compte actif et vérifié

## 🚀 **Commandes MySQL**

### **Connexion à MySQL :**
```bash
mysql -u root -p
```

### **Sélection de la base :**
```sql
USE diravenir;
```

### **Exécution des scripts :**
```sql
SOURCE cleanup-test-users.sql;
-- ou
SOURCE test-auth-clean.sql;
```

## 🧪 **Test Après Nettoyage**

### **Avec Option 1 (Nettoyage Complet) :**
1. **Inscription** avec un nouvel email (ex: `newuser@example.com`)
2. **Simulation de vérification**
3. **Connexion** → Devrait fonctionner

### **Avec Option 2 (Utilisateur Unique) :**
1. **Connexion directe** avec `testuser@diravenir.com` / `test123`
2. **Pas besoin d'inscription** → Compte déjà actif
3. **Test des cookies** → Devrait fonctionner

## 📋 **Scripts Disponibles**

### **1. `cleanup-test-users.sql`**
- **Fonction :** Nettoyage complet de tous les utilisateurs de test
- **Usage :** Quand vous voulez repartir à zéro
- **Résultat :** Base de données propre

### **2. `test-auth-clean.sql`**
- **Fonction :** Création d'un utilisateur de test unique
- **Usage :** Pour tester rapidement sans conflits
- **Résultat :** Utilisateur prêt à l'emploi

## 🔍 **Vérification du Nettoyage**

### **Vérifier les utilisateurs restants :**
```sql
SELECT 
    id,
    email,
    nom,
    prenom,
    role,
    compte_actif,
    email_verifie,
    date_creation
FROM utilisateur 
ORDER BY date_creation DESC;
```

### **Vérifier les tokens :**
```sql
SELECT COUNT(*) as tokens_email FROM email_verification_token;
SELECT COUNT(*) as tokens_password FROM password_reset_token;
```

## ⚠️ **Précautions**

### **Avant le nettoyage :**
- ✅ **Sauvegarder** les données importantes
- ✅ **Arrêter** le backend
- ✅ **Vérifier** que vous êtes sur la bonne base de données

### **Après le nettoyage :**
- ✅ **Redémarrer** le backend
- ✅ **Tester** avec un nouvel utilisateur
- ✅ **Vérifier** que l'authentification fonctionne

## 🎯 **Résultat Attendu**

Après le nettoyage et les tests :

- ✅ **Inscription** → Succès
- ✅ **Vérification** → Succès  
- ✅ **Connexion** → Succès
- ✅ **Cookies** → Fonctionnels
- ✅ **OAuth2** → Opérationnel

## 🎉 **Conclusion**

Le nettoyage de la base de données devrait résoudre le problème de connexion en éliminant les conflits entre utilisateurs de test.

**🚀 Choisissez votre option et nettoyez la base de données !**

### **📋 Prochaines Étapes :**
1. **Exécuter** le script de nettoyage choisi
2. **Redémarrer** le backend
3. **Tester** l'authentification avec un utilisateur propre
4. **Vérifier** que tous les tests passent
