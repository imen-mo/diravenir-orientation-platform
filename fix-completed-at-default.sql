-- Script pour rendre la colonne completed_at nullable
ALTER TABLE orientation_results 
MODIFY COLUMN completed_at DATETIME(6) NULL;

-- Vérifier la modification
DESCRIBE orientation_results;
