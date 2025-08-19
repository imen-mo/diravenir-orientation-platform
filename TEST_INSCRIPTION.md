# Guide de Test de l'Inscription

## ✅ Problème Résolu

J'ai corrigé l'**incohérence des noms de champs** entre le frontend et le backend :

**AVANT (problématique) :**
```json
{
  "password": "Qwerty123!",
  "confirmPassword": "Qwerty123!"
}
```

**APRÈS (corrigé) :**
```json
{
  "motDePasse": "Qwerty123!",
  "confirmationMotDePasse": "Qwerty123!"
}
```

## 🧪 Test de l'Inscription

### 1. Démarrer l'Application
```bash
# Terminal 1 - Backend
./mvnw spring-boot:run

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 2. Aller sur la Page d'Inscription
Ouvrir : `http://localhost:3000/signup`

### 3. Remplir le Formulaire
- **Nom** : Mourid
- **Prénom** : Imane  
- **Email** : imeriem477@gmail.com
- **Mot de passe** : Qwerty123!
- **Confirmer mot de passe** : Qwerty123!
- **✅ Accepter les termes**

### 4. Vérifier la Validation
- ✅ Les mots de passe correspondent maintenant
- ✅ Le mot de passe respecte les critères de sécurité
- ✅ Tous les champs sont remplis

## 🔍 Critères de Validation du Mot de Passe

Le backend vérifie que le mot de passe contient :
- **Au moins 8 caractères**
- **Au moins une minuscule** (a-z)
- **Au moins une majuscule** (A-Z)
- **Au moins un chiffre** (0-9)
- **Au moins un caractère spécial** (@$!%*?&)

## 📤 Données Envoyées

Le frontend envoie maintenant :
```json
{
  "nom": "Mourid",
  "prenom": "Imane",
  "email": "imeriem477@gmail.com",
  "motDePasse": "Qwerty123!",
  "confirmationMotDePasse": "Qwerty123!"
}
```

## 🎯 Résultat Attendu

1. **Validation frontend** : ✅ Mots de passe identiques
2. **Envoi au backend** : ✅ Format correct
3. **Réponse du serveur** : ✅ 200 OK
4. **Message de succès** : "Compte créé avec succès"
5. **Email de vérification** : Envoyé automatiquement

## 🚨 En Cas de Problème

### Erreur 400 (Bad Request)
- Vérifier que tous les champs sont remplis
- Vérifier que le mot de passe respecte les critères
- Vérifier que l'email n'existe pas déjà

### Erreur 500 (Internal Server Error)
- Vérifier que MySQL est démarré
- Vérifier les logs du backend
- Vérifier la connexion à la base de données

## 🔧 Debug

Pour voir les détails des erreurs :
1. **Console du navigateur** : Logs détaillés
2. **Logs du backend** : Messages d'erreur complets
3. **Network tab** : Réponse exacte du serveur

## ✨ Fonctionnalités Testées

- ✅ Validation des mots de passe
- ✅ Critères de sécurité du mot de passe
- ✅ Envoi des données au backend
- ✅ Gestion des erreurs
- ✅ Messages de succès
- ✅ Envoi d'email de vérification
