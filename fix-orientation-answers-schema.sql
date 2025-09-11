-- Script de correction pour la table orientation_answers
-- Résout l'erreur: Schema-validation: missing column [answer_text] in table [orientation_answers]

USE diravenir;

-- Vérifier si la table orientation_answers existe
-- Si elle n'existe pas, la créer avec la structure complète
CREATE TABLE IF NOT EXISTS orientation_answers (
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

-- Ajouter les colonnes manquantes avec gestion d'erreur
-- Utiliser des procédures stockées pour éviter les erreurs si les colonnes existent déjà

DELIMITER $$

-- Procédure pour ajouter answer_text si elle n'existe pas
DROP PROCEDURE IF EXISTS AddColumnIfNotExists$$
CREATE PROCEDURE AddColumnIfNotExists()
BEGIN
    DECLARE column_exists INT DEFAULT 0;
    
    -- Vérifier si answer_text existe
    SELECT COUNT(*) INTO column_exists 
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_SCHEMA = 'diravenir' 
    AND TABLE_NAME = 'orientation_answers' 
    AND COLUMN_NAME = 'answer_text';
    
    IF column_exists = 0 THEN
        ALTER TABLE orientation_answers ADD COLUMN answer_text TEXT;
    END IF;
    
    -- Vérifier si question_text existe
    SELECT COUNT(*) INTO column_exists 
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_SCHEMA = 'diravenir' 
    AND TABLE_NAME = 'orientation_answers' 
    AND COLUMN_NAME = 'question_text';
    
    IF column_exists = 0 THEN
        ALTER TABLE orientation_answers ADD COLUMN question_text TEXT;
    END IF;
    
    -- Vérifier si answer_value existe
    SELECT COUNT(*) INTO column_exists 
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_SCHEMA = 'diravenir' 
    AND TABLE_NAME = 'orientation_answers' 
    AND COLUMN_NAME = 'answer_value';
    
    IF column_exists = 0 THEN
        ALTER TABLE orientation_answers ADD COLUMN answer_value VARCHAR(255);
    END IF;
END$$

DELIMITER ;

-- Exécuter la procédure
CALL AddColumnIfNotExists();

-- Supprimer la procédure temporaire
DROP PROCEDURE IF EXISTS AddColumnIfNotExists;

-- Vérifier la structure de la table après modification
DESCRIBE orientation_answers;

-- Afficher les tables orientation existantes
SHOW TABLES LIKE 'orientation_%';
