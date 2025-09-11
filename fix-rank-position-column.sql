-- Script pour ajouter la colonne rank_position manquante
-- Résout l'erreur: Schema-validation: missing column [rank_position] in table [orientation_recommendations]

USE diravenir;

-- Vérifier d'abord la structure actuelle
SELECT '=== STRUCTURE ACTUELLE DE orientation_recommendations ===' AS Info;
DESCRIBE orientation_recommendations;

-- Ajouter la colonne rank_position si elle n'existe pas déjà
-- Cette colonne est utilisée pour ordonner les recommandations par score
-- Utilisation d'une procédure pour éviter les erreurs si la colonne existe déjà

SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
     WHERE TABLE_SCHEMA = 'diravenir' 
     AND TABLE_NAME = 'orientation_recommendations' 
     AND COLUMN_NAME = 'rank_position') = 0,
    'ALTER TABLE orientation_recommendations ADD COLUMN rank_position INT',
    'SELECT "Colonne rank_position existe déjà" AS Message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Ajouter aussi la colonne reasoning si elle n'existe pas déjà
SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
     WHERE TABLE_SCHEMA = 'diravenir' 
     AND TABLE_NAME = 'orientation_recommendations' 
     AND COLUMN_NAME = 'reasoning') = 0,
    'ALTER TABLE orientation_recommendations ADD COLUMN reasoning TEXT',
    'SELECT "Colonne reasoning existe déjà" AS Message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Vérifier la structure corrigée
SELECT '=== STRUCTURE CORRIGÉE DE orientation_recommendations ===' AS Info;
DESCRIBE orientation_recommendations;

-- Message de confirmation
SELECT 'Colonne rank_position ajoutée avec succès à orientation_recommendations' AS Status;
