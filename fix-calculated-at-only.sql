-- Script simple pour ajouter seulement la colonne calculated_at manquante
-- Résout l'erreur: Schema-validation: missing column [calculated_at] in table [orientation_results]

USE diravenir;

-- Vérifier d'abord la structure actuelle
SELECT '=== STRUCTURE ACTUELLE DE orientation_results ===' AS Info;
DESCRIBE orientation_results;

-- Ajouter seulement la colonne calculated_at qui manque
ALTER TABLE orientation_results 
ADD COLUMN calculated_at TIMESTAMP;

-- Vérifier la structure corrigée
SELECT '=== STRUCTURE CORRIGÉE DE orientation_results ===' AS Info;
DESCRIBE orientation_results;

-- Message de confirmation
SELECT 'Colonne calculated_at ajoutée avec succès' AS Status;
