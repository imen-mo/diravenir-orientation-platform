-- Nettoyage complet des recommandations
SET SQL_SAFE_UPDATES = 0;

-- Supprimer TOUTES les recommandations existantes
DELETE FROM orientation_recommendations;

-- Vérifier que toutes les recommandations ont été supprimées
SELECT COUNT(*) as remaining_recommendations FROM orientation_recommendations;

SET SQL_SAFE_UPDATES = 1;
