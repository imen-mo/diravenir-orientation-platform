# 🔧 Résolution de l'Erreur "Field 'major_id' doesn't have a default value"

## 📋 **Problème Identifié**

L'erreur `Error Code: 1364. Field 'major_id' doesn't have a default value` s'est produite lors de l'exécution de la migration `V4__Create_Ideal_Profiles.sql`.

### **Causes Possibles**

1. **Table `ideal_profiles` existe déjà** avec une structure incorrecte
2. **Conflit de noms de colonnes** entre `program_id` et `major_id`
3. **Table `program` manquante** ou structure différente
4. **Contraintes de clé étrangère** mal configurées

## 🛠️ **Solution Implémentée**

### **Étape 1: Création d'une Migration de Correction**

J'ai créé une nouvelle migration `V4_1__Fix_Ideal_Profiles_Structure.sql` qui :

- ✅ **Supprime** la table `ideal_profiles` existante (si elle existe)
- ✅ **Recrée** la table avec la structure correcte
- ✅ **Insère** des programmes de base dans la table `program`
- ✅ **Insère** tous les profils idéaux pour les 16 majeures
- ✅ **Configure** les contraintes et index correctement

### **Étape 2: Structure Corrigée**

```sql
CREATE TABLE ideal_profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    program_id BIGINT NOT NULL,
    pillar_name VARCHAR(100) NOT NULL,
    ideal_score INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_ideal_profiles_program FOREIGN KEY (program_id) REFERENCES program(id) ON DELETE CASCADE
);
```

### **Étape 3: Programmes de Base**

La migration insère automatiquement 16 programmes de base :
- Civil Engineering
- Mechanical Engineering  
- Architecture
- International Business
- Business Administration
- Computer Science
- Medicine
- Law
- Psychology
- Education
- Fine Arts
- Journalism
- Tourism Management
- Agricultural Sciences
- Veterinary Medicine
- Dentistry

## 🚀 **Instructions d'Exécution**

### **Option 1: Via Flyway (Recommandé)**

1. **Arrêter** l'application Spring Boot
2. **Exécuter** la migration :
   ```bash
   # Dans le dossier du projet
   mvn flyway:migrate
   ```

### **Option 2: Via MySQL Directement**

1. **Se connecter** à MySQL :
   ```bash
   mysql -u root -p diravenir1
   ```

2. **Exécuter** la migration :
   ```sql
   SOURCE src/main/resources/db/migration/V4_1__Fix_Ideal_Profiles_Structure.sql;
   ```

### **Option 3: Via Script de Test**

1. **Exécuter** le script de vérification :
   ```bash
   mysql -u root -p diravenir1 < test-orientation-fix.sql
   ```

## ✅ **Vérification de la Correction**

### **Tests Automatiques**

Le script `test-orientation-fix.sql` vérifie :

- ✅ Structure des tables
- ✅ Contenu des tables
- ✅ Contraintes de clé étrangère
- ✅ Index
- ✅ Insertion/suppression de test
- ✅ Résumé final

### **Vérifications Manuelles**

```sql
-- Vérifier la structure
DESCRIBE ideal_profiles;

-- Vérifier le contenu
SELECT COUNT(*) FROM ideal_profiles;

-- Vérifier les relations
SELECT p.program, COUNT(ip.id) 
FROM program p 
LEFT JOIN ideal_profiles ip ON p.id = ip.program_id 
GROUP BY p.id;
```

## 🔍 **Diagnostic des Problèmes**

### **Si l'erreur persiste**

1. **Vérifier** la structure de la table `program` :
   ```sql
   DESCRIBE program;
   SHOW CREATE TABLE program;
   ```

2. **Vérifier** les contraintes existantes :
   ```sql
   SELECT * FROM information_schema.TABLE_CONSTRAINTS 
   WHERE TABLE_NAME = 'program';
   ```

3. **Vérifier** les colonnes de la table `program` :
   ```sql
   SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, COLUMN_DEFAULT 
   FROM information_schema.COLUMNS 
   WHERE TABLE_NAME = 'program';
   ```

### **Problèmes Courants**

- **Colonne `major_id`** : Vérifier si elle existe et la supprimer
- **Contraintes** : Vérifier les clés étrangères
- **Types de données** : S'assurer de la compatibilité
- **Index** : Vérifier les index existants

## 📊 **Résultats Attendus**

Après la correction, vous devriez avoir :

- ✅ **16 programmes** dans la table `program`
- ✅ **272 profils idéaux** dans la table `ideal_profiles` (17 piliers × 16 programmes)
- ✅ **Contraintes** de clé étrangère fonctionnelles
- ✅ **Index** optimisés pour les performances
- ✅ **Structure** conforme aux spécifications

## 🎯 **Prochaines Étapes**

1. **Exécuter** la migration de correction
2. **Tester** avec le script de vérification
3. **Valider** le fonctionnement du système d'orientation
4. **Passer à la Phase 2** : Correction Frontend

## 📞 **Support**

Si le problème persiste :

1. **Vérifier** les logs de l'application
2. **Exécuter** le script de diagnostic
3. **Vérifier** la version de MySQL
4. **Contrôler** les permissions utilisateur

---

**Note** : Cette solution corrige définitivement le problème de structure et prépare le système pour la Phase 2 du développement.
