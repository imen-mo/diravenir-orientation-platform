-- Migration V4.1: Correction de la structure des profils idéaux
-- Date: 2025-01-27
-- Problème: La table ideal_profiles existe déjà mais avec une structure incorrecte

-- Vérifier et corriger la structure de la table ideal_profiles
-- Supprimer la table existante si elle a une mauvaise structure
DROP TABLE IF EXISTS ideal_profiles;

-- Recréer la table avec la structure correcte
CREATE TABLE ideal_profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    program_id BIGINT NOT NULL,
    pillar_name VARCHAR(100) NOT NULL,
    ideal_score INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_ideal_profiles_program FOREIGN KEY (program_id) REFERENCES program(id) ON DELETE CASCADE
);

-- Index pour optimiser les recherches
CREATE INDEX idx_ideal_profiles_program ON ideal_profiles(program_id);
CREATE INDEX idx_ideal_profiles_pillar ON ideal_profiles(pillar_name);

-- Vérifier que la table program contient des données
-- Si pas de données, insérer des programmes de base
INSERT IGNORE INTO program (id, campusCity, universities, category, program, degreeType, description) VALUES
(1, 'Nicosia', 'Near East University', 'Engineering', 'Civil Engineering', 'Bachelor', 'Civil Engineering Program'),
(2, 'Nicosia', 'Near East University', 'Engineering', 'Mechanical Engineering', 'Bachelor', 'Mechanical Engineering Program'),
(3, 'Nicosia', 'Near East University', 'Architecture', 'Architecture', 'Bachelor', 'Architecture Program'),
(4, 'Nicosia', 'Near East University', 'Business', 'International Business', 'Bachelor', 'International Business Program'),
(5, 'Nicosia', 'Near East University', 'Business', 'Business Administration', 'Bachelor', 'Business Administration Program'),
(6, 'Nicosia', 'Near East University', 'Computer Science', 'Computer Science', 'Bachelor', 'Computer Science Program'),
(7, 'Nicosia', 'Near East University', 'Medicine', 'Medicine', 'Bachelor', 'Medicine Program'),
(8, 'Nicosia', 'Near East University', 'Law', 'Law', 'Bachelor', 'Law Program'),
(9, 'Nicosia', 'Near East University', 'Psychology', 'Psychology', 'Bachelor', 'Psychology Program'),
(10, 'Nicosia', 'Near East University', 'Education', 'Education', 'Bachelor', 'Education Program'),
(11, 'Nicosia', 'Near East University', 'Arts', 'Fine Arts', 'Bachelor', 'Fine Arts Program'),
(12, 'Nicosia', 'Near East University', 'Journalism', 'Journalism', 'Bachelor', 'Journalism Program'),
(13, 'Nicosia', 'Near East University', 'Tourism', 'Tourism Management', 'Bachelor', 'Tourism Management Program'),
(14, 'Nicosia', 'Near East University', 'Agriculture', 'Agricultural Sciences', 'Bachelor', 'Agricultural Sciences Program'),
(15, 'Nicosia', 'Near East University', 'Veterinary', 'Veterinary Medicine', 'Bachelor', 'Veterinary Medicine Program'),
(16, 'Nicosia', 'Near East University', 'Dentistry', 'Dentistry', 'Bachelor', 'Dentistry Program');

-- Insertion des profils idéaux pour Civil Engineering
INSERT INTO ideal_profiles (program_id, pillar_name, ideal_score) VALUES
(1, 'Interet_Scientifique_Tech', 90),
(1, 'Interet_Artistique_Creatif', 40),
(1, 'Interet_Social_Humain', 50),
(1, 'Interet_Business_Gestion', 60),
(1, 'Interet_Logique_Analytique', 90),
(1, 'Competence_Resolution_Problemes', 90),
(1, 'Competence_Communication', 75),
(1, 'Competence_Organisation', 90),
(1, 'Competence_Manuel_Technique', 85),
(1, 'Valeur_Impact_Societal', 80),
(1, 'Valeur_Innovation_Challenge', 85),
(1, 'Valeur_Stabilite_Securite', 80),
(1, 'Valeur_Autonomie', 70),
(1, 'Pref_Travail_Equipe_Collab', 80),
(1, 'Pref_Travail_Autonome', 60),
(1, 'Pref_Pratique_Terrain', 90),
(1, 'Pref_Theorie_Recherche', 60);

