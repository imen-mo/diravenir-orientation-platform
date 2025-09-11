USE diravenir;

-- Script pour ajouter une valeur par défaut à test_uuid

SELECT '=== CORRECTION DE test_uuid ===' AS Info;

-- Vérifier si la colonne test_uuid existe
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    IS_NULLABLE,
    COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = 'diravenir' 
AND TABLE_NAME = 'orientation_tests'
AND COLUMN_NAME = 'test_uuid';

-- Ajouter une valeur par défaut à test_uuid
-- MySQL ne supporte pas UUID() comme valeur par défaut, donc on va utiliser une fonction personnalisée
SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = 'diravenir'
     AND TABLE_NAME = 'orientation_tests'
     AND COLUMN_NAME = 'test_uuid') > 0,
    'ALTER TABLE orientation_tests MODIFY COLUMN test_uuid VARCHAR(255) NOT NULL DEFAULT (CONCAT("test-", UNIX_TIMESTAMP(), "-", RAND()))',
    'SELECT "Colonne test_uuid n\'existe pas" AS Message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Alternative: Créer une fonction pour générer des UUIDs
DELIMITER //
CREATE FUNCTION IF NOT EXISTS generate_test_uuid() RETURNS VARCHAR(255)
READS SQL DATA
DETERMINISTIC
BEGIN
    RETURN CONCAT('test-', UNIX_TIMESTAMP(), '-', FLOOR(RAND() * 10000));
END //
DELIMITER ;

-- Modifier la colonne pour utiliser cette fonction
ALTER TABLE orientation_tests 
MODIFY COLUMN test_uuid VARCHAR(255) NOT NULL DEFAULT (generate_test_uuid());

-- Vérifier la structure
SELECT '=== STRUCTURE APRÈS CORRECTION ===' AS Info;
DESCRIBE orientation_tests;

-- Test d'insertion pour vérifier que la valeur par défaut fonctionne
SELECT '=== TEST D\'INSERTION ===' AS Info;

INSERT INTO orientation_tests (
    student_email, 
    student_name, 
    student_phone, 
    test_started_at
) VALUES (
    'test.uuid@example.com',
    'Test UUID User',
    '+33123456789',
    NOW()
);

-- Vérifier l'insertion
SELECT 
    id,
    student_email,
    student_name,
    test_uuid,
    test_started_at,
    created_at
FROM orientation_tests 
WHERE student_email = 'test.uuid@example.com'
ORDER BY id DESC 
LIMIT 1;

-- Supprimer le test de test
DELETE FROM orientation_tests WHERE student_email = 'test.uuid@example.com';

SELECT '✅ Valeur par défaut ajoutée à test_uuid avec succès' AS Status;
