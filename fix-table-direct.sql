-- Script direct pour corriger la table orientation_answers
-- Cette approche supprime et recrée la table avec la bonne structure

USE diravenir;

-- Supprimer la table existante (ATTENTION: cela supprimera toutes les données)
DROP TABLE IF EXISTS orientation_answers;

-- Recréer la table avec la structure complète attendue par l'entité JPA
CREATE TABLE orientation_answers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    orientation_test_id BIGINT NOT NULL,
    question_number INT NOT NULL,
    question_text TEXT,
    answer_value VARCHAR(255) NOT NULL,
    answer_text TEXT,
    answered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Vérifier la structure créée
DESCRIBE orientation_answers;

-- Afficher le message de confirmation
SELECT 'Table orientation_answers créée avec succès avec toutes les colonnes requises' AS Status;
