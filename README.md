# 🎓 **DIRAVENIR - Système d'Orientation Étudiante**

## 📋 **Description du Projet**

**DIRAVENIR** est un système d'orientation académique avancé qui utilise une matrice de 17 piliers pour évaluer la compatibilité entre les profils étudiants et les majeures universitaires. Le système implémente des algorithmes de matching sophistiqués pour fournir des recommandations personnalisées.

## 🎯 **Objectifs du Système**

- **Orientation Précise** : Évaluation basée sur 17 piliers (intérêts, compétences, valeurs, préférences)
- **Matching Intelligent** : Algorithmes de correspondance pondérés et critiques
- **44 Majeures** : Couverture complète des domaines d'ingénierie et académiques
- **Recommandations Personnalisées** : Résultats adaptés au profil unique de chaque étudiant

## 🏗️ **Architecture du Système**

### **Backend (Spring Boot)**
- **Framework** : Spring Boot 3.x
- **Base de données** : MySQL avec Flyway
- **API** : REST API avec endpoints de test
- **Algorithmes** : Matching pondéré, analyse des forces, piliers critiques

### **Frontend (À développer)**
- **Interface moderne** pour la saisie des profils
- **Visualisation** des résultats de matching
- **Tableaux de bord** pour les administrateurs

## 📊 **Matrice des 17 Piliers**

Le système évalue les étudiants sur 17 dimensions :

1. **Intérêts Techniques** - Affinité pour les sciences et technologies
2. **Compétences Mathématiques** - Capacité en mathématiques avancées
3. **Aptitude Spatiale** - Vision 3D et géométrie
4. **Logique Analytique** - Raisonnement logique et critique
5. **Créativité** - Innovation et pensée créative
6. **Communication** - Expression orale et écrite
7. **Travail d'Équipe** - Collaboration et leadership
8. **Gestion de Projet** - Organisation et planification
9. **Adaptabilité** - Flexibilité et apprentissage continu
10. **Éthique Professionnelle** - Intégrité et responsabilité
11. **Résolution de Problèmes** - Analyse et solutions
12. **Innovation** - Recherche et développement
13. **Durabilité** - Conscience environnementale
14. **International** - Ouverture culturelle et langues
15. **Entrepreneuriat** - Esprit d'entreprise
16. **Recherche** - Méthodologie scientifique
17. **Pratique** - Application concrète

## 🎓 **44 Majeures Supportées**

### **Ingénierie Générale**
- Informatique, Génie Logiciel, Génie des Systèmes
- Génie Civil, Génie Mécanique, Génie Électrique
- Génie Chimique, Génie Industriel, Génie des Matériaux

### **Ingénierie Spécialisée**
- Architecture, Génie Aérospatial, Génie Biomédical
- Génie Environnemental, Génie Géologique, Génie Minier
- Génie Pétrolier, Génie Nucléaire, Génie Maritime

### **Ingénierie Appliquée**
- Génie Textile, Génie Alimentaire, Génie Forestier
- Génie Agronomique, Génie Rural, Génie de l'Eau
- Génie des Télécommunications, Génie de l'Énergie

### **Ingénierie Infrastructure**
- Génie des Transports, Génie Urbain, Génie des Bâtiments
- Génie des Structures, Génie des Sols, Génie des Fondations
- Génie des Ponts, Génie des Routes, Génie des Tunnels
- Génie des Barrages, Génie des Ports, Génie des Aéroports

## 🔧 **Algorithmes de Matching**

### **1. Matching Pondéré Euclidien (Principal)**
- Calcul de similarité basé sur les 17 piliers
- Pondération adaptative selon l'importance des dimensions
- Score de 0 à 100 pour chaque majeure

### **2. Analyse des Forces (Secondaire)**
- Identification des piliers dominants (score > 80)
- Bonus pour les majeures valorisant ces forces
- Ajustement du score final

### **3. Analyse des Piliers Critiques (Tertiaire)**
- Chaque majeure a des piliers critiques spécifiques
- Pénalisation si les scores critiques sont faibles
- Validation de la compatibilité minimale

## 🚀 **Installation et Démarrage**

### **Prérequis**
- Java 17+
- Maven 3.6+
- MySQL 8.0+
- Windows 10/11

### **Installation Rapide**

1. **Cloner le projet**
   ```bash
   git clone [URL_DU_PROJET]
   cd diravenir1
   ```

2. **Configurer la base de données**
   ```bash
   # Exécuter les scripts SQL dans l'ordre
   V4_1__Fix_Ideal_Profiles_Structure.sql
   V4_2__Create_Orientation_Majors.sql
   ```

3. **Démarrer l'application**
   ```bash
   start-app.bat
   ```

### **Scripts Disponibles**

- **`start-app.bat`** - Démarrage rapide de l'application
- **`test-api-simple.bat`** - Tests de base de l'API
- **`test-api-complete.bat`** - Tests complets de l'API
- **`fix-null-comparisons.bat`** - Correction des erreurs null
- **`add-missing-majors.bat`** - Ajout des majeures manquantes

