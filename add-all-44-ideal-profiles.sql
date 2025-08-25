-- Script pour ajouter TOUS les profils idéaux des 44 majeures
-- Ce script doit être exécuté APRÈS add-all-44-majors.sql

USE diravenir;

-- Nettoyage et recréation de la table ideal_profiles
DROP TABLE IF EXISTS ideal_profiles;
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

-- ========================================
-- 1. GÉNIE CIVIL
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 90 FROM orientation_majors WHERE major_name = 'Génie Civil'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 40 FROM orientation_majors WHERE major_name = 'Génie Civil'
UNION ALL SELECT id, 'Interet_Social_Humain', 50 FROM orientation_majors WHERE major_name = 'Génie Civil'
UNION ALL SELECT id, 'Interet_Business_Gestion', 60 FROM orientation_majors WHERE major_name = 'Génie Civil'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 90 FROM orientation_majors WHERE major_name = 'Génie Civil'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 90 FROM orientation_majors WHERE major_name = 'Génie Civil'
UNION ALL SELECT id, 'Competence_Communication', 75 FROM orientation_majors WHERE major_name = 'Génie Civil'
UNION ALL SELECT id, 'Competence_Organisation', 90 FROM orientation_majors WHERE major_name = 'Génie Civil'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 85 FROM orientation_majors WHERE major_name = 'Génie Civil'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 80 FROM orientation_majors WHERE major_name = 'Génie Civil'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 85 FROM orientation_majors WHERE major_name = 'Génie Civil'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 80 FROM orientation_majors WHERE major_name = 'Génie Civil'
UNION ALL SELECT id, 'Valeur_Autonomie', 70 FROM orientation_majors WHERE major_name = 'Génie Civil'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 80 FROM orientation_majors WHERE major_name = 'Génie Civil'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 60 FROM orientation_majors WHERE major_name = 'Génie Civil'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 90 FROM orientation_majors WHERE major_name = 'Génie Civil'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 60 FROM orientation_majors WHERE major_name = 'Génie Civil';

-- ========================================
-- 2. GÉNIE MÉCANIQUE
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 95 FROM orientation_majors WHERE major_name = 'Génie Mécanique'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 30 FROM orientation_majors WHERE major_name = 'Génie Mécanique'
UNION ALL SELECT id, 'Interet_Social_Humain', 20 FROM orientation_majors WHERE major_name = 'Génie Mécanique'
UNION ALL SELECT id, 'Interet_Business_Gestion', 50 FROM orientation_majors WHERE major_name = 'Génie Mécanique'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 95 FROM orientation_majors WHERE major_name = 'Génie Mécanique'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 95 FROM orientation_majors WHERE major_name = 'Génie Mécanique'
UNION ALL SELECT id, 'Competence_Communication', 65 FROM orientation_majors WHERE major_name = 'Génie Mécanique'
UNION ALL SELECT id, 'Competence_Organisation', 80 FROM orientation_majors WHERE major_name = 'Génie Mécanique'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 90 FROM orientation_majors WHERE major_name = 'Génie Mécanique'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 70 FROM orientation_majors WHERE major_name = 'Génie Mécanique'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 90 FROM orientation_majors WHERE major_name = 'Génie Mécanique'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 70 FROM orientation_majors WHERE major_name = 'Génie Mécanique'
UNION ALL SELECT id, 'Valeur_Autonomie', 80 FROM orientation_majors WHERE major_name = 'Génie Mécanique'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 75 FROM orientation_majors WHERE major_name = 'Génie Mécanique'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 70 FROM orientation_majors WHERE major_name = 'Génie Mécanique'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 85 FROM orientation_majors WHERE major_name = 'Génie Mécanique'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 70 FROM orientation_majors WHERE major_name = 'Génie Mécanique';

-- ========================================
-- 3. ARCHITECTURE
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 60 FROM orientation_majors WHERE major_name = 'Architecture'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 90 FROM orientation_majors WHERE major_name = 'Architecture'
UNION ALL SELECT id, 'Interet_Social_Humain', 70 FROM orientation_majors WHERE major_name = 'Architecture'
UNION ALL SELECT id, 'Interet_Business_Gestion', 50 FROM orientation_majors WHERE major_name = 'Architecture'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 80 FROM orientation_majors WHERE major_name = 'Architecture'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 80 FROM orientation_majors WHERE major_name = 'Architecture'
UNION ALL SELECT id, 'Competence_Communication', 85 FROM orientation_majors WHERE major_name = 'Architecture'
UNION ALL SELECT id, 'Competence_Organisation', 85 FROM orientation_majors WHERE major_name = 'Architecture'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 85 FROM orientation_majors WHERE major_name = 'Architecture'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 85 FROM orientation_majors WHERE major_name = 'Architecture'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 90 FROM orientation_majors WHERE major_name = 'Architecture'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 60 FROM orientation_majors WHERE major_name = 'Architecture'
UNION ALL SELECT id, 'Valeur_Autonomie', 80 FROM orientation_majors WHERE major_name = 'Architecture'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 80 FROM orientation_majors WHERE major_name = 'Architecture'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 70 FROM orientation_majors WHERE major_name = 'Architecture'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 70 FROM orientation_majors WHERE major_name = 'Architecture'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 60 FROM orientation_majors WHERE major_name = 'Architecture';

-- ========================================
-- 4. COMMERCE INTERNATIONAL
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 40 FROM orientation_majors WHERE major_name = 'Commerce International'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 40 FROM orientation_majors WHERE major_name = 'Commerce International'
UNION ALL SELECT id, 'Interet_Social_Humain', 80 FROM orientation_majors WHERE major_name = 'Commerce International'
UNION ALL SELECT id, 'Interet_Business_Gestion', 98 FROM orientation_majors WHERE major_name = 'Commerce International'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 85 FROM orientation_majors WHERE major_name = 'Commerce International'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 85 FROM orientation_majors WHERE major_name = 'Commerce International'
UNION ALL SELECT id, 'Competence_Communication', 95 FROM orientation_majors WHERE major_name = 'Commerce International'
UNION ALL SELECT id, 'Competence_Organisation', 90 FROM orientation_majors WHERE major_name = 'Commerce International'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 20 FROM orientation_majors WHERE major_name = 'Commerce International'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 60 FROM orientation_majors WHERE major_name = 'Commerce International'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 85 FROM orientation_majors WHERE major_name = 'Commerce International'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 70 FROM orientation_majors WHERE major_name = 'Commerce International'
UNION ALL SELECT id, 'Valeur_Autonomie', 80 FROM orientation_majors WHERE major_name = 'Commerce International'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 90 FROM orientation_majors WHERE major_name = 'Commerce International'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 60 FROM orientation_majors WHERE major_name = 'Commerce International'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 70 FROM orientation_majors WHERE major_name = 'Commerce International'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 60 FROM orientation_majors WHERE major_name = 'Commerce International';

-- ========================================
-- 5. ADMINISTRATION DES AFFAIRES
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 30 FROM orientation_majors WHERE major_name = 'Administration des Affaires'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 40 FROM orientation_majors WHERE major_name = 'Administration des Affaires'
UNION ALL SELECT id, 'Interet_Social_Humain', 80 FROM orientation_majors WHERE major_name = 'Administration des Affaires'
UNION ALL SELECT id, 'Interet_Business_Gestion', 98 FROM orientation_majors WHERE major_name = 'Administration des Affaires'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 85 FROM orientation_majors WHERE major_name = 'Administration des Affaires'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 85 FROM orientation_majors WHERE major_name = 'Administration des Affaires'
UNION ALL SELECT id, 'Competence_Communication', 95 FROM orientation_majors WHERE major_name = 'Administration des Affaires'
UNION ALL SELECT id, 'Competence_Organisation', 98 FROM orientation_majors WHERE major_name = 'Administration des Affaires'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 10 FROM orientation_majors WHERE major_name = 'Administration des Affaires'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 60 FROM orientation_majors WHERE major_name = 'Administration des Affaires'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 80 FROM orientation_majors WHERE major_name = 'Administration des Affaires'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 70 FROM orientation_majors WHERE major_name = 'Administration des Affaires'
UNION ALL SELECT id, 'Valeur_Autonomie', 70 FROM orientation_majors WHERE major_name = 'Administration des Affaires'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 95 FROM orientation_majors WHERE major_name = 'Administration des Affaires'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 50 FROM orientation_majors WHERE major_name = 'Administration des Affaires'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 60 FROM orientation_majors WHERE major_name = 'Administration des Affaires'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 50 FROM orientation_majors WHERE major_name = 'Administration des Affaires';

-- ========================================
-- 6. ÉCONOMIE ET COMMERCE INTERNATIONAL
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 50 FROM orientation_majors WHERE major_name = 'Économie et Commerce International'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 20 FROM orientation_majors WHERE major_name = 'Économie et Commerce International'
UNION ALL SELECT id, 'Interet_Social_Humain', 70 FROM orientation_majors WHERE major_name = 'Économie et Commerce International'
UNION ALL SELECT id, 'Interet_Business_Gestion', 95 FROM orientation_majors WHERE major_name = 'Économie et Commerce International'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 98 FROM orientation_majors WHERE major_name = 'Économie et Commerce International'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 90 FROM orientation_majors WHERE major_name = 'Économie et Commerce International'
UNION ALL SELECT id, 'Competence_Communication', 85 FROM orientation_majors WHERE major_name = 'Économie et Commerce International'
UNION ALL SELECT id, 'Competence_Organisation', 85 FROM orientation_majors WHERE major_name = 'Économie et Commerce International'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 10 FROM orientation_majors WHERE major_name = 'Économie et Commerce International'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 75 FROM orientation_majors WHERE major_name = 'Économie et Commerce International'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 80 FROM orientation_majors WHERE major_name = 'Économie et Commerce International'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 75 FROM orientation_majors WHERE major_name = 'Économie et Commerce International'
UNION ALL SELECT id, 'Valeur_Autonomie', 70 FROM orientation_majors WHERE major_name = 'Économie et Commerce International'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 80 FROM orientation_majors WHERE major_name = 'Économie et Commerce International'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 60 FROM orientation_majors WHERE major_name = 'Économie et Commerce International'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 50 FROM orientation_majors WHERE major_name = 'Économie et Commerce International'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 85 FROM orientation_majors WHERE major_name = 'Économie et Commerce International';

