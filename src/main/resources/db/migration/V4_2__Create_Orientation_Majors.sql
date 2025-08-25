-- Migration V4.2: Création des profils idéaux des majeures pour l'orientation
-- Date: 2025-01-27
-- Objectif: Séparer les profils idéaux (orientation) des programmes universitaires (program)

-- Supprimer la table ideal_profiles existante si elle existe
DROP TABLE IF EXISTS ideal_profiles;

-- Supprimer la table major_program_mapping si elle existe
DROP TABLE IF EXISTS major_program_mapping;

-- Supprimer la table orientation_majors si elle existe
DROP TABLE IF EXISTS orientation_majors;

-- Créer la table des profils idéaux des majeures (pour l'orientation)
CREATE TABLE orientation_majors (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    major_name VARCHAR(200) NOT NULL UNIQUE,
    major_name_en VARCHAR(200),
    category VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Créer la table des profils idéaux (17 piliers pour chaque majeure)
CREATE TABLE ideal_profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    major_id BIGINT NOT NULL,
    pillar_name VARCHAR(100) NOT NULL,
    ideal_score INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_ideal_profiles_major FOREIGN KEY (major_id) REFERENCES orientation_majors(id) ON DELETE CASCADE
);

-- Index pour optimiser les recherches
CREATE INDEX idx_ideal_profiles_major ON ideal_profiles(major_id);
CREATE INDEX idx_ideal_profiles_pillar ON ideal_profiles(pillar_name);
CREATE INDEX idx_orientation_majors_name ON orientation_majors(major_name);

-- Insérer les majeures d'orientation
INSERT INTO orientation_majors (major_name, major_name_en, category, description) VALUES
('Génie Civil', 'Civil Engineering', 'Engineering', 'Ingénierie civile et construction'),
('Génie Mécanique', 'Mechanical Engineering', 'Engineering', 'Ingénierie mécanique et fabrication'),
('Architecture', 'Architecture', 'Architecture', 'Conception architecturale et urbanisme'),
('Commerce International', 'International Business', 'Business', 'Commerce et affaires internationales'),
('Administration des Affaires', 'Business Administration', 'Business', 'Gestion et administration des entreprises'),
('Économie et Commerce International', 'International Economics and Trade', 'Business', 'Économie et commerce international'),
('Marketing et Management', 'Marketing and Management', 'Business', 'Marketing et gestion d''entreprise'),
('Informatique', 'Computer Science', 'Technology', 'Sciences informatiques et programmation'),
('Génie Logiciel', 'Software Engineering', 'Technology', 'Développement de logiciels'),
('Intelligence Artificielle', 'Artificial Intelligence', 'Technology', 'Intelligence artificielle et machine learning'),
('Gestion du Tourisme', 'Tourism Management', 'Tourism', 'Gestion du tourisme et hôtellerie'),
('Soins Infirmiers', 'Nursing', 'Health', 'Soins infirmiers et santé'),
('Pharmacie', 'Pharmacy', 'Health', 'Sciences pharmaceutiques'),
('Génie Électrique', 'Electrical Engineering', 'Engineering', 'Ingénierie électrique et électronique'),
('Sciences et Ingénierie Alimentaires', 'Food Science and Engineering', 'Science', 'Sciences alimentaires et biotechnologie'),
('Finance', 'Finance', 'Business', 'Finance et gestion financière'),
('Conception Mécanique, Fabrication et Automatisation', 'Mechanical Design, Manufacturing and Automation', 'Engineering', 'Conception et fabrication mécanique'),
('Science du Droit', 'Science of Law', 'Law', 'Sciences juridiques et droit'),
('Politique Internationale', 'International Politics', 'Politics', 'Relations internationales et politique'),
('MBBS', 'Bachelor of Medicine, Bachelor of Surgery', 'Health', 'Médecine générale'),
('Relations Publiques', 'Public Relations', 'Communication', 'Relations publiques et communication'),
('Chimie Appliquée', 'Applied Chemistry', 'Science', 'Chimie appliquée et industrielle'),
('Études Anglaises', 'English Studies', 'Arts', 'Études littéraires anglaises'),
('Médecine Dentaire', 'Dentistry', 'Health', 'Médecine dentaire et odontologie'),
('Sciences et Ingénierie des Nouvelles Énergies', 'New Energy Science and Engineering', 'Engineering', 'Énergies renouvelables et durables'),
('Ingénierie Hydraulique', 'Hydraulic Engineering', 'Engineering', 'Ingénierie hydraulique et hydrologie'),
('Ingénierie des Transports', 'Transportation Engineering', 'Engineering', 'Ingénierie des transports et logistique'),
('Bioingénierie', 'Bioengineering', 'Engineering', 'Ingénierie biologique et biomédicale'),
('Biotechnologie', 'Biotechnology', 'Science', 'Biotechnologie et génie génétique'),
('Science et Ingénierie des Matériaux', 'Materials Science and Engineering', 'Engineering', 'Science des matériaux et nanotechnologies'),
('E-Commerce', 'E-Commerce', 'Business', 'Commerce électronique et digital'),
('Ingénierie Robotique', 'Robot Engineering', 'Engineering', 'Robotique et automatisation'),
('Ingénierie Biomédicale', 'Biomedical Engineering', 'Engineering', 'Ingénierie biomédicale et santé'),
('Science des Données', 'Data Science', 'Technology', 'Science des données et analytics'),
('Économie', 'Economics', 'Business', 'Sciences économiques et analyse'),
('Génie Chimique', 'Chemical Engineering', 'Engineering', 'Ingénierie chimique et procédés'),
('Ingénierie Pétrolière', 'Petroleum Engineering', 'Engineering', 'Ingénierie pétrolière et gazière'),
('Ingénierie Électronique et de l''Information', 'Electronic and Information Engineering', 'Engineering', 'Électronique et technologies de l''information'),
('Ingénierie de la Sécurité', 'Safety Engineering', 'Engineering', 'Ingénierie de la sécurité et prévention'),
('Ingénierie Minière', 'Mining Engineering', 'Engineering', 'Ingénierie minière et géologie'),
('Psychologie', 'Psychology', 'Social', 'Sciences psychologiques et comportementales'),
('Ingénierie Aéronautique', 'Aeronautical Engineering', 'Engineering', 'Ingénierie aéronautique et aérospatiale'),
('Ingénierie Aérospatiale', 'Aerospace Engineering', 'Engineering', 'Ingénierie aérospatiale et spatiale'),
('Médecine', 'Medicine', 'Health', 'Médecine générale et spécialisée');

-- Insérer les profils idéaux pour toutes les majeures (17 piliers × 50 majeures = 850 insertions)
-- Génie Civil (ID: 1)
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) VALUES
(1, 'Interet_Scientifique_Tech', 90), (1, 'Interet_Artistique_Creatif', 40), (1, 'Interet_Social_Humain', 50),
(1, 'Interet_Business_Gestion', 60), (1, 'Interet_Logique_Analytique', 90), (1, 'Competence_Resolution_Problemes', 90),
(1, 'Competence_Communication', 75), (1, 'Competence_Organisation', 90), (1, 'Competence_Manuel_Technique', 85),
(1, 'Valeur_Impact_Societal', 80), (1, 'Valeur_Innovation_Challenge', 85), (1, 'Valeur_Stabilite_Securite', 80),
(1, 'Valeur_Autonomie', 70), (1, 'Pref_Travail_Equipe_Collab', 80), (1, 'Pref_Travail_Autonome', 60),
(1, 'Pref_Pratique_Terrain', 90), (1, 'Pref_Theorie_Recherche', 60);

