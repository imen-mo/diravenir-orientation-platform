package com.dira.diravenir1.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "applications")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Application {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String applicationId;
    
    // ===== STEP 1: CONTACT & PERSONAL INFO =====
    
    // Contact Details
    @Column(nullable = false)
    private String email;
    
    @Column
    private String phone;
    
    @Column
    private String whatsapp;
    
    // Student's Information
    @Column(nullable = false)
    private String firstName;
    
    @Column(nullable = false)
    private String lastName;
    
    @Column
    private LocalDate dateOfBirth;
    
    @Column
    private String placeOfBirth;
    
    @Enumerated(EnumType.STRING)
    private Gender gender;
    
    @Enumerated(EnumType.STRING)
    private MaritalStatus maritalStatus;
    
    @Column
    private String passportNumber;
    
    @Column
    private LocalDate passportExpiry;
    
    // Language Proficiency
    @Enumerated(EnumType.STRING)
    private EnglishLevel englishLevel;
    
    @Enumerated(EnumType.STRING)
    private EnglishCertificate englishCertificate;
    
    @Column
    private String englishScore;
    
    // Home Address Details
    @Column
    private String country;
    
    @Column(columnDefinition = "TEXT")
    private String fullAddress;
    
    @Column
    private String province;
    
    @Column
    private String postalCode;
    
    // ===== STEP 2: EDUCATION & WORK =====
    
    // Educational Background (JSON stored as TEXT)
    @Column(columnDefinition = "TEXT")
    private String educationBackground;
    
    // Work Experience (JSON stored as TEXT)
    @Column(columnDefinition = "TEXT")
    private String workExperience;
    
    // ===== STEP 3: FAMILY & GUARANTOR =====
    
    // Family Information (JSON stored as TEXT)
    @Column(columnDefinition = "TEXT")
    private String familyMembers;
    
    // Financial Supporter (Guarantor)
    private String guarantorRelationship;
    private String guarantorName;
    private String guarantorCountry;
    @Column(columnDefinition = "TEXT")
    private String guarantorAddress;
    private String guarantorEmail;
    private String guarantorWorkplace;
    @Column(columnDefinition = "TEXT")
    private String guarantorWorkplaceAddress;
    
    // Emergency Contact in China
    private String emergencyName;
    private String emergencyCountry;
    private String emergencyEmail;
    @Column(columnDefinition = "TEXT")
    private String emergencyAddress;
    
    // Emergency Contact Details (pour compatibilité avec le mapper)
    private String emergencyContactName;
    private String emergencyContactEmail;
    private String emergencyContactAddress;
    
    // ===== STEP 4: DECLARATIONS =====
    
    @Column
    private Boolean declaration1 = false;
    
    @Column
    private Boolean declaration2 = false;
    
    @Column
    private Boolean declaration3 = false;
    
    @Column
    private Boolean declaration4 = false;
    
    @Column
    private Boolean declaration5 = false;
    
    @Column
    private Boolean declaration6 = false;
    
    // Terms and Consent (pour compatibilité avec le mapper)
    private Boolean termsAccepted;
    private Boolean consentGiven;
    private Boolean accuracyDeclared;
    private Boolean paymentPolicyAccepted;
    private Boolean refundPolicyAccepted;
    private Boolean complianceAgreed;
    
    // Final declaration
    @Column
    private Boolean finalDeclaration = false;
    
    // ===== STEP 5: DOCUMENTS & PAYMENT =====
    
    // Document Paths
    private String passportPath;
    private String academicCertificatePath;
    private String academicTranscriptPath;
    private String languageCertificatePath;
    private String physicalExaminationPath;
    private String nonCriminalCertificatePath;
    private String noCriminalCertificatePath; // Alias pour compatibilité
    private String bankStatementPath;
    private String photoPath;
    private String resumePath;
    private String awardCertificatesPath;
    private String parentIdPath;
    
    // Payment Information
    @Column
    private String paymentMethod;
    
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;
    
    @Column
    private String paymentAmount;
    
    @Column
    private String paymentCurrency = "MAD";
    
    // Payment alias (pour compatibilité avec le mapper)
    private String payment;
    
    // ===== APPLICATION STATUS & PROGRESS =====
    
    private String status = "DRAFT";
    
    @Column
    private Integer currentStep = 1;
    
    // ===== PROGRAM INFORMATION =====
    
    @Column
    private String programName;
    
    @Column
    private String universityName;
    
    @Column
    private String applicationFees;
    
    @Column
    private String serviceFees;
    
    // ===== TIMESTAMPS =====
    
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;
    
    @Column
    private LocalDateTime submittedAt;
    
    @Column
    private LocalDateTime approvedAt;
    
    @Column
    private LocalDateTime rejectedAt;
    
    // Timestamp alias (pour compatibilité avec le mapper)
    private String lastUpdated;
    
    // ===== USER & ADMIN =====
    
    @Column
    private Long userId;
    
    @Column(columnDefinition = "TEXT")
    private String adminNotes;
    
    // Notes (pour compatibilité avec le mapper)
    private String notes;
    
    @OneToMany(mappedBy = "application", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ApplicationDocument> documents;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "etudiant_id")
    private Etudiant etudiant;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "programme_id")
    private Program programme;
    
    // ===== ENUMS =====
    
    public enum Gender {
        MALE, FEMALE
    }
    
    public enum MaritalStatus {
        SINGLE, MARRIED
    }
    
    public enum EnglishLevel {
        POOR, FAIR, GOOD, VERY_GOOD, EXCELLENT
    }
    
    public enum EnglishCertificate {
        IELTS, TOEFL, DUOLINGO, OTHER, NONE
    }
    
    public enum PaymentStatus {
        PENDING, COMPLETED, FAILED, REFUNDED
    }
    
    // ===== HELPER METHODS =====
    
    @PrePersist
    protected void onCreate() {
        if (applicationId == null) {
            applicationId = "APP" + System.currentTimeMillis();
        }
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        if (updatedAt == null) {
            updatedAt = LocalDateTime.now();
        }
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    // Helper methods for managing JSON fields
    public void addEducationBackground(String education) {
        if (this.educationBackground == null) {
            this.educationBackground = "[]";
        }
        this.educationBackground = this.educationBackground.replace("]", ", " + education + "]");
    }
    
    public void addWorkExperience(String work) {
        if (this.workExperience == null) {
            this.workExperience = "[]";
        }
        this.workExperience = this.workExperience.replace("]", ", " + work + "]");
    }
    
    public void addFamilyMember(String member) {
        if (this.familyMembers == null) {
            this.familyMembers = "[]";
        }
        this.familyMembers = this.familyMembers.replace("]", ", " + member + "]");
    }
}
