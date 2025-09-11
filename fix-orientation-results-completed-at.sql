-- Script pour corriger la colonne completed_at dans orientation_results
-- Vérifier d'abord si la colonne existe
SET @sql = (
    SELECT IF(
        (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
         WHERE TABLE_SCHEMA = 'diravenir' 
         AND TABLE_NAME = 'orientation_results' 
         AND COLUMN_NAME = 'completed_at') > 0,
        'ALTER TABLE orientation_results MODIFY COLUMN completed_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP',
        'SELECT "Colonne completed_at n''existe pas" as message'
    )
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Vérifier la structure après modification
DESCRIBE orientation_results;
