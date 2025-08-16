# 🚀 Guide de Démarrage Rapide - Test du Système d'Orientation

## 🎯 **Objectif**
Tester rapidement que le système d'orientation fonctionne et identifier les problèmes.

## ⚡ **Démarrage en 3 Étapes**

### **Étape 1: Démarrer le Backend Spring Boot**
```bash
# Dans le terminal, naviguer vers le projet
cd src/main/java/com/dira/diravenir1

# Démarrer Spring Boot
mvn spring-boot:run
```

**✅ Attendre :** "Started Diravenir1Application in X seconds"

### **Étape 2: Démarrer le Frontend React**
```bash
# Dans un nouveau terminal
cd frontend

# Démarrer le serveur de développement
npm run dev
```

**✅ Attendre :** "Local: http://localhost:3000/"

### **Étape 3: Tester l'API**
```bash
# Dans un troisième terminal, tester l'API
curl http://localhost:8080/api/orientation/test-example
```

**✅ Résultat attendu :** JSON avec des recommandations

## 🧪 **Test via l'Interface Web**

1. **Ouvrir le navigateur** sur `http://localhost:3000`
2. **Aller sur la page de résultats** : `/orientation/results`
3. **Cliquer sur "🚀 Tester l'API"** (composant SimpleApiTest)
4. **Vérifier la console** (F12) pour les logs

## 🔍 **Logs à Vérifier**

### **Backend (Terminal Spring Boot)**
```
🎯 Contrôleur: Calcul d'orientation demandé
📤 Données reçues: [données]
✅ Contrôleur: Calcul réussi, X recommandations générées
```

### **Frontend (Console Navigateur)**
```
🧪 Test simple de l'API backend...
✅ Réponse du backend: [données]
```

## 🚨 **Problèmes Courants et Solutions**

### **Problème 1: "Connection refused"**
```bash
# Vérifier que Spring Boot est démarré
curl http://localhost:8080/actuator/health
```

### **Problème 2: "Failed to fetch"**
- Vérifier que le backend écoute sur le port 8080
- Vérifier les logs Spring Boot pour les erreurs

### **Problème 3: "CORS error"**
- Vérifier l'annotation `@CrossOrigin(origins = "*")` dans le contrôleur

### **Problème 4: "Method not found"**
- Vérifier que toutes les méthodes du service existent
- Vérifier la compilation Java

## 📋 **Checklist de Validation**

- [ ] Backend Spring Boot démarré sur le port 8080
- [ ] Frontend React démarré sur le port 3000
- [ ] API `/test-example` répond avec curl
- [ ] Composant SimpleApiTest affiche "✅ Succès"
- [ ] Console du navigateur affiche les logs
- [ ] Pas d'erreurs dans le terminal Spring Boot

## 🎯 **Test Complet du Flux**

1. **Commencer le test d'orientation** : `/orientation`
2. **Répondre aux questions** (utiliser les réponses d'exemple)
3. **Soumettre le test** et vérifier la navigation
4. **Vérifier la page de résultats** pour les recommandations
5. **Utiliser les composants de test** pour valider l'API

## 🔧 **Débogage Avancé**

### **Vérifier les Endpoints**
```bash
# Test de base
curl http://localhost:8080/api/orientation/test-example

# Test des majeures
curl http://localhost:8080/api/orientation/majors

# Test de calcul (avec données d'exemple)
curl -X POST http://localhost:8080/api/orientation/calculate \
  -H "Content-Type: application/json" \
  -d '{"question1":"E","question2":["C"],"question3":"D","question4":"C","question5":["G","H","B"],"question6":"A","question7":"A","question8":"D","question9":{"A":1,"B":5,"C":5,"D":5},"question10":"B","question11":"A","question12":"B","question13":"B","question14":["D"]}'
```

### **Vérifier les Logs**
```bash
# Logs Spring Boot (dans le terminal du backend)
# Chercher les emojis 🎯📤✅❌

# Logs Frontend (console du navigateur)
# Chercher les emojis 🧪✅❌
```

## 🎉 **Succès !**

Si tout fonctionne :
- ✅ L'API backend répond
- ✅ Le frontend reçoit les données
- ✅ Les recommandations s'affichent
- ✅ La page n'est plus statique

---

**🚀 Prêt à tester ? Suivez les 3 étapes et dites-moi ce que vous voyez !**