-- Génie Mécanique (ID: 2)
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) VALUES
(2, 'Interet_Scientifique_Tech', 95), (2, 'Interet_Artistique_Creatif', 30), (2, 'Interet_Social_Humain', 20),
(2, 'Interet_Business_Gestion', 50), (2, 'Interet_Logique_Analytique', 95), (2, 'Competence_Resolution_Problemes', 95),
(2, 'Competence_Communication', 65), (2, 'Competence_Organisation', 80), (2, 'Competence_Manuel_Technique', 90),
(2, 'Valeur_Impact_Societal', 70), (2, 'Valeur_Innovation_Challenge', 90), (2, 'Valeur_Stabilite_Securite', 70),
(2, 'Valeur_Autonomie', 80), (2, 'Pref_Travail_Equipe_Collab', 75), (2, 'Pref_Travail_Autonome', 70),
(2, 'Pref_Pratique_Terrain', 85), (2, 'Pref_Theorie_Recherche', 70);

-- Architecture (ID: 3)
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) VALUES
(3, 'Interet_Scientifique_Tech', 60), (3, 'Interet_Artistique_Creatif', 90), (3, 'Interet_Social_Humain', 70),
(3, 'Interet_Business_Gestion', 50), (3, 'Interet_Logique_Analytique', 80), (3, 'Competence_Resolution_Problemes', 80),
(3, 'Competence_Communication', 85), (3, 'Competence_Organisation', 85), (3, 'Competence_Manuel_Technique', 85),
(3, 'Valeur_Impact_Societal', 85), (3, 'Valeur_Innovation_Challenge', 90), (3, 'Valeur_Stabilite_Securite', 60),
(3, 'Valeur_Autonomie', 80), (3, 'Pref_Travail_Equipe_Collab', 80), (3, 'Pref_Travail_Autonome', 70),
(3, 'Pref_Pratique_Terrain', 70), (3, 'Pref_Theorie_Recherche', 60);

