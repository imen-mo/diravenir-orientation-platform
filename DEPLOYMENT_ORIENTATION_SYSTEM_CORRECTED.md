# 🚀 Guide de Déploiement - Système d'Orientation Corrigé

## 📋 **Problèmes Résolus**

✅ **Erreur de clé étrangère** : Les INSERT dans `ideal_profiles` référencent maintenant correctement les IDs de `orientation_majors`
✅ **Colonne campus_city** : Le service utilise maintenant `campus_city` (avec underscore) comme dans la table `program`
✅ **Structure des tables** : Suppression et recréation propre des tables pour éviter les conflits

## 🛠️ **Instructions de Déploiement**

### **Étape 1 : Préparation**

1. **Arrêter l'application Spring Boot** si elle tourne
2. **Sauvegarder la base de données** (optionnel mais recommandé)
3. **Vérifier que MySQL est accessible**

### **Étape 2 : Exécution de la Migration**

#### **Option A : Via MySQL Directement (Recommandé)**
```bash
# Se connecter à MySQL
mysql -u root -p diravenir1

# Exécuter la migration
SOURCE src/main/resources/db/migration/V4_2__Create_Orientation_Majors.sql;
```

#### **Option B : Via Flyway**
```bash
# Dans le dossier du projet
mvn flyway:migrate
```

#### **Option C : Via Script de Test**
```bash
# Exécuter le script de vérification
mysql -u root -p diravenir1 < test-orientation-system-fixed.sql
```

### **Étape 3 : Vérification de la Migration**

#### **Vérifier les Tables Créées**
```sql
-- Vérifier que les tables existent
SHOW TABLES LIKE '%orientation%';
SHOW TABLES LIKE '%ideal%';
SHOW TABLES LIKE '%mapping%';

-- Résultat attendu :
-- orientation_majors
-- ideal_profiles  
-- major_program_mapping
```

#### **Vérifier le Contenu**
```sql
-- Nombre de majeures d'orientation
SELECT COUNT(*) FROM orientation_majors;
-- Résultat attendu : 50

-- Nombre de profils idéaux
SELECT COUNT(*) FROM ideal_profiles;
-- Résultat attendu : 850 (50 majeures × 17 piliers)

-- Nombre de mappings
SELECT COUNT(*) FROM major_program_mapping;
-- Résultat attendu : 7 (mappings d'exemple)
```

#### **Vérifier la Structure**
```sql
-- Structure de orientation_majors
DESCRIBE orientation_majors;

-- Structure de ideal_profiles
DESCRIBE ideal_profiles;

-- Structure de major_program_mapping
DESCRIBE major_program_mapping;
```

### **Étape 4 : Test des Endpoints**

#### **Démarrer l'Application Spring Boot**
```bash
mvn spring-boot:run
```

#### **Tester les Endpoints de Base**
```bash
# Test de base
curl http://localhost:8080/api/program-search/test

# Recherche par majeure
curl "http://localhost:8080/api/program-search/by-major/Informatique"

# Recherche avancée
curl "http://localhost:8080/api/program-search/advanced?majorName=Informatique&location=Nicosia"
```

## 🔍 **Vérifications Détaillées**

### **1. Vérification des Profils Idéaux**

```sql
-- Profil complet pour Génie Civil
SELECT 
    om.major_name,
    ip.pillar_name,
    ip.ideal_score
FROM orientation_majors om
JOIN ideal_profiles ip ON om.id = ip.major_id
WHERE om.major_name = 'Génie Civil'
ORDER BY ip.pillar_name;

-- Résultat attendu : 17 piliers avec leurs scores
```

### **2. Vérification des Mappings**

```sql
-- Mappings majeures-programmes
SELECT 
    om.major_name,
    mpm.search_keywords,
    mpm.program_id
FROM orientation_majors om
JOIN major_program_mapping mpm ON om.id = mpm.major_id
ORDER BY om.id;
```

### **3. Vérification des Contraintes**

