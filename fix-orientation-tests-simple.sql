USE diravenir;

-- Script simplifié pour corriger les contraintes

SELECT '=== CORRECTION SIMPLIFIÉE ===' AS Info;

-- 1. Supprimer la fonction personnalisée si elle existe
DROP FUNCTION IF EXISTS generate_test_uuid;

-- 2. Rendre test_uuid nullable
ALTER TABLE orientation_tests 
MODIFY COLUMN test_uuid VARCHAR(255) NULL;

-- 3. Supprimer la contrainte de clé étrangère problématique
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
    'SELECT "Aucune contrainte trouvée" AS Message'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 4. Modifier student_id pour permettre NULL
ALTER TABLE orientation_tests 
MODIFY COLUMN student_id BIGINT NULL;

-- 5. Ajouter les valeurs par défaut nécessaires
ALTER TABLE orientation_tests 
MODIFY COLUMN created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);

ALTER TABLE orientation_tests 
MODIFY COLUMN test_status ENUM('IN_PROGRESS','COMPLETED','ABANDONED','EXPIRED') NOT NULL DEFAULT 'IN_PROGRESS';

ALTER TABLE orientation_tests 
MODIFY COLUMN total_questions INT NOT NULL DEFAULT 14;

ALTER TABLE orientation_tests 
MODIFY COLUMN answered_questions INT NOT NULL DEFAULT 0;

-- 6. Vérifier la structure
SELECT '=== STRUCTURE FINALE ===' AS Info;
DESCRIBE orientation_tests;

-- 7. Test d'insertion simple
SELECT '=== TEST D\'INSERTION ===' AS Info;

INSERT INTO orientation_tests (
    student_email, 
    student_name, 
    test_started_at
) VALUES (
    'test.simple@example.com',
    'Test Simple User',
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
    created_at
FROM orientation_tests 
WHERE student_email = 'test.simple@example.com'
ORDER BY id DESC 
LIMIT 1;

SELECT '✅ Corrections appliquées avec succès' AS Status;
