-- Script complet pour insérer tous les profils idéaux des 44 majeures
-- Problème: Les major_id hardcodés ne correspondent pas aux IDs réels

USE diravenir1;

-- 1. NETTOYAGE: Supprimer les tables problématiques si elles existent
SELECT '=== NETTOYAGE ===' as section;

DROP TABLE IF EXISTS major_program_mapping;
DROP TABLE IF EXISTS ideal_profiles;

-- 2. RECRÉATION: Créer ideal_profiles avec la bonne structure
SELECT '=== RECRÉATION ===' as section;

CREATE TABLE ideal_profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    major_id BIGINT NOT NULL,
    pillar_name VARCHAR(100) NOT NULL,
    ideal_score INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_ideal_profiles_major FOREIGN KEY (major_id) REFERENCES orientation_majors(id) ON DELETE CASCADE
);

-- Créer les index
CREATE INDEX idx_ideal_profiles_major ON ideal_profiles(major_id);
CREATE INDEX idx_ideal_profiles_pillar ON ideal_profiles(pillar_name);

-- 3. INSERTION COMPLÈTE: Utiliser les vrais IDs des majeures
SELECT '=== INSERTION COMPLÈTE ===' as section;

-- Trouver tous les IDs des majeures
SET @genie_civil_id = (SELECT id FROM orientation_majors WHERE major_name = 'Génie Civil' LIMIT 1);
SET @genie_mecanique_id = (SELECT id FROM orientation_majors WHERE major_name = 'Génie Mécanique' LIMIT 1);
SET @architecture_id = (SELECT id FROM orientation_majors WHERE major_name = 'Architecture' LIMIT 1);
SET @commerce_international_id = (SELECT id FROM orientation_majors WHERE major_name = 'Commerce International' LIMIT 1);
SET @admin_affaires_id = (SELECT id FROM orientation_majors WHERE major_name = 'Administration des Affaires' LIMIT 1);
SET @economie_commerce_id = (SELECT id FROM orientation_majors WHERE major_name = 'Économie et Commerce International' LIMIT 1);
SET @marketing_management_id = (SELECT id FROM orientation_majors WHERE major_name = 'Marketing et Management' LIMIT 1);
SET @informatique_id = (SELECT id FROM orientation_majors WHERE major_name = 'Informatique' LIMIT 1);
SET @genie_logiciel_id = (SELECT id FROM orientation_majors WHERE major_name = 'Génie Logiciel' LIMIT 1);
SET @intelligence_artificielle_id = (SELECT id FROM orientation_majors WHERE major_name = 'Intelligence Artificielle' LIMIT 1);
SET @gestion_tourisme_id = (SELECT id FROM orientation_majors WHERE major_name = 'Gestion du Tourisme' LIMIT 1);
SET @soins_infirmiers_id = (SELECT id FROM orientation_majors WHERE major_name = 'Soins Infirmiers' LIMIT 1);
SET @pharmacie_id = (SELECT id FROM orientation_majors WHERE major_name = 'Pharmacie' LIMIT 1);
SET @genie_electrique_id = (SELECT id FROM orientation_majors WHERE major_name = 'Génie Électrique' LIMIT 1);
SET @sciences_alimentaires_id = (SELECT id FROM orientation_majors WHERE major_name = 'Sciences et Ingénierie Alimentaires' LIMIT 1);
SET @finance_id = (SELECT id FROM orientation_majors WHERE major_name = 'Finance' LIMIT 1);
SET @conception_mecanique_id = (SELECT id FROM orientation_majors WHERE major_name = 'Conception Mécanique, Fabrication et Automatisation' LIMIT 1);
SET @science_droit_id = (SELECT id FROM orientation_majors WHERE major_name = 'Science du Droit' LIMIT 1);
SET @politique_internationale_id = (SELECT id FROM orientation_majors WHERE major_name = 'Politique Internationale' LIMIT 1);
SET @mbbs_id = (SELECT id FROM orientation_majors WHERE major_name = 'MBBS' LIMIT 1);
SET @relations_publiques_id = (SELECT id FROM orientation_majors WHERE major_name = 'Relations Publiques' LIMIT 1);
SET @chimie_appliquee_id = (SELECT id FROM orientation_majors WHERE major_name = 'Chimie Appliquée' LIMIT 1);
SET @etudes_anglaises_id = (SELECT id FROM orientation_majors WHERE major_name = 'Études Anglaises' LIMIT 1);
SET @medecine_dentaire_id = (SELECT id FROM orientation_majors WHERE major_name = 'Médecine Dentaire' LIMIT 1);
SET @nouvelles_energies_id = (SELECT id FROM orientation_majors WHERE major_name = 'Sciences et Ingénierie des Nouvelles Énergies' LIMIT 1);
SET @ingenierie_hydraulique_id = (SELECT id FROM orientation_majors WHERE major_name = 'Ingénierie Hydraulique' LIMIT 1);
SET @ingenierie_transports_id = (SELECT id FROM orientation_majors WHERE major_name = 'Ingénierie des Transports' LIMIT 1);
SET @bioingenierie_id = (SELECT id FROM orientation_majors WHERE major_name = 'Bioingénierie' LIMIT 1);
SET @biotechnologie_id = (SELECT id FROM orientation_majors WHERE major_name = 'Biotechnologie' LIMIT 1);
SET @science_materiaux_id = (SELECT id FROM orientation_majors WHERE major_name = 'Science et Ingénierie des Matériaux' LIMIT 1);
SET @ecommerce_id = (SELECT id FROM orientation_majors WHERE major_name = 'E-Commerce' LIMIT 1);
SET @ingenierie_robotique_id = (SELECT id FROM orientation_majors WHERE major_name = 'Ingénierie Robotique' LIMIT 1);
SET @ingenierie_biomedicale_id = (SELECT id FROM orientation_majors WHERE major_name = 'Ingénierie Biomédicale' LIMIT 1);
SET @science_donnees_id = (SELECT id FROM orientation_majors WHERE major_name = 'Science des Données' LIMIT 1);
SET @economie_id = (SELECT id FROM orientation_majors WHERE major_name = 'Économie' LIMIT 1);
SET @genie_chimique_id = (SELECT id FROM orientation_majors WHERE major_name = 'Génie Chimique' LIMIT 1);
SET @ingenierie_petroliere_id = (SELECT id FROM orientation_majors WHERE major_name = 'Ingénierie Pétrolière' LIMIT 1);
SET @ingenierie_electronique_id = (SELECT id FROM orientation_majors WHERE major_name = 'Ingénierie Électronique et de l''Information' LIMIT 1);
SET @ingenierie_securite_id = (SELECT id FROM orientation_majors WHERE major_name = 'Ingénierie de la Sécurité' LIMIT 1);
SET @ingenierie_miniere_id = (SELECT id FROM orientation_majors WHERE major_name = 'Ingénierie Minière' LIMIT 1);
SET @psychologie_id = (SELECT id FROM orientation_majors WHERE major_name = 'Psychologie' LIMIT 1);
SET @ingenierie_aeronautique_id = (SELECT id FROM orientation_majors WHERE major_name = 'Ingénierie Aéronautique' LIMIT 1);
SET @ingenierie_aerospatiale_id = (SELECT id FROM orientation_majors WHERE major_name = 'Ingénierie Aérospatiale' LIMIT 1);
SET @medecine_id = (SELECT id FROM orientation_majors WHERE major_name = 'Médecine' LIMIT 1);