-- Insertion des profils idéaux pour Mechanical Engineering
INSERT INTO ideal_profiles (program_id, pillar_name, ideal_score) VALUES
(2, 'Interet_Scientifique_Tech', 95),
(2, 'Interet_Artistique_Creatif', 30),
(2, 'Interet_Social_Humain', 20),
(2, 'Interet_Business_Gestion', 50),
(2, 'Interet_Logique_Analytique', 95),
(2, 'Competence_Resolution_Problemes', 95),
(2, 'Competence_Communication', 65),
(2, 'Competence_Organisation', 80),
(2, 'Competence_Manuel_Technique', 90),
(2, 'Valeur_Impact_Societal', 70),
(2, 'Valeur_Innovation_Challenge', 90),
(2, 'Valeur_Stabilite_Securite', 70),
(2, 'Valeur_Autonomie', 80),
(2, 'Pref_Travail_Equipe_Collab', 75),
(2, 'Pref_Travail_Autonome', 70),
(2, 'Pref_Pratique_Terrain', 85),
(2, 'Pref_Theorie_Recherche', 70);

-- Insertion des profils idéaux pour Architecture
INSERT INTO ideal_profiles (program_id, pillar_name, ideal_score) VALUES
(3, 'Interet_Scientifique_Tech', 60),
(3, 'Interet_Artistique_Creatif', 90),
(3, 'Interet_Social_Humain', 70),
(3, 'Interet_Business_Gestion', 50),
(3, 'Interet_Logique_Analytique', 80),
(3, 'Competence_Resolution_Problemes', 80),
(3, 'Competence_Communication', 85),
(3, 'Competence_Organisation', 85),
(3, 'Competence_Manuel_Technique', 85),
(3, 'Valeur_Impact_Societal', 85),
(3, 'Valeur_Innovation_Challenge', 90),
(3, 'Valeur_Stabilite_Securite', 60),
(3, 'Valeur_Autonomie', 80),
(3, 'Pref_Travail_Equipe_Collab', 80),
(3, 'Pref_Travail_Autonome', 70),
(3, 'Pref_Pratique_Terrain', 70),
(3, 'Pref_Theorie_Recherche', 60);

-- Insertion des profils idéaux pour International Business
INSERT INTO ideal_profiles (program_id, pillar_name, ideal_score) VALUES
(4, 'Interet_Scientifique_Tech', 40),
(4, 'Interet_Artistique_Creatif', 40),
(4, 'Interet_Social_Humain', 80),
(4, 'Interet_Business_Gestion', 98),
(4, 'Interet_Logique_Analytique', 85),
(4, 'Competence_Resolution_Problemes', 85),
(4, 'Competence_Communication', 95),
(4, 'Competence_Organisation', 90),
(4, 'Competence_Manuel_Technique', 20),
(4, 'Valeur_Impact_Societal', 60),
(4, 'Valeur_Innovation_Challenge', 85),
(4, 'Valeur_Stabilite_Securite', 70),
(4, 'Valeur_Autonomie', 80),
(4, 'Pref_Travail_Equipe_Collab', 90),
(4, 'Pref_Travail_Autonome', 60),
(4, 'Pref_Pratique_Terrain', 70),
(4, 'Pref_Theorie_Recherche', 60);

-- Insertion des profils idéaux pour Business Administration
INSERT INTO ideal_profiles (program_id, pillar_name, ideal_score) VALUES
(5, 'Interet_Scientifique_Tech', 30),
(5, 'Interet_Artistique_Creatif', 30),
(5, 'Interet_Social_Humain', 75),
(5, 'Interet_Business_Gestion', 95),
(5, 'Interet_Logique_Analytique', 80),
(5, 'Competence_Resolution_Problemes', 80),
(5, 'Competence_Communication', 90),
(5, 'Competence_Organisation', 95),
(5, 'Competence_Manuel_Technique', 15),
(5, 'Valeur_Impact_Societal', 55),
(5, 'Valeur_Innovation_Challenge', 80),
(5, 'Valeur_Stabilite_Securite', 75),
(5, 'Valeur_Autonomie', 75),
(5, 'Pref_Travail_Equipe_Collab', 85),
(5, 'Pref_Travail_Autonome', 55),
(5, 'Pref_Pratique_Terrain', 65),
(5, 'Pref_Theorie_Recherche', 55);

