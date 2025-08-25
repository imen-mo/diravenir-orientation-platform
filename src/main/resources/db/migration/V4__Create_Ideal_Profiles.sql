-- Migration V4: Création des profils idéaux des majeures selon les spécifications exactes
-- du "Système d'Orientation des Étudiants"

-- Création de la table des profils idéaux si elle n'existe pas
CREATE TABLE IF NOT EXISTS ideal_profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    program_id BIGINT,
    pillar_name VARCHAR(100) NOT NULL,
    ideal_score INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (program_id) REFERENCES program(id) ON DELETE CASCADE
);

-- Index pour optimiser les recherches
CREATE INDEX IF NOT EXISTS idx_ideal_profiles_program ON ideal_profiles(program_id);
CREATE INDEX IF NOT EXISTS idx_ideal_profiles_pillar ON ideal_profiles(pillar_name);

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
(5, 'Interet_Artistique_Creatif', 40),
(5, 'Interet_Social_Humain', 80),
(5, 'Interet_Business_Gestion', 98),
(5, 'Interet_Logique_Analytique', 85),
(5, 'Competence_Resolution_Problemes', 85),
(5, 'Competence_Communication', 95),
(5, 'Competence_Organisation', 98),
(5, 'Competence_Manuel_Technique', 10),
(5, 'Valeur_Impact_Societal', 60),
(5, 'Valeur_Innovation_Challenge', 80),
(5, 'Valeur_Stabilite_Securite', 70),
(5, 'Valeur_Autonomie', 70),
(5, 'Pref_Travail_Equipe_Collab', 95),
(5, 'Pref_Travail_Autonome', 50),
(5, 'Pref_Pratique_Terrain', 60),
(5, 'Pref_Theorie_Recherche', 50);

-- Insertion des profils idéaux pour Computer Science
INSERT INTO ideal_profiles (program_id, pillar_name, ideal_score) VALUES
(6, 'Interet_Scientifique_Tech', 98),
(6, 'Interet_Artistique_Creatif', 40),
(6, 'Interet_Social_Humain', 30),
(6, 'Interet_Business_Gestion', 40),
(6, 'Interet_Logique_Analytique', 98),
(6, 'Competence_Resolution_Problemes', 98),
(6, 'Competence_Communication', 70),
(6, 'Competence_Organisation', 80),
(6, 'Competence_Manuel_Technique', 50),
(6, 'Valeur_Impact_Societal', 60),
(6, 'Valeur_Innovation_Challenge', 95),
(6, 'Valeur_Stabilite_Securite', 70),
(6, 'Valeur_Autonomie', 85),
(6, 'Pref_Travail_Equipe_Collab', 70),
(6, 'Pref_Travail_Autonome', 80),
(6, 'Pref_Pratique_Terrain', 40),
(6, 'Pref_Theorie_Recherche', 80);

-- Insertion des profils idéaux pour Software Engineering
INSERT INTO ideal_profiles (program_id, pillar_name, ideal_score) VALUES
(7, 'Interet_Scientifique_Tech', 95),
(7, 'Interet_Artistique_Creatif', 45),
(7, 'Interet_Social_Humain', 30),
(7, 'Interet_Business_Gestion', 50),
(7, 'Interet_Logique_Analytique', 98),
(7, 'Competence_Resolution_Problemes', 98),
(7, 'Competence_Communication', 80),
(7, 'Competence_Organisation', 90),
(7, 'Competence_Manuel_Technique', 40),
(7, 'Valeur_Impact_Societal', 65),
(7, 'Valeur_Innovation_Challenge', 95),
(7, 'Valeur_Stabilite_Securite', 75),
(7, 'Valeur_Autonomie', 80),
(7, 'Pref_Travail_Equipe_Collab', 85),
(7, 'Pref_Travail_Autonome', 70),
(7, 'Pref_Pratique_Terrain', 50),
(7, 'Pref_Theorie_Recherche', 75);

-- Insertion des profils idéaux pour Artificial Intelligence
INSERT INTO ideal_profiles (program_id, pillar_name, ideal_score) VALUES
(8, 'Interet_Scientifique_Tech', 98),
(8, 'Interet_Artistique_Creatif', 30),
(8, 'Interet_Social_Humain', 20),
(8, 'Interet_Business_Gestion', 50),
(8, 'Interet_Logique_Analytique', 98),
(8, 'Competence_Resolution_Problemes', 98),
(8, 'Competence_Communication', 70),
(8, 'Competence_Organisation', 70),
(8, 'Competence_Manuel_Technique', 30),
(8, 'Valeur_Impact_Societal', 80),
(8, 'Valeur_Innovation_Challenge', 98),
(8, 'Valeur_Stabilite_Securite', 60),
(8, 'Valeur_Autonomie', 90),
(8, 'Pref_Travail_Equipe_Collab', 70),
(8, 'Pref_Travail_Autonome', 90),
(8, 'Pref_Pratique_Terrain', 40),
(8, 'Pref_Theorie_Recherche', 95);

