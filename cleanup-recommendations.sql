-- Nettoyage des recommandations en doublon
SET SQL_SAFE_UPDATES = 0;

-- Supprimer les recommandations en doublon (garder la première pour chaque résultat)
DELETE or1 FROM orientation_recommendations or1
INNER JOIN orientation_recommendations or2 
WHERE or1.orientation_result_id = or2.orientation_result_id 
AND or1.major_name = or2.major_name
AND or1.id > or2.id;

-- Vérifier qu'il n'y a plus de doublons
SELECT 
    orientation_result_id,
    COUNT(*) as count,
    GROUP_CONCAT(major_name ORDER BY id) as majors
FROM orientation_recommendations 
GROUP BY orientation_result_id 
HAVING COUNT(*) > 10
ORDER BY count DESC;

SET SQL_SAFE_UPDATES = 1;
