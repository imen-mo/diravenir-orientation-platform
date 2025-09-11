USE diravenir;

-- Vérifier l'état actuel de la table orientation_tests
SELECT '=== ÉTAT ACTUEL DE orientation_tests ===' AS Info;

-- Structure de la table
DESCRIBE orientation_tests;

-- Vérifier les contraintes
SELECT 
    CONSTRAINT_NAME,
    TABLE_NAME,
    COLUMN_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
WHERE TABLE_SCHEMA = 'diravenir' 
AND TABLE_NAME = 'orientation_tests';

-- Test d'insertion simple
SELECT '=== TEST D\'INSERTION SIMPLE ===' AS Info;

INSERT INTO orientation_tests (
    student_email, 
    student_name, 
    test_started_at
) VALUES (
    'test.status@example.com',
    'Test Status User',
    NOW()
);

-- Vérifier l'insertion
SELECT 
    id,
    student_email,
    student_name,
    test_uuid,
    student_id,
    test_status,
    total_questions,
    answered_questions,
    created_at
FROM orientation_tests 
WHERE student_email = 'test.status@example.com'
ORDER BY id DESC 
LIMIT 1;

SELECT '✅ Test d\'insertion réussi' AS Status;
