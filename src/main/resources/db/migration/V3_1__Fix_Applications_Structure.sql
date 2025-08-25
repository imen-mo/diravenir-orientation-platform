-- Migration V3.1: Fix Applications Structure - Corriger les contraintes NOT NULL
-- Ce script corrige les problèmes de la migration V3

-- 1. Modifier la table applications pour ajouter des valeurs par défaut
ALTER TABLE applications 
MODIFY COLUMN country VARCHAR(100) DEFAULT 'Morocco',
MODIFY COLUMN full_address TEXT DEFAULT 'Address not specified';

-- 2. Ajouter des valeurs par défaut pour les champs obligatoires manquants
UPDATE applications 
SET country = 'Morocco', 
    full_address = 'Address not specified' 
WHERE country IS NULL OR full_address IS NULL;

-- 3. Vérifier que toutes les applications ont des valeurs valides
SELECT COUNT(*) as total_applications FROM applications;
SELECT COUNT(*) as applications_with_country FROM applications WHERE country IS NOT NULL;
SELECT COUNT(*) as applications_with_address FROM applications WHERE full_address IS NOT NULL;

-- 4. Insérer une application de test si aucune n'existe
INSERT INTO applications (
    application_id, 
    email, 
    first_name, 
    last_name, 
    country,
    full_address,
    status, 
    current_step,
    program_name,
    university_name,
    application_fees,
    service_fees,
    user_id
) 
SELECT 
    CONCAT('APP', UNIX_TIMESTAMP()),
    'test@example.com',
    'Test',
    'User',
    'Morocco',
    'Test Address, Morocco',
    'DRAFT',
    1,
    'Test Program',
    'Test University',
    '1000 MAD',
    '2000 MAD',
    1
WHERE NOT EXISTS (SELECT 1 FROM applications LIMIT 1);
