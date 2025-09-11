-- Script de nettoyage complet pour les doublons
-- Désactiver temporairement le mode sécurisé
SET SQL_SAFE_UPDATES = 0;

-- 1. Supprimer les recommandations orphelines ou en doublon
DELETE or1 FROM orientation_recommendations or1
INNER JOIN orientation_recommendations or2 
WHERE or1.orientation_result_id = or2.orientation_result_id 
AND or1.major_name = or2.major_name
AND or1.id < or2.id;

-- 2. Supprimer les résultats en doublon (garder le plus récent)
DELETE or1 FROM orientation_results or1
INNER JOIN orientation_results or2 
WHERE or1.orientation_test_id = or2.orientation_test_id 
AND or1.id < or2.id;

-- 3. Supprimer les recommandations qui référencent des résultats supprimés
DELETE FROM orientation_recommendations 
WHERE orientation_result_id NOT IN (
    SELECT id FROM orientation_results
);

-- Réactiver le mode sécurisé
SET SQL_SAFE_UPDATES = 1;

-- Vérifier qu'il n'y a plus de doublons
SELECT 'orientation_results' as table_name, orientation_test_id, COUNT(*) as count
FROM orientation_results 
GROUP BY orientation_test_id 
HAVING COUNT(*) > 1

UNION ALL

SELECT 'orientation_recommendations' as table_name, orientation_result_id, COUNT(*) as count
FROM orientation_recommendations 
GROUP BY orientation_result_id 
HAVING COUNT(*) > 1;
