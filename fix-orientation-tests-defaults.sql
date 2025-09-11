USE diravenir;

-- Script pour ajouter les valeurs par défaut manquantes à la table orientation_tests

SELECT '=== CORRECTION DES VALEURS PAR DÉFAUT ===' AS Info;

-- Ajouter des valeurs par défaut aux colonnes NOT NULL
ALTER TABLE orientation_tests 
MODIFY COLUMN created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);

ALTER TABLE orientation_tests 
MODIFY COLUMN test_status ENUM('IN_PROGRESS','COMPLETED','ABANDONED','EXPIRED') NOT NULL DEFAULT 'IN_PROGRESS';

ALTER TABLE orientation_tests 
MODIFY COLUMN total_questions INT NOT NULL DEFAULT 14;

ALTER TABLE orientation_tests 
MODIFY COLUMN answered_questions INT NOT NULL DEFAULT 0;

ALTER TABLE orientation_tests 
MODIFY COLUMN student_id BIGINT NOT NULL DEFAULT 1;

-- Ajouter la colonne test_uuid si elle n'existe pas
SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = 'diravenir'
     AND TABLE_NAME = 'orientation_tests'
     AND COLUMN_NAME = 'test_uuid') = 0,
    'ALTER TABLE orientation_tests ADD COLUMN test_uuid VARCHAR(255) NOT NULL DEFAULT (UUID()) UNIQUE',
    'SELECT "Colonne test_uuid existe déjà" AS Message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Ajouter la colonne completion_date si elle n'existe pas
SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = 'diravenir'
     AND TABLE_NAME = 'orientation_tests'
     AND COLUMN_NAME = 'completion_date') = 0,
    'ALTER TABLE orientation_tests ADD COLUMN completion_date DATETIME(6) NULL',
    'SELECT "Colonne completion_date existe déjà" AS Message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Ajouter les colonnes JSON si elles n'existent pas
SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = 'diravenir'
     AND TABLE_NAME = 'orientation_tests'
     AND COLUMN_NAME = 'user_answers') = 0,
    'ALTER TABLE orientation_tests ADD COLUMN user_answers JSON NULL',
    'SELECT "Colonne user_answers existe déjà" AS Message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = 'diravenir'
     AND TABLE_NAME = 'orientation_tests'
     AND COLUMN_NAME = 'pillar_scores') = 0,
    'ALTER TABLE orientation_tests ADD COLUMN pillar_scores JSON NULL',
    'SELECT "Colonne pillar_scores existe déjà" AS Message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = 'diravenir'
     AND TABLE_NAME = 'orientation_tests'
     AND COLUMN_NAME = 'matching_scores') = 0,
    'ALTER TABLE orientation_tests ADD COLUMN matching_scores JSON NULL',
    'SELECT "Colonne matching_scores existe déjà" AS Message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = 'diravenir'
     AND TABLE_NAME = 'orientation_tests'
     AND COLUMN_NAME = 'top_recommendations') = 0,
    'ALTER TABLE orientation_tests ADD COLUMN top_recommendations JSON NULL',
    'SELECT "Colonne top_recommendations existe déjà" AS Message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Ajouter les colonnes de métadonnées si elles n'existent pas
SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = 'diravenir'
     AND TABLE_NAME = 'orientation_tests'
     AND COLUMN_NAME = 'ip_address') = 0,
    'ALTER TABLE orientation_tests ADD COLUMN ip_address VARCHAR(255) NULL',
    'SELECT "Colonne ip_address existe déjà" AS Message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = 'diravenir'
     AND TABLE_NAME = 'orientation_tests'
     AND COLUMN_NAME = 'user_agent') = 0,
    'ALTER TABLE orientation_tests ADD COLUMN user_agent VARCHAR(255) NULL',
    'SELECT "Colonne user_agent existe déjà" AS Message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = 'diravenir'
     AND TABLE_NAME = 'orientation_tests'
     AND COLUMN_NAME = 'test_duration_minutes') = 0,
    'ALTER TABLE orientation_tests ADD COLUMN test_duration_minutes INT NULL',
    'SELECT "Colonne test_duration_minutes existe déjà" AS Message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = 'diravenir'
     AND TABLE_NAME = 'orientation_tests'
     AND COLUMN_NAME = 'updated_at') = 0,
    'ALTER TABLE orientation_tests ADD COLUMN updated_at DATETIME(6) NULL',
    'SELECT "Colonne updated_at existe déjà" AS Message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Vérifier la structure finale
SELECT '=== STRUCTURE FINALE DE orientation_tests ===' AS Info;
DESCRIBE orientation_tests;

-- Test d'insertion pour vérifier que tout fonctionne
SELECT '=== TEST D\'INSERTION ===' AS Info;

INSERT INTO orientation_tests (
    student_email, 
    student_name, 
    student_phone, 
    test_started_at
) VALUES (
    'test.defaults@example.com',
    'Test Defaults User',
    '+33123456789',
    NOW()
);

-- Vérifier l'insertion
SELECT 
    id,
    student_email,
    student_name,
    test_uuid,
    test_status,
    total_questions,
    answered_questions,
    student_id,
    created_at
FROM orientation_tests 
WHERE student_email = 'test.defaults@example.com'
ORDER BY id DESC 
LIMIT 1;

-- Supprimer le test de test
DELETE FROM orientation_tests WHERE student_email = 'test.defaults@example.com';

SELECT '✅ Valeurs par défaut ajoutées avec succès à orientation_tests' AS Status;
