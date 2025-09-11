-- Script pour rendre la colonne test_id nullable dans orientation_results
-- ATTENTION: Préserver les données existantes
ALTER TABLE orientation_results 
MODIFY COLUMN test_id BIGINT NULL;

-- Vérifier la modification
DESCRIBE orientation_results;
