-- Script pour corriger le type de la colonne matching_score
-- Résout l'erreur: Schema-validation: wrong column type encountered in column [matching_score]

USE diravenir;

-- Modifier le type de la colonne matching_score de DECIMAL à FLOAT
ALTER TABLE orientation_recommendations 
MODIFY COLUMN matching_score FLOAT;

-- Vérifier la structure corrigée
DESCRIBE orientation_recommendations;

-- Message de confirmation
SELECT 'Type de colonne matching_score corrigé avec succès' AS Status;