-- ========================================
-- 7. MARKETING ET MANAGEMENT
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 20 FROM orientation_majors WHERE major_name = 'Marketing et Management'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 80 FROM orientation_majors WHERE major_name = 'Marketing et Management'
UNION ALL SELECT id, 'Interet_Social_Humain', 90 FROM orientation_majors WHERE major_name = 'Marketing et Management'
UNION ALL SELECT id, 'Interet_Business_Gestion', 95 FROM orientation_majors WHERE major_name = 'Marketing et Management'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 70 FROM orientation_majors WHERE major_name = 'Marketing et Management'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 80 FROM orientation_majors WHERE major_name = 'Marketing et Management'
UNION ALL SELECT id, 'Competence_Communication', 98 FROM orientation_majors WHERE major_name = 'Marketing et Management'
UNION ALL SELECT id, 'Competence_Organisation', 90 FROM orientation_majors WHERE major_name = 'Marketing et Management'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 10 FROM orientation_majors WHERE major_name = 'Marketing et Management'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 70 FROM orientation_majors WHERE major_name = 'Marketing et Management'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 95 FROM orientation_majors WHERE major_name = 'Marketing et Management'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 60 FROM orientation_majors WHERE major_name = 'Marketing et Management'
UNION ALL SELECT id, 'Valeur_Autonomie', 70 FROM orientation_majors WHERE major_name = 'Marketing et Management'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 95 FROM orientation_majors WHERE major_name = 'Marketing et Management'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 50 FROM orientation_majors WHERE major_name = 'Marketing et Management'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 60 FROM orientation_majors WHERE major_name = 'Marketing et Management'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 50 FROM orientation_majors WHERE major_name = 'Marketing et Management';

-- ========================================
-- 8. INFORMATIQUE (COMPUTER SCIENCE)
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 98 FROM orientation_majors WHERE major_name = 'Informatique'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 40 FROM orientation_majors WHERE major_name = 'Informatique'
UNION ALL SELECT id, 'Interet_Social_Humain', 30 FROM orientation_majors WHERE major_name = 'Informatique'
UNION ALL SELECT id, 'Interet_Business_Gestion', 40 FROM orientation_majors WHERE major_name = 'Informatique'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 98 FROM orientation_majors WHERE major_name = 'Informatique'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 98 FROM orientation_majors WHERE major_name = 'Informatique'
UNION ALL SELECT id, 'Competence_Communication', 70 FROM orientation_majors WHERE major_name = 'Informatique'
UNION ALL SELECT id, 'Competence_Organisation', 80 FROM orientation_majors WHERE major_name = 'Informatique'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 50 FROM orientation_majors WHERE major_name = 'Informatique'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 60 FROM orientation_majors WHERE major_name = 'Informatique'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 95 FROM orientation_majors WHERE major_name = 'Informatique'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 70 FROM orientation_majors WHERE major_name = 'Informatique'
UNION ALL SELECT id, 'Valeur_Autonomie', 85 FROM orientation_majors WHERE major_name = 'Informatique'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 70 FROM orientation_majors WHERE major_name = 'Informatique'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 80 FROM orientation_majors WHERE major_name = 'Informatique'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 40 FROM orientation_majors WHERE major_name = 'Informatique'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 80 FROM orientation_majors WHERE major_name = 'Informatique';

-- ========================================
-- 9. GÉNIE LOGICIEL (SOFTWARE ENGINEERING)
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 95 FROM orientation_majors WHERE major_name = 'Génie Logiciel'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 45 FROM orientation_majors WHERE major_name = 'Génie Logiciel'
UNION ALL SELECT id, 'Interet_Social_Humain', 30 FROM orientation_majors WHERE major_name = 'Génie Logiciel'
UNION ALL SELECT id, 'Interet_Business_Gestion', 50 FROM orientation_majors WHERE major_name = 'Génie Logiciel'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 98 FROM orientation_majors WHERE major_name = 'Génie Logiciel'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 98 FROM orientation_majors WHERE major_name = 'Génie Logiciel'
UNION ALL SELECT id, 'Competence_Communication', 80 FROM orientation_majors WHERE major_name = 'Génie Logiciel'
UNION ALL SELECT id, 'Competence_Organisation', 90 FROM orientation_majors WHERE major_name = 'Génie Logiciel'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 40 FROM orientation_majors WHERE major_name = 'Génie Logiciel'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 65 FROM orientation_majors WHERE major_name = 'Génie Logiciel'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 95 FROM orientation_majors WHERE major_name = 'Génie Logiciel'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 75 FROM orientation_majors WHERE major_name = 'Génie Logiciel'
UNION ALL SELECT id, 'Valeur_Autonomie', 80 FROM orientation_majors WHERE major_name = 'Génie Logiciel'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 85 FROM orientation_majors WHERE major_name = 'Génie Logiciel'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 70 FROM orientation_majors WHERE major_name = 'Génie Logiciel'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 50 FROM orientation_majors WHERE major_name = 'Génie Logiciel'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 75 FROM orientation_majors WHERE major_name = 'Génie Logiciel';

-- ========================================
-- 10. INTELLIGENCE ARTIFICIELLE
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 98 FROM orientation_majors WHERE major_name = 'Intelligence Artificielle'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 30 FROM orientation_majors WHERE major_name = 'Intelligence Artificielle'
UNION ALL SELECT id, 'Interet_Social_Humain', 20 FROM orientation_majors WHERE major_name = 'Intelligence Artificielle'
UNION ALL SELECT id, 'Interet_Business_Gestion', 50 FROM orientation_majors WHERE major_name = 'Intelligence Artificielle'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 98 FROM orientation_majors WHERE major_name = 'Intelligence Artificielle'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 98 FROM orientation_majors WHERE major_name = 'Intelligence Artificielle'
UNION ALL SELECT id, 'Competence_Communication', 70 FROM orientation_majors WHERE major_name = 'Intelligence Artificielle'
UNION ALL SELECT id, 'Competence_Organisation', 70 FROM orientation_majors WHERE major_name = 'Intelligence Artificielle'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 30 FROM orientation_majors WHERE major_name = 'Intelligence Artificielle'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 80 FROM orientation_majors WHERE major_name = 'Intelligence Artificielle'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 98 FROM orientation_majors WHERE major_name = 'Intelligence Artificielle'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 60 FROM orientation_majors WHERE major_name = 'Intelligence Artificielle'
UNION ALL SELECT id, 'Valeur_Autonomie', 90 FROM orientation_majors WHERE major_name = 'Intelligence Artificielle'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 70 FROM orientation_majors WHERE major_name = 'Intelligence Artificielle'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 90 FROM orientation_majors WHERE major_name = 'Intelligence Artificielle'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 40 FROM orientation_majors WHERE major_name = 'Intelligence Artificielle'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 95 FROM orientation_majors WHERE major_name = 'Intelligence Artificielle';

-- Message de confirmation pour les 10 premières majeures
SELECT 'Profils idéaux ajoutés pour les 10 premières majeures' AS status;

-- ========================================
-- 11. GESTION DU TOURISME
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 20 FROM orientation_majors WHERE major_name = 'Gestion du Tourisme'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 60 FROM orientation_majors WHERE major_name = 'Gestion du Tourisme'
UNION ALL SELECT id, 'Interet_Social_Humain', 95 FROM orientation_majors WHERE major_name = 'Gestion du Tourisme'
UNION ALL SELECT id, 'Interet_Business_Gestion', 90 FROM orientation_majors WHERE major_name = 'Gestion du Tourisme'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 70 FROM orientation_majors WHERE major_name = 'Gestion du Tourisme'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 80 FROM orientation_majors WHERE major_name = 'Gestion du Tourisme'
UNION ALL SELECT id, 'Competence_Communication', 98 FROM orientation_majors WHERE major_name = 'Gestion du Tourisme'
UNION ALL SELECT id, 'Competence_Organisation', 95 FROM orientation_majors WHERE major_name = 'Gestion du Tourisme'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 30 FROM orientation_majors WHERE major_name = 'Gestion du Tourisme'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 85 FROM orientation_majors WHERE major_name = 'Gestion du Tourisme'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 80 FROM orientation_majors WHERE major_name = 'Gestion du Tourisme'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 60 FROM orientation_majors WHERE major_name = 'Gestion du Tourisme'
UNION ALL SELECT id, 'Valeur_Autonomie', 70 FROM orientation_majors WHERE major_name = 'Gestion du Tourisme'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 95 FROM orientation_majors WHERE major_name = 'Gestion du Tourisme'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 50 FROM orientation_majors WHERE major_name = 'Gestion du Tourisme'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 80 FROM orientation_majors WHERE major_name = 'Gestion du Tourisme'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 40 FROM orientation_majors WHERE major_name = 'Gestion du Tourisme';

