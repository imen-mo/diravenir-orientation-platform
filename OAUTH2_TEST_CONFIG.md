# 🧪 CONFIGURATION DES TESTS OAUTH2 GOOGLE

## 📋 **PRÉREQUIS**

### 1. **Configuration Google Console**
- ✅ Projet Google Cloud créé
- ✅ API OAuth2 activée
- ✅ Clés OAuth2 générées
- ✅ URIs de redirection configurés

### 2. **Configuration Backend**
- ✅ Spring Boot 3.1.5+
- ✅ Dépendance OAuth2 ajoutée
- ✅ Clés configurées dans application.properties
- ✅ SecurityConfig mis à jour

### 3. **Configuration Frontend**
- ✅ React 18+
- ✅ Variables d'environnement configurées
- ✅ Service OAuth2 implémenté
- ✅ Composants de test créés

## 🔧 **CONFIGURATION DES TESTS**

### 1. **Variables d'Environnement Backend**
```properties
# application.properties
spring.security.oauth2.client.registration.google.client-id=1037870342905-b37d3kenk6qu0j67d1pmt6b7gufi9rht.apps.googleusercontent.com
spring.security.oauth2.client.registration.google.client-secret=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
spring.security.oauth2.client.registration.google.scope=openid,profile,email
```

### 2. **Variables d'Environnement Frontend**
```bash
# .env
VITE_API_URL=http://localhost:8084/api
VITE_GOOGLE_CLIENT_ID=1037870342905-b37d3kenk6qu0j67d1pmt6b7gufi9rht.apps.googleusercontent.com
VITE_GOOGLE_CLIENT_SECRET=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
```

### 3. **URIs de Redirection Google Console**
```
http://localhost:8084/oauth2/authorization/google
http://localhost:3000/oauth2-success
http://localhost:3000/oauth2-failure
```

## 🚀 **LANCEMENT DES TESTS**

### 1. **Démarrage Backend**
```bash
# Terminal 1
cd diravenir1
mvn spring-boot:run
```

### 2. **Démarrage Frontend**
```bash
# Terminal 2
cd frontend
npm start
```

### 3. **Test Automatique**
```bash
# Terminal 3
./test-oauth2.bat
```

## 🧪 **TESTS MANUELS**

### 1. **Test du Statut OAuth2**
```bash
curl http://localhost:8084/api/oauth2/status
```

**Résultat attendu :**
```json
{
  "status": "✅ Service OAuth2 opérationnel",
  "timestamp": "2024-01-XX...",
  "google_enabled": "true"
}
```

### 2. **Test de l'URL de Connexion**
```bash
curl http://localhost:8084/api/oauth2/google/login-url
```

**Résultat attendu :**
```json
{
  "loginUrl": "https://accounts.google.com/oauth/authorize?...",
  "success": "true"
}
```

### 3. **Test du Callback OAuth2**
```bash
curl -X POST http://localhost:8084/api/oauth2/google/callback \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "givenName": "Test",
    "familyName": "User"
  }'
```

## 🎯 **TESTS FRONTEND**

### 1. **Test des Boutons Google**
- ✅ Aller sur `/login`
- ✅ Vérifier que le bouton "Login with Google" est visible
- ✅ Aller sur `/register`
- ✅ Vérifier que le bouton "Sign in with Google" est visible

### 2. **Test de Redirection**
- ✅ Cliquer sur un bouton Google
- ✅ Vérifier la redirection vers Google
- ✅ Vérifier le retour vers `/oauth2-success`

### 3. **Test de la Page de Succès**
- ✅ Vérifier l'affichage des informations utilisateur
- ✅ Vérifier la redirection automatique vers la homepage
- ✅ Vérifier l'intégration avec le contexte d'authentification

## 🔍 **COMPOSANT DE TEST OAuth2Test**

### 1. **Intégration dans l'App**
```jsx
// Ajouter dans App.jsx pour les tests
import OAuth2Test from './components/OAuth2Test';

// Route de test (à retirer en production)
<Route path="/test-oauth2" element={<OAuth2Test />} />
```

### 2. **Fonctionnalités de Test**
- ✅ Vérification du statut OAuth2
- ✅ Test de connexion Google
- ✅ Récupération d'URL de connexion
- ✅ Affichage des informations de configuration

## 🚨 **DÉPANNAGE**

### 1. **Erreur de Configuration OAuth2**
```
❌ Erreur: OAuth2 client registration not found
✅ Solution: Vérifier les clés dans application.properties
```

### 2. **Erreur de Redirection**
```
❌ Erreur: Invalid redirect URI
✅ Solution: Configurer l'URI dans Google Console
```

### 3. **Erreur CORS**
```
❌ Erreur: CORS policy violation
✅ Solution: Vérifier la configuration CORS
```

### 4. **Erreur de Compilation**
```
❌ Erreur: Cannot resolve symbol OAuth2User
✅ Solution: Vérifier les imports et dépendances
```

## 📊 **VALIDATION DES TESTS**

### 1. **Critères de Succès**
- ✅ Backend démarre sans erreur
- ✅ Frontend démarre sans erreur
- ✅ Endpoints OAuth2 répondent
- ✅ Boutons Google sont fonctionnels
- ✅ Redirection Google fonctionne
- ✅ Page de succès s'affiche
- ✅ Intégration auth fonctionne

### 2. **Métriques de Performance**
- ✅ Temps de réponse < 2s
- ✅ Redirection Google < 1s
- ✅ Callback OAuth2 < 500ms
- ✅ Création utilisateur < 1s

### 3. **Tests de Sécurité**
- ✅ Validation des données OAuth2
- ✅ Protection contre les attaques CSRF
- ✅ Gestion sécurisée des sessions
- ✅ Validation des tokens JWT

## 🎯 **PROCHAINES ÉTAPES**

1. **Tests de Charge**
   - Simulation de multiples connexions OAuth2
   - Test de performance sous charge

2. **Tests d'Intégration**
   - Test avec base de données réelle
   - Test avec services externes

3. **Tests de Sécurité**
   - Test de pénétration OAuth2
   - Validation des scopes et permissions

---

## 📞 **SUPPORT TESTING**

Pour toute question sur les tests OAuth2 :

- 📧 Email : testing@diravenir.com
- 📱 Slack : #oauth2-testing
- 📚 Documentation : /docs/testing/oauth2

---

**✅ CONFIGURATION DES TESTS TERMINÉE**

L'environnement de test OAuth2 est maintenant prêt pour Diravenir !