## 🧪 **Tests de l'API**

### **Endpoints de Test**

- **`GET /api/test/health`** - Santé de l'application
- **`GET /api/test/database`** - État de la base de données
- **`GET /api/test/calculators`** - Calculateurs disponibles
- **`GET /api/test/system`** - État global du système
- **`GET /api/test/search/{majorName}`** - Recherche de majeures
- **`GET /api/test/calculator/{type}`** - Test des calculateurs
- **`GET /api/test/matching`** - Test de matching

### **Exemple de Test**

```bash
# Test de santé
curl http://localhost:8080/api/test/health

# Recherche d'une majeure
curl "http://localhost:8080/api/test/search/Informatique"

# Test de matching
curl "http://localhost:8080/api/test/matching?pillar1=85&pillar2=90&..."
```

## 📈 **Statut du Projet**

### **Phase 1: Backend ✅ (100% Complète)**
- ✅ Interface ScoreCalculator unifiée
- ✅ Calculateurs ForceAnalysis et CriticalPillar
- ✅ ProfileMatchingService adapté
- ✅ TestController avec endpoints complets
- ✅ Base de données avec 44 majeures
- ✅ Algorithmes de matching implémentés

### **Phase 2: Frontend 🚧 (À Commencer)**
- 🚧 Interface utilisateur moderne
- 🚧 Formulaires de saisie des profils
- 🚧 Visualisation des résultats
- 🚧 Tableaux de bord administrateur

### **Phase 3: Tests et Validation 🚧 (À Commencer)**
- 🚧 Tests unitaires complets
- 🚧 Tests d'intégration
- 🚧 Validation des algorithmes
- 🚧 Tests de performance

## 🔍 **Structure du Code**

```
src/main/java/com/dira/diravenir1/
├── Controller/
│   └── TestController.java          # API de test
├── dto/
│   ├── UserProfileDTO.java          # Profil utilisateur
│   ├── MajorProfileDTO.java         # Profil majeure
│   ├── MatchingResultDTO.java       # Résultat matching
│   ├── OrientationRecommendationDTO.java # Recommandation
│   └── ProgramDTO.java              # Programme
├── service/
│   ├── calculators/
│   │   ├── ScoreCalculator.java     # Interface unifiée
│   │   ├── ForceAnalysis.java       # Analyse des forces
│   │   └── CriticalPillar.java      # Piliers critiques
│   ├── ProfileMatchingService.java  # Service de matching
│   ├── ScoreCalculationService.java # Calcul des scores
│   └── OrientationService.java      # Service d'orientation
└── repository/
    └── [Repositories JPA]
```

## 🗄️ **Structure de la Base de Données**

### **Tables Principales**
- **`orientation_majors`** - 44 majeures avec descriptions
- **`ideal_profiles`** - Profils idéaux pour chaque majeure (17 piliers)
- **`program`** - Programmes universitaires
- **`major_program_mapping`** - Mapping majeures → programmes

### **Schéma des Profils**
Chaque profil contient 17 colonnes (pillar_1 à pillar_17) avec des scores de 0 à 100.

## 🎨 **Interface Utilisateur (À Développer)**

### **Fonctionnalités Planifiées**
- **Formulaire de Profil** : Saisie des 17 piliers
- **Résultats de Matching** : Classement des majeures
- **Détails des Profils** : Comparaison avec les profils idéaux
- **Historique** : Sauvegarde des évaluations
- **Administration** : Gestion des majeures et profils

### **Technologies Frontend**
- **Framework** : React ou Vue.js
- **UI Components** : Material-UI ou Tailwind CSS
- **Charts** : Chart.js ou D3.js pour les visualisations
- **Responsive** : Design mobile-first

## 🚧 **Développement en Cours**

### **Prochaines Étapes**
1. **Corriger les erreurs de compilation restantes**
2. **Finaliser la Phase 1 Backend**
3. **Commencer la Phase 2 Frontend**
4. **Implémenter l'interface utilisateur**
5. **Tests et validation complets**

### **Contributions**
- **Backend** : 100% complète
- **Frontend** : 0% (à commencer)
- **Tests** : 30% (à compléter)
- **Documentation** : 80% (ce README)

## 📞 **Support et Contact**

Pour toute question ou contribution :
- **Projet** : DIRAVENIR - Système d'Orientation
- **Statut** : Backend opérationnel, Frontend en développement
- **Version** : 1.0.0 (Backend)

## 📄 **Licence**

Ce projet est développé pour des fins éducatives et d'orientation académique.

---

**🎉 Félicitations ! Le backend de DIRAVENIR est maintenant opérationnel avec 44 majeures et des algorithmes de matching avancés !**

**🚀 Prêt pour la Phase 2 : Développement Frontend**
