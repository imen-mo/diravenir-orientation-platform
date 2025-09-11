-- Script pour corriger la table orientation_tests
-- Résout l'erreur: Schema-validation: missing column [test_completed_at] in table [orientation_tests]

USE diravenir;

-- Vérifier d'abord la structure actuelle
SELECT '=== STRUCTURE ACTUELLE DE orientation_tests ===' AS Info;
DESCRIBE orientation_tests;

-- Ajouter les colonnes manquantes selon l'entité OrientationTest
-- test_completed_at (TIMESTAMP)
ALTER TABLE orientation_tests 
ADD COLUMN test_completed_at TIMESTAMP;

-- test_started_at (TIMESTAMP) - si elle n'existe pas
ALTER TABLE orientation_tests 
ADD COLUMN test_started_at TIMESTAMP;

-- test_status (VARCHAR) - si elle n'existe pas
ALTER TABLE orientation_tests 
ADD COLUMN test_status VARCHAR(50);

-- student_name (VARCHAR) - si elle n'existe pas
ALTER TABLE orientation_tests 
ADD COLUMN student_name VARCHAR(255);

-- student_phone (VARCHAR) - si elle n'existe pas
ALTER TABLE orientation_tests 
ADD COLUMN student_phone VARCHAR(255);

-- Vérifier la structure corrigée
SELECT '=== STRUCTURE CORRIGÉE DE orientation_tests ===' AS Info;
DESCRIBE orientation_tests;

-- Message de confirmation
SELECT 'Colonnes manquantes ajoutées avec succès à orientation_tests' AS Status;
