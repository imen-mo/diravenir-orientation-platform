-- Test de validation du schéma de base de données pour l'orientation
-- Ce script vérifie que toutes les tables et colonnes nécessaires existent

USE diravenir;

-- ========================================
-- 1. VÉRIFICATION DES TABLES PRINCIPALES
-- ========================================

SELECT '=== VÉRIFICATION DES TABLES PRINCIPALES ===' AS Info;

-- Vérifier que les tables existent
SELECT 
    TABLE_NAME,
    TABLE_ROWS,
    CREATE_TIME,
    UPDATE_TIME
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_SCHEMA = 'diravenir' 
AND TABLE_NAME IN (
    'orientation_tests',
    'orientation_answers', 
    'orientation_results',
    'orientation_recommendations',
    'orientation_majors',
    'ideal_profiles'
)
ORDER BY TABLE_NAME;

-- ========================================
-- 2. VÉRIFICATION DE LA TABLE orientation_tests
-- ========================================

SELECT '=== STRUCTURE DE orientation_tests ===' AS Info;

-- Vérifier la structure de la table orientation_tests
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    IS_NULLABLE,
    COLUMN_DEFAULT,
    EXTRA,
    COLUMN_KEY
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = 'diravenir' 
AND TABLE_NAME = 'orientation_tests'
ORDER BY ORDINAL_POSITION;

-- Vérifier les contraintes
SELECT 
    CONSTRAINT_NAME,
    CONSTRAINT_TYPE,
    COLUMN_NAME
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc
JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE kcu 
    ON tc.CONSTRAINT_NAME = kcu.CONSTRAINT_NAME
WHERE tc.TABLE_SCHEMA = 'diravenir' 
AND tc.TABLE_NAME = 'orientation_tests';

-- ========================================
-- 3. VÉRIFICATION DE LA TABLE orientation_answers
-- ========================================

SELECT '=== STRUCTURE DE orientation_answers ===' AS Info;

-- Vérifier la structure de la table orientation_answers
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    IS_NULLABLE,
    COLUMN_DEFAULT,
    EXTRA,
    COLUMN_KEY
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = 'diravenir' 
AND TABLE_NAME = 'orientation_answers'
ORDER BY ORDINAL_POSITION;

-- Vérifier les contraintes
SELECT 
    CONSTRAINT_NAME,
    CONSTRAINT_TYPE,
    COLUMN_NAME
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc
JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE kcu 
    ON tc.CONSTRAINT_NAME = kcu.CONSTRAINT_NAME
WHERE tc.TABLE_SCHEMA = 'diravenir' 
AND tc.TABLE_NAME = 'orientation_answers';

-- ========================================
-- 4. VÉRIFICATION DE LA TABLE orientation_results
-- ========================================

SELECT '=== STRUCTURE DE orientation_results ===' AS Info;

-- Vérifier la structure de la table orientation_results
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    IS_NULLABLE,
    COLUMN_DEFAULT,
    EXTRA,
    COLUMN_KEY
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = 'diravenir' 
AND TABLE_NAME = 'orientation_results'
ORDER BY ORDINAL_POSITION;

-- Vérifier les contraintes
SELECT 
    CONSTRAINT_NAME,
    CONSTRAINT_TYPE,
    COLUMN_NAME
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc
JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE kcu 
    ON tc.CONSTRAINT_NAME = kcu.CONSTRAINT_NAME
WHERE tc.TABLE_SCHEMA = 'diravenir' 
AND tc.TABLE_NAME = 'orientation_results';

-- ========================================
-- 5. VÉRIFICATION DE LA TABLE orientation_recommendations
-- ========================================

SELECT '=== STRUCTURE DE orientation_recommendations ===' AS Info;

-- Vérifier la structure de la table orientation_recommendations
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    IS_NULLABLE,
    COLUMN_DEFAULT,
    EXTRA,
    COLUMN_KEY
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = 'diravenir' 
AND TABLE_NAME = 'orientation_recommendations'
ORDER BY ORDINAL_POSITION;

-- Vérifier les contraintes
SELECT 
    CONSTRAINT_NAME,
    CONSTRAINT_TYPE,
    COLUMN_NAME
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc
JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE kcu 
    ON tc.CONSTRAINT_NAME = kcu.CONSTRAINT_NAME
WHERE tc.TABLE_SCHEMA = 'diravenir' 
AND tc.TABLE_NAME = 'orientation_recommendations';

-- ========================================
-- 6. VÉRIFICATION DES DONNÉES DE RÉFÉRENCE
-- ========================================

SELECT '=== DONNÉES DE RÉFÉRENCE ===' AS Info;

-- Compter les majeures
SELECT 
    'orientation_majors' AS Table_Name,
    COUNT(*) AS Record_Count
FROM orientation_majors
UNION ALL
-- Compter les profils idéaux
SELECT 
    'ideal_profiles' AS Table_Name,
    COUNT(*) AS Record_Count
FROM ideal_profiles;

-- Vérifier quelques majeures
SELECT 
    major_code,
    major_name,
    category,
    description
FROM orientation_majors 
LIMIT 5;

-- Vérifier quelques profils idéaux
SELECT 
    major_code,
    COUNT(*) AS pillar_count
FROM ideal_profiles 
GROUP BY major_code 
LIMIT 5;

