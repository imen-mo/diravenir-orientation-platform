# 🧪 Guide de Test du Système d'Orientation

## 📋 Vue d'ensemble

Ce guide vous permet de tester le système d'orientation complet, de vérifier que les calculs sont corrects et que la navigation fonctionne.

## 🚀 Démarrage du Système

### 1. Backend (Java/Spring Boot)
```bash
# Dans le dossier racine du projet
cd src/main/java/com/dira/diravenir1
mvn spring-boot:run

# Ou utiliser le wrapper Maven
./mvnw spring-boot:run
```

**Vérification :** Le serveur doit démarrer sur le port 8084

### 2. Frontend (React)
```bash
# Dans le dossier frontend
cd frontend
npm install
npm run dev
```

**Vérification :** L'application doit être accessible sur http://localhost:5173

## 🧮 Test de l'Algorithme de Calcul

### Test 1: Vérification des Scores
1. Aller sur http://localhost:8084/api/orientation/test-example
2. Vérifier que la réponse contient des scores entre 30-95%
3. Vérifier que le top 3 est bien trié par score décroissant

### Test 2: Test avec Données Réelles
1. Aller sur http://localhost:5173/orientation/test
2. Compléter le test d'orientation
3. Vérifier que le bouton "See My Result Now" fonctionne
4. Vérifier que la page de résultats s'affiche correctement

## 🔍 Vérification des Calculs

### Profils Idéaux des Majeures
- **Civil Engineering**: Score max théorique = 90%
- **Mechanical Engineering**: Score max théorique = 95%
- **Architecture**: Score max théorique = 90%

### Algorithme de Matching
1. **Distance Euclidienne Pondérée** (60% du score final)
2. **Analyse des Forces** (25% du score final)
3. **Analyse des Piliers Critiques** (15% du score final)

### Formule de Calcul
```
Score_final = (Euclidean × 0.6) + (Forces × 0.25) + (Critiques × 0.15)
Score_normalisé = max(30, min(95, Score_final × 100))
```

## 🎯 Test de la Navigation

### Flux Complet
1. **Page d'accueil** → Bouton "Commencer le Test d'Orientation"
2. **Page d'orientation** → Bouton "Commencer le Test"
3. **Test d'orientation** → 15 questions
4. **Bouton final** → "See My Result Now"
5. **Page de résultats** → Affichage des recommandations

### Points de Vérification
- ✅ Navigation entre toutes les pages
- ✅ Sauvegarde des réponses
- ✅ Calcul des scores
- ✅ Affichage des résultats
- ✅ Design conforme à l'image

## 🐛 Dépannage

### Problème: Erreur de connexion au backend
**Solution:**
```bash
# Vérifier que le serveur Java est démarré
curl http://localhost:8084/api/orientation/ping
# Doit retourner "pong"
```

### Problème: Scores non calculés
**Solution:**
```bash
# Tester l'API directement
curl http://localhost:8084/api/orientation/test-example
# Doit retourner des recommandations avec scores
```

### Problème: Navigation bloquée
**Solution:**
1. Vérifier les routes dans `App.jsx`
2. Vérifier que `useNavigate` fonctionne
3. Vérifier les chemins de navigation

## 📊 Validation des Résultats

### Critères de Validation
1. **Scores réalistes**: Entre 30% et 95%
2. **Tri correct**: Top 3 par score décroissant
3. **Profils cohérents**: Majeures techniques pour profils techniques
4. **Navigation fluide**: Pas de blocage entre les étapes

### Test de Cohérence
- Un profil avec des scores élevés en sciences doit avoir des scores élevés pour les majeures techniques
- Un profil artistique doit avoir des scores élevés pour l'architecture
- Un profil business doit avoir des scores élevés pour la gestion

## 🎨 Test du Design

### Vérification Visuelle
1. **Palette de couleurs**: Violet foncé (#441048, #430F48, #400C49)
2. **Accents**: Orange/jaune (#FF8C00, #FFD700)
3. **Design mobile-first**: Responsive sur tous les écrans
4. **Conformité à l'image**: Même structure et éléments

### Éléments à Vérifier
- ✅ En-tête avec icône et titre
- ✅ Cartes des programmes avec cercles de pourcentage
- ✅ Section d'appel à l'action
- ✅ Boutons de navigation
- ✅ Responsive design

## 🚀 Test de Performance

### Métriques à Mesurer
1. **Temps de calcul**: < 2 secondes
2. **Temps de navigation**: < 1 seconde
3. **Taille des réponses**: < 100KB
4. **Mémoire utilisée**: < 50MB

### Test de Charge
```bash
# Test avec plusieurs utilisateurs simultanés
for i in {1..10}; do
  curl http://localhost:8084/api/orientation/test-example &
done
wait
```

## 📝 Rapport de Test

### Template de Rapport
```
Date: [DATE]
Testeur: [NOM]
Version: [VERSION]

✅ Tests Réussis:
- [ ] Démarrage du système
- [ ] Calcul des scores
- [ ] Navigation
- [ ] Design
- [ ] Performance

❌ Problèmes Détectés:
- [Description du problème]

🔧 Actions Correctives:
- [Action à effectuer]

📊 Métriques:
- Temps de calcul: [X]s
- Scores générés: [X] à [Y]%
- Navigation: [OK/ERREUR]
```

## 🎯 Conclusion

Ce guide permet de valider que le système d'orientation fonctionne correctement selon les spécifications du document. Tous les tests doivent passer pour considérer le système comme fonctionnel.

**Prochaine étape:** Déploiement en production après validation complète.