-- ========================================
-- 12. SOINS INFIRMIERS (NURSING)
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 65 FROM orientation_majors WHERE major_name = 'Soins Infirmiers'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 10 FROM orientation_majors WHERE major_name = 'Soins Infirmiers'
UNION ALL SELECT id, 'Interet_Social_Humain', 98 FROM orientation_majors WHERE major_name = 'Soins Infirmiers'
UNION ALL SELECT id, 'Interet_Business_Gestion', 20 FROM orientation_majors WHERE major_name = 'Soins Infirmiers'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 70 FROM orientation_majors WHERE major_name = 'Soins Infirmiers'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 80 FROM orientation_majors WHERE major_name = 'Soins Infirmiers'
UNION ALL SELECT id, 'Competence_Communication', 98 FROM orientation_majors WHERE major_name = 'Soins Infirmiers'
UNION ALL SELECT id, 'Competence_Organisation', 90 FROM orientation_majors WHERE major_name = 'Soins Infirmiers'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 70 FROM orientation_majors WHERE major_name = 'Soins Infirmiers'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 98 FROM orientation_majors WHERE major_name = 'Soins Infirmiers'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 60 FROM orientation_majors WHERE major_name = 'Soins Infirmiers'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 80 FROM orientation_majors WHERE major_name = 'Soins Infirmiers'
UNION ALL SELECT id, 'Valeur_Autonomie', 50 FROM orientation_majors WHERE major_name = 'Soins Infirmiers'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 98 FROM orientation_majors WHERE major_name = 'Soins Infirmiers'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 40 FROM orientation_majors WHERE major_name = 'Soins Infirmiers'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 90 FROM orientation_majors WHERE major_name = 'Soins Infirmiers'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 60 FROM orientation_majors WHERE major_name = 'Soins Infirmiers';

-- ========================================
-- 13. PHARMACIE
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 90 FROM orientation_majors WHERE major_name = 'Pharmacie'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 10 FROM orientation_majors WHERE major_name = 'Pharmacie'
UNION ALL SELECT id, 'Interet_Social_Humain', 80 FROM orientation_majors WHERE major_name = 'Pharmacie'
UNION ALL SELECT id, 'Interet_Business_Gestion', 30 FROM orientation_majors WHERE major_name = 'Pharmacie'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 85 FROM orientation_majors WHERE major_name = 'Pharmacie'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 85 FROM orientation_majors WHERE major_name = 'Pharmacie'
UNION ALL SELECT id, 'Competence_Communication', 90 FROM orientation_majors WHERE major_name = 'Pharmacie'
UNION ALL SELECT id, 'Competence_Organisation', 95 FROM orientation_majors WHERE major_name = 'Pharmacie'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 60 FROM orientation_majors WHERE major_name = 'Pharmacie'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 90 FROM orientation_majors WHERE major_name = 'Pharmacie'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 70 FROM orientation_majors WHERE major_name = 'Pharmacie'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 85 FROM orientation_majors WHERE major_name = 'Pharmacie'
UNION ALL SELECT id, 'Valeur_Autonomie', 70 FROM orientation_majors WHERE major_name = 'Pharmacie'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 85 FROM orientation_majors WHERE major_name = 'Pharmacie'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 60 FROM orientation_majors WHERE major_name = 'Pharmacie'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 70 FROM orientation_majors WHERE major_name = 'Pharmacie'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 80 FROM orientation_majors WHERE major_name = 'Pharmacie';

-- ========================================
-- 14. GÉNIE ÉLECTRIQUE
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 95 FROM orientation_majors WHERE major_name = 'Génie Électrique'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 20 FROM orientation_majors WHERE major_name = 'Génie Électrique'
UNION ALL SELECT id, 'Interet_Social_Humain', 30 FROM orientation_majors WHERE major_name = 'Génie Électrique'
UNION ALL SELECT id, 'Interet_Business_Gestion', 40 FROM orientation_majors WHERE major_name = 'Génie Électrique'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 95 FROM orientation_majors WHERE major_name = 'Génie Électrique'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 95 FROM orientation_majors WHERE major_name = 'Génie Électrique'
UNION ALL SELECT id, 'Competence_Communication', 65 FROM orientation_majors WHERE major_name = 'Génie Électrique'
UNION ALL SELECT id, 'Competence_Organisation', 80 FROM orientation_majors WHERE major_name = 'Génie Électrique'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 80 FROM orientation_majors WHERE major_name = 'Génie Électrique'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 70 FROM orientation_majors WHERE major_name = 'Génie Électrique'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 90 FROM orientation_majors WHERE major_name = 'Génie Électrique'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 75 FROM orientation_majors WHERE major_name = 'Génie Électrique'
UNION ALL SELECT id, 'Valeur_Autonomie', 80 FROM orientation_majors WHERE major_name = 'Génie Électrique'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 75 FROM orientation_majors WHERE major_name = 'Génie Électrique'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 70 FROM orientation_majors WHERE major_name = 'Génie Électrique'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 80 FROM orientation_majors WHERE major_name = 'Génie Électrique'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 75 FROM orientation_majors WHERE major_name = 'Génie Électrique';

-- ========================================
-- 15. SCIENCES ET INGÉNIERIE ALIMENTAIRES
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 90 FROM orientation_majors WHERE major_name = 'Sciences et Ingénierie Alimentaires'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 50 FROM orientation_majors WHERE major_name = 'Sciences et Ingénierie Alimentaires'
UNION ALL SELECT id, 'Interet_Social_Humain', 40 FROM orientation_majors WHERE major_name = 'Sciences et Ingénierie Alimentaires'
UNION ALL SELECT id, 'Interet_Business_Gestion', 50 FROM orientation_majors WHERE major_name = 'Sciences et Ingénierie Alimentaires'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 85 FROM orientation_majors WHERE major_name = 'Sciences et Ingénierie Alimentaires'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 85 FROM orientation_majors WHERE major_name = 'Sciences et Ingénierie Alimentaires'
UNION ALL SELECT id, 'Competence_Communication', 70 FROM orientation_majors WHERE major_name = 'Sciences et Ingénierie Alimentaires'
UNION ALL SELECT id, 'Competence_Organisation', 85 FROM orientation_majors WHERE major_name = 'Sciences et Ingénierie Alimentaires'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 75 FROM orientation_majors WHERE major_name = 'Sciences et Ingénierie Alimentaires'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 85 FROM orientation_majors WHERE major_name = 'Sciences et Ingénierie Alimentaires'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 80 FROM orientation_majors WHERE major_name = 'Sciences et Ingénierie Alimentaires'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 80 FROM orientation_majors WHERE major_name = 'Sciences et Ingénierie Alimentaires'
UNION ALL SELECT id, 'Valeur_Autonomie', 70 FROM orientation_majors WHERE major_name = 'Sciences et Ingénierie Alimentaires'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 80 FROM orientation_majors WHERE major_name = 'Sciences et Ingénierie Alimentaires'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 60 FROM orientation_majors WHERE major_name = 'Sciences et Ingénierie Alimentaires'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 85 FROM orientation_majors WHERE major_name = 'Sciences et Ingénierie Alimentaires'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 70 FROM orientation_majors WHERE major_name = 'Sciences et Ingénierie Alimentaires';

-- ========================================
-- 16. FINANCE
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 40 FROM orientation_majors WHERE major_name = 'Finance'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 10 FROM orientation_majors WHERE major_name = 'Finance'
UNION ALL SELECT id, 'Interet_Social_Humain', 50 FROM orientation_majors WHERE major_name = 'Finance'
UNION ALL SELECT id, 'Interet_Business_Gestion', 98 FROM orientation_majors WHERE major_name = 'Finance'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 98 FROM orientation_majors WHERE major_name = 'Finance'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 90 FROM orientation_majors WHERE major_name = 'Finance'
UNION ALL SELECT id, 'Competence_Communication', 85 FROM orientation_majors WHERE major_name = 'Finance'
UNION ALL SELECT id, 'Competence_Organisation', 98 FROM orientation_majors WHERE major_name = 'Finance'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 10 FROM orientation_majors WHERE major_name = 'Finance'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 40 FROM orientation_majors WHERE major_name = 'Finance'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 80 FROM orientation_majors WHERE major_name = 'Finance'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 85 FROM orientation_majors WHERE major_name = 'Finance'
UNION ALL SELECT id, 'Valeur_Autonomie', 70 FROM orientation_majors WHERE major_name = 'Finance'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 80 FROM orientation_majors WHERE major_name = 'Finance'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 70 FROM orientation_majors WHERE major_name = 'Finance'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 50 FROM orientation_majors WHERE major_name = 'Finance'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 80 FROM orientation_majors WHERE major_name = 'Finance';

-- ========================================
-- 17. CONCEPTION MÉCANIQUE, FABRICATION ET AUTOMATISATION
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 95 FROM orientation_majors WHERE major_name = 'Conception Mécanique, Fabrication et Automatisation'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 60 FROM orientation_majors WHERE major_name = 'Conception Mécanique, Fabrication et Automatisation'
UNION ALL SELECT id, 'Interet_Social_Humain', 20 FROM orientation_majors WHERE major_name = 'Conception Mécanique, Fabrication et Automatisation'
UNION ALL SELECT id, 'Interet_Business_Gestion', 50 FROM orientation_majors WHERE major_name = 'Conception Mécanique, Fabrication et Automatisation'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 95 FROM orientation_majors WHERE major_name = 'Conception Mécanique, Fabrication et Automatisation'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 95 FROM orientation_majors WHERE major_name = 'Conception Mécanique, Fabrication et Automatisation'
UNION ALL SELECT id, 'Competence_Communication', 70 FROM orientation_majors WHERE major_name = 'Conception Mécanique, Fabrication et Automatisation'
UNION ALL SELECT id, 'Competence_Organisation', 85 FROM orientation_majors WHERE major_name = 'Conception Mécanique, Fabrication et Automatisation'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 95 FROM orientation_majors WHERE major_name = 'Conception Mécanique, Fabrication et Automatisation'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 60 FROM orientation_majors WHERE major_name = 'Conception Mécanique, Fabrication et Automatisation'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 95 FROM orientation_majors WHERE major_name = 'Conception Mécanique, Fabrication et Automatisation'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 75 FROM orientation_majors WHERE major_name = 'Conception Mécanique, Fabrication et Automatisation'
UNION ALL SELECT id, 'Valeur_Autonomie', 80 FROM orientation_majors WHERE major_name = 'Conception Mécanique, Fabrication et Automatisation'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 80 FROM orientation_majors WHERE major_name = 'Conception Mécanique, Fabrication et Automatisation'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 70 FROM orientation_majors WHERE major_name = 'Conception Mécanique, Fabrication et Automatisation'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 95 FROM orientation_majors WHERE major_name = 'Conception Mécanique, Fabrication et Automatisation'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 60 FROM orientation_majors WHERE major_name = 'Conception Mécanique, Fabrication et Automatisation';

