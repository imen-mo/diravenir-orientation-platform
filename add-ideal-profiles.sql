-- Script pour ajouter tous les profils idéaux des 44 majeures
-- Ce script doit être exécuté APRÈS add-all-44-majors.sql

USE diravenir;

-- Recréation de la table ideal_profiles
CREATE TABLE IF NOT EXISTS ideal_profiles (
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

-- Insertion des profils idéaux pour Génie Civil
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 90 FROM orientation_majors WHERE major_name = 'Génie Civil'
UNION ALL
SELECT id, 'Interet_Artistique_Creatif', 40 FROM orientation_majors WHERE major_name = 'Génie Civil'
UNION ALL
SELECT id, 'Interet_Social_Humain', 50 FROM orientation_majors WHERE major_name = 'Génie Civil'
UNION ALL
SELECT id, 'Interet_Business_Gestion', 60 FROM orientation_majors WHERE major_name = 'Génie Civil'
UNION ALL
SELECT id, 'Interet_Logique_Analytique', 90 FROM orientation_majors WHERE major_name = 'Génie Civil'
UNION ALL
SELECT id, 'Competence_Resolution_Problemes', 90 FROM orientation_majors WHERE major_name = 'Génie Civil'
UNION ALL
SELECT id, 'Competence_Communication', 75 FROM orientation_majors WHERE major_name = 'Génie Civil'
UNION ALL
SELECT id, 'Competence_Organisation', 90 FROM orientation_majors WHERE major_name = 'Génie Civil'
UNION ALL
SELECT id, 'Competence_Manuel_Technique', 85 FROM orientation_majors WHERE major_name = 'Génie Civil'
UNION ALL
SELECT id, 'Valeur_Impact_Societal', 80 FROM orientation_majors WHERE major_name = 'Génie Civil'
UNION ALL
SELECT id, 'Valeur_Innovation_Challenge', 85 FROM orientation_majors WHERE major_name = 'Génie Civil'
UNION ALL
SELECT id, 'Valeur_Stabilite_Securite', 80 FROM orientation_majors WHERE major_name = 'Génie Civil'
UNION ALL
SELECT id, 'Valeur_Autonomie', 70 FROM orientation_majors WHERE major_name = 'Génie Civil'
UNION ALL
SELECT id, 'Pref_Travail_Equipe_Collab', 80 FROM orientation_majors WHERE major_name = 'Génie Civil'
UNION ALL
SELECT id, 'Pref_Travail_Autonome', 60 FROM orientation_majors WHERE major_name = 'Génie Civil'
UNION ALL
SELECT id, 'Pref_Pratique_Terrain', 90 FROM orientation_majors WHERE major_name = 'Génie Civil'
UNION ALL
SELECT id, 'Pref_Theorie_Recherche', 60 FROM orientation_majors WHERE major_name = 'Génie Civil';

-- Insertion des profils idéaux pour Génie Mécanique
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 95 FROM orientation_majors WHERE major_name = 'Génie Mécanique'
UNION ALL
SELECT id, 'Interet_Artistique_Creatif', 30 FROM orientation_majors WHERE major_name = 'Génie Mécanique'
UNION ALL
SELECT id, 'Interet_Social_Humain', 20 FROM orientation_majors WHERE major_name = 'Génie Mécanique'
UNION ALL
SELECT id, 'Interet_Business_Gestion', 50 FROM orientation_majors WHERE major_name = 'Génie Mécanique'
UNION ALL
SELECT id, 'Interet_Logique_Analytique', 95 FROM orientation_majors WHERE major_name = 'Génie Mécanique'
UNION ALL
SELECT id, 'Competence_Resolution_Problemes', 95 FROM orientation_majors WHERE major_name = 'Génie Mécanique'
UNION ALL
SELECT id, 'Competence_Communication', 65 FROM orientation_majors WHERE major_name = 'Génie Mécanique'
UNION ALL
SELECT id, 'Competence_Organisation', 80 FROM orientation_majors WHERE major_name = 'Génie Mécanique'
UNION ALL
SELECT id, 'Competence_Manuel_Technique', 90 FROM orientation_majors WHERE major_name = 'Génie Mécanique'
UNION ALL
SELECT id, 'Valeur_Impact_Societal', 70 FROM orientation_majors WHERE major_name = 'Génie Mécanique'
UNION ALL
SELECT id, 'Valeur_Innovation_Challenge', 90 FROM orientation_majors WHERE major_name = 'Génie Mécanique'
UNION ALL
SELECT id, 'Valeur_Stabilite_Securite', 70 FROM orientation_majors WHERE major_name = 'Génie Mécanique'
UNION ALL
SELECT id, 'Valeur_Autonomie', 80 FROM orientation_majors WHERE major_name = 'Génie Mécanique'
UNION ALL
SELECT id, 'Pref_Travail_Equipe_Collab', 75 FROM orientation_majors WHERE major_name = 'Génie Mécanique'
UNION ALL
SELECT id, 'Pref_Travail_Autonome', 70 FROM orientation_majors WHERE major_name = 'Génie Mécanique'
UNION ALL
SELECT id, 'Pref_Pratique_Terrain', 85 FROM orientation_majors WHERE major_name = 'Génie Mécanique'
UNION ALL
SELECT id, 'Pref_Theorie_Recherche', 70 FROM orientation_majors WHERE major_name = 'Génie Mécanique';

-- Insertion des profils idéaux pour Architecture
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) 
SELECT id, 'Interet_Scientifique_Tech', 60 FROM orientation_majors WHERE major_name = 'Architecture'
UNION ALL
SELECT id, 'Interet_Artistique_Creatif', 90 FROM orientation_majors WHERE major_name = 'Architecture'
UNION ALL
SELECT id, 'Interet_Social_Humain', 70 FROM orientation_majors WHERE major_name = 'Architecture'
UNION ALL
SELECT id, 'Interet_Business_Gestion', 50 FROM orientation_majors WHERE major_name = 'Architecture'
UNION ALL
SELECT id, 'Interet_Logique_Analytique', 80 FROM orientation_majors WHERE major_name = 'Architecture'
UNION ALL
SELECT id, 'Competence_Resolution_Problemes', 80 FROM orientation_majors WHERE major_name = 'Architecture'
UNION ALL
SELECT id, 'Competence_Communication', 85 FROM orientation_majors WHERE major_name = 'Architecture'
UNION ALL
SELECT id, 'Competence_Organisation', 85 FROM orientation_majors WHERE major_name = 'Architecture'
UNION ALL
SELECT id, 'Competence_Manuel_Technique', 85 FROM orientation_majors WHERE major_name = 'Architecture'
UNION ALL
SELECT id, 'Valeur_Impact_Societal', 85 FROM orientation_majors WHERE major_name = 'Architecture'
UNION ALL
SELECT id, 'Valeur_Innovation_Challenge', 90 FROM orientation_majors WHERE major_name = 'Architecture'
UNION ALL
SELECT id, 'Valeur_Stabilite_Securite', 60 FROM orientation_majors WHERE major_name = 'Architecture'
UNION ALL
SELECT id, 'Valeur_Autonomie', 80 FROM orientation_majors WHERE major_name = 'Architecture'
UNION ALL
SELECT id, 'Pref_Travail_Equipe_Collab', 80 FROM orientation_majors WHERE major_name = 'Architecture'
UNION ALL
SELECT id, 'Pref_Travail_Autonome', 70 FROM orientation_majors WHERE major_name = 'Architecture'
UNION ALL
SELECT id, 'Pref_Pratique_Terrain', 70 FROM orientation_majors WHERE major_name = 'Architecture'
UNION ALL
SELECT id, 'Pref_Theorie_Recherche', 60 FROM orientation_majors WHERE major_name = 'Architecture';

-- Vérification de l'insertion
SELECT COUNT(*) as total_profiles FROM ideal_profiles;
SELECT m.major_name, COUNT(p.id) as profiles_count 
FROM orientation_majors m 
LEFT JOIN ideal_profiles p ON m.id = p.major_id 
GROUP BY m.id, m.major_name 
ORDER BY m.id;

-- Message de confirmation
SELECT 'Profils idéaux ajoutés avec succès pour les 3 premières majeures' AS status;
