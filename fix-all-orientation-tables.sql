-- Script complet pour corriger toutes les tables orientation
-- Résout toutes les erreurs de schema-validation

USE diravenir;

-- ==========================================
-- 1. CORRIGER orientation_results
-- ==========================================
SELECT '=== CORRECTION DE orientation_results ===' AS Info;

-- Ajouter les colonnes manquantes
ALTER TABLE orientation_results 
ADD COLUMN calculated_at TIMESTAMP;

ALTER TABLE orientation_results 
ADD COLUMN top_recommendation_score DECIMAL(5,2);

ALTER TABLE orientation_results 
ADD COLUMN top_recommendation_major VARCHAR(255);

ALTER TABLE orientation_results 
ADD COLUMN calculation_method VARCHAR(100);

ALTER TABLE orientation_results 
ADD COLUMN orientation_test_id BIGINT;

-- ==========================================
-- 2. CORRIGER orientation_recommendations  
-- ==========================================
SELECT '=== CORRECTION DE orientation_recommendations ===' AS Info;

-- Ajouter les colonnes manquantes (si pas déjà fait)
ALTER TABLE orientation_recommendations 
ADD COLUMN rank_position INT;

ALTER TABLE orientation_recommendations 
ADD COLUMN reasoning TEXT;

-- ==========================================
-- 3. VÉRIFIER LES STRUCTURES FINALES
-- ==========================================
SELECT '=== STRUCTURE FINALE DE orientation_results ===' AS Info;
DESCRIBE orientation_results;

SELECT '=== STRUCTURE FINALE DE orientation_recommendations ===' AS Info;
DESCRIBE orientation_recommendations;

-- ==========================================
-- 4. AFFICHER TOUTES LES TABLES ORIENTATION
-- ==========================================
SELECT '=== TOUTES LES TABLES ORIENTATION ===' AS Info;
SHOW TABLES LIKE 'orientation_%';

-- Message de confirmation final
SELECT 'Toutes les tables orientation ont été corrigées avec succès!' AS Status;
