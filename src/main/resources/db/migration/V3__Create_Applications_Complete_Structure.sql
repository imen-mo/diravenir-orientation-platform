-- Migration V3: Create complete applications structure with proper normalization
-- This replaces the JSON approach with proper relational database design

-- 1. Applications main table
CREATE TABLE IF NOT EXISTS applications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    application_id VARCHAR(255) UNIQUE NOT NULL,
    
    -- Contact Details
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    whatsapp VARCHAR(50),
    
    -- Student's Information
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    date_of_birth DATE,
    place_of_birth VARCHAR(255),
    gender ENUM('MALE', 'FEMALE'),
    marital_status ENUM('SINGLE', 'MARRIED'),
    passport_number VARCHAR(100),
    passport_expiry DATE,
    
    -- Language Proficiency
    english_level ENUM('POOR', 'FAIR', 'GOOD', 'VERY_GOOD', 'EXCELLENT'),
    english_certificate ENUM('IELTS', 'TOEFL', 'DUOLINGO', 'OTHER', 'NONE'),
    english_score VARCHAR(50),
    
    -- Home Address Details
    country VARCHAR(100) DEFAULT 'Morocco',
    full_address TEXT DEFAULT 'Address not specified',
    province VARCHAR(100),
    postal_code VARCHAR(20),
    
    -- Payment Information
    payment_method VARCHAR(100),
    payment_status ENUM('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED') DEFAULT 'PENDING',
    payment_amount DECIMAL(10,2),
    payment_currency VARCHAR(3) DEFAULT 'MAD',
    
    -- Application Status
    status ENUM('DRAFT', 'IN_PROGRESS', 'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'COMPLETED', 'ON_HOLD', 'WITHDRAWN', 'SUSPENDED', 'EXPIRED', 'CANCELLED') DEFAULT 'DRAFT',
    current_step INT DEFAULT 1,
    
    -- Declarations (renamed for clarity)
    terms_accepted BOOLEAN DEFAULT FALSE,
    consent_given BOOLEAN DEFAULT FALSE,
    accuracy_declared BOOLEAN DEFAULT FALSE,
    payment_policy_accepted BOOLEAN DEFAULT FALSE,
    refund_policy_accepted BOOLEAN DEFAULT FALSE,
    compliance_agreed BOOLEAN DEFAULT FALSE,
    
    -- Final declaration
    final_declaration BOOLEAN DEFAULT FALSE,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    submitted_at TIMESTAMP NULL,
    approved_at TIMESTAMP NULL,
    rejected_at TIMESTAMP NULL,
    
    -- Program Information
    program_name VARCHAR(255),
    university_name VARCHAR(255),
    
    -- Fees
    application_fees VARCHAR(100),
    service_fees VARCHAR(100),
    
    -- User who created the application
    user_id BIGINT,
    
    -- Admin notes
    admin_notes TEXT,
    
    -- Indexes
    INDEX idx_application_id (application_id),
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_current_step (current_step),
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at),
    INDEX idx_submitted_at (submitted_at),
    
    -- Foreign Key
    FOREIGN KEY (user_id) REFERENCES utilisateurs(id) ON DELETE SET NULL
);

-- 2. Education Background table (normalized)
CREATE TABLE IF NOT EXISTS education_background (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    application_id BIGINT NOT NULL,
    school VARCHAR(255) NOT NULL,
    major VARCHAR(255),
    started_date DATE NOT NULL,
    finished_date DATE NOT NULL,
    grade VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
    INDEX idx_application_id (application_id)
);

-- 3. Work Experience table (normalized)
CREATE TABLE IF NOT EXISTS work_experience (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    application_id BIGINT NOT NULL,
    employer VARCHAR(255) NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    started_date DATE NOT NULL,
    finished_date DATE NULL,
    is_present BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
    INDEX idx_application_id (application_id)
);

-- 4. Family Members table (normalized)
CREATE TABLE IF NOT EXISTS family_members (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    application_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    nationality VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    workplace VARCHAR(255),
    position VARCHAR(255),
    relationship ENUM('FATHER', 'MOTHER', 'GUARDIAN', 'SPOUSE', 'BROTHER', 'SISTER', 'OTHER') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
    INDEX idx_application_id (application_id),
    INDEX idx_relationship (relationship)
);

-- 5. Financial Guarantor table (normalized)
CREATE TABLE IF NOT EXISTS financial_guarantor (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    application_id BIGINT NOT NULL,
    relationship ENUM('SELF', 'PARENT', 'GUARDIAN', 'FRIEND', 'COMPANY', 'GOVERNMENT') NOT NULL,
    name VARCHAR(255) NOT NULL,
    country VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    email VARCHAR(255),
    workplace VARCHAR(255),
    workplace_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
    INDEX idx_application_id (application_id)
);

-- 6. Emergency Contact table (normalized)
CREATE TABLE IF NOT EXISTS emergency_contact (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    application_id BIGINT NOT NULL,
    name VARCHAR(255),
    country VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
    INDEX idx_application_id (application_id)
);

-- 7. Application Documents table (normalized)
CREATE TABLE IF NOT EXISTS application_documents (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    application_id BIGINT NOT NULL,
    document_type ENUM('PASSPORT', 'ACADEMIC_CERTIFICATE', 'ACADEMIC_TRANSCRIPT', 'LANGUAGE_CERTIFICATE', 'PHYSICAL_EXAMINATION', 'NON_CRIMINAL_CERTIFICATE', 'BANK_STATEMENT', 'PHOTO', 'RESUME', 'AWARD_CERTIFICATES', 'PARENT_ID') NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_size BIGINT,
    file_type VARCHAR(100),
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
    admin_notes TEXT,
    
    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
    INDEX idx_application_id (application_id),
    INDEX idx_document_type (document_type),
    INDEX idx_status (status),
    UNIQUE KEY unique_doc_per_app (application_id, document_type)
);

-- 8. Application Status History table (for tracking changes)
CREATE TABLE IF NOT EXISTS application_status_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    application_id BIGINT NOT NULL,
    old_status VARCHAR(50),
    new_status VARCHAR(50) NOT NULL,
    changed_by VARCHAR(100) NOT NULL,
    admin_notes TEXT,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
    INDEX idx_application_id (application_id),
    INDEX idx_changed_at (changed_at)
);

-- 9. Application Notifications table
CREATE TABLE IF NOT EXISTS application_notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    application_id BIGINT NOT NULL,
    type ENUM('INFO', 'WARNING', 'SUCCESS', 'ERROR') NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
    INDEX idx_application_id (application_id),
    INDEX idx_is_read (is_read),
    INDEX idx_created_at (created_at)
);

-- Insert sample application
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
) VALUES (
    CONCAT('APP', UNIX_TIMESTAMP()),
    'sample@example.com',
    'John',
    'Doe',
    'Morocco',
    'Sample Address, Morocco',
    'DRAFT',
    1,
    'Bachelor in Business Administration',
    'UNIVERSITY CHINA',
    '4000 MAD',
    '11000 MAD',
    1
);
