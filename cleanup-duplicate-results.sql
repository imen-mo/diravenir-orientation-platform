-- Script pour nettoyer les doublons dans orientation_results
-- Vérifier les doublons
SELECT 
    orientation_test_id,
    COUNT(*) as count
FROM orientation_results 
GROUP BY orientation_test_id 
HAVING COUNT(*) > 1;

-- Supprimer les doublons en gardant le plus récent
-- Désactiver temporairement le mode sécurisé pour cette opération
SET SQL_SAFE_UPDATES = 0;

-- Supprimer les doublons en gardant le plus récent
DELETE or1 FROM orientation_results or1
INNER JOIN orientation_results or2 
WHERE or1.orientation_test_id = or2.orientation_test_id 
AND or1.id < or2.id;

-- Réactiver le mode sécurisé
SET SQL_SAFE_UPDATES = 1;

-- Vérifier qu'il n'y a plus de doublons
SELECT 
    orientation_test_id,
    COUNT(*) as count
FROM orientation_results 
GROUP BY orientation_test_id 
HAVING COUNT(*) > 1;
