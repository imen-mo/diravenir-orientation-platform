-- Script simple de correction pour la table orientation_answers
-- Résout l'erreur: Schema-validation: missing column [answer_text] in table [orientation_answers]

USE diravenir;

-- Créer la table orientation_answers avec la structure complète
-- Cette commande ne fera rien si la table existe déjà avec la même structure
CREATE TABLE IF NOT EXISTS orientation_answers (
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

-- Ajouter les colonnes manquantes une par une
-- Ces commandes échoueront silencieusement si les colonnes existent déjà

-- Ajouter answer_text
ALTER TABLE orientation_answers ADD COLUMN answer_text TEXT;

-- Ajouter question_text  
ALTER TABLE orientation_answers ADD COLUMN question_text TEXT;

-- Ajouter answer_value
ALTER TABLE orientation_answers ADD COLUMN answer_value VARCHAR(255);

-- Vérifier la structure finale
DESCRIBE orientation_answers;
