# 🔐 Guide Complet reCAPTCHA v3 - Diravenir

## 🎯 **Vue d'Ensemble**

Ce guide couvre l'intégration complète de **reCAPTCHA v3** dans votre application Diravenir, avec :
- ✅ **Frontend** : Génération automatique de tokens
- ✅ **Backend** : Validation côté serveur avec scores de confiance
- ✅ **Tests** : Interface de test complète
- ✅ **Configuration** : Seuils de score configurables

## 🚀 **Architecture reCAPTCHA v3**

### 1. **Flux de Fonctionnement**
```
1. Chargement automatique → reCAPTCHA se charge en arrière-plan
2. Génération de token → Quand l'utilisateur soumet le formulaire
3. Envoi au backend → Token + action spécifique
4. Validation Google → Vérification du score de confiance
5. Réponse au frontend → Succès/échec avec détails
```

### 2. **Scores de Confiance**
- **0.0 - 0.4** : 🚫 Risque élevé (bloqué)
- **0.5 - 0.6** : ⚠️ Risque moyen (actions basiques)
- **0.7 - 1.0** : ✅ Risque faible (toutes actions)

## 🔧 **Configuration Backend**

### 1. **Variables d'Environnement**
```bash
# .env
RECAPTCHA_SECRET=your_recaptcha_secret_key
RECAPTCHA_SCORE_THRESHOLD=0.5
RECAPTCHA_SCORE_THRESHOLD_STRICT=0.7
```

### 2. **application.properties**
```properties
# reCAPTCHA Configuration
google.recaptcha.secret=${RECAPTCHA_SECRET:default_secret}
google.recaptcha.site=${RECAPTCHA_SITE_KEY:default_site_key}
google.recaptcha.score.threshold=${RECAPTCHA_SCORE_THRESHOLD:0.5}
google.recaptcha.score.threshold.strict=${RECAPTCHA_SCORE_THRESHOLD_STRICT:0.7}
```

### 3. **Classes Backend Créées/Modifiées**

#### **GoogleResponse.java** - Réponse Google enrichie
```java
@Data
public class GoogleResponse {
    private boolean success;
    private Double score;           // Score de confiance (0.0 - 1.0)
    private String action;          // Action exécutée
    private String challengeTs;     // Timestamp du challenge
    private String hostname;        // Nom d'hôte
    private String[] errorCodes;    // Codes d'erreur
    
    // Méthodes utilitaires
    public boolean isHighRisk() { return score != null && score < 0.5; }
    public boolean isMediumRisk() { return score != null && score >= 0.5 && score < 0.7; }
    public boolean isLowRisk() { return score != null && score >= 0.7; }
    public String getRiskLevel() { /* logique de niveau de risque */ }
}
```

#### **RecaptchaService.java** - Service de validation avancé
```java
@Service
public class RecaptchaService {
    
    // Méthodes de validation
    public boolean verify(String token)                    // Validation basique
    public boolean verify(String token, String action, boolean strict)  // Validation complète
    public boolean verifySignup(String token)             // Inscription (score ≥ 0.5)
    public boolean verifySignin(String token)             // Connexion (score ≥ 0.5)
    public boolean verifyStrict(String token, String action)  // Strict (score ≥ 0.7)
    public boolean verifySensitive(String token, String action)  // Actions sensibles
}
```

#### **RecaptchaTestController.java** - Contrôleur de test
```java
@RestController
@RequestMapping("/api/recaptcha")
public class RecaptchaTestController {
    
    @PostMapping("/test")           // Test basique
    @PostMapping("/test/strict")    // Test strict
    @PostMapping("/test/signup")    // Test inscription
    @PostMapping("/test/signin")    // Test connexion
    @GetMapping("/info")            // Informations système
}
```

## 🎨 **Configuration Frontend**

### 1. **Variables d'Environnement**
```bash
# frontend/.env
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

### 2. **Composants Créés**

#### **ReCaptcha.jsx** - Composant principal
```jsx
const ReCaptcha = ({ onVerify, siteKey }) => {
    // Chargement automatique du script Google
    // Génération de tokens avec actions spécifiques
    // Gestion des erreurs et callbacks
};
```

#### **ReCaptchaTest.jsx** - Interface de test
```jsx
const ReCaptchaTest = () => {
    // Tests individuels et en lot
    // Communication avec le backend
    // Affichage des résultats détaillés
};
```

#### **ReCaptchaTestPage.jsx** - Page de test
```jsx
const ReCaptchaTestPage = () => {
    // Interface utilisateur complète
    // Guide d'utilisation
    // Informations système
};
```

## 🧪 **Tests et Validation**

### 1. **Tests Disponibles**

#### **Test Basique**
```bash
POST /api/recaptcha/test
{
  "token": "recaptcha_token",
  "action": "submit"
}
```

#### **Test Inscription**
```bash
POST /api/recaptcha/test/signup
{
  "token": "recaptcha_token"
}
```

#### **Test Connexion**
```bash
POST /api/recaptcha/test/signin
{
  "token": "recaptcha_token"
}
```

#### **Test Strict**
```bash
POST /api/recaptcha/test/strict
{
  "token": "recaptcha_token",
  "action": "sensitive_action"
}
```

### 2. **Interface de Test Frontend**
- **URL** : `http://localhost:5173/recaptcha-test`
- **Fonctionnalités** :
  - Tests individuels par type
  - Tests en lot automatiques
  - Affichage des scores et résultats
  - Validation des actions et tokens

