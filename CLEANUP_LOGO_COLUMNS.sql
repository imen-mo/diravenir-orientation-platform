-- Script de nettoyage et standardisation des colonnes de logo
-- À exécuter dans votre base de données MySQL

-- 1. Vérifier les colonnes existantes et leurs contenus
SELECT 
    'logoUrl' as colonne,
    COUNT(*) as total,
    COUNT(CASE WHEN logoUrl IS NOT NULL AND logoUrl != '' THEN 1 END) as non_vides,
    COUNT(CASE WHEN logoUrl LIKE 'http%' THEN 1 END) as urls_valides
FROM universite
UNION ALL
SELECT 
    'logo_url' as colonne,
    COUNT(*) as total,
    COUNT(CASE WHEN logo_url IS NOT NULL AND logo_url != '' THEN 1 END) as non_vides,
    COUNT(CASE WHEN logo_url LIKE 'http%' THEN 1 END) as urls_valides
FROM universite
UNION ALL
SELECT 
    'image_url' as colonne,
    COUNT(*) as total,
    COUNT(CASE WHEN image_url IS NOT NULL AND image_url != '' THEN 1 END) as non_vides,
    COUNT(CASE WHEN image_url LIKE 'http%' THEN 1 END) as urls_valides
FROM universite;

-- 2. Standardiser sur une seule colonne 'logo_url'
-- Si logoUrl a des données valides, les copier dans logo_url
UPDATE universite 
SET logo_url = logoUrl 
WHERE (logo_url IS NULL OR logo_url = '') 
AND (logoUrl IS NOT NULL AND logoUrl != '' AND logoUrl LIKE 'http%');

-- 3. Nettoyer les URLs invalides
UPDATE universite 
SET logo_url = NULL 
WHERE logo_url NOT LIKE 'http%' 
OR logo_url = '' 
OR logo_url = 'N/A' 
OR logo_url = 'null';

-- 4. Supprimer la colonne logoUrl si elle n'est plus utilisée
-- ALTER TABLE universite DROP COLUMN logoUrl; -- À décommenter après vérification

-- 5. Vérifier le résultat final
SELECT 
    id,
    nom,
    logo_url,
    CASE 
        WHEN logo_url IS NOT NULL AND logo_url LIKE 'http%' THEN '✅ URL valide'
        ELSE '❌ URL manquante ou invalide'
    END as statut_logo
FROM universite 
ORDER BY nom;