-- ========================================
-- 7. TEST DE DONNÉES DE TEST
-- ========================================

SELECT '=== DONNÉES DE TEST ===' AS Info;

-- Compter les tests existants
SELECT 
    'orientation_tests' AS Table_Name,
    COUNT(*) AS Total_Tests,
    COUNT(CASE WHEN test_status = 'COMPLETED' THEN 1 END) AS Completed_Tests,
    COUNT(CASE WHEN test_status = 'IN_PROGRESS' THEN 1 END) AS In_Progress_Tests
FROM orientation_tests
UNION ALL
-- Compter les réponses
SELECT 
    'orientation_answers' AS Table_Name,
    COUNT(*) AS Total_Answers,
    COUNT(DISTINCT orientation_test_id) AS Tests_With_Answers,
    0 AS In_Progress_Tests
FROM orientation_answers
UNION ALL
-- Compter les résultats
SELECT 
    'orientation_results' AS Table_Name,
    COUNT(*) AS Total_Results,
    COUNT(CASE WHEN calculated_at IS NOT NULL THEN 1 END) AS Calculated_Results,
    0 AS In_Progress_Tests
FROM orientation_results;

-- ========================================
-- 8. VÉRIFICATION DES RELATIONS
-- ========================================

SELECT '=== VÉRIFICATION DES RELATIONS ===' AS Info;

-- Vérifier les clés étrangères
SELECT 
    TABLE_NAME,
    COLUMN_NAME,
    CONSTRAINT_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
WHERE TABLE_SCHEMA = 'diravenir' 
AND REFERENCED_TABLE_NAME IS NOT NULL
AND TABLE_NAME IN (
    'orientation_tests',
    'orientation_answers', 
    'orientation_results',
    'orientation_recommendations'
)
ORDER BY TABLE_NAME, COLUMN_NAME;

-- ========================================
-- 9. TEST DE PERFORMANCE DES INDEX
-- ========================================

SELECT '=== INDEX ET PERFORMANCE ===' AS Info;

-- Vérifier les index
SELECT 
    TABLE_NAME,
    INDEX_NAME,
    COLUMN_NAME,
    NON_UNIQUE,
    INDEX_TYPE
FROM INFORMATION_SCHEMA.STATISTICS 
WHERE TABLE_SCHEMA = 'diravenir' 
AND TABLE_NAME IN (
    'orientation_tests',
    'orientation_answers', 
    'orientation_results',
    'orientation_recommendations'
)
ORDER BY TABLE_NAME, INDEX_NAME, SEQ_IN_INDEX;

-- ========================================
-- 10. VALIDATION FINALE
-- ========================================

SELECT '=== VALIDATION FINALE ===' AS Info;

-- Vérifier que toutes les colonnes nécessaires existent
SELECT 
    'orientation_tests' AS Table_Name,
    CASE 
        WHEN COUNT(*) >= 20 THEN '✅ OK'
        ELSE CONCAT('❌ Manque ', 20 - COUNT(*), ' colonnes')
    END AS Status,
    COUNT(*) AS Column_Count
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = 'diravenir' 
AND TABLE_NAME = 'orientation_tests'

UNION ALL

SELECT 
    'orientation_answers' AS Table_Name,
    CASE 
        WHEN COUNT(*) >= 8 THEN '✅ OK'
        ELSE CONCAT('❌ Manque ', 8 - COUNT(*), ' colonnes')
    END AS Status,
    COUNT(*) AS Column_Count
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = 'diravenir' 
AND TABLE_NAME = 'orientation_answers'

UNION ALL

SELECT 
    'orientation_results' AS Table_Name,
    CASE 
        WHEN COUNT(*) >= 6 THEN '✅ OK'
        ELSE CONCAT('❌ Manque ', 6 - COUNT(*), ' colonnes')
    END AS Status,
    COUNT(*) AS Column_Count
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = 'diravenir' 
AND TABLE_NAME = 'orientation_results'

UNION ALL

SELECT 
    'orientation_recommendations' AS Table_Name,
    CASE 
        WHEN COUNT(*) >= 6 THEN '✅ OK'
        ELSE CONCAT('❌ Manque ', 6 - COUNT(*), ' colonnes')
    END AS Status,
    COUNT(*) AS Column_Count
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = 'diravenir' 
AND TABLE_NAME = 'orientation_recommendations';

-- ========================================
-- 11. RECOMMANDATIONS
-- ========================================

SELECT '=== RECOMMANDATIONS ===' AS Info;

-- Vérifier l'espace disque utilisé
SELECT 
    TABLE_NAME,
    ROUND(((DATA_LENGTH + INDEX_LENGTH) / 1024 / 1024), 2) AS 'Size (MB)',
    TABLE_ROWS AS 'Rows'
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_SCHEMA = 'diravenir' 
AND TABLE_NAME IN (
    'orientation_tests',
    'orientation_answers', 
    'orientation_results',
    'orientation_recommendations',
    'orientation_majors',
    'ideal_profiles'
)
ORDER BY (DATA_LENGTH + INDEX_LENGTH) DESC;

-- Message final
SELECT '🎯 VALIDATION TERMINÉE' AS Status;
SELECT 'Vérifiez les résultats ci-dessus pour identifier les problèmes éventuels.' AS Note;