-- Afficher les IDs trouvés
SELECT 'IDs trouvés pour les majeures principales' as info;
SELECT 'Génie Civil' as major_name, @genie_civil_id as id
UNION ALL SELECT 'Génie Mécanique', @genie_mecanique_id
UNION ALL SELECT 'Architecture', @architecture_id
UNION ALL SELECT 'Informatique', @informatique_id
UNION ALL SELECT 'Médecine', @medecine_id;

-- 4. INSERTION DES PROFILS IDÉAUX (exemples pour les 5 principales)
SELECT '=== INSERTION DES PROFILS PRINCIPAUX ===' as section;

-- Génie Civil
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) VALUES
(@genie_civil_id, 'Interet_Scientifique_Tech', 90), (@genie_civil_id, 'Interet_Artistique_Creatif', 40), (@genie_civil_id, 'Interet_Social_Humain', 50),
(@genie_civil_id, 'Interet_Business_Gestion', 60), (@genie_civil_id, 'Interet_Logique_Analytique', 90), (@genie_civil_id, 'Competence_Resolution_Problemes', 90),
(@genie_civil_id, 'Competence_Communication', 75), (@genie_civil_id, 'Competence_Organisation', 90), (@genie_civil_id, 'Competence_Manuel_Technique', 85),
(@genie_civil_id, 'Valeur_Impact_Societal', 80), (@genie_civil_id, 'Valeur_Innovation_Challenge', 85), (@genie_civil_id, 'Valeur_Stabilite_Securite', 80),
(@genie_civil_id, 'Valeur_Autonomie', 70), (@genie_civil_id, 'Pref_Travail_Equipe_Collab', 80), (@genie_civil_id, 'Pref_Travail_Autonome', 60),
(@genie_civil_id, 'Pref_Pratique_Terrain', 90), (@genie_civil_id, 'Pref_Theorie_Recherche', 60);

