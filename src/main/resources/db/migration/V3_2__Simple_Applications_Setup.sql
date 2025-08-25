-- Migration V3.2: Simple Applications Setup - Migration sécurisée
-- Ce script crée les tables de manière sécurisée sans erreurs

-- 1. Créer la table applications avec des valeurs par défaut appropriées
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
    date_of_birth DATE NULL,
    place_of_birth VARCHAR(255) NULL,
    gender VARCHAR(20) NULL,
    marital_status VARCHAR(20) NULL,
    passport_number VARCHAR(100) NULL,
    passport_expiry DATE NULL,
    
    -- Language Proficiency
    english_level VARCHAR(50) NULL,
    english_certificate VARCHAR(100) NULL,
    english_score VARCHAR(50) NULL,
    
    -- Home Address Details
    country VARCHAR(100) DEFAULT 'Morocco',
    full_address TEXT DEFAULT 'Address not specified',
    province VARCHAR(100) NULL,
    postal_code VARCHAR(20) NULL,
    
    -- Payment Information
    payment_method VARCHAR(100) NULL,
    payment_status VARCHAR(50) DEFAULT 'PENDING',
    payment_amount DECIMAL(10,2) NULL,
    payment_currency VARCHAR(3) DEFAULT 'MAD',
    
    -- Application Status
    status VARCHAR(50) DEFAULT 'DRAFT',
    current_step INT DEFAULT 1,
    
    -- Declarations
    terms_accepted BOOLEAN DEFAULT FALSE,
    consent_given BOOLEAN DEFAULT FALSE,
    accuracy_declared BOOLEAN DEFAULT FALSE,
    payment_policy_accepted BOOLEAN DEFAULT FALSE,
    refund_policy_accepted BOOLEAN DEFAULT FALSE,
    compliance_agreed BOOLEAN DEFAULT FALSE,
    final_declaration BOOLEAN DEFAULT FALSE,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    submitted_at TIMESTAMP NULL,
    approved_at TIMESTAMP NULL,
    rejected_at TIMESTAMP NULL,
    
    -- Program Information
    program_name VARCHAR(255) NULL,
    university_name VARCHAR(255) NULL,
    application_fees VARCHAR(100) NULL,
    service_fees VARCHAR(100) NULL,
    
    -- User who created the application
    user_id BIGINT NULL,
    
    -- Admin notes
    admin_notes TEXT NULL,
    
    -- Indexes
    INDEX idx_application_id (application_id),
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_current_step (current_step),
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at),
    INDEX idx_submitted_at (submitted_at)
);

-- 2. Créer la table education_background
CREATE TABLE IF NOT EXISTS education_background (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    application_id BIGINT NOT NULL,
    school VARCHAR(255) NOT NULL,
    major VARCHAR(255) NULL,
    started_date DATE NOT NULL,
    finished_date DATE NOT NULL,
    grade VARCHAR(50) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_application_id (application_id)
);

-- 3. Créer la table work_experience
CREATE TABLE IF NOT EXISTS work_experience (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    application_id BIGINT NOT NULL,
    employer VARCHAR(255) NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    started_date DATE NOT NULL,
    finished_date DATE NULL,
    is_present BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_application_id (application_id)
);

-- 4. Créer la table family_members
CREATE TABLE IF NOT EXISTS family_members (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    application_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    nationality VARCHAR(100) NOT NULL,
    email VARCHAR(255) NULL,
    workplace VARCHAR(255) NULL,
    position VARCHAR(255) NULL,
    relationship VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_application_id (application_id),
    INDEX idx_relationship (relationship)
);

-- 5. Créer la table financial_guarantor
CREATE TABLE IF NOT EXISTS financial_guarantor (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    application_id BIGINT NOT NULL,
    relationship VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    country VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    email VARCHAR(255) NULL,
    workplace VARCHAR(255) NULL,
    workplace_address TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_application_id (application_id)
);

-- 6. Créer la table emergency_contact
CREATE TABLE IF NOT EXISTS emergency_contact (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    application_id BIGINT NOT NULL,
    name VARCHAR(255) NULL,
    country VARCHAR(100) NOT NULL,
    email VARCHAR(255) NULL,
    address TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_application_id (application_id)
);

-- 7. Créer la table application_documents
CREATE TABLE IF NOT EXISTS application_documents (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    application_id BIGINT NOT NULL,
    document_type VARCHAR(100) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_size BIGINT NULL,
    file_type VARCHAR(100) NULL,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'PENDING',
    admin_notes TEXT NULL,
    
    INDEX idx_application_id (application_id),
    INDEX idx_document_type (document_type),
    INDEX idx_status (status),
    UNIQUE KEY unique_doc_per_app (application_id, document_type)
);

-- 8. Créer la table application_status_history
CREATE TABLE IF NOT EXISTS application_status_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    application_id BIGINT NOT NULL,
    old_status VARCHAR(50) NULL,
    new_status VARCHAR(50) NOT NULL,
    changed_by VARCHAR(100) NOT NULL,
    admin_notes TEXT NULL,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_application_id (application_id),
    INDEX idx_changed_at (changed_at)
);

-- 9. Créer la table application_notifications
CREATE TABLE IF NOT EXISTS application_notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    application_id BIGINT NOT NULL,
    type VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_application_id (application_id),
    INDEX idx_is_read (is_read),
    INDEX idx_created_at (created_at)
);

-- 10. Insérer une application de test
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
