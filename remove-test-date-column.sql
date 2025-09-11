USE diravenir;

-- Script pour supprimer la colonne test_date redondante

SELECT '=== SUPPRESSION DE LA COLONNE test_date ===' AS Info;

-- Supprimer la colonne test_date si elle existe
SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = 'diravenir'
     AND TABLE_NAME = 'orientation_tests'
     AND COLUMN_NAME = 'test_date') > 0,
    'ALTER TABLE orientation_tests DROP COLUMN test_date',
    'SELECT "Colonne test_date n\'existe pas" AS Message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Vérifier la structure après suppression
SELECT '=== STRUCTURE APRÈS SUPPRESSION ===' AS Info;
DESCRIBE orientation_tests;

-- Test d'insertion pour vérifier que tout fonctionne sans test_date
SELECT '=== TEST D\'INSERTION SANS test_date ===' AS Info;

INSERT INTO orientation_tests (
    student_email, 
    student_name, 
    student_phone, 
    test_started_at
) VALUES (
    'test.no.date@example.com',
    'Test No Date User',
    '+33123456789',
    NOW()
);

-- Vérifier l'insertion
SELECT 
    id,
    student_email,
    student_name,
    test_started_at,
    test_status,
    created_at
FROM orientation_tests 
WHERE student_email = 'test.no.date@example.com'
ORDER BY id DESC 
LIMIT 1;

-- Supprimer le test de test
DELETE FROM orientation_tests WHERE student_email = 'test.no.date@example.com';

SELECT '✅ Colonne test_date supprimée avec succès' AS Status;
