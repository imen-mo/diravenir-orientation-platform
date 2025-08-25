-- Script de vérification et correction pour Hefei University
-- Exécutez d'abord : SET SQL_SAFE_UPDATES = 0;

-- Vérifier l'état actuel de Hefei University
SELECT 'État actuel de Hefei University' as info;
SELECT 
    id,
    nom,
    logo_url,
    CASE 
        WHEN logo_url IS NOT NULL AND logo_url LIKE 'http%' THEN '✅ Logo configuré'
        ELSE '❌ Logo manquant'
    END as statut
FROM universite 
WHERE nom LIKE '%Hefei%';

-- Corriger l'URL de Hefei University (URL complète)
UPDATE universite 
SET logo_url = 'https://www.digiedupro.com/media/2020/05/Hefei-University-Logo.png'
WHERE id > 0 AND nom LIKE '%Hefei University%';

-- Vérifier après correction
SELECT 'Après correction de Hefei University' as info;
SELECT 
    id,
    nom,
    logo_url,
    CASE 
        WHEN logo_url IS NOT NULL AND logo_url LIKE 'http%' THEN '✅ Logo configuré'
        ELSE '❌ Logo manquant'
    END as statut
FROM universite 
WHERE nom LIKE '%Hefei%';

-- Vérifier aussi Hefei University of Technology
SELECT 'Vérification de Hefei University of Technology' as info;
SELECT 
    id,
    nom,
    logo_url,
    CASE 
        WHEN logo_url IS NOT NULL AND logo_url LIKE 'http%' THEN '✅ Logo configuré'
        ELSE '❌ Logo manquant'
    END as statut
FROM universite 
WHERE nom LIKE '%Hefei University of Technology%';

-- Statistiques générales des logos
SELECT 'Statistiques générales des logos' as info;
SELECT 
    COUNT(*) as total_universites,
    COUNT(CASE WHEN logo_url IS NOT NULL AND logo_url LIKE 'http%' THEN 1 END) as logos_configures,
    COUNT(CASE WHEN logo_url IS NULL OR logo_url NOT LIKE 'http%' THEN 1 END) as logos_manquants
FROM universite;

-- N'oubliez pas de remettre le mode safe update :
-- SET SQL_SAFE_UPDATES = 1;
