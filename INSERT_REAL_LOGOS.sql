-- Script d'insertion des vrais logos des universités
-- Remplacez les URLs par celles de votre PDF

-- 1. Mise à jour des logos existants (exemples)
UPDATE universite 
SET logo_url = 'https://example.com/logos/hayfi-university-logo.png'
WHERE nom LIKE '%Hayfi%' OR nom_en LIKE '%Hayfi%';

UPDATE universite 
SET logo_url = 'https://example.com/logos/near-east-university-logo.png'
WHERE nom LIKE '%Near East%' OR nom_en LIKE '%Near East%';

UPDATE universite 
SET logo_url = 'https://example.com/logos/cyprus-international-university-logo.png'
WHERE nom LIKE '%Cyprus International%' OR nom_en LIKE '%Cyprus International%';

-- 2. Template pour ajouter d'autres universités
-- Copiez et modifiez ces lignes avec vos vraies URLs :

/*
UPDATE universite 
SET logo_url = 'VOTRE_URL_LOGO_ICI'
WHERE nom LIKE '%NOM_UNIVERSITE%' OR nom_en LIKE '%NOM_UNIVERSITE%';

-- Exemples :
UPDATE universite 
SET logo_url = 'https://example.com/logos/software-engineering-university-logo.png'
WHERE nom LIKE '%Software Engineering%' OR nom_en LIKE '%Software Engineering%';

UPDATE universite 
SET logo_url = 'https://example.com/logos/medical-university-logo.png'
WHERE nom LIKE '%Medical%' OR nom_en LIKE '%Medical%';
*/

-- 3. Vérifier les mises à jour
SELECT 
    id,
    nom,
    nom_en,
    logo_url,
    CASE 
        WHEN logo_url IS NOT NULL AND logo_url LIKE 'http%' THEN '✅ Logo configuré'
        ELSE '❌ Logo manquant'
    END as statut
FROM universite 
ORDER BY nom;
