-- Nettoyage complet de toutes les données d'orientation
SET SQL_SAFE_UPDATES = 0;

-- Supprimer toutes les données dans l'ordre correct (respect des contraintes de clés étrangères)
DELETE FROM orientation_recommendations;
DELETE FROM orientation_results;
DELETE FROM orientation_answers;
DELETE FROM orientation_tests;

-- Réinitialiser les compteurs d'auto-incrémentation
ALTER TABLE orientation_recommendations AUTO_INCREMENT = 1;
ALTER TABLE orientation_results AUTO_INCREMENT = 1;
ALTER TABLE orientation_answers AUTO_INCREMENT = 1;
ALTER TABLE orientation_tests AUTO_INCREMENT = 1;

SET SQL_SAFE_UPDATES = 1;

-- Vérifier que tout est vide
SELECT 'orientation_tests' as table_name, COUNT(*) as count FROM orientation_tests
UNION ALL
SELECT 'orientation_answers' as table_name, COUNT(*) as count FROM orientation_answers
UNION ALL
SELECT 'orientation_results' as table_name, COUNT(*) as count FROM orientation_results
UNION ALL
SELECT 'orientation_recommendations' as table_name, COUNT(*) as count FROM orientation_recommendations;

SELECT 'Database completely cleaned' as status;
