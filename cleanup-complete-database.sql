-- 🗑️ NETTOYAGE COMPLET DE LA BASE DE DONNÉES DIRAVENIR
-- ⚠️ ATTENTION : Ce script supprime TOUTES les données !

-- 1. Supprimer TOUS les tokens de vérification
DELETE FROM email_verification_tokens;

-- 2. Supprimer TOUS les tokens de réinitialisation de mot de passe
DELETE FROM password_reset_tokens;

-- 3. Supprimer TOUS les utilisateurs (cascade automatique)
DELETE FROM utilisateurs;

-- 4. Vérifier que tout est vide
SELECT 
    'État après nettoyage' as info,
    (SELECT COUNT(*) FROM utilisateurs) as total_utilisateurs,
    (SELECT COUNT(*) FROM email_verification_tokens) as total_tokens_verification,
    (SELECT COUNT(*) FROM password_reset_tokens) as total_tokens_reset;

-- 5. Réinitialiser les auto-increments
ALTER TABLE utilisateurs AUTO_INCREMENT = 1;
ALTER TABLE email_verification_tokens AUTO_INCREMENT = 1;
ALTER TABLE password_reset_tokens AUTO_INCREMENT = 1;

-- 6. Vérification finale
SELECT '✅ Base de données complètement nettoyée !' as resultat;
