-- Script pour corriger la table orientation_results
-- Résout l'erreur: Schema-validation: missing column [calculated_at] in table [orientation_results]

USE diravenir;

-- Vérifier d'abord la structure actuelle
SELECT '=== STRUCTURE ACTUELLE DE orientation_results ===' AS Info;
DESCRIBE orientation_results;

-- Ajouter les colonnes manquantes selon l'entité OrientationResult
-- calculated_at (TIMESTAMP)
ALTER TABLE orientation_results 
ADD COLUMN calculated_at TIMESTAMP;

-- top_recommendation_score (DECIMAL)
ALTER TABLE orientation_results 
ADD COLUMN top_recommendation_score DECIMAL(5,2);

-- top_recommendation_major (VARCHAR)
ALTER TABLE orientation_results 
ADD COLUMN top_recommendation_major VARCHAR(255);

-- calculation_method (VARCHAR)
ALTER TABLE orientation_results 
ADD COLUMN calculation_method VARCHAR(100);

-- Ajouter aussi la colonne orientation_test_id si elle n'existe pas
-- (pour la relation OneToOne avec OrientationTest)
ALTER TABLE orientation_results 
ADD COLUMN orientation_test_id BIGINT;

-- Ajouter une contrainte de clé étrangère si elle n'existe pas
-- (optionnel, pour maintenir l'intégrité référentielle)
-- ALTER TABLE orientation_results 
-- ADD CONSTRAINT fk_orientation_results_test_id 
-- FOREIGN KEY (orientation_test_id) REFERENCES orientation_tests(id);

-- Vérifier la structure corrigée
SELECT '=== STRUCTURE CORRIGÉE DE orientation_results ===' AS Info;
DESCRIBE orientation_results;

-- Message de confirmation
SELECT 'Colonnes manquantes ajoutées avec succès à orientation_results' AS Status;
