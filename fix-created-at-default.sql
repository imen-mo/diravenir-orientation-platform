-- Script pour rendre la colonne created_at nullable dans orientation_results
ALTER TABLE orientation_results 
MODIFY COLUMN created_at DATETIME(6) NULL;

-- Vérifier la modification
DESCRIBE orientation_results;