-- ========================================
-- 18. SCIENCE DU DROIT
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 30 FROM orientation_majors WHERE major_name = 'Science du Droit'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 30 FROM orientation_majors WHERE major_name = 'Science du Droit'
UNION ALL SELECT id, 'Interet_Social_Humain', 80 FROM orientation_majors WHERE major_name = 'Science du Droit'
UNION ALL SELECT id, 'Interet_Business_Gestion', 80 FROM orientation_majors WHERE major_name = 'Science du Droit'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 95 FROM orientation_majors WHERE major_name = 'Science du Droit'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 90 FROM orientation_majors WHERE major_name = 'Science du Droit'
UNION ALL SELECT id, 'Competence_Communication', 95 FROM orientation_majors WHERE major_name = 'Science du Droit'
UNION ALL SELECT id, 'Competence_Organisation', 90 FROM orientation_majors WHERE major_name = 'Science du Droit'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 10 FROM orientation_majors WHERE major_name = 'Science du Droit'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 90 FROM orientation_majors WHERE major_name = 'Science du Droit'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 60 FROM orientation_majors WHERE major_name = 'Science du Droit'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 80 FROM orientation_majors WHERE major_name = 'Science du Droit'
UNION ALL SELECT id, 'Valeur_Autonomie', 70 FROM orientation_majors WHERE major_name = 'Science du Droit'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 80 FROM orientation_majors WHERE major_name = 'Science du Droit'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 70 FROM orientation_majors WHERE major_name = 'Science du Droit'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 50 FROM orientation_majors WHERE major_name = 'Science du Droit'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 90 FROM orientation_majors WHERE major_name = 'Science du Droit';

-- ========================================
-- 19. POLITIQUE INTERNATIONALE
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 20 FROM orientation_majors WHERE major_name = 'Politique Internationale'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 20 FROM orientation_majors WHERE major_name = 'Politique Internationale'
UNION ALL SELECT id, 'Interet_Social_Humain', 90 FROM orientation_majors WHERE major_name = 'Politique Internationale'
UNION ALL SELECT id, 'Interet_Business_Gestion', 70 FROM orientation_majors WHERE major_name = 'Politique Internationale'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 85 FROM orientation_majors WHERE major_name = 'Politique Internationale'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 80 FROM orientation_majors WHERE major_name = 'Politique Internationale'
UNION ALL SELECT id, 'Competence_Communication', 95 FROM orientation_majors WHERE major_name = 'Politique Internationale'
UNION ALL SELECT id, 'Competence_Organisation', 80 FROM orientation_majors WHERE major_name = 'Politique Internationale'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 10 FROM orientation_majors WHERE major_name = 'Politique Internationale'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 95 FROM orientation_majors WHERE major_name = 'Politique Internationale'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 70 FROM orientation_majors WHERE major_name = 'Politique Internationale'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 60 FROM orientation_majors WHERE major_name = 'Politique Internationale'
UNION ALL SELECT id, 'Valeur_Autonomie', 70 FROM orientation_majors WHERE major_name = 'Politique Internationale'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 90 FROM orientation_majors WHERE major_name = 'Politique Internationale'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 60 FROM orientation_majors WHERE major_name = 'Politique Internationale'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 50 FROM orientation_majors WHERE major_name = 'Politique Internationale'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 85 FROM orientation_majors WHERE major_name = 'Politique Internationale';

-- ========================================
-- 20. MBBS (MÉDECINE)
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 95 FROM orientation_majors WHERE major_name = 'MBBS'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 10 FROM orientation_majors WHERE major_name = 'MBBS'
UNION ALL SELECT id, 'Interet_Social_Humain', 98 FROM orientation_majors WHERE major_name = 'MBBS'
UNION ALL SELECT id, 'Interet_Business_Gestion', 20 FROM orientation_majors WHERE major_name = 'MBBS'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 90 FROM orientation_majors WHERE major_name = 'MBBS'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 95 FROM orientation_majors WHERE major_name = 'MBBS'
UNION ALL SELECT id, 'Competence_Communication', 98 FROM orientation_majors WHERE major_name = 'MBBS'
UNION ALL SELECT id, 'Competence_Organisation', 90 FROM orientation_majors WHERE major_name = 'MBBS'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 75 FROM orientation_majors WHERE major_name = 'MBBS'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 98 FROM orientation_majors WHERE major_name = 'MBBS'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 70 FROM orientation_majors WHERE major_name = 'MBBS'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 85 FROM orientation_majors WHERE major_name = 'MBBS'
UNION ALL SELECT id, 'Valeur_Autonomie', 60 FROM orientation_majors WHERE major_name = 'MBBS'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 95 FROM orientation_majors WHERE major_name = 'MBBS'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 50 FROM orientation_majors WHERE major_name = 'MBBS'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 90 FROM orientation_majors WHERE major_name = 'MBBS'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 80 FROM orientation_majors WHERE major_name = 'MBBS';

-- Message de confirmation pour les 20 premières majeures
SELECT 'Profils idéaux ajoutés pour les 20 premières majeures' AS status;

-- ========================================
-- 21. RELATIONS PUBLIQUES
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 10 FROM orientation_majors WHERE major_name = 'Relations Publiques'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 80 FROM orientation_majors WHERE major_name = 'Relations Publiques'
UNION ALL SELECT id, 'Interet_Social_Humain', 98 FROM orientation_majors WHERE major_name = 'Relations Publiques'
UNION ALL SELECT id, 'Interet_Business_Gestion', 90 FROM orientation_majors WHERE major_name = 'Relations Publiques'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 60 FROM orientation_majors WHERE major_name = 'Relations Publiques'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 75 FROM orientation_majors WHERE major_name = 'Relations Publiques'
UNION ALL SELECT id, 'Competence_Communication', 98 FROM orientation_majors WHERE major_name = 'Relations Publiques'
UNION ALL SELECT id, 'Competence_Organisation', 90 FROM orientation_majors WHERE major_name = 'Relations Publiques'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 10 FROM orientation_majors WHERE major_name = 'Relations Publiques'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 80 FROM orientation_majors WHERE major_name = 'Relations Publiques'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 85 FROM orientation_majors WHERE major_name = 'Relations Publiques'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 60 FROM orientation_majors WHERE major_name = 'Relations Publiques'
UNION ALL SELECT id, 'Valeur_Autonomie', 70 FROM orientation_majors WHERE major_name = 'Relations Publiques'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 98 FROM orientation_majors WHERE major_name = 'Relations Publiques'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 50 FROM orientation_majors WHERE major_name = 'Relations Publiques'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 60 FROM orientation_majors WHERE major_name = 'Relations Publiques'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 40 FROM orientation_majors WHERE major_name = 'Relations Publiques';

-- ========================================
-- 22. CHIMIE APPLIQUÉE
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 98 FROM orientation_majors WHERE major_name = 'Chimie Appliquée'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 20 FROM orientation_majors WHERE major_name = 'Chimie Appliquée'
UNION ALL SELECT id, 'Interet_Social_Humain', 30 FROM orientation_majors WHERE major_name = 'Chimie Appliquée'
UNION ALL SELECT id, 'Interet_Business_Gestion', 40 FROM orientation_majors WHERE major_name = 'Chimie Appliquée'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 95 FROM orientation_majors WHERE major_name = 'Chimie Appliquée'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 95 FROM orientation_majors WHERE major_name = 'Chimie Appliquée'
UNION ALL SELECT id, 'Competence_Communication', 60 FROM orientation_majors WHERE major_name = 'Chimie Appliquée'
UNION ALL SELECT id, 'Competence_Organisation', 85 FROM orientation_majors WHERE major_name = 'Chimie Appliquée'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 85 FROM orientation_majors WHERE major_name = 'Chimie Appliquée'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 80 FROM orientation_majors WHERE major_name = 'Chimie Appliquée'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 90 FROM orientation_majors WHERE major_name = 'Chimie Appliquée'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 70 FROM orientation_majors WHERE major_name = 'Chimie Appliquée'
UNION ALL SELECT id, 'Valeur_Autonomie', 70 FROM orientation_majors WHERE major_name = 'Chimie Appliquée'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 70 FROM orientation_majors WHERE major_name = 'Chimie Appliquée'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 60 FROM orientation_majors WHERE major_name = 'Chimie Appliquée'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 90 FROM orientation_majors WHERE major_name = 'Chimie Appliquée'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 80 FROM orientation_majors WHERE major_name = 'Chimie Appliquée';

-- ========================================
-- 23. ÉTUDES ANGLAISES
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 10 FROM orientation_majors WHERE major_name = 'Études Anglaises'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 90 FROM orientation_majors WHERE major_name = 'Études Anglaises'
UNION ALL SELECT id, 'Interet_Social_Humain', 85 FROM orientation_majors WHERE major_name = 'Études Anglaises'
UNION ALL SELECT id, 'Interet_Business_Gestion', 30 FROM orientation_majors WHERE major_name = 'Études Anglaises'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 80 FROM orientation_majors WHERE major_name = 'Études Anglaises'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 70 FROM orientation_majors WHERE major_name = 'Études Anglaises'
UNION ALL SELECT id, 'Competence_Communication', 98 FROM orientation_majors WHERE major_name = 'Études Anglaises'
UNION ALL SELECT id, 'Competence_Organisation', 70 FROM orientation_majors WHERE major_name = 'Études Anglaises'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 10 FROM orientation_majors WHERE major_name = 'Études Anglaises'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 75 FROM orientation_majors WHERE major_name = 'Études Anglaises'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 70 FROM orientation_majors WHERE major_name = 'Études Anglaises'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 50 FROM orientation_majors WHERE major_name = 'Études Anglaises'
UNION ALL SELECT id, 'Valeur_Autonomie', 85 FROM orientation_majors WHERE major_name = 'Études Anglaises'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 70 FROM orientation_majors WHERE major_name = 'Études Anglaises'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 85 FROM orientation_majors WHERE major_name = 'Études Anglaises'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 30 FROM orientation_majors WHERE major_name = 'Études Anglaises'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 90 FROM orientation_majors WHERE major_name = 'Études Anglaises';

