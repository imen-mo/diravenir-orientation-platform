-- Script pour vérifier la structure actuelle des tables orientation
-- Permet de voir exactement ce qui existe déjà

USE diravenir;

-- Afficher toutes les tables orientation existantes
SHOW TABLES LIKE 'orientation_%';

-- Vérifier la structure de chaque table orientation si elle existe
-- Ces commandes échoueront si les tables n'existent pas, c'est normal

-- Structure de orientation_answers
SELECT '=== STRUCTURE DE orientation_answers ===' AS Info;
DESCRIBE orientation_answers;

-- Structure de orientation_tests  
SELECT '=== STRUCTURE DE orientation_tests ===' AS Info;
DESCRIBE orientation_tests;

-- Structure de orientation_results
SELECT '=== STRUCTURE DE orientation_results ===' AS Info;
DESCRIBE orientation_results;

-- Structure de orientation_recommendations
SELECT '=== STRUCTURE DE orientation_recommendations ===' AS Info;
DESCRIBE orientation_recommendations;

-- Compter les enregistrements dans chaque table
SELECT '=== NOMBRE D\'ENREGISTREMENTS ===' AS Info;

SELECT 'orientation_answers' AS Table_Name, COUNT(*) AS Record_Count FROM orientation_answers
UNION ALL
SELECT 'orientation_tests' AS Table_Name, COUNT(*) AS Record_Count FROM orientation_tests
UNION ALL  
SELECT 'orientation_results' AS Table_Name, COUNT(*) AS Record_Count FROM orientation_results
UNION ALL
SELECT 'orientation_recommendations' AS Table_Name, COUNT(*) AS Record_Count FROM orientation_recommendations;