-- Insertion des profils idéaux pour Medicine
INSERT INTO ideal_profiles (program_id, pillar_name, ideal_score) VALUES
(9, 'Interet_Scientifique_Tech', 95),
(9, 'Interet_Artistique_Creatif', 10),
(9, 'Interet_Social_Humain', 98),
(9, 'Interet_Business_Gestion', 20),
(9, 'Interet_Logique_Analytique', 90),
(9, 'Competence_Resolution_Problemes', 95),
(9, 'Competence_Communication', 98),
(9, 'Competence_Organisation', 90),
(9, 'Competence_Manuel_Technique', 75),
(9, 'Valeur_Impact_Societal', 98),
(9, 'Valeur_Innovation_Challenge', 70),
(9, 'Valeur_Stabilite_Securite', 85),
(9, 'Valeur_Autonomie', 60),
(9, 'Pref_Travail_Equipe_Collab', 95),
(9, 'Pref_Travail_Autonome', 50),
(9, 'Pref_Pratique_Terrain', 90),
(9, 'Pref_Theorie_Recherche', 80);

-- Insertion des profils idéaux pour Nursing
INSERT INTO ideal_profiles (program_id, pillar_name, ideal_score) VALUES
(10, 'Interet_Scientifique_Tech', 65),
(10, 'Interet_Artistique_Creatif', 10),
(10, 'Interet_Social_Humain', 98),
(10, 'Interet_Business_Gestion', 20),
(10, 'Interet_Logique_Analytique', 70),
(10, 'Competence_Resolution_Problemes', 80),
(10, 'Competence_Communication', 98),
(10, 'Competence_Organisation', 90),
(10, 'Competence_Manuel_Technique', 70),
(10, 'Valeur_Impact_Societal', 98),
(10, 'Valeur_Innovation_Challenge', 60),
(10, 'Valeur_Stabilite_Securite', 80),
(10, 'Valeur_Autonomie', 50),
(10, 'Pref_Travail_Equipe_Collab', 98),
(10, 'Pref_Travail_Autonome', 40),
(10, 'Pref_Pratique_Terrain', 90),
(10, 'Pref_Theorie_Recherche', 60);

-- Insertion des profils idéaux pour Public Relations
INSERT INTO ideal_profiles (program_id, pillar_name, ideal_score) VALUES
(11, 'Interet_Scientifique_Tech', 10),
(11, 'Interet_Artistique_Creatif', 80),
(11, 'Interet_Social_Humain', 98),
(11, 'Interet_Business_Gestion', 90),
(11, 'Interet_Logique_Analytique', 60),
(11, 'Competence_Resolution_Problemes', 75),
(11, 'Competence_Communication', 98),
(11, 'Competence_Organisation', 90),
(11, 'Competence_Manuel_Technique', 10),
(11, 'Valeur_Impact_Societal', 80),
(11, 'Valeur_Innovation_Challenge', 85),
(11, 'Valeur_Stabilite_Securite', 60),
(11, 'Valeur_Autonomie', 70),
(11, 'Pref_Travail_Equipe_Collab', 98),
(11, 'Pref_Travail_Autonome', 50),
(11, 'Pref_Pratique_Terrain', 60),
(11, 'Pref_Theorie_Recherche', 40);

-- Insertion des profils idéaux pour Data Science
INSERT INTO ideal_profiles (program_id, pillar_name, ideal_score) VALUES
(12, 'Interet_Scientifique_Tech', 98),
(12, 'Interet_Artistique_Creatif', 20),
(12, 'Interet_Social_Humain', 30),
(12, 'Interet_Business_Gestion', 70),
(12, 'Interet_Logique_Analytique', 98),
(12, 'Competence_Resolution_Problemes', 98),
(12, 'Competence_Communication', 70),
(12, 'Competence_Organisation', 80),
(12, 'Competence_Manuel_Technique', 30),
(12, 'Valeur_Impact_Societal', 70),
(12, 'Valeur_Innovation_Challenge', 95),
(12, 'Valeur_Stabilite_Securite', 75),
(12, 'Valeur_Autonomie', 85),
(12, 'Pref_Travail_Equipe_Collab', 80),
(12, 'Pref_Travail_Autonome', 70),
(12, 'Pref_Pratique_Terrain', 40),
(12, 'Pref_Theorie_Recherche', 90);

