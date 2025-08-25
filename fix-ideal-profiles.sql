-- Script de diagnostic et correction des profils idéaux
-- Problème: Les major_id hardcodés ne correspondent pas aux IDs réels

USE diravenir1;

-- 1. DIAGNOSTIC: Vérifier la structure et le contenu
SELECT '=== DIAGNOSTIC ===' as section;

-- Vérifier la structure de orientation_majors
DESCRIBE orientation_majors;

-- Vérifier les IDs et noms des majeures existantes
SELECT id, major_name, category 
FROM orientation_majors 
ORDER BY id;

-- Vérifier les tables existantes
SHOW TABLES LIKE '%ideal%';
SHOW TABLES LIKE '%mapping%';

-- 2. NETTOYAGE: Supprimer les tables problématiques si elles existent
SELECT '=== NETTOYAGE ===' as section;

-- Supprimer dans l'ordre des dépendances
DROP TABLE IF EXISTS major_program_mapping;
DROP TABLE IF EXISTS ideal_profiles;

-- 3. RECRÉATION: Créer ideal_profiles avec la bonne structure
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

-- 4. INSERTION CORRIGÉE: Utiliser les vrais IDs des majeures
SELECT '=== INSERTION CORRIGÉE ===' as section;

-- Trouver l'ID de Génie Civil
SET @genie_civil_id = (SELECT id FROM orientation_majors WHERE major_name = 'Génie Civil' LIMIT 1);

-- Trouver l'ID de Génie Mécanique
SET @genie_mecanique_id = (SELECT id FROM orientation_majors WHERE major_name = 'Génie Mécanique' LIMIT 1);

-- Trouver l'ID d'Architecture
SET @architecture_id = (SELECT id FROM orientation_majors WHERE major_name = 'Architecture' LIMIT 1);

-- Trouver l'ID de Commerce International
SET @commerce_international_id = (SELECT id FROM orientation_majors WHERE major_name = 'Commerce International' LIMIT 1);

-- Trouver l'ID d'Administration des Affaires
SET @admin_affaires_id = (SELECT id FROM orientation_majors WHERE major_name = 'Administration des Affaires' LIMIT 1);

-- Trouver l'ID d'Informatique
SET @informatique_id = (SELECT id FROM orientation_majors WHERE major_name = 'Informatique' LIMIT 1);

-- Trouver l'ID de Médecine
SET @medecine_id = (SELECT id FROM orientation_majors WHERE major_name = 'Médecine' LIMIT 1);

-- Afficher les IDs trouvés
SELECT 
    'Génie Civil' as major_name, @genie_civil_id as id
UNION ALL
SELECT 'Génie Mécanique', @genie_mecanique_id
UNION ALL
SELECT 'Architecture', @architecture_id
UNION ALL
SELECT 'Commerce International', @commerce_international_id
UNION ALL
SELECT 'Administration des Affaires', @admin_affaires_id
UNION ALL
SELECT 'Informatique', @informatique_id
UNION ALL
SELECT 'Médecine', @medecine_id;

-- 5. INSERTION DES PROFILS IDÉAUX avec les vrais IDs
SELECT '=== INSERTION DES PROFILS ===' as section;

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

-- Commerce International
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) VALUES
(@commerce_international_id, 'Interet_Scientifique_Tech', 40), (@commerce_international_id, 'Interet_Artistique_Creatif', 40), (@commerce_international_id, 'Interet_Social_Humain', 80),
(@commerce_international_id, 'Interet_Business_Gestion', 98), (@commerce_international_id, 'Interet_Logique_Analytique', 85), (@commerce_international_id, 'Competence_Resolution_Problemes', 85),
(@commerce_international_id, 'Competence_Communication', 95), (@commerce_international_id, 'Competence_Organisation', 90), (@commerce_international_id, 'Competence_Manuel_Technique', 20),
(@commerce_international_id, 'Valeur_Impact_Societal', 60), (@commerce_international_id, 'Valeur_Innovation_Challenge', 85), (@commerce_international_id, 'Valeur_Stabilite_Securite', 70),
(@commerce_international_id, 'Valeur_Autonomie', 80), (@commerce_international_id, 'Pref_Travail_Equipe_Collab', 90), (@commerce_international_id, 'Pref_Travail_Autonome', 60),
(@commerce_international_id, 'Pref_Pratique_Terrain', 70), (@commerce_international_id, 'Pref_Theorie_Recherche', 60);