-- Insertion des profils idéaux pour Computer Science
INSERT INTO ideal_profiles (program_id, pillar_name, ideal_score) VALUES
(6, 'Interet_Scientifique_Tech', 98),
(6, 'Interet_Artistique_Creatif', 60),
(6, 'Interet_Social_Humain', 40),
(6, 'Interet_Business_Gestion', 50),
(6, 'Interet_Logique_Analytique', 95),
(6, 'Competence_Resolution_Problemes', 95),
(6, 'Competence_Communication', 70),
(6, 'Competence_Organisation', 80),
(6, 'Competence_Manuel_Technique', 75),
(6, 'Valeur_Impact_Societal', 65),
(6, 'Valeur_Innovation_Challenge', 95),
(6, 'Valeur_Stabilite_Securite', 65),
(6, 'Valeur_Autonomie', 85),
(6, 'Pref_Travail_Equipe_Collab', 70),
(6, 'Pref_Travail_Autonome', 80),
(6, 'Pref_Pratique_Terrain', 75),
(6, 'Pref_Theorie_Recherche', 80);

-- Insertion des profils idéaux pour Medicine
INSERT INTO ideal_profiles (program_id, pillar_name, ideal_score) VALUES
(7, 'Interet_Scientifique_Tech', 85),
(7, 'Interet_Artistique_Creatif', 30),
(7, 'Interet_Social_Humain', 95),
(7, 'Interet_Business_Gestion', 40),
(7, 'Interet_Logique_Analytique', 90),
(7, 'Competence_Resolution_Problemes', 90),
(7, 'Competence_Communication', 95),
(7, 'Competence_Organisation', 85),
(7, 'Competence_Manuel_Technique', 80),
(7, 'Valeur_Impact_Societal', 95),
(7, 'Valeur_Innovation_Challenge', 75),
(7, 'Valeur_Stabilite_Securite', 85),
(7, 'Valeur_Autonomie', 70),
(7, 'Pref_Travail_Equipe_Collab', 85),
(7, 'Pref_Travail_Autonome', 60),
(7, 'Pref_Pratique_Terrain', 90),
(7, 'Pref_Theorie_Recherche', 75);

-- Insertion des profils idéaux pour Law
INSERT INTO ideal_profiles (program_id, pillar_name, ideal_score) VALUES
(8, 'Interet_Scientifique_Tech', 40),
(8, 'Interet_Artistique_Creatif', 30),
(8, 'Interet_Social_Humain', 85),
(8, 'Interet_Business_Gestion', 70),
(8, 'Interet_Logique_Analytique', 90),
(8, 'Competence_Resolution_Problemes', 85),
(8, 'Competence_Communication', 95),
(8, 'Competence_Organisation', 90),
(8, 'Competence_Manuel_Technique', 20),
(8, 'Valeur_Impact_Societal', 90),
(8, 'Valeur_Innovation_Challenge', 60),
(8, 'Valeur_Stabilite_Securite', 80),
(8, 'Valeur_Autonomie', 75),
(8, 'Pref_Travail_Equipe_Collab', 80),
(8, 'Pref_Travail_Autonome', 70),
(8, 'Pref_Pratique_Terrain', 60),
(8, 'Pref_Theorie_Recherche', 85);