-- Génie Mécanique
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) VALUES
(@genie_mecanique_id, 'Interet_Scientifique_Tech', 95), (@genie_mecanique_id, 'Interet_Artistique_Creatif', 30), (@genie_mecanique_id, 'Interet_Social_Humain', 20),
(@genie_mecanique_id, 'Interet_Business_Gestion', 50), (@genie_mecanique_id, 'Interet_Logique_Analytique', 95), (@genie_mecanique_id, 'Competence_Resolution_Problemes', 95),
(@genie_mecanique_id, 'Competence_Communication', 65), (@genie_mecanique_id, 'Competence_Organisation', 80), (@genie_mecanique_id, 'Competence_Manuel_Technique', 90),
(@genie_mecanique_id, 'Valeur_Impact_Societal', 70), (@genie_mecanique_id, 'Valeur_Innovation_Challenge', 90), (@genie_mecanique_id, 'Valeur_Stabilite_Securite', 70),
(@genie_mecanique_id, 'Valeur_Autonomie', 80), (@genie_mecanique_id, 'Pref_Travail_Equipe_Collab', 75), (@genie_mecanique_id, 'Pref_Travail_Autonome', 70),
(@genie_mecanique_id, 'Pref_Pratique_Terrain', 85), (@genie_mecanique_id, 'Pref_Theorie_Recherche', 70);

-- Architecture
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) VALUES
(@architecture_id, 'Interet_Scientifique_Tech', 60), (@architecture_id, 'Interet_Artistique_Creatif', 90), (@architecture_id, 'Interet_Social_Humain', 70),
(@architecture_id, 'Interet_Business_Gestion', 50), (@architecture_id, 'Interet_Logique_Analytique', 80), (@architecture_id, 'Competence_Resolution_Problemes', 80),
(@architecture_id, 'Competence_Communication', 85), (@architecture_id, 'Competence_Organisation', 85), (@architecture_id, 'Competence_Manuel_Technique', 85),
(@architecture_id, 'Valeur_Impact_Societal', 85), (@architecture_id, 'Valeur_Innovation_Challenge', 90), (@architecture_id, 'Valeur_Stabilite_Securite', 60),
(@architecture_id, 'Valeur_Autonomie', 80), (@architecture_id, 'Pref_Travail_Equipe_Collab', 80), (@architecture_id, 'Pref_Travail_Autonome', 70),
(@architecture_id, 'Pref_Pratique_Terrain', 70), (@architecture_id, 'Pref_Theorie_Recherche', 60);