-- Administration des Affaires
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) VALUES
(@admin_affaires_id, 'Interet_Scientifique_Tech', 30), (@admin_affaires_id, 'Interet_Artistique_Creatif', 40), (@admin_affaires_id, 'Interet_Social_Humain', 80),
(@admin_affaires_id, 'Interet_Business_Gestion', 98), (@admin_affaires_id, 'Interet_Logique_Analytique', 85), (@admin_affaires_id, 'Competence_Resolution_Problemes', 85),
(@admin_affaires_id, 'Competence_Communication', 95), (@admin_affaires_id, 'Competence_Organisation', 98), (@admin_affaires_id, 'Competence_Manuel_Technique', 10),
(@admin_affaires_id, 'Valeur_Impact_Societal', 60), (@admin_affaires_id, 'Valeur_Innovation_Challenge', 80), (@admin_affaires_id, 'Valeur_Stabilite_Securite', 70),
(@admin_affaires_id, 'Valeur_Autonomie', 70), (@admin_affaires_id, 'Pref_Travail_Equipe_Collab', 95), (@admin_affaires_id, 'Pref_Travail_Autonome', 50),
(@admin_affaires_id, 'Pref_Pratique_Terrain', 60), (@admin_affaires_id, 'Pref_Theorie_Recherche', 50);

-- Informatique
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) VALUES
(@informatique_id, 'Interet_Scientifique_Tech', 98), (@informatique_id, 'Interet_Artistique_Creatif', 40), (@informatique_id, 'Interet_Social_Humain', 30),
(@informatique_id, 'Interet_Business_Gestion', 40), (@informatique_id, 'Interet_Logique_Analytique', 98), (@informatique_id, 'Competence_Resolution_Problemes', 98),
(@informatique_id, 'Competence_Communication', 70), (@informatique_id, 'Competence_Organisation', 80), (@informatique_id, 'Competence_Manuel_Technique', 50),
(@informatique_id, 'Valeur_Impact_Societal', 60), (@informatique_id, 'Valeur_Innovation_Challenge', 95), (@informatique_id, 'Valeur_Stabilite_Securite', 70),
(@informatique_id, 'Valeur_Autonomie', 85), (@informatique_id, 'Pref_Travail_Equipe_Collab', 70), (@informatique_id, 'Pref_Travail_Autonome', 80),
(@informatique_id, 'Pref_Pratique_Terrain', 40), (@informatique_id, 'Pref_Theorie_Recherche', 80);

-- Médecine (si elle existe) - Utiliser INSERT IGNORE pour éviter les erreurs
INSERT IGNORE INTO ideal_profiles (major_id, pillar_name, ideal_score) VALUES
(@medecine_id, 'Interet_Scientifique_Tech', 95), (@medecine_id, 'Interet_Artistique_Creatif', 10), (@medecine_id, 'Interet_Social_Humain', 98),
(@medecine_id, 'Interet_Business_Gestion', 20), (@medecine_id, 'Interet_Logique_Analytique', 90), (@medecine_id, 'Competence_Resolution_Problemes', 95),
(@medecine_id, 'Competence_Communication', 98), (@medecine_id, 'Competence_Organisation', 90), (@medecine_id, 'Competence_Manuel_Technique', 75),
(@medecine_id, 'Valeur_Impact_Societal', 98), (@medecine_id, 'Valeur_Innovation_Challenge', 70), (@medecine_id, 'Valeur_Stabilite_Securite', 85),
(@medecine_id, 'Valeur_Autonomie', 60), (@medecine_id, 'Pref_Travail_Equipe_Collab', 95), (@medecine_id, 'Pref_Travail_Autonome', 50),
(@medecine_id, 'Pref_Pratique_Terrain', 90), (@medecine_id, 'Pref_Theorie_Recherche', 80);

-- 6. VÉRIFICATION: Contrôler que tout a été inséré correctement
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
WHERE om.major_name IN ('Génie Civil', 'Génie Mécanique', 'Architecture', 'Commerce International', 'Administration des Affaires', 'Informatique', 'Médecine')
GROUP BY om.id, om.major_name
ORDER BY om.id;

-- 7. CRÉATION DE LA TABLE DE MAPPING
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
(@commerce_international_id, NULL, 'international business, commerce international, trade'),
(@admin_affaires_id, NULL, 'business administration, administration des affaires, management'),
(@informatique_id, NULL, 'computer science, informatique, programmation, software');

-- 8. RÉSUMÉ FINAL
SELECT '=== RÉSUMÉ FINAL ===' as section;

SELECT
    'SYSTÈME D''ORIENTATION PRÊT' as status,
    (SELECT COUNT(*) FROM orientation_majors) as total_majeures,
    (SELECT COUNT(*) FROM ideal_profiles) as total_profils,
    (SELECT COUNT(*) FROM major_program_mapping) as total_mappings,
    (SELECT COUNT(DISTINCT major_id) FROM ideal_profiles) as majeures_avec_profils,
    (SELECT COUNT(DISTINCT major_id) FROM major_program_mapping) as majeures_avec_mappings;
