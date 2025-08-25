-- Script d'insertion des vrais logos depuis votre PDF
-- Remplacez les URLs par celles de votre document

-- IMPORTANT : Exécutez d'abord le script de nettoyage
-- Puis utilisez ce script pour insérer les vrais logos

-- 1. Template pour Hayfi University (Software Engineering)
UPDATE universite 
SET logo_url = 'VOTRE_URL_LOGO_HAYFI_ICI'
WHERE id > 0 
AND (nom LIKE '%Hayfi%' OR nom_en LIKE '%Hayfi%' OR nom LIKE '%Software Engineering%');

-- 2. Template pour Near East University
UPDATE universite 
SET logo_url = 'VOTRE_URL_LOGO_NEAR_EAST_ICI'
WHERE id > 0 
AND (nom LIKE '%Near East%' OR nom_en LIKE '%Near East%');

-- 3. Template pour Cyprus International University
UPDATE universite 
SET logo_url = 'VOTRE_URL_LOGO_CYPRUS_INTERNATIONAL_ICI'
WHERE id > 0 
AND (nom LIKE '%Cyprus International%' OR nom_en LIKE '%Cyprus International%');

-- 4. Template pour d'autres universités
-- Copiez et modifiez ces lignes avec vos vraies URLs :

/*
-- Exemple pour une université de médecine
UPDATE universite 
SET logo_url = 'https://example.com/logos/medical-university-logo.png'
WHERE id > 0 
AND (nom LIKE '%Medical%' OR nom_en LIKE '%Medical%');

-- Exemple pour une université d'ingénierie
UPDATE universite 
SET logo_url = 'https://example.com/logos/engineering-university-logo.png'
WHERE id > 0 
AND (nom LIKE '%Engineering%' OR nom_en LIKE '%Engineering%');

-- Exemple pour une université de commerce
UPDATE universite 
SET logo_url = 'https://example.com/logos/business-university-logo.png'
WHERE id > 0 
AND (nom LIKE '%Business%' OR nom_en LIKE '%Business%');
*/

-- 5. Vérifier les mises à jour
SELECT 
    'Résultat après insertion des logos' as info,
    COUNT(*) as total_universites,
    COUNT(CASE WHEN logo_url IS NOT NULL AND logo_url LIKE 'http%' THEN 1 END) as logos_configures,
    COUNT(CASE WHEN logo_url IS NULL OR logo_url NOT LIKE 'http%' THEN 1 END) as logos_manquants
FROM universite;

-- 6. Afficher le statut de chaque université
SELECT 
    id,
    nom,
    nom_en,
    logo_url,
    CASE 
        WHEN logo_url IS NOT NULL AND logo_url LIKE 'http%' THEN '✅ Logo configuré'
        WHEN logo_url IS NOT NULL AND logo_url NOT LIKE 'http%' THEN '⚠️ URL invalide'
        ELSE '❌ Logo manquant'
    END as statut
FROM universite 
ORDER BY nom;

-- 7. Identifier les universités qui ont besoin de logos
SELECT 
    id,
    nom,
    nom_en,
    'Besoin d\'un logo' as action_requise
FROM universite 
WHERE logo_url IS NULL 
   OR logo_url = '' 
   OR logo_url NOT LIKE 'http%'
ORDER BY nom;