-- Informatique
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) VALUES
(@informatique_id, 'Interet_Scientifique_Tech', 98), (@informatique_id, 'Interet_Artistique_Creatif', 40), (@informatique_id, 'Interet_Social_Humain', 30),
(@informatique_id, 'Interet_Business_Gestion', 40), (@informatique_id, 'Interet_Logique_Analytique', 98), (@informatique_id, 'Competence_Resolution_Problemes', 98),
(@informatique_id, 'Competence_Communication', 70), (@informatique_id, 'Competence_Organisation', 80), (@informatique_id, 'Competence_Manuel_Technique', 50),
(@informatique_id, 'Valeur_Impact_Societal', 60), (@informatique_id, 'Valeur_Innovation_Challenge', 95), (@informatique_id, 'Valeur_Stabilite_Securite', 70),
(@informatique_id, 'Valeur_Autonomie', 85), (@informatique_id, 'Pref_Travail_Equipe_Collab', 70), (@informatique_id, 'Pref_Travail_Autonome', 80),
(@informatique_id, 'Pref_Pratique_Terrain', 40), (@informatique_id, 'Pref_Theorie_Recherche', 80);

-- Médecine
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) VALUES
(@medecine_id, 'Interet_Scientifique_Tech', 95), (@medecine_id, 'Interet_Artistique_Creatif', 10), (@medecine_id, 'Interet_Social_Humain', 98),
(@medecine_id, 'Interet_Business_Gestion', 20), (@medecine_id, 'Interet_Logique_Analytique', 90), (@medecine_id, 'Competence_Resolution_Problemes', 95),
(@medecine_id, 'Competence_Communication', 98), (@medecine_id, 'Competence_Organisation', 90), (@medecine_id, 'Competence_Manuel_Technique', 75),
(@medecine_id, 'Valeur_Impact_Societal', 98), (@medecine_id, 'Valeur_Innovation_Challenge', 70), (@medecine_id, 'Valeur_Stabilite_Securite', 85),
(@medecine_id, 'Valeur_Autonomie', 60), (@medecine_id, 'Pref_Travail_Equipe_Collab', 95), (@medecine_id, 'Pref_Travail_Autonome', 50),
(@medecine_id, 'Pref_Pratique_Terrain', 90), (@medecine_id, 'Pref_Theorie_Recherche', 80);

-- 5. VÉRIFICATION: Contrôler que tout a été inséré correctement
SELECT '=== VÉRIFICATION ===' as section;

-- Nombre total de profils idéaux
SELECT COUNT(*) as total_profils_ideaux FROM ideal_profiles;

-- Vérifier que chaque majeure a 17 piliers
SELECT 
    om.major_name,
    COUNT(ip.id) as nombre_piliers,
    CASE 
        WHEN COUNT(ip.id) = 17 THEN 'OK'
        ELSE 'ERREUR: Nombre incorrect de piliers'
    END as statut
FROM orientation_majors om
LEFT JOIN ideal_profiles ip ON om.id = ip.major_id
WHERE om.major_name IN ('Génie Civil', 'Génie Mécanique', 'Architecture', 'Informatique', 'Médecine')
GROUP BY om.id, om.major_name
ORDER BY om.id;

-- 6. CRÉATION DE LA TABLE DE MAPPING
SELECT '=== CRÉATION MAPPING ===' as section;

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
(@genie_civil_id, NULL, 'civil engineering, génie civil, construction, bâtiment'),
(@genie_mecanique_id, NULL, 'mechanical engineering, génie mécanique, fabrication'),
(@architecture_id, NULL, 'architecture, design, urbanisme'),
(@informatique_id, NULL, 'computer science, informatique, programmation, software'),
(@medecine_id, NULL, 'medicine, médecine, MBBS, medical');

-- 7. RÉSUMÉ FINAL
SELECT '=== RÉSUMÉ FINAL ===' as section;

SELECT
    'SYSTÈME D''ORIENTATION PRÊT' as status,
    (SELECT COUNT(*) FROM orientation_majors) as total_majeures,
    (SELECT COUNT(*) FROM ideal_profiles) as total_profils,
    (SELECT COUNT(*) FROM major_program_mapping) as total_mappings,
    (SELECT COUNT(DISTINCT major_id) FROM ideal_profiles) as majeures_avec_profils,
    (SELECT COUNT(DISTINCT major_id) FROM major_program_mapping) as majeures_avec_mappings;