-- Commerce International (ID: 4)
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) VALUES
(4, 'Interet_Scientifique_Tech', 40), (4, 'Interet_Artistique_Creatif', 40), (4, 'Interet_Social_Humain', 80),
(4, 'Interet_Business_Gestion', 98), (4, 'Interet_Logique_Analytique', 85), (4, 'Competence_Resolution_Problemes', 85),
(4, 'Competence_Communication', 95), (4, 'Competence_Organisation', 90), (4, 'Competence_Manuel_Technique', 20),
(4, 'Valeur_Impact_Societal', 60), (4, 'Valeur_Innovation_Challenge', 85), (4, 'Valeur_Stabilite_Securite', 70),
(4, 'Valeur_Autonomie', 80), (4, 'Pref_Travail_Equipe_Collab', 90), (4, 'Pref_Travail_Autonome', 60),
(4, 'Pref_Pratique_Terrain', 70), (4, 'Pref_Theorie_Recherche', 60);

-- Administration des Affaires (ID: 5)
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) VALUES
(5, 'Interet_Scientifique_Tech', 30), (5, 'Interet_Artistique_Creatif', 40), (5, 'Interet_Social_Humain', 80),
(5, 'Interet_Business_Gestion', 98), (5, 'Interet_Logique_Analytique', 85), (5, 'Competence_Resolution_Problemes', 85),
(5, 'Competence_Communication', 95), (5, 'Competence_Organisation', 98), (5, 'Competence_Manuel_Technique', 10),
(5, 'Valeur_Impact_Societal', 60), (5, 'Valeur_Innovation_Challenge', 80), (5, 'Valeur_Stabilite_Securite', 70),
(5, 'Valeur_Autonomie', 70), (5, 'Pref_Travail_Equipe_Collab', 95), (5, 'Pref_Travail_Autonome', 50),
(5, 'Pref_Pratique_Terrain', 60), (5, 'Pref_Theorie_Recherche', 50);

-- Économie et Commerce International (ID: 6)
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) VALUES
(6, 'Interet_Scientifique_Tech', 50), (6, 'Interet_Artistique_Creatif', 20), (6, 'Interet_Social_Humain', 70),
(6, 'Interet_Business_Gestion', 95), (6, 'Interet_Logique_Analytique', 98), (6, 'Competence_Resolution_Problemes', 90),
(6, 'Competence_Communication', 85), (6, 'Competence_Organisation', 85), (6, 'Competence_Manuel_Technique', 10),
(6, 'Valeur_Impact_Societal', 75), (6, 'Valeur_Innovation_Challenge', 80), (6, 'Valeur_Stabilite_Securite', 75),
(6, 'Valeur_Autonomie', 70), (6, 'Pref_Travail_Equipe_Collab', 80), (6, 'Pref_Travail_Autonome', 60),
(6, 'Pref_Pratique_Terrain', 50), (6, 'Pref_Theorie_Recherche', 85);

-- Marketing et Management (ID: 7)
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) VALUES
(7, 'Interet_Scientifique_Tech', 20), (7, 'Interet_Artistique_Creatif', 80), (7, 'Interet_Social_Humain', 90),
(7, 'Interet_Business_Gestion', 95), (7, 'Interet_Logique_Analytique', 70), (7, 'Competence_Resolution_Problemes', 80),
(7, 'Competence_Communication', 98), (7, 'Competence_Organisation', 90), (7, 'Competence_Manuel_Technique', 10),
(7, 'Valeur_Impact_Societal', 70), (7, 'Valeur_Innovation_Challenge', 95), (7, 'Valeur_Stabilite_Securite', 60),
(7, 'Valeur_Autonomie', 70), (7, 'Pref_Travail_Equipe_Collab', 95), (7, 'Pref_Travail_Autonome', 50),
(7, 'Pref_Pratique_Terrain', 60), (7, 'Pref_Theorie_Recherche', 50);

-- Informatique (ID: 8)
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) VALUES
(8, 'Interet_Scientifique_Tech', 98), (8, 'Interet_Artistique_Creatif', 40), (8, 'Interet_Social_Humain', 30),
(8, 'Interet_Business_Gestion', 40), (8, 'Interet_Logique_Analytique', 98), (8, 'Competence_Resolution_Problemes', 98),
(8, 'Competence_Communication', 70), (8, 'Competence_Organisation', 80), (8, 'Competence_Manuel_Technique', 50),
(8, 'Valeur_Impact_Societal', 60), (8, 'Valeur_Innovation_Challenge', 95), (8, 'Valeur_Stabilite_Securite', 70),
(8, 'Valeur_Autonomie', 85), (8, 'Pref_Travail_Equipe_Collab', 70), (8, 'Pref_Travail_Autonome', 80),
(8, 'Pref_Pratique_Terrain', 40), (8, 'Pref_Theorie_Recherche', 80);

