-- Nettoyage final des doublons
SET SQL_SAFE_UPDATES = 0;

-- 1. Supprimer TOUS les doublons dans orientation_results
DELETE or1 FROM orientation_results or1
INNER JOIN orientation_results or2 
WHERE or1.orientation_test_id = or2.orientation_test_id 
AND or1.id < or2.id;

-- 2. Supprimer les recommandations orphelines
DELETE FROM orientation_recommendations 
WHERE orientation_result_id NOT IN (
    SELECT id FROM orientation_results
);

-- 3. Vérifier qu'il n'y a plus de doublons
SELECT 'orientation_results' as table_name, orientation_test_id, COUNT(*) as count
FROM orientation_results 
GROUP BY orientation_test_id 
HAVING COUNT(*) > 1

UNION ALL

SELECT 'orientation_recommendations' as table_name, orientation_result_id, COUNT(*) as count
FROM orientation_recommendations 
GROUP BY orientation_result_id 
HAVING COUNT(*) > 1;

SET SQL_SAFE_UPDATES = 1;
