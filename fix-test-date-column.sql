USE diravenir;

-- Script pour ajouter la colonne test_date manquante

SELECT '=== AJOUT DE LA COLONNE test_date ===' AS Info;

-- Ajouter la colonne test_date si elle n'existe pas
SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = 'diravenir'
     AND TABLE_NAME = 'orientation_tests'
     AND COLUMN_NAME = 'test_date') = 0,
    'ALTER TABLE orientation_tests ADD COLUMN test_date DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)',
    'SELECT "Colonne test_date existe déjà" AS Message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Vérifier la structure
SELECT '=== STRUCTURE APRÈS AJOUT ===' AS Info;
DESCRIBE orientation_tests;

-- Test d'insertion pour vérifier que la valeur par défaut fonctionne
SELECT '=== TEST D\'INSERTION ===' AS Info;

INSERT INTO orientation_tests (
    student_email, 
    student_name, 
    student_phone, 
    test_started_at
) VALUES (
    'test.date@example.com',
    'Test Date User',
    '+33123456789',
    NOW()
);

-- Vérifier l'insertion
SELECT 
    id,
    student_email,
    student_name,
    test_date,
    test_started_at,
    created_at
FROM orientation_tests 
WHERE student_email = 'test.date@example.com'
ORDER BY id DESC 
LIMIT 1;

-- Supprimer le test de test
DELETE FROM orientation_tests WHERE student_email = 'test.date@example.com';

SELECT '✅ Colonne test_date ajoutée avec succès' AS Status;
