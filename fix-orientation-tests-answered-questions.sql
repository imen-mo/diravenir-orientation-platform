USE diravenir;

-- Vérifier d'abord la structure actuelle
SELECT '=== STRUCTURE ACTUELLE DE orientation_tests ===' AS Info;
DESCRIBE orientation_tests;

-- Ajouter une valeur par défaut à la colonne answered_questions
-- Cette colonne est requise mais n'a pas de valeur par défaut
SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = 'diravenir'
     AND TABLE_NAME = 'orientation_tests'
     AND COLUMN_NAME = 'answered_questions') > 0,
    'ALTER TABLE orientation_tests MODIFY COLUMN answered_questions INT DEFAULT 0',
    'SELECT "Colonne answered_questions n\'existe pas" AS Message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Ajouter aussi une valeur par défaut à total_questions si elle existe
SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = 'diravenir'
     AND TABLE_NAME = 'orientation_tests'
     AND COLUMN_NAME = 'total_questions') > 0,
    'ALTER TABLE orientation_tests MODIFY COLUMN total_questions INT DEFAULT 15',
    'SELECT "Colonne total_questions n\'existe pas" AS Message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Vérifier la structure corrigée
SELECT '=== STRUCTURE CORRIGÉE DE orientation_tests ===' AS Info;
DESCRIBE orientation_tests;

-- Test d'insertion pour vérifier que les valeurs par défaut fonctionnent
SELECT '=== TEST D\'INSERTION ===' AS Info;

-- Insérer un test de test (sera supprimé après)
INSERT INTO orientation_tests (
    student_email, 
    student_name, 
    student_phone, 
    test_status,
    test_started_at
) VALUES (
    'test@example.com',
    'Test User',
    '+33123456789',
    'IN_PROGRESS',
    NOW()
);

-- Vérifier l'insertion
SELECT 
    id,
    student_email,
    student_name,
    answered_questions,
    total_questions,
    test_status
FROM orientation_tests 
WHERE student_email = 'test@example.com'
ORDER BY id DESC 
LIMIT 1;

-- Supprimer le test de test
DELETE FROM orientation_tests WHERE student_email = 'test@example.com';

SELECT 'Colonnes corrigées avec succès - valeurs par défaut ajoutées' AS Status;