-- ========================================
-- 24. MÉDECINE DENTAIRE
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 90 FROM orientation_majors WHERE major_name = 'Médecine Dentaire'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 40 FROM orientation_majors WHERE major_name = 'Médecine Dentaire'
UNION ALL SELECT id, 'Interet_Social_Humain', 90 FROM orientation_majors WHERE major_name = 'Médecine Dentaire'
UNION ALL SELECT id, 'Interet_Business_Gestion', 40 FROM orientation_majors WHERE major_name = 'Médecine Dentaire'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 85 FROM orientation_majors WHERE major_name = 'Médecine Dentaire'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 90 FROM orientation_majors WHERE major_name = 'Médecine Dentaire'
UNION ALL SELECT id, 'Competence_Communication', 95 FROM orientation_majors WHERE major_name = 'Médecine Dentaire'
UNION ALL SELECT id, 'Competence_Organisation', 90 FROM orientation_majors WHERE major_name = 'Médecine Dentaire'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 95 FROM orientation_majors WHERE major_name = 'Médecine Dentaire'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 98 FROM orientation_majors WHERE major_name = 'Médecine Dentaire'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 70 FROM orientation_majors WHERE major_name = 'Médecine Dentaire'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 80 FROM orientation_majors WHERE major_name = 'Médecine Dentaire'
UNION ALL SELECT id, 'Valeur_Autonomie', 70 FROM orientation_majors WHERE major_name = 'Médecine Dentaire'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 90 FROM orientation_majors WHERE major_name = 'Médecine Dentaire'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 60 FROM orientation_majors WHERE major_name = 'Médecine Dentaire'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 95 FROM orientation_majors WHERE major_name = 'Médecine Dentaire'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 60 FROM orientation_majors WHERE major_name = 'Médecine Dentaire';

-- ========================================
-- 25. SCIENCES ET INGÉNIERIE DES NOUVELLES ÉNERGIES
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 98 FROM orientation_majors WHERE major_name = 'Sciences et Ingénierie des Nouvelles Énergies'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 20 FROM orientation_majors WHERE major_name = 'Sciences et Ingénierie des Nouvelles Énergies'
UNION ALL SELECT id, 'Interet_Social_Humain', 40 FROM orientation_majors WHERE major_name = 'Sciences et Ingénierie des Nouvelles Énergies'
UNION ALL SELECT id, 'Interet_Business_Gestion', 50 FROM orientation_majors WHERE major_name = 'Sciences et Ingénierie des Nouvelles Énergies'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 95 FROM orientation_majors WHERE major_name = 'Sciences et Ingénierie des Nouvelles Énergies'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 95 FROM orientation_majors WHERE major_name = 'Sciences et Ingénierie des Nouvelles Énergies'
UNION ALL SELECT id, 'Competence_Communication', 70 FROM orientation_majors WHERE major_name = 'Sciences et Ingénierie des Nouvelles Énergies'
UNION ALL SELECT id, 'Competence_Organisation', 85 FROM orientation_majors WHERE major_name = 'Sciences et Ingénierie des Nouvelles Énergies'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 80 FROM orientation_majors WHERE major_name = 'Sciences et Ingénierie des Nouvelles Énergies'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 95 FROM orientation_majors WHERE major_name = 'Sciences et Ingénierie des Nouvelles Énergies'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 98 FROM orientation_majors WHERE major_name = 'Sciences et Ingénierie des Nouvelles Énergies'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 70 FROM orientation_majors WHERE major_name = 'Sciences et Ingénierie des Nouvelles Énergies'
UNION ALL SELECT id, 'Valeur_Autonomie', 80 FROM orientation_majors WHERE major_name = 'Sciences et Ingénierie des Nouvelles Énergies'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 80 FROM orientation_majors WHERE major_name = 'Sciences et Ingénierie des Nouvelles Énergies'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 70 FROM orientation_majors WHERE major_name = 'Sciences et Ingénierie des Nouvelles Énergies'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 85 FROM orientation_majors WHERE major_name = 'Sciences et Ingénierie des Nouvelles Énergies'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 80 FROM orientation_majors WHERE major_name = 'Sciences et Ingénierie des Nouvelles Énergies';

-- ========================================
-- 26. INGÉNIERIE HYDRAULIQUE
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 95 FROM orientation_majors WHERE major_name = 'Ingénierie Hydraulique'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 20 FROM orientation_majors WHERE major_name = 'Ingénierie Hydraulique'
UNION ALL SELECT id, 'Interet_Social_Humain', 50 FROM orientation_majors WHERE major_name = 'Ingénierie Hydraulique'
UNION ALL SELECT id, 'Interet_Business_Gestion', 60 FROM orientation_majors WHERE major_name = 'Ingénierie Hydraulique'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 95 FROM orientation_majors WHERE major_name = 'Ingénierie Hydraulique'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 95 FROM orientation_majors WHERE major_name = 'Ingénierie Hydraulique'
UNION ALL SELECT id, 'Competence_Communication', 70 FROM orientation_majors WHERE major_name = 'Ingénierie Hydraulique'
UNION ALL SELECT id, 'Competence_Organisation', 90 FROM orientation_majors WHERE major_name = 'Ingénierie Hydraulique'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 85 FROM orientation_majors WHERE major_name = 'Ingénierie Hydraulique'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 90 FROM orientation_majors WHERE major_name = 'Ingénierie Hydraulique'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 85 FROM orientation_majors WHERE major_name = 'Ingénierie Hydraulique'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 80 FROM orientation_majors WHERE major_name = 'Ingénierie Hydraulique'
UNION ALL SELECT id, 'Valeur_Autonomie', 70 FROM orientation_majors WHERE major_name = 'Ingénierie Hydraulique'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 80 FROM orientation_majors WHERE major_name = 'Ingénierie Hydraulique'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 60 FROM orientation_majors WHERE major_name = 'Ingénierie Hydraulique'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 90 FROM orientation_majors WHERE major_name = 'Ingénierie Hydraulique'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 60 FROM orientation_majors WHERE major_name = 'Ingénierie Hydraulique';

-- ========================================
-- 27. INGÉNIERIE DES TRANSPORTS
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 90 FROM orientation_majors WHERE major_name = 'Ingénierie des Transports'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 20 FROM orientation_majors WHERE major_name = 'Ingénierie des Transports'
UNION ALL SELECT id, 'Interet_Social_Humain', 60 FROM orientation_majors WHERE major_name = 'Ingénierie des Transports'
UNION ALL SELECT id, 'Interet_Business_Gestion', 70 FROM orientation_majors WHERE major_name = 'Ingénierie des Transports'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 95 FROM orientation_majors WHERE major_name = 'Ingénierie des Transports'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 90 FROM orientation_majors WHERE major_name = 'Ingénierie des Transports'
UNION ALL SELECT id, 'Competence_Communication', 80 FROM orientation_majors WHERE major_name = 'Ingénierie des Transports'
UNION ALL SELECT id, 'Competence_Organisation', 95 FROM orientation_majors WHERE major_name = 'Ingénierie des Transports'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 70 FROM orientation_majors WHERE major_name = 'Ingénierie des Transports'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 90 FROM orientation_majors WHERE major_name = 'Ingénierie des Transports'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 80 FROM orientation_majors WHERE major_name = 'Ingénierie des Transports'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 80 FROM orientation_majors WHERE major_name = 'Ingénierie des Transports'
UNION ALL SELECT id, 'Valeur_Autonomie', 70 FROM orientation_majors WHERE major_name = 'Ingénierie des Transports'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 90 FROM orientation_majors WHERE major_name = 'Ingénierie des Transports'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 60 FROM orientation_majors WHERE major_name = 'Ingénierie des Transports'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 85 FROM orientation_majors WHERE major_name = 'Ingénierie des Transports'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 60 FROM orientation_majors WHERE major_name = 'Ingénierie des Transports';

-- ========================================
-- 28. BIOINGÉNIERIE
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 95 FROM orientation_majors WHERE major_name = 'Bioingénierie'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 30 FROM orientation_majors WHERE major_name = 'Bioingénierie'
UNION ALL SELECT id, 'Interet_Social_Humain', 70 FROM orientation_majors WHERE major_name = 'Bioingénierie'
UNION ALL SELECT id, 'Interet_Business_Gestion', 40 FROM orientation_majors WHERE major_name = 'Bioingénierie'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 95 FROM orientation_majors WHERE major_name = 'Bioingénierie'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 95 FROM orientation_majors WHERE major_name = 'Bioingénierie'
UNION ALL SELECT id, 'Competence_Communication', 70 FROM orientation_majors WHERE major_name = 'Bioingénierie'
UNION ALL SELECT id, 'Competence_Organisation', 80 FROM orientation_majors WHERE major_name = 'Bioingénierie'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 85 FROM orientation_majors WHERE major_name = 'Bioingénierie'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 95 FROM orientation_majors WHERE major_name = 'Bioingénierie'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 95 FROM orientation_majors WHERE major_name = 'Bioingénierie'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 70 FROM orientation_majors WHERE major_name = 'Bioingénierie'
UNION ALL SELECT id, 'Valeur_Autonomie', 80 FROM orientation_majors WHERE major_name = 'Bioingénierie'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 85 FROM orientation_majors WHERE major_name = 'Bioingénierie'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 60 FROM orientation_majors WHERE major_name = 'Bioingénierie'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 85 FROM orientation_majors WHERE major_name = 'Bioingénierie'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 80 FROM orientation_majors WHERE major_name = 'Bioingénierie';

