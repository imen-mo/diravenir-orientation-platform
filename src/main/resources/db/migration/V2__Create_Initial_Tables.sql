-- Migration Flyway V2: Création des tables initiales
-- Date: 2025-08-19
-- Version: 2 (pour éviter les conflits avec les migrations existantes)

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS utilisateur (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'USER',
    date_naissance DATE,
    telephone VARCHAR(20),
    langue_preferee VARCHAR(10),
    date_creation DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    derniere_connexion DATETIME,
    compte_actif BOOLEAN NOT NULL DEFAULT TRUE,
    email_verifie BOOLEAN NOT NULL DEFAULT FALSE,
    compte_verifie BOOLEAN NOT NULL DEFAULT FALSE,
    statut_online BOOLEAN NOT NULL DEFAULT FALSE,
    derniere_activite DATETIME,
    session_active BOOLEAN NOT NULL DEFAULT FALSE,
    photo_profil VARCHAR(500),
    google_id VARCHAR(100),
    provider VARCHAR(20),
    provider_id VARCHAR(100),
    program_id BIGINT
);

-- Table des tokens de vérification (pour persister les tokens)
CREATE TABLE IF NOT EXISTS verification_token (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL,
    expiry DATETIME NOT NULL,
    type VARCHAR(20) NOT NULL DEFAULT 'EMAIL_VERIFICATION',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_utilisateur_email ON utilisateur(email);
CREATE INDEX IF NOT EXISTS idx_utilisateur_google_id ON utilisateur(google_id);
CREATE INDEX IF NOT EXISTS idx_verification_token_token ON verification_token(token);
CREATE INDEX IF NOT EXISTS idx_verification_token_email ON verification_token(email);
CREATE INDEX IF NOT EXISTS idx_verification_token_expiry ON verification_token(expiry);
