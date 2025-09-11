-- Script simple pour ajouter la colonne rank_position manquante
-- Résout l'erreur: Schema-validation: missing column [rank_position] in table [orientation_recommendations]

USE diravenir;

-- Vérifier d'abord la structure actuelle
SELECT '=== STRUCTURE ACTUELLE DE orientation_recommendations ===' AS Info;
DESCRIBE orientation_recommendations;

-- Ajouter la colonne rank_position
-- Cette colonne est utilisée pour ordonner les recommandations par score
ALTER TABLE orientation_recommendations 
ADD COLUMN rank_position INT;

-- Ajouter aussi la colonne reasoning si elle n'existe pas
ALTER TABLE orientation_recommendations 
ADD COLUMN reasoning TEXT;

-- Vérifier la structure corrigée
SELECT '=== STRUCTURE CORRIGÉE DE orientation_recommendations ===' AS Info;
DESCRIBE orientation_recommendations;

-- Message de confirmation
SELECT 'Colonnes rank_position et reasoning ajoutées avec succès' AS Status;
