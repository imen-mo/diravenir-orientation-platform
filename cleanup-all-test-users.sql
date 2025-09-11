-- Script de nettoyage complet de la table utilisateur
-- Supprime tous les comptes de test créés pendant le développement

-- Désactiver temporairement les vérifications de clés étrangères
SET FOREIGN_KEY_CHECKS = 0;

-- Supprimer tous les utilisateurs de test



-- Supprimer aussi tous les utilisateurs avec des emails de test génériques
DELETE FROM utilisateur WHERE email LIKE 'test%@example.com';
DELETE FROM utilisateur WHERE email LIKE '%@example.com';
DELETE FROM utilisateur WHERE nom = 'Test' AND prenom = 'User';

-- Supprimer les utilisateurs avec des noms de test
DELETE FROM utilisateur WHERE nom IN ('Test', 'amounaiman86', 'amounaiman836');

-- Réactiver les vérifications de clés étrangères
SET FOREIGN_KEY_CHECKS = 1;

-- Vérifier le résultat
SELECT COUNT(*) as 'Nombre d\'utilisateurs restants' FROM utilisateur;

-- Afficher les utilisateurs restants (s'il y en a)
SELECT id, nom, prenom, email, role, date_creation 
FROM utilisateur 
ORDER BY date_creation DESC;
