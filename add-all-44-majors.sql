-- Script pour ajouter toutes les 44 majeures dans orientation_majors
-- Ce script doit être exécuté AVANT d'ajouter les profils idéaux

USE diravenir;

-- Vérification et nettoyage des tables existantes
DROP TABLE IF EXISTS ideal_profiles;
DROP TABLE IF EXISTS major_program_mapping;
DROP TABLE IF EXISTS orientation_majors;

-- Recréation de la table orientation_majors
CREATE TABLE orientation_majors (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    major_name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertion des 44 majeures
INSERT INTO orientation_majors (major_name, description) VALUES
('Génie Civil', 'Ingénierie civile et construction'),
('Génie Mécanique', 'Ingénierie mécanique et fabrication'),
('Architecture', 'Architecture et design urbain'),
('Commerce International', 'Commerce international et affaires'),
('Administration des Affaires', 'Administration et gestion d''entreprise'),
('Économie et Commerce International', 'Économie et commerce international'),
('Marketing et Management', 'Marketing et gestion stratégique'),
('Informatique', 'Sciences informatiques'),
('Génie Logiciel', 'Ingénierie logicielle'),
('Intelligence Artificielle', 'Intelligence artificielle et apprentissage'),
('Gestion du Tourisme', 'Gestion du tourisme et hôtellerie'),
('Soins Infirmiers', 'Soins infirmiers et santé'),
('Pharmacie', 'Sciences pharmaceutiques'),
('Génie Électrique', 'Ingénierie électrique'),
('Sciences et Ingénierie Alimentaires', 'Sciences alimentaires et nutrition'),
('Finance', 'Finance et gestion financière'),
('Conception Mécanique, Fabrication et Automatisation', 'Conception et fabrication mécanique'),
('Science du Droit', 'Sciences juridiques'),
('Politique Internationale', 'Politique et relations internationales'),
('MBBS', 'Médecine et chirurgie'),
('Relations Publiques', 'Relations publiques et communication'),
('Chimie Appliquée', 'Chimie appliquée et industrielle'),
('Études Anglaises', 'Langue et littérature anglaises'),
('Médecine Dentaire', 'Médecine dentaire'),
('Sciences et Ingénierie des Nouvelles Énergies', 'Énergies renouvelables'),
('Ingénierie Hydraulique', 'Ingénierie hydraulique et hydrologie'),
('Ingénierie des Transports', 'Ingénierie des transports'),
('Bioingénierie', 'Ingénierie biologique'),
('Biotechnologie', 'Biotechnologie et génie génétique'),
('Science et Ingénierie des Matériaux', 'Science des matériaux'),
('E-Commerce', 'Commerce électronique'),
('Ingénierie Robotique', 'Robotique et automatisation'),
('Ingénierie Biomédicale', 'Ingénierie biomédicale'),
('Science des Données', 'Science des données et analyse'),
('Économie', 'Sciences économiques'),
('Génie Chimique', 'Ingénierie chimique'),
('Ingénierie Pétrolière', 'Ingénierie pétrolière'),
('Ingénierie Électronique et de l''Information', 'Électronique et informatique'),
('Ingénierie de la Sécurité', 'Ingénierie de la sécurité'),
('Ingénierie Minière', 'Ingénierie minière'),
('Psychologie', 'Sciences psychologiques'),
('Ingénierie Aéronautique', 'Ingénierie aéronautique'),
('Ingénierie Aérospatiale', 'Ingénierie aérospatiale'),
('Médecine', 'Médecine générale');

-- Vérification de l'insertion
SELECT COUNT(*) as total_majors FROM orientation_majors;
SELECT major_name FROM orientation_majors ORDER BY id;

-- Message de confirmation
SELECT '44 majeures ajoutées avec succès dans orientation_majors' AS status;
