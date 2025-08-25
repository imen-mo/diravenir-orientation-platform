# Test Complet du Flux d'Orientation

## 🎯 Objectif
Vérifier que le système d'orientation fonctionne de bout en bout :
1. **Frontend** : 14 questions collectées correctement
2. **API** : Réponses envoyées au backend
3. **Backend** : Calcul des 17 piliers et recommandations
4. **Résultats** : Affichage des recommandations avec scores

## 🚀 Étapes de Test

### 1. Démarrer le Backend
```bash
# Dans le dossier du projet
cd src/main/java/com/dira/diravenir1
mvn spring-boot:run
```

**Vérification** : Backend accessible sur `http://localhost:8084`

### 2. Démarrer le Frontend
```bash
# Dans le dossier frontend
npm start
```

**Vérification** : Frontend accessible sur `http://localhost:3000`

### 3. Test de Connectivité Backend
```bash
curl -X GET http://localhost:8084/api/orientation/health
```

**Résultat attendu** :
```json
{
  "status": "HEALTHY",
  "timestamp": 1234567890,
  "totalProfiles": 44,
  "totalMajors": 44,
  "algorithmVersion": "2.0",
  "algorithmVersion": "17 Pillars Matrix v2.0",
  "matchingAlgorithm": "Euclidean Distance Weighted"
}
```

### 4. Test de l'API d'Orientation
```bash
curl -X POST http://localhost:8084/api/orientation/recommendations \
  -H "Content-Type: application/json" \
  -d @test-answers.json
```

**Fichier `test-answers.json`** :
```json
{
  "question1": "A",
  "question2": ["A", "B"],
  "question3": "A",
  "question4": "A",
  "question5": ["A", "B", "C"],
  "question6": "A",
  "question7": "A",
  "question8": "A",
  "question9": {
    "securite": 4,
    "innovation": 5,
    "autonomie": 3,
    "salaire": 2
  },
  "question10": "A",
  "question11": "A",
  "question12": "A",
  "question13": "A",
  "question14": ["A", "E"]
}
```

**Résultat attendu** :
```json
{
  "topRecommendations": [
    {
      "majorId": "civil-engineering",
      "program": "Civil Engineering",
      "category": "Engineering & Architecture",
      "matchingScore": 85.7,
      "description": "Programme d'ingénierie civile...",
      "university": "Example University",
      "country": "Example Country"
    }
  ],
  "allRecommendations": [...],
  "userProfile": {...},
  "calculationTimeMs": 150,
  "totalMajorsEvaluated": 44,
  "totalPillarsAnalyzed": 17
}
```

### 5. Test Frontend Complet

#### 5.1 Navigation vers l'Orientation
- Ouvrir `http://localhost:3000/orientation`
- Vérifier l'affichage de la page d'accueil

#### 5.2 Collecte des Informations Personnelles
- Cliquer sur "Faire le Test d'Orientation"
- Remplir :
  - Nom : "Test User"
  - Email : "test@example.com"
  - Téléphone : "0123456789"
- Cliquer sur "Commencer le Test"

#### 5.3 Réponse aux 14 Questions
**Question 1** : Sélectionner "A" (Créer quelque chose de nouveau)
**Question 2** : Sélectionner "A", "B" (Découvertes scientifiques + Art et culture)
**Question 3** : Sélectionner "A" (Rayons d'électronique)
**Question 4** : Sélectionner "A" (Décomposer en étapes logiques)
**Question 5** : Glisser-déposer "A", "B", "C" (Gérer budget, Organiser événement, Écrire texte)
**Question 6** : Sélectionner "A" (Lire et prendre des notes)
**Question 7** : Sélectionner "A" (Améliorer la vie des individus)
**Question 8** : Sélectionner "A" (Laboratoire)
**Question 9** : Curseurs :
  - Sécurité : 4
  - Innovation : 5
  - Autonomie : 3
  - Salaire : 2
**Question 10** : Sélectionner "A" (Comprendre la racine du problème)
**Question 11** : Sélectionner "A" (Travailler seul)
**Question 12** : Sélectionner "A" (Préparer méticuleusement)
**Question 13** : Sélectionner "A" (Logique et analyse)
**Question 14** : Sélectionner "A", "E" (Sciences + Technologie/Info)

#### 5.4 Soumission et Calcul
- Cliquer sur "Terminer le Test"
- Vérifier l'envoi des réponses au backend
- Attendre la réponse avec les recommandations

#### 5.5 Affichage des Résultats
- Vérifier la navigation vers `/orientation/results`
- Vérifier l'affichage des recommandations :
  - Top 3 programmes avec scores de correspondance
  - Noms des programmes
  - Descriptions
  - Pourcentages de matching

## 🔍 Points de Vérification

### Frontend
- ✅ 14 questions affichées correctement
- ✅ Types de questions respectés (single, multiple, dragdrop, sliders)
- ✅ Validation des réponses avant soumission
- ✅ Transformation des réponses au format backend

### API
- ✅ Endpoint `/api/orientation/recommendations` accessible
- ✅ Réponses au format JSON valide
- ✅ Structure des données conforme au DTO

### Backend
- ✅ Calcul des 17 piliers
- ✅ Algorithme euclidien pondéré
- ✅ Profils idéaux des 44 majeures
- ✅ Génération des recommandations

### Résultats
- ✅ Affichage des top recommandations
- ✅ Scores de correspondance (0-100%)
- ✅ Informations des programmes
- ✅ Navigation fonctionnelle

## 🚨 Gestion des Erreurs

### Erreur de Connexion Backend
- Message : "Erreur lors de l'envoi des réponses"
- Actions : Réessayer, Tester l'API, Retour au test

### Réponse Invalide
- Message : "Réponse invalide du backend: pas de recommandations"
- Actions : Vérifier la structure de la réponse

### Données Manquantes
- Message : "Aucune donnée disponible pour afficher les résultats"
- Actions : Retour au test d'orientation

## 📊 Métriques de Performance

### Temps de Réponse
- **Frontend → Backend** : < 2 secondes
- **Calcul d'orientation** : < 5 secondes
- **Génération des résultats** : < 1 seconde

### Qualité des Recommandations
- **Score minimum** : > 60% pour les bonnes correspondances
- **Score optimal** : > 80% pour les excellentes correspondances
- **Cohérence** : Top 3 recommandations logiquement cohérentes

## 🎉 Critères de Succès

Le test est **réussi** si :
1. ✅ Toutes les 14 questions sont répondues
2. ✅ Les réponses sont envoyées au backend
3. ✅ Le backend calcule et retourne des recommandations
4. ✅ La page de résultats affiche les recommandations
5. ✅ Les scores de correspondance sont cohérents
6. ✅ La navigation fonctionne correctement

## 🔧 Dépannage

### Problème : Backend non accessible
```bash
# Vérifier le port
netstat -an | grep 8084

# Redémarrer le backend
mvn spring-boot:run
```

### Problème : CORS
```bash
# Vérifier la configuration CORS dans application.properties
spring.web.cors.allowed-origins=http://localhost:3000
```

### Problème : Structure des réponses
```bash
# Vérifier les logs du backend
tail -f logs/spring.log
```

## 📝 Notes de Test

- **Date** : [Date du test]
- **Version Frontend** : [Version]
- **Version Backend** : [Version]
- **Tester** : [Nom du testeur]
- **Résultat** : ✅ Succès / ❌ Échec
- **Commentaires** : [Observations et problèmes rencontrés]
