-- ========================================
-- 🧹 SCRIPT DE NETTOYAGE - UTILISATEURS DE TEST DIRAVENIR
-- ========================================
-- Ce script supprime tous les utilisateurs de test créés pendant le développement
-- ATTENTION: Ce script supprime TOUTES les données utilisateur !

-- Désactiver les vérifications de clés étrangères temporairement
SET FOREIGN_KEY_CHECKS = 0;

-- ========================================
-- 1. SUPPRESSION DES TABLES LIÉES AUX UTILISATEURS
-- ========================================

-- Supprimer les tokens de vérification d'email
DELETE FROM email_verification_token;

-- Supprimer les tokens de réinitialisation de mot de passe
DELETE FROM password_reset_token;

-- Supprimer les candidatures liées aux étudiants
DELETE FROM candidature WHERE etudiant_id IN (
    SELECT id FROM etudiant WHERE email LIKE '%@example.com'
);

-- Supprimer les témoignages liés aux étudiants
DELETE FROM temoignage WHERE etudiant_id IN (
    SELECT id FROM etudiant WHERE email LIKE '%@example.com'
);

-- Supprimer l'historique de recherche des étudiants
DELETE FROM etudiant_historique_recherche WHERE etudiant_id IN (
    SELECT id FROM etudiant WHERE email LIKE '%@example.com'
);

-- ========================================
-- 2. SUPPRESSION DES UTILISATEURS DE TEST
-- ========================================

-- Supprimer les étudiants de test
DELETE FROM etudiant WHERE email LIKE '%@example.com';

-- Supprimer les conseillers de test
DELETE FROM conseiller WHERE email LIKE '%@example.com';

-- Supprimer les administrateurs de test
DELETE FROM administrateurs WHERE email LIKE '%@example.com';

-- Supprimer les utilisateurs de base de test
DELETE FROM utilisateur WHERE email LIKE '%@example.com';

-- ========================================
-- 3. VÉRIFICATION ET NETTOYAGE SUPPLÉMENTAIRE
-- ========================================

-- Supprimer tous les utilisateurs avec des emails de test
DELETE FROM utilisateur WHERE email IN (
    'test@example.com',
    'test1@example.com', 
    'test2@example.com',
    'test3@example.com',
    'test4@example.com',
    'test5@example.com',
    'test6@example.com',
    'test7@example.com',
    'test8@example.com',
    'test9@example.com',
    'test10@example.com',
    'user@example.com',
    'demo@example.com',
    'admin@example.com',
    'amounaiman836@gmail.com',
    'imanecompte024@gmail.com',
    'mouridaimane@gmail.com'
);

-- Supprimer les utilisateurs créés aujourd'hui (pour nettoyer les tests récents)
DELETE FROM utilisateur WHERE DATE(date_creation) = CURDATE();

-- ========================================
-- 4. RÉACTIVATION DES VÉRIFICATIONS
-- ========================================

-- Réactiver les vérifications de clés étrangères
SET FOREIGN_KEY_CHECKS = 1;

-- ========================================
-- 5. VÉRIFICATION DU NETTOYAGE
-- ========================================

-- Afficher le nombre d'utilisateurs restants
SELECT 
    'Utilisateurs restants' as Type,
    COUNT(*) as Nombre
FROM utilisateur;

-- Afficher les utilisateurs restants (s'il y en a)
SELECT 
    id,
    email,
    nom,
    prenom,
    role,
    compte_actif,
    email_verifie,
    date_creation
FROM utilisateur 
ORDER BY date_creation DESC;

-- ========================================
-- 6. RÉINITIALISATION DES AUTO_INCREMENT
-- ========================================

-- Réinitialiser les compteurs d'auto-increment
ALTER TABLE utilisateur AUTO_INCREMENT = 1;
ALTER TABLE etudiant AUTO_INCREMENT = 1;
ALTER TABLE conseiller AUTO_INCREMENT = 1;
ALTER TABLE administrateurs AUTO_INCREMENT = 1;
ALTER TABLE email_verification_token AUTO_INCREMENT = 1;
ALTER TABLE password_reset_token AUTO_INCREMENT = 1;

-- ========================================
-- ✅ NETTOYAGE TERMINÉ
-- ========================================

SELECT '🧹 Nettoyage terminé ! Base de données prête pour de nouveaux tests.' as Message;
