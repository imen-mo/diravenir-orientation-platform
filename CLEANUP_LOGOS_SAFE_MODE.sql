-- Script de nettoyage des logos en mode safe update
-- Exécutez d'abord : SET SQL_SAFE_UPDATES = 0;

-- 1. Vérifier l'état actuel
SELECT 
    'État actuel des colonnes de logo' as info,
    COUNT(*) as total_universites
FROM universite;

SELECT 
    'logoUrl' as colonne,
    COUNT(*) as total,
    COUNT(CASE WHEN logoUrl IS NOT NULL AND logoUrl != '' THEN 1 END) as non_vides,
    COUNT(CASE WHEN logoUrl LIKE 'http%' THEN 1 END) as urls_valides,
    COUNT(CASE WHEN logoUrl LIKE '%N/A%' OR logoUrl LIKE '%null%' OR logoUrl = '' THEN 1 END) as urls_invalides
FROM universite
UNION ALL
SELECT 
    'logo_url' as colonne,
    COUNT(*) as total,
    COUNT(CASE WHEN logo_url IS NOT NULL AND logo_url != '' THEN 1 END) as non_vides,
    COUNT(CASE WHEN logo_url LIKE 'http%' THEN 1 END) as urls_valides,
    COUNT(CASE WHEN logo_url LIKE '%N/A%' OR logo_url LIKE '%null%' OR logo_url = '' THEN 1 END) as urls_invalides
FROM universite
UNION ALL
SELECT 
    'image_url' as colonne,
    COUNT(*) as total,
    COUNT(CASE WHEN image_url IS NOT NULL AND image_url != '' THEN 1 END) as non_vides,
    COUNT(CASE WHEN image_url LIKE 'http%' THEN 1 END) as urls_valides,
    COUNT(CASE WHEN image_url LIKE '%N/A%' OR image_url LIKE '%null%' OR image_url = '' THEN 1 END) as urls_invalides
FROM universite;

-- 2. Nettoyer les URLs invalides dans logoUrl
UPDATE universite 
SET logoUrl = NULL 
WHERE id > 0 
AND (logoUrl = '' OR logoUrl = 'N/A' OR logoUrl = 'null' OR logoUrl NOT LIKE 'http%');

-- 3. Copier les URLs valides de logoUrl vers logo_url
UPDATE universite 
SET logo_url = logoUrl 
WHERE id > 0 
AND logoUrl IS NOT NULL 
AND logoUrl LIKE 'http%'
AND (logo_url IS NULL OR logo_url = '');

-- 4. Nettoyer logo_url des URLs invalides
UPDATE universite 
SET logo_url = NULL 
WHERE id > 0 
AND (logo_url = '' OR logo_url = 'N/A' OR logo_url = 'null' OR logo_url NOT LIKE 'http%');

-- 5. Vérifier le résultat final
SELECT 
    'Résultat après nettoyage' as info,
    COUNT(*) as total_universites,
    COUNT(CASE WHEN logo_url IS NOT NULL AND logo_url LIKE 'http%' THEN 1 END) as logos_valides,
    COUNT(CASE WHEN logo_url IS NULL OR logo_url NOT LIKE 'http%' THEN 1 END) as logos_manquants
FROM universite;

-- 6. Afficher les universités sans logo pour identification
SELECT 
    id,
    nom,
    nom_en,
    logoUrl as ancien_logo,
    logo_url as nouveau_logo,
    CASE 
        WHEN logo_url IS NOT NULL AND logo_url LIKE 'http%' THEN '✅ Logo configuré'
        ELSE '❌ Logo manquant'
    END as statut
FROM universite 
ORDER BY nom;
