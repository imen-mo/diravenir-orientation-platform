# Correction des Erreurs de Base de Données

## Problèmes identifiés

1. **Erreurs de datetime** : Les colonnes `created_at` et `updated_at` dans la table `universite` contiennent des valeurs vides (`''`)
2. **Contraintes de clés étrangères** : Des problèmes avec les foreign keys entre `program`/`universite` et `destinations`
3. **UniversiteRepository** : La méthode `findByIsActiveTrue()` cherche une propriété `isActive` qui n'existe pas dans l'entité `Universite`

## Solutions

### Option 1 : Exécution automatique (si MySQL est dans le PATH)

```powershell
powershell -ExecutionPolicy Bypass -File fix-database.ps1
```

### Option 2 : Exécution manuelle du script SQL

1. Ouvrez votre client MySQL (MySQL Workbench, phpMyAdmin, HeidiSQL, etc.)
2. Connectez-vous à votre base de données `diravenir`
3. Exécutez le contenu du fichier `fix-database-minimal.sql`

### Option 3 : Recréation complète de la base de données

La configuration a été modifiée pour utiliser `spring.jpa.hibernate.ddl-auto=create-drop`, ce qui va :
- Supprimer toutes les tables existantes
- Recréer toutes les tables avec la bonne structure
- **ATTENTION** : Cela supprimera toutes les données existantes !

## Modifications apportées

### 1. Entité Universite
- Ajout de la propriété `isActive` manquante
- Correction des annotations pour les dates

### 2. Entité Program
- Correction des types de données pour `createdAt` et `updatedAt` (String → LocalDateTime)
- Ajout des annotations `@CreationTimestamp` et `@UpdateTimestamp`

### 3. PolicyRepository
- Correction du type de retour de `findMaxVersionByType` (Integer → String)
- Correction du paramètre de `existsByPolicyTypeAndVersion` (Integer → String)

### 4. Configuration
- Modification de `spring.jpa.hibernate.ddl-auto` vers `create-drop` pour éviter les conflits de schéma

## Après la correction

1. Relancez l'application Spring Boot
2. L'application devrait démarrer sans erreurs
3. Les tables seront recréées avec la bonne structure
4. Vous pourrez ensuite modifier la configuration pour revenir à `update` si nécessaire

## Fichiers créés/modifiés

- `fix-database-minimal.sql` : Script SQL de correction
- `fix-database.ps1` : Script PowerShell d'exécution automatique
- `src/main/java/com/diravenir/Entities/Universite.java` : Ajout de la propriété `isActive`
- `src/main/java/com/diravenir/Entities/Program.java` : Correction des types de dates
- `src/main/java/com/diravenir/repository/PolicyRepository.java` : Correction des types
- `src/main/resources/application-dev.properties` : Configuration Hibernate
