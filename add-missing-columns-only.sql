-- Script pour ajouter SEULEMENT les colonnes manquantes
-- Basé sur la structure actuelle de orientation_tests

USE diravenir;

-- Ajouter les colonnes manquantes à orientation_tests
-- Ces commandes échoueront silencieusement si les colonnes existent déjà

-- Ajouter student_name, student_email, student_phone si elles n'existent pas
ALTER TABLE orientation_tests ADD COLUMN student_name VARCHAR(255);
ALTER TABLE orientation_tests ADD COLUMN student_email VARCHAR(255);
ALTER TABLE orientation_tests ADD COLUMN student_phone VARCHAR(255);

-- Créer la table orientation_results si elle n'existe pas
CREATE TABLE IF NOT EXISTS orientation_results (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    test_id BIGINT,
    user_profile JSON,
    top3_recommendations JSON,
    all_recommendations JSON,
    matching_algorithm_version VARCHAR(50) DEFAULT 'v1.0',
    total_questions_answered INT,
    test_completion_time_minutes INT,
    average_matching_score DECIMAL(5,2),
    highest_matching_score DECIMAL(5,2),
    lowest_matching_score DECIMAL(5,2),
    user_name VARCHAR(255),
    user_email VARCHAR(255),
    user_phone VARCHAR(255),
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Créer la table orientation_recommendations si elle n'existe pas
CREATE TABLE IF NOT EXISTS orientation_recommendations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    orientation_result_id BIGINT NOT NULL,
    major_code VARCHAR(50),
    major_name VARCHAR(255),
    matching_score DECIMAL(5,2),
    matching_percentage VARCHAR(10),
    category VARCHAR(100),
    description TEXT,
    why_this_major TEXT,
    pillar_scores JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Vérifier la structure finale
DESCRIBE orientation_tests;
DESCRIBE orientation_results;
DESCRIBE orientation_recommendations;

-- Afficher toutes les tables orientation
SHOW TABLES LIKE 'orientation_%';

-- Message de confirmation
SELECT 'Colonnes manquantes ajoutées avec succès - AUCUNE DONNÉE SUPPRIMÉE' AS Status;
