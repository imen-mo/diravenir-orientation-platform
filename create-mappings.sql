-- Script pour créer les mappings orientation → programmes
USE diravenir;

-- 1. Vérifier que la table existe
SHOW TABLES LIKE 'major_program_mapping';

-- 2. Créer les mappings pour les 7 majeures fonctionnelles
INSERT INTO major_program_mapping (major_id, program_id, search_keywords) VALUES
-- Génie Civil
((SELECT id FROM orientation_majors WHERE major_name = 'Génie Civil'), NULL, 'civil engineering, génie civil, construction, bâtiment, infrastructure, ponts, routes'),
-- Génie Mécanique  
((SELECT id FROM orientation_majors WHERE major_name = 'Génie Mécanique'), NULL, 'mechanical engineering, génie mécanique, fabrication, machines, mécanique, production'),
-- Architecture
((SELECT id FROM orientation_majors WHERE major_name = 'Architecture'), NULL, 'architecture, design, urbanisme, construction, bâtiment, aménagement, paysage'),
-- Commerce International
((SELECT id FROM orientation_majors WHERE major_name = 'Commerce International'), NULL, 'international business, commerce international, trade, import export, négociation, marketing international'),
-- Administration des Affaires
((SELECT id FROM orientation_majors WHERE major_name = 'Administration des Affaires'), NULL, 'business administration, administration des affaires, management, gestion, entreprise, organisation'),
-- Informatique
((SELECT id FROM orientation_majors WHERE major_name = 'Informatique'), NULL, 'computer science, informatique, programmation, software, développement, algorithmes, bases de données'),
-- Médecine
((SELECT id FROM orientation_majors WHERE major_name = 'Médecine'), NULL, 'medicine, médecine, MBBS, medical, santé, soins, diagnostic, traitement');

-- 3. Vérifier les mappings créés
SELECT 
    om.major_name,
    mpm.search_keywords,
    'Mapping créé' as statut
FROM orientation_majors om
JOIN major_program_mapping mpm ON om.id = mpm.major_id
ORDER BY om.major_name;

-- 4. Résumé final
SELECT 
    'MAPPINGS CRÉÉS' as status,
    COUNT(*) as total_mappings,
    '7 majeures liées aux programmes' as description
FROM major_program_mapping;
