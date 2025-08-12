# 🔐 Configuration reCAPTCHA pour Diravenir

## 📋 **Étapes de Configuration**

### 1. **Créer le fichier .env**

Dans le dossier `frontend/`, créez un fichier `.env` avec le contenu suivant :

```bash
# Configuration Frontend
VITE_API_URL=http://localhost:8084/api
VITE_RECAPTCHA_SITE_KEY=6Lf6Vp0rAAAAAMghRpLjSbffcSEF7Z-JGBZbZA0U
```

### 2. **Vérifier la Configuration**

Après avoir créé le fichier `.env`, redémarrez votre serveur de développement :

```bash
# Arrêter le serveur (Ctrl+C)
# Puis redémarrer
npm run dev
```

### 3. **Tester reCAPTCHA**

1. Allez sur la page d'inscription : `http://localhost:5173/signup`
2. Vous devriez voir "✅ reCAPTCHA chargé" 
3. Cliquez sur "🔒 Vérifier reCAPTCHA"
4. Le bouton devrait devenir "✅ reCAPTCHA Vérifié"

## 🔧 **Résolution de Problèmes**

### **Problème : "Configuration reCAPTCHA manquante"**
- ✅ Vérifiez que le fichier `.env` existe dans `frontend/`
- ✅ Vérifiez que `VITE_RECAPTCHA_SITE_KEY` est défini
- ✅ Redémarrez le serveur après modification

### **Problème : "reCAPTCHA pas encore chargé"**
- ✅ Attendez quelques secondes que reCAPTCHA se charge
- ✅ Vérifiez la console du navigateur pour les erreurs
- ✅ Vérifiez votre connexion internet

### **Problème : "Token reCAPTCHA null"**
- ✅ Vérifiez que votre clé reCAPTCHA est valide
- ✅ Vérifiez que le domaine est autorisé dans Google reCAPTCHA
- ✅ Testez avec la page de test : `/recaptcha-test`

## 🧪 **Page de Test reCAPTCHA**

Pour tester complètement reCAPTCHA, utilisez la page de test :
`http://localhost:5173/recaptcha-test`

Cette page vous permettra de :
- Tester la génération de tokens
- Vérifier la communication avec le backend
- Diagnostiquer les problèmes

## 📞 **Support**

Si vous rencontrez des problèmes :
1. Vérifiez la console du navigateur
2. Vérifiez les logs du backend
3. Testez avec la page de test reCAPTCHA
4. Vérifiez votre configuration Google reCAPTCHA