-- Insertion des profils idéaux pour Law
INSERT INTO ideal_profiles (program_id, pillar_name, ideal_score) VALUES
(13, 'Interet_Scientifique_Tech', 30),
(13, 'Interet_Artistique_Creatif', 30),
(13, 'Interet_Social_Humain', 80),
(13, 'Interet_Business_Gestion', 80),
(13, 'Interet_Logique_Analytique', 95),
(13, 'Competence_Resolution_Problemes', 90),
(13, 'Competence_Communication', 95),
(13, 'Competence_Organisation', 90),
(13, 'Competence_Manuel_Technique', 10),
(13, 'Valeur_Impact_Societal', 90),
(13, 'Valeur_Innovation_Challenge', 60),
(13, 'Valeur_Stabilite_Securite', 80),
(13, 'Valeur_Autonomie', 70),
(13, 'Pref_Travail_Equipe_Collab', 80),
(13, 'Pref_Travail_Autonome', 70),
(13, 'Pref_Pratique_Terrain', 50),
(13, 'Pref_Theorie_Recherche', 90);

-- Insertion des profils idéaux pour International Politics
INSERT INTO ideal_profiles (program_id, pillar_name, ideal_score) VALUES
(14, 'Interet_Scientifique_Tech', 20),
(14, 'Interet_Artistique_Creatif', 20),
(14, 'Interet_Social_Humain', 90),
(14, 'Interet_Business_Gestion', 70),
(14, 'Interet_Logique_Analytique', 85),
(14, 'Competence_Resolution_Problemes', 80),
(14, 'Competence_Communication', 95),
(14, 'Competence_Organisation', 80),
(14, 'Competence_Manuel_Technique', 10),
(14, 'Valeur_Impact_Societal', 95),
(14, 'Valeur_Innovation_Challenge', 70),
(14, 'Valeur_Stabilite_Securite', 60),
(14, 'Valeur_Autonomie', 70),
(14, 'Pref_Travail_Equipe_Collab', 90),
(14, 'Pref_Travail_Autonome', 60),
(14, 'Pref_Pratique_Terrain', 50),
(14, 'Pref_Theorie_Recherche', 85);

-- Insertion des profils idéaux pour Psychology
INSERT INTO ideal_profiles (program_id, pillar_name, ideal_score) VALUES
(15, 'Interet_Scientifique_Tech', 50),
(15, 'Interet_Artistique_Creatif', 40),
(15, 'Interet_Social_Humain', 98),
(15, 'Interet_Business_Gestion', 30),
(15, 'Interet_Logique_Analytique', 80),
(15, 'Competence_Resolution_Problemes', 85),
(15, 'Competence_Communication', 98),
(15, 'Competence_Organisation', 70),
(15, 'Competence_Manuel_Technique', 10),
(15, 'Valeur_Impact_Societal', 95),
(15, 'Valeur_Innovation_Challenge', 70),
(15, 'Valeur_Stabilite_Securite', 60),
(15, 'Valeur_Autonomie', 70),
(15, 'Pref_Travail_Equipe_Collab', 90),
(15, 'Pref_Travail_Autonome', 70),
(15, 'Pref_Pratique_Terrain', 50),
(15, 'Pref_Theorie_Recherche', 90);

-- Insertion des profils idéaux pour English
INSERT INTO ideal_profiles (program_id, pillar_name, ideal_score) VALUES
(16, 'Interet_Scientifique_Tech', 10),
(16, 'Interet_Artistique_Creatif', 90),
(16, 'Interet_Social_Humain', 85),
(16, 'Interet_Business_Gestion', 30),
(16, 'Interet_Logique_Analytique', 80),
(16, 'Competence_Resolution_Problemes', 70),
(16, 'Competence_Communication', 98),
(16, 'Competence_Organisation', 70),
(16, 'Competence_Manuel_Technique', 10),
(16, 'Valeur_Impact_Societal', 75),
(16, 'Valeur_Innovation_Challenge', 70),
(16, 'Valeur_Stabilite_Securite', 50),
(16, 'Valeur_Autonomie', 85),
(16, 'Pref_Travail_Equipe_Collab', 70),
(16, 'Pref_Travail_Autonome', 85),
(16, 'Pref_Pratique_Terrain', 30),
(16, 'Pref_Theorie_Recherche', 90);

-- Message de confirmation
SELECT 'Migration V4: Profils idéaux des majeures créés avec succès' AS status;