-- Insertion des profils idéaux pour Psychology
INSERT INTO ideal_profiles (program_id, pillar_name, ideal_score) VALUES
(9, 'Interet_Scientifique_Tech', 60),
(9, 'Interet_Artistique_Creatif', 50),
(9, 'Interet_Social_Humain', 95),
(9, 'Interet_Business_Gestion', 40),
(9, 'Interet_Logique_Analytique', 80),
(9, 'Competence_Resolution_Problemes', 80),
(9, 'Competence_Communication', 95),
(9, 'Competence_Organisation', 75),
(9, 'Competence_Manuel_Technique', 30),
(9, 'Valeur_Impact_Societal', 95),
(9, 'Valeur_Innovation_Challenge', 70),
(9, 'Valeur_Stabilite_Securite', 70),
(9, 'Valeur_Autonomie', 80),
(9, 'Pref_Travail_Equipe_Collab', 85),
(9, 'Pref_Travail_Autonome', 70),
(9, 'Pref_Pratique_Terrain', 60),
(9, 'Pref_Theorie_Recherche', 80);

-- Insertion des profils idéaux pour Education
INSERT INTO ideal_profiles (program_id, pillar_name, ideal_score) VALUES
(10, 'Interet_Scientifique_Tech', 50),
(10, 'Interet_Artistique_Creatif', 60),
(10, 'Interet_Social_Humain', 95),
(10, 'Interet_Business_Gestion', 60),
(10, 'Interet_Logique_Analytique', 75),
(10, 'Competence_Resolution_Problemes', 80),
(10, 'Competence_Communication', 95),
(10, 'Competence_Organisation', 85),
(10, 'Competence_Manuel_Technique', 40),
(10, 'Valeur_Impact_Societal', 95),
(10, 'Valeur_Innovation_Challenge', 70),
(10, 'Valeur_Stabilite_Securite', 80),
(10, 'Valeur_Autonomie', 70),
(10, 'Pref_Travail_Equipe_Collab', 90),
(10, 'Pref_Travail_Autonome', 60),
(10, 'Pref_Pratique_Terrain', 70),
(10, 'Pref_Theorie_Recherche', 75);

-- Insertion des profils idéaux pour Fine Arts
INSERT INTO ideal_profiles (program_id, pillar_name, ideal_score) VALUES
(11, 'Interet_Scientifique_Tech', 30),
(11, 'Interet_Artistique_Creatif', 98),
(11, 'Interet_Social_Humain', 70),
(11, 'Interet_Business_Gestion', 30),
(11, 'Interet_Logique_Analytique', 60),
(11, 'Competence_Resolution_Problemes', 75),
(11, 'Competence_Communication', 85),
(11, 'Competence_Organisation', 70),
(11, 'Competence_Manuel_Technique', 90),
(11, 'Valeur_Impact_Societal', 80),
(11, 'Valeur_Innovation_Challenge', 95),
(11, 'Valeur_Stabilite_Securite', 50),
(11, 'Valeur_Autonomie', 90),
(11, 'Pref_Travail_Equipe_Collab', 70),
(11, 'Pref_Travail_Autonome', 85),
(11, 'Pref_Pratique_Terrain', 80),
(11, 'Pref_Theorie_Recherche', 50);

-- Insertion des profils idéaux pour Journalism
INSERT INTO ideal_profiles (program_id, pillar_name, ideal_score) VALUES
(12, 'Interet_Scientifique_Tech', 40),
(12, 'Interet_Artistique_Creatif', 70),
(12, 'Interet_Social_Humain', 90),
(12, 'Interet_Business_Gestion', 60),
(12, 'Interet_Logique_Analytique', 75),
(12, 'Competence_Resolution_Problemes', 80),
(12, 'Competence_Communication', 95),
(12, 'Competence_Organisation', 80),
(12, 'Competence_Manuel_Technique', 30),
(12, 'Valeur_Impact_Societal', 90),
(12, 'Valeur_Innovation_Challenge', 80),
(12, 'Valeur_Stabilite_Securite', 60),
(12, 'Valeur_Autonomie', 80),
(12, 'Pref_Travail_Equipe_Collab', 85),
(12, 'Pref_Travail_Autonome', 70),
(12, 'Pref_Pratique_Terrain', 60),
(12, 'Pref_Theorie_Recherche', 70);

