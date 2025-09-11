-- Vérifier les doublons dans orientation_results
SELECT 'Total orientation_results' as info, COUNT(*) as count FROM orientation_results;

-- Vérifier les doublons par orientation_test_id
SELECT 'Duplicate test IDs' as info, orientation_test_id, COUNT(*) as count 
FROM orientation_results 
GROUP BY orientation_test_id 
HAVING COUNT(*) > 1;

-- Vérifier les doublons par student_email
SELECT 'Duplicate student emails' as info, ot.student_email, COUNT(*) as count 
FROM orientation_results ores 
JOIN orientation_tests ot ON ores.orientation_test_id = ot.id 
GROUP BY ot.student_email 
HAVING COUNT(*) > 1;

-- Voir tous les résultats avec détails
SELECT ores.id, ores.orientation_test_id, ot.student_email, ores.calculated_at
FROM orientation_results ores 
JOIN orientation_tests ot ON ores.orientation_test_id = ot.id 
ORDER BY ores.id;