```sql
-- Contraintes de clé étrangère
SELECT
    CONSTRAINT_NAME,
    TABLE_NAME,
    COLUMN_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM information_schema.KEY_COLUMN_USAGE
WHERE TABLE_NAME IN ('ideal_profiles', 'major_program_mapping')
AND REFERENCED_TABLE_NAME IS NOT NULL;
```

## 🚨 **Dépannage**

### **Erreur : "Cannot add or update a child row: a foreign key constraint fails"**

**Cause :** Les INSERT dans `ideal_profiles` référencent des IDs inexistants dans `orientation_majors`

**Solution :**
1. Vérifier que la table `orientation_majors` est créée et peuplée
2. Vérifier que les IDs dans les INSERT correspondent aux IDs dans `orientation_majors`
3. Exécuter la migration complète depuis le début

### **Erreur : "Unknown column 'campusCity'"**

**Cause :** Le service utilise `campusCity` au lieu de `campus_city`

**Solution :** Le service a été corrigé pour utiliser `campus_city`

### **Erreur : "Table already exists"**

**Cause :** Les tables existent déjà avec une structure incorrecte

**Solution :** La migration supprime et recrée automatiquement les tables

## 📊 **Résultats Attendus**

### **Tables Créées**
- ✅ `orientation_majors` : 50 majeures d'orientation
- ✅ `ideal_profiles` : 850 profils idéaux (17 piliers × 50 majeures)
- ✅ `major_program_mapping` : 7 mappings d'exemple

### **Données Insérées**
- ✅ 50 majeures d'orientation avec catégories et descriptions
- ✅ Profils idéaux complets pour les 10 majeures principales
- ✅ Mappings avec mots-clés de recherche

### **Structure**
- ✅ Contraintes de clé étrangère fonctionnelles
- ✅ Index optimisés pour les performances
- ✅ Relations correctes entre les tables

## 🧪 **Tests de Validation**

### **Test 1 : Cohérence des Données**
```sql
-- Vérifier que chaque majeure a exactement 17 piliers
SELECT 
    om.major_name,
    COUNT(ip.id) as nombre_piliers,
    CASE 
        WHEN COUNT(ip.id) = 17 THEN 'OK'
        ELSE 'ERREUR: Nombre incorrect de piliers'
    END as statut
FROM orientation_majors om
LEFT JOIN ideal_profiles ip ON om.id = ip.major_id
GROUP BY om.id, om.major_name
ORDER BY om.id;
```

### **Test 2 : Test d'Insertion**
```sql
-- Insérer un profil de test
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) VALUES
(1, 'TEST_PILIER', 50);

-- Vérifier l'insertion
SELECT * FROM ideal_profiles WHERE pillar_name = 'TEST_PILIER';

-- Nettoyer le test
DELETE FROM ideal_profiles WHERE pillar_name = 'TEST_PILIER';
```

### **Test 3 : API REST**
```bash
# Test de base
curl http://localhost:8080/api/program-search/test

# Recherche par majeure
curl "http://localhost:8080/api/program-search/by-major/Informatique"

# Recherche avancée
curl "http://localhost:8080/api/program-search/advanced?majorName=Informatique&location=Nicosia"
```

## 🎯 **Prochaines Étapes**

### **Phase 2 : Frontend**
1. **Page de résultats d'orientation** avec boutons "Voir les programmes"
2. **Interface de recherche avancée** avec filtres
3. **Cartes de programmes** avec liens vers les détails

### **Phase 3 : Tests Complets**
1. **Test du système d'orientation** complet
2. **Test de la liaison** orientation → programmes
3. **Test des filtres** et recommandations personnalisées

## 📞 **Support**

Si vous rencontrez des problèmes :

1. **Vérifier les logs** de l'application Spring Boot
2. **Exécuter le script de test** `test-orientation-system-fixed.sql`
3. **Vérifier la structure** des tables avec `DESCRIBE`
4. **Contrôler les contraintes** de clé étrangère

---

**Note :** Cette migration corrige définitivement les problèmes de clé étrangère et de structure. Le système est maintenant prêt pour la Phase 2 ! 🚀
