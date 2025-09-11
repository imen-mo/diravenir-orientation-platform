USE diravenir;

-- Vérifier la structure actuelle de la table orientation_tests
SELECT '=== STRUCTURE ACTUELLE DE orientation_tests ===' AS Info;
DESCRIBE orientation_tests;

-- Vérifier les colonnes manquantes par rapport à l'entité Java
SELECT '=== COLONNES MANQUANTES ===' AS Info;
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    IS_NULLABLE,
    COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = 'diravenir' 
AND TABLE_NAME = 'orientation_tests'
ORDER BY ORDINAL_POSITION;