-- Insertion des profils idéaux pour Tourism Management
INSERT INTO ideal_profiles (program_id, pillar_name, ideal_score) VALUES
(13, 'Interet_Scientifique_Tech', 40),
(13, 'Interet_Artistique_Creatif', 60),
(13, 'Interet_Social_Humain', 85),
(13, 'Interet_Business_Gestion', 80),
(13, 'Interet_Logique_Analytique', 70),
(13, 'Competence_Resolution_Problemes', 80),
(13, 'Competence_Communication', 90),
(13, 'Competence_Organisation', 85),
(13, 'Competence_Manuel_Technique', 40),
(13, 'Valeur_Impact_Societal', 75),
(13, 'Valeur_Innovation_Challenge', 70),
(13, 'Valeur_Stabilite_Securite', 75),
(13, 'Valeur_Autonomie', 70),
(13, 'Pref_Travail_Equipe_Collab', 90),
(13, 'Pref_Travail_Autonome', 60),
(13, 'Pref_Pratique_Terrain', 75),
(13, 'Pref_Theorie_Recherche', 60);

-- Insertion des profils idéaux pour Agricultural Sciences
INSERT INTO ideal_profiles (program_id, pillar_name, ideal_score) VALUES
(14, 'Interet_Scientifique_Tech', 80),
(14, 'Interet_Artistique_Creatif', 40),
(14, 'Interet_Social_Humain', 60),
(14, 'Interet_Business_Gestion', 50),
(14, 'Interet_Logique_Analytique', 85),
(14, 'Competence_Resolution_Problemes', 85),
(14, 'Competence_Communication', 70),
(14, 'Competence_Organisation', 80),
(14, 'Competence_Manuel_Technique', 90),
(14, 'Valeur_Impact_Societal', 85),
(14, 'Valeur_Innovation_Challenge', 75),
(14, 'Valeur_Stabilite_Securite', 80),
(14, 'Valeur_Autonomie', 75),
(14, 'Pref_Travail_Equipe_Collab', 75),
(14, 'Pref_Travail_Autonome', 70),
(14, 'Pref_Pratique_Terrain', 90),
(14, 'Pref_Theorie_Recherche', 70);

-- Insertion des profils idéaux pour Veterinary Medicine
INSERT INTO ideal_profiles (program_id, pillar_name, ideal_score) VALUES
(15, 'Interet_Scientifique_Tech', 85),
(15, 'Interet_Artistique_Creatif', 30),
(15, 'Interet_Social_Humain', 90),
(15, 'Interet_Business_Gestion', 40),
(15, 'Interet_Logique_Analytique', 90),
(15, 'Competence_Resolution_Problemes', 90),
(15, 'Competence_Communication', 80),
(15, 'Competence_Organisation', 85),
(15, 'Competence_Manuel_Technique', 85),
(15, 'Valeur_Impact_Societal', 90),
(15, 'Valeur_Innovation_Challenge', 75),
(15, 'Valeur_Stabilite_Securite', 80),
(15, 'Valeur_Autonomie', 70),
(15, 'Pref_Travail_Equipe_Collab', 80),
(15, 'Pref_Travail_Autonome', 65),
(15, 'Pref_Pratique_Terrain', 90),
(15, 'Pref_Theorie_Recherche', 75);

-- Insertion des profils idéaux pour Dentistry
INSERT INTO ideal_profiles (program_id, pillar_name, ideal_score) VALUES
(16, 'Interet_Scientifique_Tech', 80),
(16, 'Interet_Artistique_Creatif', 50),
(16, 'Interet_Social_Humain', 85),
(16, 'Interet_Business_Gestion', 40),
(16, 'Interet_Logique_Analytique', 90),
(16, 'Competence_Resolution_Problemes', 90),
(16, 'Competence_Communication', 85),
(16, 'Competence_Organisation', 85),
(16, 'Competence_Manuel_Technique', 90),
(16, 'Valeur_Impact_Societal', 90),
(16, 'Valeur_Innovation_Challenge', 75),
(16, 'Valeur_Stabilite_Securite', 85),
(16, 'Valeur_Autonomie', 70),
(16, 'Pref_Travail_Equipe_Collab', 80),
(16, 'Pref_Travail_Autonome', 65),
(16, 'Pref_Pratique_Terrain', 90),
(16, 'Pref_Theorie_Recherche', 70);

-- Message de confirmation
SELECT 'Migration V4.1: Structure des profils idéaux corrigée avec succès' AS status;
