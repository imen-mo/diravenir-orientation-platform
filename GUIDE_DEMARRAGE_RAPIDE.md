# 🚀 Guide de Démarrage Rapide - Diravenir

## 🔧 Problème de Port Résolu !

Votre application React/Vite peut utiliser plusieurs ports. Voici comment démarrer correctement.

## 📋 Ports Disponibles

- **3000** - Port React classique
- **5173** - Port Vite par défaut ⭐
- **5174** - Port Vite alternatif
- **5175** - Port Vite alternatif

## 🚀 Démarrage Automatique

### Windows
```bash
# Double-cliquez sur le fichier
start-frontend.bat
```

### Linux/Mac
```bash
# Exécutez le script
chmod +x start-frontend.sh
./start-frontend.sh
```

## 🔍 Détection de Port

### Test Automatique
1. **Ouvrez** : `test-port-detection.html`
2. **Cliquez** sur "Tester tous les ports"
3. **Utilisez** le port recommandé

### Test Manuel
```bash
# Testez chaque port
http://localhost:3000
http://localhost:5173
http://localhost:5174
http://localhost:5175
```

## 🎯 Démarrage Manuel

### Option 1 : Port 5173 (Recommandé)
```bash
cd frontend
npm run dev
# L'application démarrera sur http://localhost:5173
```

### Option 2 : Port Spécifique
```bash
cd frontend
npm run dev -- --port 5173
# ou
npm run dev -- --port 3000
```

### Option 3 : Port Automatique
```bash
cd frontend
npm run dev -- --port 0
# Vite choisira automatiquement un port libre
```

## 🧪 Test de Vérification Email

### Avec le bon port (exemple : 5173)
```
http://localhost:5173/verify-email?token=45ea2c84402946b4ac67c2def7b413951757516228807
```

### Test de la page simplifiée
```
http://localhost:5173/verify-email-simple?token=45ea2c84402946b4ac67c2def7b413951757516228807
```

## 🔧 Configuration

### Fichier .env.local (créé automatiquement)
```env
VITE_PORT=5173
VITE_API_URL=http://localhost:8084
VITE_NODE_ENV=development
```

### Vite Config (déjà configuré)
```javascript
server: {
  port: process.env.VITE_PORT || 5173,
  host: true,
  open: true,
  strictPort: false,
  cors: true
}
```

## 🚨 Dépannage

### Erreur "Port déjà utilisé"
```bash
# Arrêtez les autres applications
# Ou utilisez un port différent
npm run dev -- --port 5174
```

### Erreur "ERR_CONNECTION_REFUSED"
1. **Vérifiez** que l'application est démarrée
2. **Vérifiez** le bon port avec `test-port-detection.html`
3. **Utilisez** l'URL correcte

### Backend non accessible
```bash
# Vérifiez que le backend est démarré sur le port 8084
cd backend
mvn spring-boot:run
```

## 📱 URLs de Test

### Page d'accueil
```
http://localhost:5173/
```

### Inscription
```
http://localhost:5173/register
```

### Connexion
```
http://localhost:5173/login
```

### Vérification email
```
http://localhost:5173/verify-email?token=VOTRE_TOKEN
```

### Page simplifiée (debug)
```
http://localhost:5173/verify-email-simple?token=VOTRE_TOKEN
```

## 🎉 Flux Complet

1. **Démarrez** le backend : `mvn spring-boot:run`
2. **Démarrez** le frontend : `npm run dev`
3. **Ouvrez** : `http://localhost:5173`
4. **Inscrivez-vous** avec un email
5. **Vérifiez** votre email
6. **Cliquez** sur le lien de vérification
7. **Connectez-vous** après vérification

## 🔍 Vérification

### Console du navigateur
```
✅ Application démarrée sur le port 5173
✅ API backend accessible sur le port 8084
✅ Vérification email fonctionnelle
```

### Test de l'API
```bash
curl "http://localhost:8084/api/auth/verify-email?token=VOTRE_TOKEN"
```

---

**Le port est maintenant configuré automatiquement ! 🎯**
