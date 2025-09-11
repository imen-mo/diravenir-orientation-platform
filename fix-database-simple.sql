-- Script de correction simple pour la base de données
-- Résout l'erreur: Schema-validation: missing column [answer_text] in table [orientation_answers]

USE diravenir;

-- Supprimer la table orientation_answers si elle existe et la recréer avec la bonne structure
DROP TABLE IF EXISTS orientation_answers;

-- Créer la table orientation_answers avec la structure complète attendue par l'entité JPA
CREATE TABLE orientation_answers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    orientation_test_id BIGINT NOT NULL,
    question_number INT NOT NULL,
    question_text TEXT,
    answer_value VARCHAR(255) NOT NULL,
    answer_text TEXT,
    answered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (orientation_test_id) REFERENCES orientation_tests(id) ON DELETE CASCADE
);

-- Vérifier la structure
DESCRIBE orientation_answers;

-- Afficher toutes les tables orientation
SHOW TABLES LIKE 'orientation_%';
