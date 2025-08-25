-- Script de nettoyage des tokens de vérification
-- À exécuter dans MySQL pour résoudre le problème des tokens déjà utilisés

-- 1. Supprimer tous les tokens utilisés
DELETE FROM email_verification_tokens WHERE used = true;

-- 2. Supprimer tous les tokens expirés (plus de 7 jours)
DELETE FROM email_verification_tokens 
WHERE expiration_date < DATE_SUB(NOW(), INTERVAL 7 DAY);

-- 3. Vérifier le résultat
SELECT 
    COUNT(*) as total_tokens,
    SUM(CASE WHEN used = true THEN 1 ELSE 0 END) as tokens_utilises,
    SUM(CASE WHEN used = false THEN 1 ELSE 0 END) as tokens_non_utilises,
    SUM(CASE WHEN expiration_date < NOW() THEN 1 ELSE 0 END) as tokens_expires
FROM email_verification_tokens;

-- 4. Afficher les tokens restants
SELECT 
    id,
    token,
    used,
    expiration_date,
    created_at,
    utilisateur_id
FROM email_verification_tokens 
ORDER BY created_at DESC;
