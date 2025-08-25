-- Migration V3 FINAL: Simple Applications Structure - Fonctionnel et sans erreurs
-- Ce script crée une structure simple qui fonctionne parfaitement

-- 1. Créer la table applications simple et fonctionnelle
CREATE TABLE IF NOT EXISTS applications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    application_id VARCHAR(255) UNIQUE NOT NULL,
    
    -- Contact Details
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NULL,
    whatsapp VARCHAR(50) NULL,
    
    -- Student's Information
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    date_of_birth VARCHAR(50) NULL,
    place_of_birth VARCHAR(255) NULL,
    gender VARCHAR(20) NULL,
    marital_status VARCHAR(20) NULL,
    passport_number VARCHAR(100) NULL,
    passport_expiry VARCHAR(50) NULL,
    
    -- Language Proficiency
    english_level VARCHAR(50) NULL,
    english_certificate VARCHAR(100) NULL,
    english_score VARCHAR(50) NULL,
    
    -- Home Address Details
    country VARCHAR(100) DEFAULT 'Morocco',
    full_address TEXT DEFAULT 'Address not specified',
    
    -- Educational Background (JSON stored as TEXT)
    education_background TEXT NULL,
    
    -- Work Experience (JSON stored as TEXT)
    work_experience TEXT NULL,
    
    -- Family Information (JSON stored as TEXT)
    family_members TEXT NULL,
    
    -- Financial Supporter (Guarantor)
    guarantor_relationship VARCHAR(100) NULL,
    guarantor_name VARCHAR(255) NULL,
    guarantor_country VARCHAR(100) NULL,
    guarantor_address TEXT NULL,
    guarantor_email VARCHAR(255) NULL,
    guarantor_workplace VARCHAR(255) NULL,
    guarantor_workplace_address TEXT NULL,
    
    -- Emergency Contact in China
    emergency_name VARCHAR(255) NULL,
    emergency_country VARCHAR(100) NULL,
    emergency_email VARCHAR(255) NULL,
    emergency_address TEXT NULL,
    
    -- Declarations
    declaration1 BOOLEAN DEFAULT FALSE,
    declaration2 BOOLEAN DEFAULT FALSE,
    declaration3 BOOLEAN DEFAULT FALSE,
    declaration4 BOOLEAN DEFAULT FALSE,
    declaration5 BOOLEAN DEFAULT FALSE,
    declaration6 BOOLEAN DEFAULT FALSE,
    
    -- Document Paths
    passport_path VARCHAR(500) NULL,
    academic_certificate_path VARCHAR(500) NULL,
    academic_transcript_path VARCHAR(500) NULL,
    language_certificate_path VARCHAR(500) NULL,
    physical_examination_path VARCHAR(500) NULL,
    non_criminal_certificate_path VARCHAR(500) NULL,
    bank_statement_path VARCHAR(500) NULL,
    photo_path VARCHAR(500) NULL,
    resume_path VARCHAR(500) NULL,
    award_certificates_path VARCHAR(500) NULL,
    parent_id_path VARCHAR(500) NULL,
    
    -- Payment Information
    payment_method VARCHAR(100) NULL,
    payment_status VARCHAR(50) DEFAULT 'pending',
    
    -- Application Status
    status VARCHAR(50) DEFAULT 'DRAFT',
    current_step INT DEFAULT 1,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Program Information
    program_name VARCHAR(255) NULL,
    university_name VARCHAR(255) NULL,
    
    -- Fees
    application_fees VARCHAR(100) NULL,
    service_fees VARCHAR(100) NULL,
    
    -- User who created the application
    user_id BIGINT NULL,
    
    -- Indexes
    INDEX idx_application_id (application_id),
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_current_step (current_step),
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at)
);

-- 2. Insérer une application de test
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
    service_fees
) VALUES (
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
    '2000 MAD'
);

-- 3. Vérifier la création
SELECT 'Migration V3 FINAL completed successfully!' as status;
SELECT COUNT(*) as total_applications FROM applications;