-- ========================================
-- 29. BIOTECHNOLOGIE
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 98 FROM orientation_majors WHERE major_name = 'Biotechnologie'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 20 FROM orientation_majors WHERE major_name = 'Biotechnologie'
UNION ALL SELECT id, 'Interet_Social_Humain', 40 FROM orientation_majors WHERE major_name = 'Biotechnologie'
UNION ALL SELECT id, 'Interet_Business_Gestion', 40 FROM orientation_majors WHERE major_name = 'Biotechnologie'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 95 FROM orientation_majors WHERE major_name = 'Biotechnologie'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 95 FROM orientation_majors WHERE major_name = 'Biotechnologie'
UNION ALL SELECT id, 'Competence_Communication', 70 FROM orientation_majors WHERE major_name = 'Biotechnologie'
UNION ALL SELECT id, 'Competence_Organisation', 80 FROM orientation_majors WHERE major_name = 'Biotechnologie'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 85 FROM orientation_majors WHERE major_name = 'Biotechnologie'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 90 FROM orientation_majors WHERE major_name = 'Biotechnologie'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 98 FROM orientation_majors WHERE major_name = 'Biotechnologie'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 60 FROM orientation_majors WHERE major_name = 'Biotechnologie'
UNION ALL SELECT id, 'Valeur_Autonomie', 80 FROM orientation_majors WHERE major_name = 'Biotechnologie'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 80 FROM orientation_majors WHERE major_name = 'Biotechnologie'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 70 FROM orientation_majors WHERE major_name = 'Biotechnologie'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 85 FROM orientation_majors WHERE major_name = 'Biotechnologie'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 85 FROM orientation_majors WHERE major_name = 'Biotechnologie';

-- ========================================
-- 30. SCIENCE ET INGÉNIERIE DES MATÉRIAUX
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 98 FROM orientation_majors WHERE major_name = 'Science et Ingénierie des Matériaux'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 50 FROM orientation_majors WHERE major_name = 'Science et Ingénierie des Matériaux'
UNION ALL SELECT id, 'Interet_Social_Humain', 20 FROM orientation_majors WHERE major_name = 'Science et Ingénierie des Matériaux'
UNION ALL SELECT id, 'Interet_Business_Gestion', 40 FROM orientation_majors WHERE major_name = 'Science et Ingénierie des Matériaux'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 95 FROM orientation_majors WHERE major_name = 'Science et Ingénierie des Matériaux'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 95 FROM orientation_majors WHERE major_name = 'Science et Ingénierie des Matériaux'
UNION ALL SELECT id, 'Competence_Communication', 60 FROM orientation_majors WHERE major_name = 'Science et Ingénierie des Matériaux'
UNION ALL SELECT id, 'Competence_Organisation', 80 FROM orientation_majors WHERE major_name = 'Science et Ingénierie des Matériaux'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 90 FROM orientation_majors WHERE major_name = 'Science et Ingénierie des Matériaux'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 75 FROM orientation_majors WHERE major_name = 'Science et Ingénierie des Matériaux'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 95 FROM orientation_majors WHERE major_name = 'Science et Ingénierie des Matériaux'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 70 FROM orientation_majors WHERE major_name = 'Science et Ingénierie des Matériaux'
UNION ALL SELECT id, 'Valeur_Autonomie', 75 FROM orientation_majors WHERE major_name = 'Science et Ingénierie des Matériaux'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 70 FROM orientation_majors WHERE major_name = 'Science et Ingénierie des Matériaux'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 70 FROM orientation_majors WHERE major_name = 'Science et Ingénierie des Matériaux'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 90 FROM orientation_majors WHERE major_name = 'Science et Ingénierie des Matériaux'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 80 FROM orientation_majors WHERE major_name = 'Science et Ingénierie des Matériaux';

-- Message de confirmation pour les 30 premières majeures
SELECT 'Profils idéaux ajoutés pour les 30 premières majeures' AS status;

-- ========================================
-- 31. E-COMMERCE
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 50 FROM orientation_majors WHERE major_name = 'E-Commerce'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 70 FROM orientation_majors WHERE major_name = 'E-Commerce'
UNION ALL SELECT id, 'Interet_Social_Humain', 70 FROM orientation_majors WHERE major_name = 'E-Commerce'
UNION ALL SELECT id, 'Interet_Business_Gestion', 98 FROM orientation_majors WHERE major_name = 'E-Commerce'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 85 FROM orientation_majors WHERE major_name = 'E-Commerce'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 85 FROM orientation_majors WHERE major_name = 'E-Commerce'
UNION ALL SELECT id, 'Competence_Communication', 95 FROM orientation_majors WHERE major_name = 'E-Commerce'
UNION ALL SELECT id, 'Competence_Organisation', 95 FROM orientation_majors WHERE major_name = 'E-Commerce'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 20 FROM orientation_majors WHERE major_name = 'E-Commerce'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 60 FROM orientation_majors WHERE major_name = 'E-Commerce'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 95 FROM orientation_majors WHERE major_name = 'E-Commerce'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 60 FROM orientation_majors WHERE major_name = 'E-Commerce'
UNION ALL SELECT id, 'Valeur_Autonomie', 80 FROM orientation_majors WHERE major_name = 'E-Commerce'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 90 FROM orientation_majors WHERE major_name = 'E-Commerce'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 70 FROM orientation_majors WHERE major_name = 'E-Commerce'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 70 FROM orientation_majors WHERE major_name = 'E-Commerce'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 60 FROM orientation_majors WHERE major_name = 'E-Commerce';

-- ========================================
-- 32. INGÉNIERIE ROBOTIQUE
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 98 FROM orientation_majors WHERE major_name = 'Ingénierie Robotique'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 60 FROM orientation_majors WHERE major_name = 'Ingénierie Robotique'
UNION ALL SELECT id, 'Interet_Social_Humain', 20 FROM orientation_majors WHERE major_name = 'Ingénierie Robotique'
UNION ALL SELECT id, 'Interet_Business_Gestion', 40 FROM orientation_majors WHERE major_name = 'Ingénierie Robotique'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 98 FROM orientation_majors WHERE major_name = 'Ingénierie Robotique'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 98 FROM orientation_majors WHERE major_name = 'Ingénierie Robotique'
UNION ALL SELECT id, 'Competence_Communication', 70 FROM orientation_majors WHERE major_name = 'Ingénierie Robotique'
UNION ALL SELECT id, 'Competence_Organisation', 85 FROM orientation_majors WHERE major_name = 'Ingénierie Robotique'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 95 FROM orientation_majors WHERE major_name = 'Ingénierie Robotique'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 75 FROM orientation_majors WHERE major_name = 'Ingénierie Robotique'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 98 FROM orientation_majors WHERE major_name = 'Ingénierie Robotique'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 70 FROM orientation_majors WHERE major_name = 'Ingénierie Robotique'
UNION ALL SELECT id, 'Valeur_Autonomie', 85 FROM orientation_majors WHERE major_name = 'Ingénierie Robotique'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 80 FROM orientation_majors WHERE major_name = 'Ingénierie Robotique'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 70 FROM orientation_majors WHERE major_name = 'Ingénierie Robotique'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 90 FROM orientation_majors WHERE major_name = 'Ingénierie Robotique'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 70 FROM orientation_majors WHERE major_name = 'Ingénierie Robotique';

-- ========================================
-- 33. INGÉNIERIE BIOMÉDICALE
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 98 FROM orientation_majors WHERE major_name = 'Ingénierie Biomédicale'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 20 FROM orientation_majors WHERE major_name = 'Ingénierie Biomédicale'
UNION ALL SELECT id, 'Interet_Social_Humain', 70 FROM orientation_majors WHERE major_name = 'Ingénierie Biomédicale'
UNION ALL SELECT id, 'Interet_Business_Gestion', 40 FROM orientation_majors WHERE major_name = 'Ingénierie Biomédicale'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 98 FROM orientation_majors WHERE major_name = 'Ingénierie Biomédicale'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 98 FROM orientation_majors WHERE major_name = 'Ingénierie Biomédicale'
UNION ALL SELECT id, 'Competence_Communication', 80 FROM orientation_majors WHERE major_name = 'Ingénierie Biomédicale'
UNION ALL SELECT id, 'Competence_Organisation', 85 FROM orientation_majors WHERE major_name = 'Ingénierie Biomédicale'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 80 FROM orientation_majors WHERE major_name = 'Ingénierie Biomédicale'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 95 FROM orientation_majors WHERE major_name = 'Ingénierie Biomédicale'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 95 FROM orientation_majors WHERE major_name = 'Ingénierie Biomédicale'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 75 FROM orientation_majors WHERE major_name = 'Ingénierie Biomédicale'
UNION ALL SELECT id, 'Valeur_Autonomie', 80 FROM orientation_majors WHERE major_name = 'Ingénierie Biomédicale'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 90 FROM orientation_majors WHERE major_name = 'Ingénierie Biomédicale'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 60 FROM orientation_majors WHERE major_name = 'Ingénierie Biomédicale'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 80 FROM orientation_majors WHERE major_name = 'Ingénierie Biomédicale'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 85 FROM orientation_majors WHERE major_name = 'Ingénierie Biomédicale';

