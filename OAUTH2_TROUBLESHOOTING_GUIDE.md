# 🔐 Guide de Dépannage OAuth2 - Diravenir

## 📋 Vue d'ensemble

Ce guide vous aide à résoudre les problèmes de connexion et d'inscription avec Google OAuth2 dans l'application Diravenir.

## 🚨 Problèmes Courants et Solutions

### 1. **Erreur "Backend inaccessible"**

**Symptômes :**
- Message d'erreur : "Le serveur backend n'est pas accessible"
- Bouton Google grisé ou désactivé
- Tests de connectivité échouent

**Solutions :**
```bash
# 1. Vérifier que le backend est démarré
cd diravenir1
mvn spring-boot:run

# 2. Vérifier le port 8084
netstat -an | findstr :8084  # Windows
netstat -an | grep :8084     # Linux/Mac

# 3. Tester l'endpoint de santé
curl http://localhost:8084/api/health
```

### 2. **Erreur "Configuration Google manquante"**

**Symptômes :**
- Variables d'environnement non trouvées
- Client ID Google manquant
- Erreurs de configuration OAuth2

**Solutions :**
```bash
# 1. Créer le fichier .env dans le dossier frontend
cd frontend
cp env.example .env

# 2. Vérifier les variables dans .env
VITE_GOOGLE_CLIENT_ID=1037870342905-b37d3kenk6qu0j67d1pmt6b7gufi9rht.apps.googleusercontent.com
VITE_GOOGLE_CLIENT_SECRET=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

# 3. Redémarrer le serveur frontend
npm run dev
```

### 3. **Erreur "OAuth2 échoue"**

**Symptômes :**
- Redirection vers la page d'échec
- Messages d'erreur OAuth2
- Authentification Google bloquée

**Solutions :**
```bash
# 1. Vérifier la configuration backend
# src/main/resources/application.properties
spring.security.oauth2.client.registration.google.client-id=${GOOGLE_CLIENT_ID}
spring.security.oauth2.client.registration.google.client-secret=${GOOGLE_CLIENT_SECRET}

# 2. Vérifier les URLs de redirection
app.oauth2.success-redirect-url=http://localhost:3000/oauth2-success
app.oauth2.failure-redirect-url=http://localhost:3000/oauth2-failure

# 3. Redémarrer le backend
mvn spring-boot:run
```

### 4. **Problèmes CORS**

**Symptômes :**
- Erreurs CORS dans la console
- Requêtes bloquées par le navigateur
- Problèmes de cookies/sessions

**Solutions :**
```java
// SecurityConfig.java - Vérifier la configuration CORS
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();
    
    // Autoriser tous les ports de développement localhost
    config.setAllowedOriginPatterns(List.of(
        "http://localhost:*",
        "http://127.0.0.1:*"
    ));
    
    config.setAllowCredentials(true); // IMPORTANT pour OAuth2
    config.setAllowedHeaders(List.of("*"));
    
    return source;
}
```

### 5. **Problèmes de Sessions**

**Symptômes :**
- Déconnexion automatique
- Sessions perdues
- Problèmes de persistance

**Solutions :**
```properties
# application.properties
spring.session.timeout=86400
spring.session.cookie.secure=false
spring.session.cookie.http-only=true
spring.session.cookie.same-site=lax
```

## 🧪 Tests de Diagnostic

### 1. **Test de Connectivité Backend**
```bash
# Test simple
curl http://localhost:8084/api/health

# Test avec headers
curl -H "Content-Type: application/json" \
     -H "Accept: application/json" \
     http://localhost:8084/api/health
```

### 2. **Test OAuth2 Endpoint**
```bash
# Test de l'endpoint d'autorisation
curl -I http://localhost:8084/oauth2/authorization/google

# Vérifier la réponse (doit être 302 - Redirection)
```

### 3. **Test Frontend Variables**
```javascript
// Dans la console du navigateur
console.log('API URL:', import.meta.env.VITE_API_URL);
console.log('Google Client ID:', import.meta.env.VITE_GOOGLE_CLIENT_ID);
console.log('Frontend URL:', import.meta.env.VITE_FRONTEND_URL);
```

## 🔧 Configuration Avancée

### 1. **Variables d'Environnement Backend**
```bash
# .env ou variables système
export GOOGLE_CLIENT_ID="1037870342905-b37d3kenk6qu0j67d1pmt6b7gufi9rht.apps.googleusercontent.com"
export GOOGLE_CLIENT_SECRET="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"
export OAUTH2_SUCCESS_REDIRECT_URL="http://localhost:3000/oauth2-success"
export OAUTH2_FAILURE_REDIRECT_URL="http://localhost:3000/oauth2-failure"
```

### 2. **Configuration Google Cloud Console**
1. Aller sur [Google Cloud Console](https://console.cloud.google.com/)
2. Sélectionner le projet Diravenir
3. Aller dans "APIs & Services" > "Credentials"
4. Vérifier l'URL de redirection autorisée : `http://localhost:8084/login/oauth2/code/google`

### 3. **Configuration Spring Security**
```java
// SecurityConfig.java
.oauth2Login(oauth2 -> oauth2
    .userInfoEndpoint(userInfo -> userInfo.userService(oauth2UserService))
    .successHandler(oauth2SuccessHandler)
    .failureHandler((request, response, exception) -> {
        try {
            response.sendRedirect("http://localhost:3000/oauth2-failure?error=" + 
                java.net.URLEncoder.encode(exception.getMessage(), "UTF-8"));
        } catch (Exception e) {
            response.sendRedirect("http://localhost:3000/oauth2-failure?error=oauth2_failed");
        }
    })
)
```

## 📱 Composant de Test

Utilisez le composant `OAuth2ConnectivityTest` pour diagnostiquer automatiquement les problèmes :

```jsx
import OAuth2ConnectivityTest from '../components/OAuth2ConnectivityTest';

// Dans votre composant
<OAuth2ConnectivityTest />
```

Ce composant teste :
- ✅ Connectivité backend
- ✅ Endpoint OAuth2
- ✅ Configuration Google
- ✅ Variables d'environnement

## 🚀 Démarrage Rapide

### 1. **Démarrer le Backend**
```bash
cd diravenir1
mvn spring-boot:run
```

### 2. **Démarrer le Frontend**
```bash
cd frontend
npm run dev
```

### 3. **Tester OAuth2**
1. Aller sur `http://localhost:3000/login`
2. Cliquer sur "Login with Google"
3. Vérifier la redirection vers Google
4. Vérifier le retour vers `http://localhost:3000/oauth2-success`

## 📞 Support

Si les problèmes persistent :

1. **Vérifier les logs backend** dans la console Spring Boot
2. **Vérifier la console navigateur** pour les erreurs JavaScript
3. **Utiliser le composant de test** pour diagnostiquer
4. **Vérifier la configuration** avec ce guide

## 🔍 Logs de Débogage

### Backend
```java
// Activer les logs OAuth2
logging.level.org.springframework.security.oauth2=DEBUG
logging.level.com.dira.diravenir1=DEBUG
```

### Frontend
```javascript
// Activer les logs OAuth2
localStorage.setItem('debug', 'oauth2:*');
```

---

**Note :** Ce guide couvre les problèmes les plus courants. Pour des problèmes spécifiques, consultez les logs et utilisez le composant de test intégré.
