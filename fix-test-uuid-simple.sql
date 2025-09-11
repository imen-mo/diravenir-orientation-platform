USE diravenir;

-- Script simple pour corriger test_uuid

SELECT '=== CORRECTION SIMPLE DE test_uuid ===' AS Info;

-- Rendre test_uuid nullable temporairement pour éviter l'erreur
ALTER TABLE orientation_tests 
MODIFY COLUMN test_uuid VARCHAR(255) NULL;

-- Vérifier la structure
SELECT '=== STRUCTURE APRÈS CORRECTION ===' AS Info;
DESCRIBE orientation_tests;

-- Test d'insertion pour vérifier que ça fonctionne
SELECT '=== TEST D\'INSERTION ===' AS Info;

INSERT INTO orientation_tests (
    student_email, 
    student_name, 
    student_phone, 
    test_started_at
) VALUES (
    'test.uuid.simple@example.com',
    'Test UUID Simple User',
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
WHERE student_email = 'test.uuid.simple@example.com'
ORDER BY id DESC 
LIMIT 1;

-- Supprimer le test de test
DELETE FROM orientation_tests WHERE student_email = 'test.uuid.simple@example.com';

SELECT '✅ test_uuid rendu nullable avec succès' AS Status;