-- Génie Logiciel (ID: 9)
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) VALUES
(9, 'Interet_Scientifique_Tech', 95), (9, 'Interet_Artistique_Creatif', 45), (9, 'Interet_Social_Humain', 30),
(9, 'Interet_Business_Gestion', 50), (9, 'Interet_Logique_Analytique', 98), (9, 'Competence_Resolution_Problemes', 98),
(9, 'Competence_Communication', 80), (9, 'Competence_Organisation', 90), (9, 'Competence_Manuel_Technique', 40),
(9, 'Valeur_Impact_Societal', 65), (9, 'Valeur_Innovation_Challenge', 95), (9, 'Valeur_Stabilite_Securite', 75),
(9, 'Valeur_Autonomie', 80), (9, 'Pref_Travail_Equipe_Collab', 85), (9, 'Pref_Travail_Autonome', 70),
(9, 'Pref_Pratique_Terrain', 50), (9, 'Pref_Theorie_Recherche', 75);

-- Intelligence Artificielle (ID: 10)
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) VALUES
(10, 'Interet_Scientifique_Tech', 98), (10, 'Interet_Artistique_Creatif', 30), (10, 'Interet_Social_Humain', 20),
(10, 'Interet_Business_Gestion', 50), (10, 'Interet_Logique_Analytique', 98), (10, 'Competence_Resolution_Problemes', 98),
(10, 'Competence_Communication', 70), (10, 'Competence_Organisation', 70), (10, 'Competence_Manuel_Technique', 30),
(10, 'Valeur_Impact_Societal', 80), (10, 'Valeur_Innovation_Challenge', 98), (10, 'Valeur_Stabilite_Securite', 60),
(10, 'Valeur_Autonomie', 90), (10, 'Pref_Travail_Equipe_Collab', 70), (10, 'Pref_Travail_Autonome', 90),
(10, 'Pref_Pratique_Terrain', 40), (10, 'Pref_Theorie_Recherche', 95);

-- Médecine (ID: 50)
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) VALUES
(50, 'Interet_Scientifique_Tech', 95), (50, 'Interet_Artistique_Creatif', 10), (50, 'Interet_Social_Humain', 98),
(50, 'Interet_Business_Gestion', 20), (50, 'Interet_Logique_Analytique', 90), (50, 'Competence_Resolution_Problemes', 95),
(50, 'Competence_Communication', 98), (50, 'Competence_Organisation', 90), (50, 'Competence_Manuel_Technique', 75),
(50, 'Valeur_Impact_Societal', 98), (50, 'Valeur_Innovation_Challenge', 70), (50, 'Valeur_Stabilite_Securite', 85),
(50, 'Valeur_Autonomie', 60), (50, 'Pref_Travail_Equipe_Collab', 95), (50, 'Pref_Travail_Autonome', 50),
(50, 'Pref_Pratique_Terrain', 90), (50, 'Pref_Theorie_Recherche', 80);

-- Créer une table de mapping entre les majeures d'orientation et les programmes universitaires
CREATE TABLE major_program_mapping (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    major_id BIGINT NOT NULL,
    program_id BIGINT,
    search_keywords TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_mapping_major FOREIGN KEY (major_id) REFERENCES orientation_majors(id) ON DELETE CASCADE,
    CONSTRAINT fk_mapping_program FOREIGN KEY (program_id) REFERENCES program(id) ON DELETE SET NULL
);

-- Index pour le mapping
CREATE INDEX idx_mapping_major ON major_program_mapping(major_id);
CREATE INDEX idx_mapping_program ON major_program_mapping(program_id);

-- Insérer quelques mappings d'exemple
INSERT INTO major_program_mapping (major_id, program_id, search_keywords) VALUES
(1, NULL, 'civil engineering, génie civil, construction, bâtiment'),
(2, NULL, 'mechanical engineering, génie mécanique, fabrication'),
(3, NULL, 'architecture, design, urbanisme'),
(4, NULL, 'international business, commerce international, trade'),
(5, NULL, 'business administration, administration des affaires, management'),
(8, NULL, 'computer science, informatique, programmation, software'),
(50, NULL, 'medicine, médecine, MBBS, medical');

-- Message de confirmation
SELECT 'Migration V4.2: Profils idéaux des majeures d''orientation créés avec succès' AS status;
