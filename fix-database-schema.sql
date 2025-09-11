-- Script pour corriger le schéma de la base de données
-- Ajouter toutes les colonnes manquantes dans la table utilisateur

USE diravenir;

-- Ajouter les colonnes manquantes une par une
ALTER TABLE utilisateur ADD COLUMN adresse VARCHAR(200);
ALTER TABLE utilisateur ADD COLUMN annee_etude VARCHAR(20);
ALTER TABLE utilisateur ADD COLUMN specialite VARCHAR(100);
ALTER TABLE utilisateur ADD COLUMN niveau_etude VARCHAR(50);
ALTER TABLE utilisateur ADD COLUMN etablissement VARCHAR(100);
ALTER TABLE utilisateur ADD COLUMN ville VARCHAR(50);
ALTER TABLE utilisateur ADD COLUMN pays VARCHAR(50);
ALTER TABLE utilisateur ADD COLUMN nationalite VARCHAR(50);
ALTER TABLE utilisateur ADD COLUMN genre VARCHAR(20);
ALTER TABLE utilisateur ADD COLUMN compte_verifie BOOLEAN DEFAULT FALSE;
ALTER TABLE utilisateur ADD COLUMN oauth2_token_expiry DATETIME;
ALTER TABLE utilisateur ADD COLUMN oauth2_refresh_token VARCHAR(500);
ALTER TABLE utilisateur ADD COLUMN oauth2_access_token VARCHAR(500);
ALTER TABLE utilisateur ADD COLUMN email_verifie BOOLEAN DEFAULT FALSE;
ALTER TABLE utilisateur ADD COLUMN auth_provider VARCHAR(20) DEFAULT 'LOCAL';
ALTER TABLE utilisateur ADD COLUMN google_id VARCHAR(100);
ALTER TABLE utilisateur ADD COLUMN photo_profil VARCHAR(500);
ALTER TABLE utilisateur ADD COLUMN compte_actif BOOLEAN DEFAULT FALSE;
ALTER TABLE utilisateur ADD COLUMN derniere_connexion DATETIME;
ALTER TABLE utilisateur ADD COLUMN date_creation DATETIME DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE utilisateur ADD COLUMN langue_preferee VARCHAR(10);
ALTER TABLE utilisateur ADD COLUMN telephone VARCHAR(20);
ALTER TABLE utilisateur ADD COLUMN date_naissance DATE;

-- Vérifier la structure de la table
DESCRIBE utilisateur;