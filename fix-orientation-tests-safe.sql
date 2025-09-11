-- Script sécurisé pour corriger la table orientation_tests
-- Vérifie l'existence des colonnes avant de les ajouter

USE diravenir;

-- Vérifier d'abord la structure actuelle
SELECT '=== STRUCTURE ACTUELLE DE orientation_tests ===' AS Info;
DESCRIBE orientation_tests;

-- Ajouter test_completed_at si elle n'existe pas
SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
     WHERE TABLE_SCHEMA = 'diravenir' 
     AND TABLE_NAME = 'orientation_tests' 
     AND COLUMN_NAME = 'test_completed_at') = 0,
    'ALTER TABLE orientation_tests ADD COLUMN test_completed_at TIMESTAMP',
    'SELECT "Colonne test_completed_at existe déjà" AS Message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Ajouter test_started_at si elle n'existe pas
SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
     WHERE TABLE_SCHEMA = 'diravenir' 
     AND TABLE_NAME = 'orientation_tests' 
     AND COLUMN_NAME = 'test_started_at') = 0,
    'ALTER TABLE orientation_tests ADD COLUMN test_started_at TIMESTAMP',
    'SELECT "Colonne test_started_at existe déjà" AS Message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Ajouter test_status si elle n'existe pas
SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
     WHERE TABLE_SCHEMA = 'diravenir' 
     AND TABLE_NAME = 'orientation_tests' 
     AND COLUMN_NAME = 'test_status') = 0,
    'ALTER TABLE orientation_tests ADD COLUMN test_status VARCHAR(50)',
    'SELECT "Colonne test_status existe déjà" AS Message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Ajouter student_name si elle n'existe pas
SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
     WHERE TABLE_SCHEMA = 'diravenir' 
     AND TABLE_NAME = 'orientation_tests' 
     AND COLUMN_NAME = 'student_name') = 0,
    'ALTER TABLE orientation_tests ADD COLUMN student_name VARCHAR(255)',
    'SELECT "Colonne student_name existe déjà" AS Message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Ajouter student_phone si elle n'existe pas
SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
     WHERE TABLE_SCHEMA = 'diravenir' 
     AND TABLE_NAME = 'orientation_tests' 
     AND COLUMN_NAME = 'student_phone') = 0,
    'ALTER TABLE orientation_tests ADD COLUMN student_phone VARCHAR(255)',
    'SELECT "Colonne student_phone existe déjà" AS Message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Vérifier la structure corrigée
SELECT '=== STRUCTURE CORRIGÉE DE orientation_tests ===' AS Info;
DESCRIBE orientation_tests;

-- Message de confirmation
SELECT 'Colonnes manquantes ajoutées avec succès à orientation_tests' AS Status;
