-- Script de test pour vérifier le système d'orientation corrigé
-- Date: 2025-01-27

-- 1. Vérifier la structure des tables
SELECT '=== STRUCTURE DES TABLES ===' as section;

DESCRIBE orientation_majors;
DESCRIBE ideal_profiles;
DESCRIBE major_program_mapping;

-- 2. Vérifier le contenu des tables
SELECT '=== CONTENU DES TABLES ===' as section;

-- Nombre de majeures d'orientation
SELECT COUNT(*) as total_majeures_orientation FROM orientation_majors;

-- Nombre de profils idéaux
SELECT COUNT(*) as total_profils_ideaux FROM ideal_profiles;

-- Nombre de mappings
SELECT COUNT(*) as total_mappings FROM major_program_mapping;

-- 3. Vérifier les majeures d'orientation
SELECT '=== MAJEURES D''ORIENTATION ===' as section;

SELECT id, major_name, category, description 
FROM orientation_majors 
ORDER BY id 
LIMIT 10;

-- 4. Vérifier les profils idéaux pour quelques majeures
SELECT '=== PROFILS IDÉAUX ===' as section;

-- Profil complet pour Génie Civil
SELECT 
    om.major_name,
    ip.pillar_name,
    ip.ideal_score
FROM orientation_majors om
JOIN ideal_profiles ip ON om.id = ip.major_id
WHERE om.major_name = 'Génie Civil'
ORDER BY ip.pillar_name;

-- Profil complet pour Informatique
SELECT 
    om.major_name,
    ip.pillar_name,
    ip.ideal_score
FROM orientation_majors om
JOIN ideal_profiles ip ON om.id = ip.major_id
WHERE om.major_name = 'Informatique'
ORDER BY ip.pillar_name;

-- 5. Vérifier les mappings
SELECT '=== MAPPINGS MAJEURES-PROGRAMMES ===' as section;

SELECT 
    om.major_name,
    mpm.search_keywords,
    mpm.program_id
FROM orientation_majors om
JOIN major_program_mapping mpm ON om.id = mpm.major_id
ORDER BY om.id;

-- 6. Vérifier les contraintes de clé étrangère
SELECT '=== CONTRAINTES DE CLÉ ÉTRANGÈRE ===' as section;

SELECT
    CONSTRAINT_NAME,
    TABLE_NAME,
    COLUMN_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM information_schema.KEY_COLUMN_USAGE
WHERE TABLE_NAME IN ('ideal_profiles', 'major_program_mapping')
AND REFERENCED_TABLE_NAME IS NOT NULL;

-- 7. Vérifier les index
SELECT '=== INDEX ===' as section;

SHOW INDEX FROM ideal_profiles;
SHOW INDEX FROM orientation_majors;
SHOW INDEX FROM major_program_mapping;

-- 8. Test d'insertion d'un nouveau profil (test)
SELECT '=== TEST D''INSERTION ===' as section;

-- Insérer un profil de test pour la première majeure
INSERT INTO ideal_profiles (major_id, pillar_name, ideal_score) VALUES
(1, 'TEST_PILIER', 50);

-- Vérifier l'insertion
SELECT * FROM ideal_profiles WHERE pillar_name = 'TEST_PILIER';

-- Nettoyer le test
DELETE FROM ideal_profiles WHERE pillar_name = 'TEST_PILIER';

-- 9. Vérifier la cohérence des données
SELECT '=== COHÉRENCE DES DONNÉES ===' as section;

-- Vérifier que chaque majeure a exactement 17 piliers
SELECT 
    om.major_name,
    COUNT(ip.id) as nombre_piliers,
    CASE 
        WHEN COUNT(ip.id) = 17 THEN 'OK'
        ELSE 'ERREUR: Nombre incorrect de piliers'
    END as statut
FROM orientation_majors om
LEFT JOIN ideal_profiles ip ON om.id = ip.major_id
GROUP BY om.id, om.major_name
ORDER BY om.id;

-- 10. Résumé final
SELECT '=== RÉSUMÉ FINAL ===' as section;

SELECT
    'VÉRIFICATION TERMINÉE' as status,
    (SELECT COUNT(*) FROM orientation_majors) as total_majeures,
    (SELECT COUNT(*) FROM ideal_profiles) as total_profils,
    (SELECT COUNT(*) FROM major_program_mapping) as total_mappings,
    (SELECT COUNT(DISTINCT major_id) FROM ideal_profiles) as majeures_avec_profils,
    (SELECT COUNT(DISTINCT major_id) FROM major_program_mapping) as majeures_avec_mappings;
