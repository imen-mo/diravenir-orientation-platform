USE diravenir;

-- Script pour corriger les contraintes et valeurs par défaut

SELECT '=== CORRECTION DES CONTRAINTES ===' AS Info;

-- 1. Supprimer la fonction personnalisée si elle existe
DROP FUNCTION IF EXISTS generate_test_uuid;

-- 2. Rendre test_uuid nullable (pas de valeur par défaut)
ALTER TABLE orientation_tests 
MODIFY COLUMN test_uuid VARCHAR(255) NULL;

-- 3. Vérifier si la contrainte de clé étrangère existe
SELECT 
    CONSTRAINT_NAME,
    TABLE_NAME,
    COLUMN_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
WHERE TABLE_SCHEMA = 'diravenir' 
AND TABLE_NAME = 'orientation_tests' 
AND COLUMN_NAME = 'student_id';

-- 4. Supprimer la contrainte de clé étrangère problématique
SET @constraint_name = (
    SELECT CONSTRAINT_NAME 
    FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
    WHERE TABLE_SCHEMA = 'diravenir' 
    AND TABLE_NAME = 'orientation_tests' 
    AND COLUMN_NAME = 'student_id'
    AND REFERENCED_TABLE_NAME IS NOT NULL
);

SET @sql = IF(@constraint_name IS NOT NULL, 
    CONCAT('ALTER TABLE orientation_tests DROP FOREIGN KEY ', @constraint_name),
    'SELECT "Aucune contrainte de clé étrangère trouvée" AS Message'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 5. Modifier student_id pour permettre NULL ou une valeur par défaut
ALTER TABLE orientation_tests 
MODIFY COLUMN student_id BIGINT NULL DEFAULT NULL;

-- 6. Ajouter les autres valeurs par défaut nécessaires
ALTER TABLE orientation_tests 
MODIFY COLUMN created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);

ALTER TABLE orientation_tests 
MODIFY COLUMN test_status ENUM('IN_PROGRESS','COMPLETED','ABANDONED','EXPIRED') NOT NULL DEFAULT 'IN_PROGRESS';

ALTER TABLE orientation_tests 
MODIFY COLUMN total_questions INT NOT NULL DEFAULT 14;

ALTER TABLE orientation_tests 
MODIFY COLUMN answered_questions INT NOT NULL DEFAULT 0;

-- 7. Vérifier la structure finale
SELECT '=== STRUCTURE FINALE ===' AS Info;
DESCRIBE orientation_tests;

-- 8. Test d'insertion pour vérifier que tout fonctionne
SELECT '=== TEST D\'INSERTION ===' AS Info;

INSERT INTO orientation_tests (
    student_email, 
    student_name, 
    student_phone, 
    test_started_at
) VALUES (
    'test.constraints@example.com',
    'Test Constraints User',
    '+33123456789',
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
WHERE student_email = 'test.constraints@example.com'
ORDER BY id DESC 
LIMIT 1;

-- Supprimer le test de test (en utilisant l'ID pour éviter l'erreur safe update)
DELETE FROM orientation_tests WHERE id = (
    SELECT id FROM (
        SELECT id FROM orientation_tests 
        WHERE student_email = 'test.constraints@example.com'
        ORDER BY id DESC 
        LIMIT 1
    ) AS temp_table
);

SELECT '✅ Contraintes corrigées avec succès' AS Status;