-- ========================================
-- 34. SCIENCE DES DONNÉES
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 98 FROM orientation_majors WHERE major_name = 'Science des Données'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 20 FROM orientation_majors WHERE major_name = 'Science des Données'
UNION ALL SELECT id, 'Interet_Social_Humain', 30 FROM orientation_majors WHERE major_name = 'Science des Données'
UNION ALL SELECT id, 'Interet_Business_Gestion', 70 FROM orientation_majors WHERE major_name = 'Science des Données'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 98 FROM orientation_majors WHERE major_name = 'Science des Données'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 98 FROM orientation_majors WHERE major_name = 'Science des Données'
UNION ALL SELECT id, 'Competence_Communication', 70 FROM orientation_majors WHERE major_name = 'Science des Données'
UNION ALL SELECT id, 'Competence_Organisation', 80 FROM orientation_majors WHERE major_name = 'Science des Données'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 30 FROM orientation_majors WHERE major_name = 'Science des Données'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 70 FROM orientation_majors WHERE major_name = 'Science des Données'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 95 FROM orientation_majors WHERE major_name = 'Science des Données'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 75 FROM orientation_majors WHERE major_name = 'Science des Données'
UNION ALL SELECT id, 'Valeur_Autonomie', 85 FROM orientation_majors WHERE major_name = 'Science des Données'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 80 FROM orientation_majors WHERE major_name = 'Science des Données'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 70 FROM orientation_majors WHERE major_name = 'Science des Données'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 40 FROM orientation_majors WHERE major_name = 'Science des Données'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 90 FROM orientation_majors WHERE major_name = 'Science des Données';

-- ========================================
-- 35. ÉCONOMIE
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 40 FROM orientation_majors WHERE major_name = 'Économie'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 20 FROM orientation_majors WHERE major_name = 'Économie'
UNION ALL SELECT id, 'Interet_Social_Humain', 80 FROM orientation_majors WHERE major_name = 'Économie'
UNION ALL SELECT id, 'Interet_Business_Gestion', 90 FROM orientation_majors WHERE major_name = 'Économie'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 98 FROM orientation_majors WHERE major_name = 'Économie'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 90 FROM orientation_majors WHERE major_name = 'Économie'
UNION ALL SELECT id, 'Competence_Communication', 85 FROM orientation_majors WHERE major_name = 'Économie'
UNION ALL SELECT id, 'Competence_Organisation', 80 FROM orientation_majors WHERE major_name = 'Économie'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 10 FROM orientation_majors WHERE major_name = 'Économie'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 85 FROM orientation_majors WHERE major_name = 'Économie'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 70 FROM orientation_majors WHERE major_name = 'Économie'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 75 FROM orientation_majors WHERE major_name = 'Économie'
UNION ALL SELECT id, 'Valeur_Autonomie', 70 FROM orientation_majors WHERE major_name = 'Économie'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 80 FROM orientation_majors WHERE major_name = 'Économie'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 60 FROM orientation_majors WHERE major_name = 'Économie'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 40 FROM orientation_majors WHERE major_name = 'Économie'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 90 FROM orientation_majors WHERE major_name = 'Économie';

-- ========================================
-- 36. GÉNIE CHIMIQUE
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 98 FROM orientation_majors WHERE major_name = 'Génie Chimique'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 20 FROM orientation_majors WHERE major_name = 'Génie Chimique'
UNION ALL SELECT id, 'Interet_Social_Humain', 30 FROM orientation_majors WHERE major_name = 'Génie Chimique'
UNION ALL SELECT id, 'Interet_Business_Gestion', 50 FROM orientation_majors WHERE major_name = 'Génie Chimique'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 95 FROM orientation_majors WHERE major_name = 'Génie Chimique'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 95 FROM orientation_majors WHERE major_name = 'Génie Chimique'
UNION ALL SELECT id, 'Competence_Communication', 70 FROM orientation_majors WHERE major_name = 'Génie Chimique'
UNION ALL SELECT id, 'Competence_Organisation', 90 FROM orientation_majors WHERE major_name = 'Génie Chimique'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 80 FROM orientation_majors WHERE major_name = 'Génie Chimique'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 80 FROM orientation_majors WHERE major_name = 'Génie Chimique'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 90 FROM orientation_majors WHERE major_name = 'Génie Chimique'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 80 FROM orientation_majors WHERE major_name = 'Génie Chimique'
UNION ALL SELECT id, 'Valeur_Autonomie', 70 FROM orientation_majors WHERE major_name = 'Génie Chimique'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 85 FROM orientation_majors WHERE major_name = 'Génie Chimique'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 60 FROM orientation_majors WHERE major_name = 'Génie Chimique'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 90 FROM orientation_majors WHERE major_name = 'Génie Chimique'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 70 FROM orientation_majors WHERE major_name = 'Génie Chimique';

-- ========================================
-- 37. INGÉNIERIE PÉTROLIÈRE
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 95 FROM orientation_majors WHERE major_name = 'Ingénierie Pétrolière'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 10 FROM orientation_majors WHERE major_name = 'Ingénierie Pétrolière'
UNION ALL SELECT id, 'Interet_Social_Humain', 20 FROM orientation_majors WHERE major_name = 'Ingénierie Pétrolière'
UNION ALL SELECT id, 'Interet_Business_Gestion', 60 FROM orientation_majors WHERE major_name = 'Ingénierie Pétrolière'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 95 FROM orientation_majors WHERE major_name = 'Ingénierie Pétrolière'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 95 FROM orientation_majors WHERE major_name = 'Ingénierie Pétrolière'
UNION ALL SELECT id, 'Competence_Communication', 70 FROM orientation_majors WHERE major_name = 'Ingénierie Pétrolière'
UNION ALL SELECT id, 'Competence_Organisation', 90 FROM orientation_majors WHERE major_name = 'Ingénierie Pétrolière'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 90 FROM orientation_majors WHERE major_name = 'Ingénierie Pétrolière'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 50 FROM orientation_majors WHERE major_name = 'Ingénierie Pétrolière'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 80 FROM orientation_majors WHERE major_name = 'Ingénierie Pétrolière'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 90 FROM orientation_majors WHERE major_name = 'Ingénierie Pétrolière'
UNION ALL SELECT id, 'Valeur_Autonomie', 80 FROM orientation_majors WHERE major_name = 'Ingénierie Pétrolière'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 80 FROM orientation_majors WHERE major_name = 'Ingénierie Pétrolière'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 70 FROM orientation_majors WHERE major_name = 'Ingénierie Pétrolière'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 95 FROM orientation_majors WHERE major_name = 'Ingénierie Pétrolière'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 60 FROM orientation_majors WHERE major_name = 'Ingénierie Pétrolière';

-- ========================================
-- 38. INGÉNIERIE ÉLECTRONIQUE ET DE L'INFORMATION
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 98 FROM orientation_majors WHERE major_name = 'Ingénierie Électronique et de l\'Information'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 20 FROM orientation_majors WHERE major_name = 'Ingénierie Électronique et de l\'Information'
UNION ALL SELECT id, 'Interet_Social_Humain', 20 FROM orientation_majors WHERE major_name = 'Ingénierie Électronique et de l\'Information'
UNION ALL SELECT id, 'Interet_Business_Gestion', 40 FROM orientation_majors WHERE major_name = 'Ingénierie Électronique et de l\'Information'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 98 FROM orientation_majors WHERE major_name = 'Ingénierie Électronique et de l\'Information'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 98 FROM orientation_majors WHERE major_name = 'Ingénierie Électronique et de l\'Information'
UNION ALL SELECT id, 'Competence_Communication', 70 FROM orientation_majors WHERE major_name = 'Ingénierie Électronique et de l\'Information'
UNION ALL SELECT id, 'Competence_Organisation', 85 FROM orientation_majors WHERE major_name = 'Ingénierie Électronique et de l\'Information'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 80 FROM orientation_majors WHERE major_name = 'Ingénierie Électronique et de l\'Information'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 75 FROM orientation_majors WHERE major_name = 'Ingénierie Électronique et de l\'Information'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 98 FROM orientation_majors WHERE major_name = 'Ingénierie Électronique et de l\'Information'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 75 FROM orientation_majors WHERE major_name = 'Ingénierie Électronique et de l\'Information'
UNION ALL SELECT id, 'Valeur_Autonomie', 85 FROM orientation_majors WHERE major_name = 'Ingénierie Électronique et de l\'Information'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 80 FROM orientation_majors WHERE major_name = 'Ingénierie Électronique et de l\'Information'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 70 FROM orientation_majors WHERE major_name = 'Ingénierie Électronique et de l\'Information'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 80 FROM orientation_majors WHERE major_name = 'Ingénierie Électronique et de l\'Information'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 85 FROM orientation_majors WHERE major_name = 'Ingénierie Électronique et de l\'Information';

-- ========================================
-- 39. INGÉNIERIE DE LA SÉCURITÉ
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 90 FROM orientation_majors WHERE major_name = 'Ingénierie de la Sécurité'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 10 FROM orientation_majors WHERE major_name = 'Ingénierie de la Sécurité'
UNION ALL SELECT id, 'Interet_Social_Humain', 70 FROM orientation_majors WHERE major_name = 'Ingénierie de la Sécurité'
UNION ALL SELECT id, 'Interet_Business_Gestion', 60 FROM orientation_majors WHERE major_name = 'Ingénierie de la Sécurité'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 95 FROM orientation_majors WHERE major_name = 'Ingénierie de la Sécurité'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 95 FROM orientation_majors WHERE major_name = 'Ingénierie de la Sécurité'
UNION ALL SELECT id, 'Competence_Communication', 85 FROM orientation_majors WHERE major_name = 'Ingénierie de la Sécurité'
UNION ALL SELECT id, 'Competence_Organisation', 98 FROM orientation_majors WHERE major_name = 'Ingénierie de la Sécurité'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 70 FROM orientation_majors WHERE major_name = 'Ingénierie de la Sécurité'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 95 FROM orientation_majors WHERE major_name = 'Ingénierie de la Sécurité'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 70 FROM orientation_majors WHERE major_name = 'Ingénierie de la Sécurité'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 98 FROM orientation_majors WHERE major_name = 'Ingénierie de la Sécurité'
UNION ALL SELECT id, 'Valeur_Autonomie', 70 FROM orientation_majors WHERE major_name = 'Ingénierie de la Sécurité'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 90 FROM orientation_majors WHERE major_name = 'Ingénierie de la Sécurité'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 60 FROM orientation_majors WHERE major_name = 'Ingénierie de la Sécurité'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 80 FROM orientation_majors WHERE major_name = 'Ingénierie de la Sécurité'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 60 FROM orientation_majors WHERE major_name = 'Ingénierie de la Sécurité';

