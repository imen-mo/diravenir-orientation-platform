-- Script pour corriger le type de la colonne top_recommendation_score
-- Résout l'erreur: Schema-validation: wrong column type encountered in column [top_recommendation_score]
-- found [decimal (Types#DECIMAL)], but expecting [float(53) (Types#FLOAT)]

USE diravenir;

-- Vérifier d'abord la structure actuelle
SELECT '=== STRUCTURE ACTUELLE DE orientation_results ===' AS Info;
DESCRIBE orientation_results;

-- Modifier le type de la colonne top_recommendation_score de DECIMAL à FLOAT
-- pour correspondre au type Double dans l'entité Java
ALTER TABLE orientation_results 
MODIFY COLUMN top_recommendation_score FLOAT;

-- Vérifier la structure corrigée
SELECT '=== STRUCTURE CORRIGÉE DE orientation_results ===' AS Info;
DESCRIBE orientation_results;

-- Message de confirmation
SELECT 'Type de colonne top_recommendation_score corrigé avec succès' AS Status;
