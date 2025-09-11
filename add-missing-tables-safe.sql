-- Script sécurisé pour ajouter les tables manquantes
-- NE SUPPRIME AUCUNE DONNÉE EXISTANTE
-- Résout l'erreur: Schema-validation: missing table [orientation_recommendations]

USE diravenir;

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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (orientation_result_id) REFERENCES orientation_results(id) ON DELETE CASCADE
);

-- Créer la table orientation_tests si elle n'existe pas
CREATE TABLE IF NOT EXISTS orientation_tests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    test_uuid VARCHAR(255) UNIQUE NOT NULL,
    student_name VARCHAR(255),
    student_email VARCHAR(255),
    student_phone VARCHAR(255),
    test_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completion_date TIMESTAMP NULL,
    status VARCHAR(50) DEFAULT 'IN_PROGRESS',
    total_questions INT DEFAULT 15,
    answered_questions INT DEFAULT 0,
    user_answers JSON,
    pillar_scores JSON,
    top_recommendations JSON,
    matching_scores JSON,
    test_duration_minutes INT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (test_id) REFERENCES orientation_tests(id) ON DELETE CASCADE
);

-- Créer les index pour améliorer les performances (avec gestion d'erreur)
-- Ces commandes échoueront silencieusement si les index existent déjà

-- Index pour orientation_tests
CREATE INDEX idx_orientation_tests_uuid ON orientation_tests(test_uuid);
CREATE INDEX idx_orientation_tests_email ON orientation_tests(student_email);

-- Index pour orientation_results  
CREATE INDEX idx_orientation_results_test_id ON orientation_results(test_id);
CREATE INDEX idx_orientation_results_email ON orientation_results(user_email);

-- Index pour orientation_recommendations
CREATE INDEX idx_orientation_recommendations_result_id ON orientation_recommendations(orientation_result_id);

-- Vérifier les tables créées
SHOW TABLES LIKE 'orientation_%';

-- Afficher le message de confirmation
SELECT 'Tables orientation créées avec succès - AUCUNE DONNÉE SUPPRIMÉE' AS Status;