-- ========================================
-- 40. INGÉNIERIE MINIÈRE
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 95 FROM orientation_majors WHERE major_name = 'Ingénierie Minière'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 10 FROM orientation_majors WHERE major_name = 'Ingénierie Minière'
UNION ALL SELECT id, 'Interet_Social_Humain', 20 FROM orientation_majors WHERE major_name = 'Ingénierie Minière'
UNION ALL SELECT id, 'Interet_Business_Gestion', 60 FROM orientation_majors WHERE major_name = 'Ingénierie Minière'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 95 FROM orientation_majors WHERE major_name = 'Ingénierie Minière'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 95 FROM orientation_majors WHERE major_name = 'Ingénierie Minière'
UNION ALL SELECT id, 'Competence_Communication', 70 FROM orientation_majors WHERE major_name = 'Ingénierie Minière'
UNION ALL SELECT id, 'Competence_Organisation', 90 FROM orientation_majors WHERE major_name = 'Ingénierie Minière'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 95 FROM orientation_majors WHERE major_name = 'Ingénierie Minière'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 60 FROM orientation_majors WHERE major_name = 'Ingénierie Minière'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 80 FROM orientation_majors WHERE major_name = 'Ingénierie Minière'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 95 FROM orientation_majors WHERE major_name = 'Ingénierie Minière'
UNION ALL SELECT id, 'Valeur_Autonomie', 80 FROM orientation_majors WHERE major_name = 'Ingénierie Minière'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 85 FROM orientation_majors WHERE major_name = 'Ingénierie Minière'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 70 FROM orientation_majors WHERE major_name = 'Ingénierie Minière'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 98 FROM orientation_majors WHERE major_name = 'Ingénierie Minière'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 60 FROM orientation_majors WHERE major_name = 'Ingénierie Minière';

-- ========================================
-- 41. PSYCHOLOGIE
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 50 FROM orientation_majors WHERE major_name = 'Psychologie'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 40 FROM orientation_majors WHERE major_name = 'Psychologie'
UNION ALL SELECT id, 'Interet_Social_Humain', 98 FROM orientation_majors WHERE major_name = 'Psychologie'
UNION ALL SELECT id, 'Interet_Business_Gestion', 30 FROM orientation_majors WHERE major_name = 'Psychologie'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 80 FROM orientation_majors WHERE major_name = 'Psychologie'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 85 FROM orientation_majors WHERE major_name = 'Psychologie'
UNION ALL SELECT id, 'Competence_Communication', 98 FROM orientation_majors WHERE major_name = 'Psychologie'
UNION ALL SELECT id, 'Competence_Organisation', 70 FROM orientation_majors WHERE major_name = 'Psychologie'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 10 FROM orientation_majors WHERE major_name = 'Psychologie'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 95 FROM orientation_majors WHERE major_name = 'Psychologie'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 70 FROM orientation_majors WHERE major_name = 'Psychologie'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 60 FROM orientation_majors WHERE major_name = 'Psychologie'
UNION ALL SELECT id, 'Valeur_Autonomie', 70 FROM orientation_majors WHERE major_name = 'Psychologie'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 90 FROM orientation_majors WHERE major_name = 'Psychologie'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 70 FROM orientation_majors WHERE major_name = 'Psychologie'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 50 FROM orientation_majors WHERE major_name = 'Psychologie'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 90 FROM orientation_majors WHERE major_name = 'Psychologie';

-- ========================================
-- 42. INGÉNIERIE AÉRONAUTIQUE
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 98 FROM orientation_majors WHERE major_name = 'Ingénierie Aéronautique'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 50 FROM orientation_majors WHERE major_name = 'Ingénierie Aéronautique'
UNION ALL SELECT id, 'Interet_Social_Humain', 20 FROM orientation_majors WHERE major_name = 'Ingénierie Aéronautique'
UNION ALL SELECT id, 'Interet_Business_Gestion', 40 FROM orientation_majors WHERE major_name = 'Ingénierie Aéronautique'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 98 FROM orientation_majors WHERE major_name = 'Ingénierie Aéronautique'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 98 FROM orientation_majors WHERE major_name = 'Ingénierie Aéronautique'
UNION ALL SELECT id, 'Competence_Communication', 70 FROM orientation_majors WHERE major_name = 'Ingénierie Aéronautique'
UNION ALL SELECT id, 'Competence_Organisation', 90 FROM orientation_majors WHERE major_name = 'Ingénierie Aéronautique'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 90 FROM orientation_majors WHERE major_name = 'Ingénierie Aéronautique'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 75 FROM orientation_majors WHERE major_name = 'Ingénierie Aéronautique'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 98 FROM orientation_majors WHERE major_name = 'Ingénierie Aéronautique'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 95 FROM orientation_majors WHERE major_name = 'Ingénierie Aéronautique'
UNION ALL SELECT id, 'Valeur_Autonomie', 80 FROM orientation_majors WHERE major_name = 'Ingénierie Aéronautique'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 90 FROM orientation_majors WHERE major_name = 'Ingénierie Aéronautique'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 60 FROM orientation_majors WHERE major_name = 'Ingénierie Aéronautique'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 85 FROM orientation_majors WHERE major_name = 'Ingénierie Aéronautique'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 80 FROM orientation_majors WHERE major_name = 'Ingénierie Aéronautique';

-- ========================================
-- 43. INGÉNIERIE AÉROSPATIALE
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 98 FROM orientation_majors WHERE major_name = 'Ingénierie Aérospatiale'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 50 FROM orientation_majors WHERE major_name = 'Ingénierie Aérospatiale'
UNION ALL SELECT id, 'Interet_Social_Humain', 20 FROM orientation_majors WHERE major_name = 'Ingénierie Aérospatiale'
UNION ALL SELECT id, 'Interet_Business_Gestion', 40 FROM orientation_majors WHERE major_name = 'Ingénierie Aérospatiale'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 98 FROM orientation_majors WHERE major_name = 'Ingénierie Aérospatiale'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 98 FROM orientation_majors WHERE major_name = 'Ingénierie Aérospatiale'
UNION ALL SELECT id, 'Competence_Communication', 70 FROM orientation_majors WHERE major_name = 'Ingénierie Aérospatiale'
UNION ALL SELECT id, 'Competence_Organisation', 90 FROM orientation_majors WHERE major_name = 'Ingénierie Aérospatiale'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 90 FROM orientation_majors WHERE major_name = 'Ingénierie Aérospatiale'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 80 FROM orientation_majors WHERE major_name = 'Ingénierie Aérospatiale'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 98 FROM orientation_majors WHERE major_name = 'Ingénierie Aérospatiale'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 95 FROM orientation_majors WHERE major_name = 'Ingénierie Aérospatiale'
UNION ALL SELECT id, 'Valeur_Autonomie', 80 FROM orientation_majors WHERE major_name = 'Ingénierie Aérospatiale'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 90 FROM orientation_majors WHERE major_name = 'Ingénierie Aérospatiale'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 60 FROM orientation_majors WHERE major_name = 'Ingénierie Aérospatiale'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 85 FROM orientation_majors WHERE major_name = 'Ingénierie Aérospatiale'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 80 FROM orientation_majors WHERE major_name = 'Ingénierie Aérospatiale';

-- ========================================
-- 44. MÉDECINE
-- ========================================
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 95 FROM orientation_majors WHERE major_name = 'Médecine'
UNION ALL SELECT id, 'Interet_Artistique_Creatif', 10 FROM orientation_majors WHERE major_name = 'Médecine'
UNION ALL SELECT id, 'Interet_Social_Humain', 98 FROM orientation_majors WHERE major_name = 'Médecine'
UNION ALL SELECT id, 'Interet_Business_Gestion', 20 FROM orientation_majors WHERE major_name = 'Médecine'
UNION ALL SELECT id, 'Interet_Logique_Analytique', 90 FROM orientation_majors WHERE major_name = 'Médecine'
UNION ALL SELECT id, 'Competence_Resolution_Problemes', 95 FROM orientation_majors WHERE major_name = 'Médecine'
UNION ALL SELECT id, 'Competence_Communication', 98 FROM orientation_majors WHERE major_name = 'Médecine'
UNION ALL SELECT id, 'Competence_Organisation', 90 FROM orientation_majors WHERE major_name = 'Médecine'
UNION ALL SELECT id, 'Competence_Manuel_Technique', 75 FROM orientation_majors WHERE major_name = 'Médecine'
UNION ALL SELECT id, 'Valeur_Impact_Societal', 98 FROM orientation_majors WHERE major_name = 'Médecine'
UNION ALL SELECT id, 'Valeur_Innovation_Challenge', 70 FROM orientation_majors WHERE major_name = 'Médecine'
UNION ALL SELECT id, 'Valeur_Stabilite_Securite', 85 FROM orientation_majors WHERE major_name = 'Médecine'
UNION ALL SELECT id, 'Valeur_Autonomie', 60 FROM orientation_majors WHERE major_name = 'Médecine'
UNION ALL SELECT id, 'Pref_Travail_Equipe_Collab', 95 FROM orientation_majors WHERE major_name = 'Médecine'
UNION ALL SELECT id, 'Pref_Travail_Autonome', 50 FROM orientation_majors WHERE major_name = 'Médecine'
UNION ALL SELECT id, 'Pref_Pratique_Terrain', 90 FROM orientation_majors WHERE major_name = 'Médecine'
UNION ALL SELECT id, 'Pref_Theorie_Recherche', 80 FROM orientation_majors WHERE major_name = 'Médecine';

-- ========================================
-- MESSAGE DE CONFIRMATION FINAL
-- ========================================
SELECT '🎉 TOUS les profils idéaux des 44 majeures ont été ajoutés avec succès !' AS status;
SELECT '📊 Total: 44 majeures × 17 piliers = 748 profils idéaux' AS total_profiles;
SELECT '✅ Le système d''orientation est maintenant 100% opérationnel !' AS final_status;
