-- Script pour corriger les doublons dans orientation_results
-- Ce script supprime les doublons en gardant seulement le plus récent

SET SQL_SAFE_UPDATES = 0;

-- 1. Supprimer les recommandations liées aux résultats dupliqués
DELETE or_rec FROM orientation_recommendations or_rec
INNER JOIN (
    SELECT ores1.id as duplicate_id
    FROM orientation_results ores1
    INNER JOIN orientation_results ores2 
    WHERE ores1.orientation_test_id = ores2.orientation_test_id 
    AND ores1.id < ores2.id
) duplicates ON or_rec.orientation_result_id = duplicates.duplicate_id;

-- 2. Supprimer les résultats dupliqués (garder le plus récent)
DELETE ores1 FROM orientation_results ores1
INNER JOIN orientation_results ores2 
WHERE ores1.orientation_test_id = ores2.orientation_test_id 
AND ores1.id < ores2.id;

-- 3. Vérifier qu'il n'y a plus de doublons
SELECT 'Vérification des doublons' as status;
SELECT 'orientation_results' as table_name, orientation_test_id, COUNT(*) as count
FROM orientation_results 
GROUP BY orientation_test_id 
HAVING COUNT(*) > 1;

-- 4. Afficher le nombre total de résultats
SELECT 'Total orientation_results' as info, COUNT(*) as count FROM orientation_results;
SELECT 'Total orientation_tests' as info, COUNT(*) as count FROM orientation_tests;
SELECT 'Total orientation_recommendations' as info, COUNT(*) as count FROM orientation_recommendations;

SET SQL_SAFE_UPDATES = 1;
