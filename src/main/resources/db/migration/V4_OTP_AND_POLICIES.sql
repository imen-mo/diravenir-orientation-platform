-- Migration V4: OTP et Politiques - Compatible MySQL/Hibernate
-- Date: 2024-01-XX
-- Description: Ajout des tables pour la vérification OTP et les politiques
-- Compatible: MySQL 8.0+, Hibernate, Spring Boot

-- ===== TABLE EMAIL_OTPS =====
CREATE TABLE IF NOT EXISTS email_otps (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    otp_code VARCHAR(10) NOT NULL,
    expiry_time TIMESTAMP NOT NULL,
    is_used BOOLEAN NOT NULL DEFAULT FALSE,
    attempts INT NOT NULL DEFAULT 0,
    max_attempts INT NOT NULL DEFAULT 3,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email_otps_email (email),
    INDEX idx_email_otps_expiry (expiry_time),
    INDEX idx_email_otps_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===== TABLE POLICIES =====
CREATE TABLE IF NOT EXISTS policies (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    policy_type VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    version VARCHAR(20) NOT NULL DEFAULT '1.0',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    requires_consent BOOLEAN NOT NULL DEFAULT TRUE,
    last_updated_by VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_policies_type (policy_type),
    INDEX idx_policies_active (is_active),
    INDEX idx_policies_consent (requires_consent)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===== TABLE EDUCATION_BLOCKS =====
CREATE TABLE IF NOT EXISTS education_blocks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    application_id BIGINT NOT NULL,
    school VARCHAR(255) NOT NULL,
    major VARCHAR(255),
    started_date DATE NOT NULL,
    finished_date DATE,
    grade VARCHAR(50),
    gpa VARCHAR(20),
    country VARCHAR(100),
    city VARCHAR(100),
    description TEXT,
    is_current BOOLEAN NOT NULL DEFAULT FALSE,
    block_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
    INDEX idx_education_blocks_app_id (application_id),
    INDEX idx_education_blocks_order (block_order),
    INDEX idx_education_blocks_dates (started_date, finished_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===== TABLE WORK_EXPERIENCE_BLOCKS =====
CREATE TABLE IF NOT EXISTS work_experience_blocks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    application_id BIGINT NOT NULL,
    employer VARCHAR(255) NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    started_date DATE NOT NULL,
    finished_date DATE,
    department VARCHAR(255),
    location VARCHAR(255),
    country VARCHAR(100),
    city VARCHAR(100),
    description TEXT,
    responsibilities TEXT,
    salary VARCHAR(100),
    currency VARCHAR(10),
    is_current BOOLEAN NOT NULL DEFAULT FALSE,
    block_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
    INDEX idx_work_blocks_app_id (application_id),
    INDEX idx_work_blocks_order (block_order),
    INDEX idx_work_blocks_dates (started_date, finished_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===== TABLE FAMILY_MEMBER_BLOCKS =====
CREATE TABLE IF NOT EXISTS family_member_blocks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    application_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    nationality VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    workplace VARCHAR(255),
    position VARCHAR(255),
    relationship VARCHAR(100) NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(20),
    address TEXT,
    country VARCHAR(100),
    city VARCHAR(100),
    occupation VARCHAR(255),
    income VARCHAR(100),
    currency VARCHAR(10),
    notes TEXT,
    is_emergency_contact BOOLEAN NOT NULL DEFAULT FALSE,
    is_financial_supporter BOOLEAN NOT NULL DEFAULT FALSE,
    block_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
    INDEX idx_family_blocks_app_id (application_id),
    INDEX idx_family_blocks_order (block_order),
    INDEX idx_family_blocks_relationship (relationship),
    INDEX idx_family_blocks_emergency (is_emergency_contact),
    INDEX idx_family_blocks_financial (is_financial_supporter)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===== INSERTION DES POLITIQUES PAR DÉFAUT =====
-- Utilisation de INSERT IGNORE pour éviter les erreurs de duplication

-- Terms & Conditions
INSERT IGNORE INTO policies (policy_type, title, content, version, is_active, requires_consent, last_updated_by) 
VALUES ('TERMS_AND_CONDITIONS', 'Terms & Conditions', 
'1. Acceptance of Terms – By applying through the portal, you confirm you have read, understood, and agree to these Terms & Conditions.
2. Eligibility – Applicants must meet the eligibility criteria specified by the university and MalishaEdu; accurate, authentic, and complete information is required.
3. Application Process – Diravenir facilitates applications to universities. Submission of documents and payment of applicable service charges are mandatory. Applications are subject to review and approval by the university and relevant authorities.
4. Service Charges – Service charges are non‑refundable unless specified in the Refund Policy. Additional third‑party fees (university, visa, travel) are the applicant''s responsibility.
5. Applicant''s Responsibilities – You are responsible for the accuracy of all provided documents and information and for attending interviews or exams as required.
6. Platform Use – Unauthorized use of the portal (e.g., sharing accounts, fraudulent submissions) is prohibited. Diravenir may suspend or terminate access for misuse.
7. Liabilities – Diravenir is not liable for circumstances beyond its control, including visa rejections, university decisions, or delays caused by third parties. Users are responsible for complying with local laws and regulations.',
'1.0', TRUE, TRUE, 'SYSTEM');

-- Privacy Policy
INSERT IGNORE INTO policies (policy_type, title, content, version, is_active, requires_consent, last_updated_by) 
VALUES ('PRIVACY_POLICY', 'Privacy Policy',
'1. Information Collected – Personal (name, contact, passport details), Academic (transcripts, certificates), and Payment information (bank details or confirmations for service charges).
2. Usage – Processing university applications; facilitating scholarships; communicating application status; improving services.
3. Data Sharing – With partner universities, government bodies (visa), and authorized third parties required for processing. No sale of personal data to third parties.
4. Security – Encryption and secure servers; access limited to authorized personnel.
5. User Rights – Access, edit, or delete your personal data (not the application itself) by contacting Contact@Diravenir.com. Requests processed within 30 business days.
6. Cookies – Used to enhance experience; you can disable cookies in your browser.
7. Compliance – Diravenir complies with international data‑protection laws, including GDPR and relevant regulations in China.',
'1.0', TRUE, TRUE, 'SYSTEM');

-- Refund Policy
INSERT IGNORE INTO policies (policy_type, title, content, version, is_active, requires_consent, last_updated_by) 
VALUES ('REFUND_POLICY', 'Refund Policy',
'The policy sets conditions for full/partial refunds and scenarios with no refund.

When Diravenir can refund (Full payment):
- Diravenir fails to provide any admission to students after complete documents were provided.
- Diravenir issues an admission letter without consulting the student and the student does not agree to go there.

When Diravenir can refund (Partial):
- The student does not get a visa because of Diravenir''s or the university''s problem.
- If the student fails the final examination test (Baccalaureat)

When students do not get any refund:
- The student gives up at any stage.
- The student fails a university interview and disagrees with the outcome.
- The student fails to provide documents on time or does not attend interviews/exams.
- Visa rejection due to the student''s own problems.
- Any criminal record.
- Providing fake documents.
- Refusing to attend required English/Chinese language or interview-prep courses.
- Already in China and raising disputes/questions that could be resolved before traveling.',
'1.0', TRUE, TRUE, 'SYSTEM');

-- ===== COMMENTAIRES ET MÉTADONNÉES =====
COMMENT ON TABLE email_otps IS 'Table pour la gestion des codes OTP de vérification email';
COMMENT ON TABLE policies IS 'Table pour la gestion des politiques de l''application (Terms, Privacy, Refund)';
COMMENT ON TABLE education_blocks IS 'Table pour la gestion des blocs d''éducation répétables';
COMMENT ON TABLE work_experience_blocks IS 'Table pour la gestion des blocs d''expérience professionnelle répétables';
COMMENT ON TABLE family_member_blocks IS 'Table pour la gestion des blocs de membres de famille répétables';

-- ===== VÉRIFICATION DE LA MIGRATION =====
SELECT 'Migration V4 OTP et Politiques terminée avec succès' as status;
