-- Script simple pour ajouter seulement la colonne test_completed_at manquante
-- Résout l'erreur: Schema-validation: missing column [test_completed_at] in table [orientation_tests]

USE diravenir;

-- Vérifier d'abord la structure actuelle
SELECT '=== STRUCTURE ACTUELLE DE orientation_tests ===' AS Info;
DESCRIBE orientation_tests;

-- Ajouter seulement la colonne test_completed_at qui manque
ALTER TABLE orientation_tests 
ADD COLUMN test_completed_at TIMESTAMP;

-- Vérifier la structure corrigée
SELECT '=== STRUCTURE CORRIGÉE DE orientation_tests ===' AS Info;
DESCRIBE orientation_tests;

-- Message de confirmation
SELECT 'Colonne test_completed_at ajoutée avec succès' AS Status;
