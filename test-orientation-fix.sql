-- Script de test pour vérifier la correction de la structure des profils idéaux
-- Date: 2025-01-27

-- 1. Vérifier la structure de la table program
DESCRIBE program;

-- 2. Vérifier le contenu de la table program
SELECT id, program, category, degreeType FROM program ORDER BY id LIMIT 10;

-- 3. Vérifier la structure de la table ideal_profiles
DESCRIBE ideal_profiles;

-- 4. Vérifier le contenu de la table ideal_profiles
SELECT COUNT(*) as total_profiles FROM ideal_profiles;

-- 5. Vérifier les profils par programme
SELECT 
    p.program,
    COUNT(ip.id) as nombre_piliers,
    AVG(ip.ideal_score) as score_moyen
FROM program p
LEFT JOIN ideal_profiles ip ON p.id = ip.program_id
GROUP BY p.id, p.program
ORDER BY p.id;

-- 6. Vérifier un profil complet (Civil Engineering)
SELECT 
    p.program,
    ip.pillar_name,
    ip.ideal_score
FROM program p
JOIN ideal_profiles ip ON p.id = ip.program_id
WHERE p.id = 1
ORDER BY ip.pillar_name;

-- 7. Vérifier les contraintes de clé étrangère
SELECT 
    CONSTRAINT_NAME,
    TABLE_NAME,
    COLUMN_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM information_schema.KEY_COLUMN_USAGE
WHERE TABLE_NAME = 'ideal_profiles' 
AND REFERENCED_TABLE_NAME IS NOT NULL;

-- 8. Vérifier les index
SHOW INDEX FROM ideal_profiles;

-- 9. Test d'insertion d'un nouveau profil (test)
INSERT INTO ideal_profiles (program_id, pillar_name, ideal_score) VALUES
(1, 'TEST_PILIER', 50);

-- 10. Vérifier l'insertion
SELECT * FROM ideal_profiles WHERE pillar_name = 'TEST_PILIER';

-- 11. Nettoyer le test
DELETE FROM ideal_profiles WHERE pillar_name = 'TEST_PILIER';

-- 12. Résumé final
SELECT 
    'VÉRIFICATION TERMINÉE' as status,
    (SELECT COUNT(*) FROM program) as total_programmes,
    (SELECT COUNT(*) FROM ideal_profiles) as total_profils_ideaux,
    (SELECT COUNT(DISTINCT program_id) FROM ideal_profiles) as programmes_avec_profils;
