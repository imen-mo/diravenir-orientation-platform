-- Script sécurisé pour corriger les tables orientation existantes
-- Ajoute seulement les colonnes manquantes sans supprimer les données

USE diravenir;

-- Vérifier d'abord la structure de la table orientation_tests
DESCRIBE orientation_tests;

-- Ajouter les colonnes manquantes à orientation_tests si elles n'existent pas
-- Ces commandes échoueront silencieusement si les colonnes existent déjà

ALTER TABLE orientation_tests ADD COLUMN student_name VARCHAR(255);
ALTER TABLE orientation_tests ADD COLUMN student_email VARCHAR(255);
ALTER TABLE orientation_tests ADD COLUMN student_phone VARCHAR(255);
ALTER TABLE orientation_tests ADD COLUMN test_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE orientation_tests ADD COLUMN completion_date TIMESTAMP NULL;
ALTER TABLE orientation_tests ADD COLUMN status VARCHAR(50) DEFAULT 'IN_PROGRESS';
ALTER TABLE orientation_tests ADD COLUMN total_questions INT DEFAULT 15;
ALTER TABLE orientation_tests ADD COLUMN answered_questions INT DEFAULT 0;
ALTER TABLE orientation_tests ADD COLUMN user_answers JSON;
ALTER TABLE orientation_tests ADD COLUMN pillar_scores JSON;
ALTER TABLE orientation_tests ADD COLUMN top_recommendations JSON;
ALTER TABLE orientation_tests ADD COLUMN matching_scores JSON;
ALTER TABLE orientation_tests ADD COLUMN test_duration_minutes INT;
ALTER TABLE orientation_tests ADD COLUMN ip_address VARCHAR(45);
ALTER TABLE orientation_tests ADD COLUMN user_agent TEXT;
ALTER TABLE orientation_tests ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE orientation_tests ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

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
SELECT 'Tables orientation corrigées avec succès - AUCUNE DONNÉE SUPPRIMÉE' AS Status;
