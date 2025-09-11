-- Script pour vérifier les tables existantes dans la base de données
-- Permet de voir quelles tables sont déjà présentes

USE diravenir;

-- Afficher toutes les tables existantes
SHOW TABLES;

-- Afficher spécifiquement les tables orientation
SHOW TABLES LIKE 'orientation_%';

-- Vérifier la structure de la table orientation_answers si elle existe
DESCRIBE orientation_answers;

-- Vérifier la structure de la table orientation_tests si elle existe
DESCRIBE orientation_tests;

-- Vérifier la structure de la table orientation_results si elle existe
DESCRIBE orientation_results;

-- Vérifier la structure de la table orientation_recommendations si elle existe
DESCRIBE orientation_recommendations;

-- Compter le nombre de tables orientation existantes
SELECT COUNT(*) AS nombre_tables_orientation 
FROM information_schema.tables 
WHERE table_schema = 'diravenir' 
AND table_name LIKE 'orientation_%';
