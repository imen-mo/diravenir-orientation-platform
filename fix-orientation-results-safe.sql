-- Script sécurisé pour corriger la table orientation_results
-- Vérifie l'existence des colonnes avant de les ajouter

USE diravenir;

-- Vérifier d'abord la structure actuelle
SELECT '=== STRUCTURE ACTUELLE DE orientation_results ===' AS Info;
DESCRIBE orientation_results;

-- Ajouter calculated_at si elle n'existe pas
SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
     WHERE TABLE_SCHEMA = 'diravenir' 
     AND TABLE_NAME = 'orientation_results' 
     AND COLUMN_NAME = 'calculated_at') = 0,
    'ALTER TABLE orientation_results ADD COLUMN calculated_at TIMESTAMP',
    'SELECT "Colonne calculated_at existe déjà" AS Message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Ajouter top_recommendation_score si elle n'existe pas
SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
     WHERE TABLE_SCHEMA = 'diravenir' 
     AND TABLE_NAME = 'orientation_results' 
     AND COLUMN_NAME = 'top_recommendation_score') = 0,
    'ALTER TABLE orientation_results ADD COLUMN top_recommendation_score DECIMAL(5,2)',
    'SELECT "Colonne top_recommendation_score existe déjà" AS Message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Ajouter top_recommendation_major si elle n'existe pas
SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
     WHERE TABLE_SCHEMA = 'diravenir' 
     AND TABLE_NAME = 'orientation_results' 
     AND COLUMN_NAME = 'top_recommendation_major') = 0,
    'ALTER TABLE orientation_results ADD COLUMN top_recommendation_major VARCHAR(255)',
    'SELECT "Colonne top_recommendation_major existe déjà" AS Message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Ajouter orientation_test_id si elle n'existe pas
SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
     WHERE TABLE_SCHEMA = 'diravenir' 
     AND TABLE_NAME = 'orientation_results' 
     AND COLUMN_NAME = 'orientation_test_id') = 0,
    'ALTER TABLE orientation_results ADD COLUMN orientation_test_id BIGINT',
    'SELECT "Colonne orientation_test_id existe déjà" AS Message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Vérifier la structure corrigée
SELECT '=== STRUCTURE CORRIGÉE DE orientation_results ===' AS Info;
DESCRIBE orientation_results;

-- Message de confirmation
SELECT 'Colonnes manquantes ajoutées avec succès à orientation_results' AS Status;
