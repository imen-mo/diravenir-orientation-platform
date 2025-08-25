# 🚀 Déploiement Rapide - 44 Majeures

## 📋 Prérequis
- MySQL en cours d'exécution
- Application Spring Boot arrêtée
- Port 8084 disponible

## 🔧 Étapes de Déploiement

### Option 1: Script Batch (Windows)
```bash
# Exécuter le script batch
setup-orientation-system.bat
```

### Option 2: Script PowerShell
```powershell
# Exécuter le script PowerShell
.\setup-orientation-system.ps1
```

### Option 3: Manuel (si les scripts échouent)

#### Étape 1: Ajouter les 44 majeures
```sql
-- Se connecter à MySQL
mysql -u root -p

-- Exécuter le script
source add-all-44-majors.sql;
```

#### Étape 2: Ajouter les profils idéaux
```sql
-- Exécuter le script
source add-ideal-profiles.sql;
```

#### Étape 3: Vérification
```sql
USE diravenir;
SELECT COUNT(*) as total_majors FROM orientation_majors;
SELECT COUNT(*) as total_profiles FROM ideal_profiles;
```

## ✅ Vérification du Déploiement

Après l'exécution des scripts, vous devriez avoir :
- **44 majeures** dans `orientation_majors`
- **3 majeures avec profils complets** dans `ideal_profiles` (Génie Civil, Génie Mécanique, Architecture)
- **17 piliers** par majeure (scores de 0 à 100)

## 🚀 Redémarrage de l'Application

```bash
# Redémarrer l'application Spring Boot
mvn spring-boot:run
```

L'application sera accessible sur : `http://localhost:8084`

## 🧪 Test de l'API

```bash
# Test de santé
curl http://localhost:8084/api/test/health

# Test de la base de données
curl http://localhost:8084/api/test/database

# Test des calculateurs
curl http://localhost:8084/api/test/calculators
```

## 🔍 Structure des Données

### Table `orientation_majors`
- `id`: Identifiant unique
- `major_name`: Nom de la majeure
- `description`: Description de la majeure

### Table `ideal_profiles`
- `id`: Identifiant unique
- `major_id`: Référence vers `orientation_majors`
- `pillar_name`: Nom du pilier (ex: Interet_Scientifique_Tech)
- `ideal_score`: Score idéal (0-100)

## 📊 Piliers Disponibles

1. **Intérêts** (5 piliers)
   - Interet_Scientifique_Tech
   - Interet_Artistique_Creatif
   - Interet_Social_Humain
   - Interet_Business_Gestion
   - Interet_Logique_Analytique

2. **Compétences** (4 piliers)
   - Competence_Resolution_Problemes
   - Competence_Communication
   - Competence_Organisation
   - Competence_Manuel_Technique

3. **Valeurs** (4 piliers)
   - Valeur_Impact_Societal
   - Valeur_Innovation_Challenge
   - Valeur_Stabilite_Securite
   - Valeur_Autonomie

4. **Préférences de Travail** (4 piliers)
   - Pref_Travail_Equipe_Collab
   - Pref_Travail_Autonome
   - Pref_Pratique_Terrain
   - Pref_Theorie_Recherche

## 🚨 Résolution des Problèmes

### Erreur: "mysql not in PATH"
- Ajouter MySQL au PATH système
- Ou utiliser le chemin complet: `C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe`

### Erreur: "Foreign key constraint fails"
- Vérifier que la table `orientation_majors` est créée avant `ideal_profiles`
- Exécuter les scripts dans l'ordre

### Erreur: "Port already in use"
- Arrêter l'application Spring Boot: `taskkill /F /IM java.exe`
- Attendre quelques secondes avant de redémarrer

## 📞 Support

En cas de problème, vérifiez :
1. Les logs MySQL
2. Les logs Spring Boot
3. La connexion à la base de données
4. Les permissions utilisateur MySQL
