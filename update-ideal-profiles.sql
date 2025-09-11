-- Script pour mettre à jour les profils idéaux avec les scores réels
-- Basé sur les spécifications fournies par l'utilisateur

-- D'abord, supprimer les anciens profils idéaux pour les majeures concernées
DELETE FROM ideal_profiles WHERE program_id IN (
    SELECT id FROM orientation_majors WHERE major_code IN ('CIVIL', 'MECH', 'ARCH')
);

-- Civil Engineering
INSERT INTO ideal_profiles (program_id, pillar_name, ideal_score) VALUES
((SELECT id FROM orientation_majors WHERE major_code = 'CIVIL'), 'Interet_Scientifique_Tech', 90),
((SELECT id FROM orientation_majors WHERE major_code = 'CIVIL'), 'Interet_Artistique_Creatif', 40),
((SELECT id FROM orientation_majors WHERE major_code = 'CIVIL'), 'Interet_Social_Humain', 50),
((SELECT id FROM orientation_majors WHERE major_code = 'CIVIL'), 'Interet_Business_Gestion', 60),
((SELECT id FROM orientation_majors WHERE major_code = 'CIVIL'), 'Interet_Logique_Analytique', 90),
((SELECT id FROM orientation_majors WHERE major_code = 'CIVIL'), 'Competence_Resolution_Problemes', 90),
((SELECT id FROM orientation_majors WHERE major_code = 'CIVIL'), 'Competence_Communication', 75),
((SELECT id FROM orientation_majors WHERE major_code = 'CIVIL'), 'Competence_Organisation', 90),
((SELECT id FROM orientation_majors WHERE major_code = 'CIVIL'), 'Competence_Manuel_Technique', 85),
((SELECT id FROM orientation_majors WHERE major_code = 'CIVIL'), 'Valeur_Impact_Societal', 80),
((SELECT id FROM orientation_majors WHERE major_code = 'CIVIL'), 'Valeur_Innovation_Challenge', 85),
((SELECT id FROM orientation_majors WHERE major_code = 'CIVIL'), 'Valeur_Stabilite_Securite', 80),
((SELECT id FROM orientation_majors WHERE major_code = 'CIVIL'), 'Valeur_Autonomie', 70),
((SELECT id FROM orientation_majors WHERE major_code = 'CIVIL'), 'Pref_Travail_Equipe_Collab', 80),
((SELECT id FROM orientation_majors WHERE major_code = 'CIVIL'), 'Pref_Travail_Autonome', 60),
((SELECT id FROM orientation_majors WHERE major_code = 'CIVIL'), 'Pref_Pratique_Terrain', 90),
((SELECT id FROM orientation_majors WHERE major_code = 'CIVIL'), 'Pref_Theorie_Recherche', 60);

-- Mechanical Engineering
INSERT INTO ideal_profiles (program_id, pillar_name, ideal_score) VALUES
((SELECT id FROM orientation_majors WHERE major_code = 'MECH'), 'Interet_Scientifique_Tech', 95),
((SELECT id FROM orientation_majors WHERE major_code = 'MECH'), 'Interet_Artistique_Creatif', 30),
((SELECT id FROM orientation_majors WHERE major_code = 'MECH'), 'Interet_Social_Humain', 20),
((SELECT id FROM orientation_majors WHERE major_code = 'MECH'), 'Interet_Business_Gestion', 50),
((SELECT id FROM orientation_majors WHERE major_code = 'MECH'), 'Interet_Logique_Analytique', 95),
((SELECT id FROM orientation_majors WHERE major_code = 'MECH'), 'Competence_Resolution_Problemes', 95),
((SELECT id FROM orientation_majors WHERE major_code = 'MECH'), 'Competence_Communication', 65),
((SELECT id FROM orientation_majors WHERE major_code = 'MECH'), 'Competence_Organisation', 80),
((SELECT id FROM orientation_majors WHERE major_code = 'MECH'), 'Competence_Manuel_Technique', 90),
((SELECT id FROM orientation_majors WHERE major_code = 'MECH'), 'Valeur_Impact_Societal', 70),
((SELECT id FROM orientation_majors WHERE major_code = 'MECH'), 'Valeur_Innovation_Challenge', 90),
((SELECT id FROM orientation_majors WHERE major_code = 'MECH'), 'Valeur_Stabilite_Securite', 70),
((SELECT id FROM orientation_majors WHERE major_code = 'MECH'), 'Valeur_Autonomie', 80),
((SELECT id FROM orientation_majors WHERE major_code = 'MECH'), 'Pref_Travail_Equipe_Collab', 75),
((SELECT id FROM orientation_majors WHERE major_code = 'MECH'), 'Pref_Travail_Autonome', 70),
((SELECT id FROM orientation_majors WHERE major_code = 'MECH'), 'Pref_Pratique_Terrain', 85),
((SELECT id FROM orientation_majors WHERE major_code = 'MECH'), 'Pref_Theorie_Recherche', 70);

-- Architecture
INSERT INTO ideal_profiles (program_id, pillar_name, ideal_score) VALUES
((SELECT id FROM orientation_majors WHERE major_code = 'ARCH'), 'Interet_Scientifique_Tech', 60),
((SELECT id FROM orientation_majors WHERE major_code = 'ARCH'), 'Interet_Artistique_Creatif', 90),
((SELECT id FROM orientation_majors WHERE major_code = 'ARCH'), 'Interet_Social_Humain', 70),
((SELECT id FROM orientation_majors WHERE major_code = 'ARCH'), 'Interet_Business_Gestion', 50),
((SELECT id FROM orientation_majors WHERE major_code = 'ARCH'), 'Interet_Logique_Analytique', 80),
((SELECT id FROM orientation_majors WHERE major_code = 'ARCH'), 'Competence_Resolution_Problemes', 80),
((SELECT id FROM orientation_majors WHERE major_code = 'ARCH'), 'Competence_Communication', 85),
((SELECT id FROM orientation_majors WHERE major_code = 'ARCH'), 'Competence_Organisation', 85),
((SELECT id FROM orientation_majors WHERE major_code = 'ARCH'), 'Competence_Manuel_Technique', 85),
((SELECT id FROM orientation_majors WHERE major_code = 'ARCH'), 'Valeur_Impact_Societal', 85),
((SELECT id FROM orientation_majors WHERE major_code = 'ARCH'), 'Valeur_Innovation_Challenge', 90),
((SELECT id FROM orientation_majors WHERE major_code = 'ARCH'), 'Valeur_Stabilite_Securite', 60),
((SELECT id FROM orientation_majors WHERE major_code = 'ARCH'), 'Valeur_Autonomie', 80),
((SELECT id FROM orientation_majors WHERE major_code = 'ARCH'), 'Pref_Travail_Equipe_Collab', 80),
((SELECT id FROM orientation_majors WHERE major_code = 'ARCH'), 'Pref_Travail_Autonome', 70),
((SELECT id FROM orientation_majors WHERE major_code = 'ARCH'), 'Pref_Pratique_Terrain', 70),
((SELECT id FROM orientation_majors WHERE major_code = 'ARCH'), 'Pref_Theorie_Recherche', 60);

-- Vérifier que les données ont été insérées
SELECT 
    om.major_name,
    om.major_code,
    COUNT(ip.id) as profile_count
FROM orientation_majors om
LEFT JOIN ideal_profiles ip ON om.id = ip.program_id
WHERE om.major_code IN ('CIVIL', 'MECH', 'ARCH')
GROUP BY om.id, om.major_name, om.major_code
ORDER BY om.major_code;