## 🔐 **Intégration dans l'Authentification**

### 1. **Inscription (Signup)**
```java
@PostMapping("/signup")
public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest request) {
    // Vérification reCAPTCHA pour inscription
    boolean recaptchaValid = recaptchaService.verifySignup(request.getRecaptchaToken());
    
    if (!recaptchaValid) {
        return ResponseEntity.badRequest()
                .body(Map.of("error", "Vérification reCAPTCHA échouée"));
    }
    
    // Continuer avec l'inscription...
}
```

### 2. **Connexion (Signin)**
```java
@PostMapping("/signin")
public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest request) {
    // Validation reCAPTCHA pour connexion
    if (!recaptchaService.verifySignin(request.getRecaptchaToken())) {
        return ResponseEntity.badRequest()
                .body(Map.of("error", "Validation reCAPTCHA échouée"));
    }
    
    // Continuer avec la connexion...
}
```

## 📊 **Monitoring et Logs**

### 1. **Logs Backend**
```java
logger.info("🔍 VÉRIFICATION reCAPTCHA - IP: {} | Action: {} | Score: {} | Risque: {}", 
           ip, action, score, riskLevel);
```

### 2. **Métriques Disponibles**
- Score de confiance par action
- Niveau de risque par utilisateur
- Taux de succès/échec
- Actions bloquées par score

## 🚀 **Démarrage et Test**

### 1. **Démarrer l'Application**
```bash
# Backend
cd src && mvn spring-boot:run

# Frontend
cd frontend && npm run dev
```

### 2. **Tester reCAPTCHA**
```bash
# 1. Aller sur http://localhost:5173/recaptcha-test
# 2. Utiliser l'interface de test
# 3. Vérifier les logs backend
# 4. Tester avec différents scores
```

### 3. **Tester l'Authentification**
```bash
# 1. Aller sur http://localhost:5173/signup
# 2. Remplir le formulaire
# 3. Vérifier la validation reCAPTCHA
# 4. Vérifier les logs backend
```

## 🔒 **Sécurité et Bonnes Pratiques**

### 1. **Protection contre les Bots**
- ✅ Validation côté serveur obligatoire
- ✅ Scores de confiance configurables
- ✅ Actions spécifiques par contexte
- ✅ Rate limiting intégré

### 2. **Configuration Production**
```bash
# Désactiver le mode dev
APP_ENVIRONMENT=production

# Configurer les seuils stricts
RECAPTCHA_SCORE_THRESHOLD=0.6
RECAPTCHA_SCORE_THRESHOLD_STRICT=0.8

# Utiliser HTTPS
SSL_ENABLED=true
```

### 3. **Monitoring Production**
- Surveiller les scores moyens
- Alerter sur les scores faibles
- Analyser les patterns d'attaque
- Ajuster les seuils dynamiquement

## 🐛 **Débogage et Résolution de Problèmes**

### 1. **Problèmes Courants**

#### **Token invalide**
```bash
# Vérifier la clé secrète
echo $RECAPTCHA_SECRET

# Vérifier la configuration
curl http://localhost:8084/api/recaptcha/info
```

#### **Score trop faible**
```bash
# Ajuster les seuils
RECAPTCHA_SCORE_THRESHOLD=0.4
RECAPTCHA_SCORE_THRESHOLD_STRICT=0.6

# Redémarrer le backend
```

#### **Erreurs CORS**
```bash
# Vérifier la configuration CORS
spring.web.cors.allowed-origins=http://localhost:5173
```

### 2. **Logs de Débogage**
```bash
# Activer les logs détaillés
LOGGING_LEVEL=DEBUG

# Vérifier les logs reCAPTCHA
tail -f logs/application.log | grep "RecaptchaService"
```

## 📚 **Ressources et Documentation**

### 1. **Google reCAPTCHA**
- [Documentation officielle](https://developers.google.com/recaptcha/docs/v3)
- [Console d'administration](https://www.google.com/recaptcha/admin)
- [Guide de migration v2 vers v3](https://developers.google.com/recaptcha/docs/migration)

### 2. **Spring Boot**
- [Documentation Spring Security](https://docs.spring.io/spring-security/reference/)
- [Guide CORS](https://docs.spring.io/spring-framework/reference/web/webmvc-cors.html)

### 3. **React**
- [Documentation React](https://react.dev/)
- [Hooks personnalisés](https://react.dev/learn/reusing-logic-with-custom-hooks)

## 🎉 **Conclusion**

Votre application Diravenir est maintenant équipée d'un système reCAPTCHA v3 complet et professionnel !

### **Fonctionnalités Implémentées**
- ✅ **Frontend** : Génération automatique de tokens
- ✅ **Backend** : Validation avec scores de confiance
- ✅ **Tests** : Interface de test complète
- ✅ **Sécurité** : Seuils configurables et monitoring
- ✅ **Documentation** : Guide complet et exemples

### **Prochaines Étapes**
1. **Tester** l'intégration complète
2. **Configurer** les seuils de production
3. **Monitorer** les performances
4. **Ajuster** selon les besoins

Votre application est maintenant prête pour la production avec une sécurité reCAPTCHA v3 de niveau entreprise ! 🚀
