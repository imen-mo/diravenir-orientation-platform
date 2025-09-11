package com.diravenir.mapper;

import com.diravenir.Entities.Application;
import com.diravenir.dto.ApplicationDTO;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static com.diravenir.Entities.Application.Gender;
import static com.diravenir.Entities.Application.MaritalStatus;
import static com.diravenir.Entities.Application.EnglishLevel;
import static com.diravenir.Entities.Application.EnglishCertificate;

@Component
public class ApplicationMapper {
    
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    private static final DateTimeFormatter DATETIME_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
    
    public ApplicationDTO toDTO(Application application) {
        if (application == null) {
            return null;
        }
        
        ApplicationDTO dto = new ApplicationDTO();
        
        // Basic fields
        dto.setId(application.getId());
        dto.setApplicationId(application.getApplicationId());
        dto.setUserId(application.getUserId());
        dto.setProgramName(application.getProgramName());
        dto.setUniversityName(application.getUniversityName());
        dto.setApplicationFees(application.getApplicationFees());
        dto.setServiceFees(application.getServiceFees());
        
        // ===== STEP 1: YOUR INFORMATION =====
        
        // 1. Contact Details
        dto.setEmail(application.getEmail());
        dto.setPhone(application.getPhone());
        dto.setWhatsapp(application.getWhatsapp());
        
        // 2. Student's Information
        dto.setFirstName(application.getFirstName());
        dto.setLastName(application.getLastName());
        dto.setDateOfBirth(formatDate(application.getDateOfBirth()));
        dto.setPlaceOfBirth(application.getPlaceOfBirth());
        dto.setGender(application.getGender() != null ? application.getGender().name() : null);
        dto.setMaritalStatus(application.getMaritalStatus() != null ? application.getMaritalStatus().name() : null);
        dto.setPassportNumber(application.getPassportNumber());
        dto.setPassportExpiry(formatDate(application.getPassportExpiry()));
        
        // 3. Language Proficiency
        dto.setEnglishLevel(application.getEnglishLevel() != null ? application.getEnglishLevel().name() : null);
        dto.setEnglishCertificate(application.getEnglishCertificate() != null ? application.getEnglishCertificate().name() : null);
        dto.setEnglishScore(application.getEnglishScore());
        
        // 4. Home Address Details
        dto.setCountry(application.getCountry());
        dto.setFullAddress(application.getFullAddress());
        dto.setProvince(application.getProvince());
        dto.setPostalCode(application.getPostalCode());
        
        // 5. Educational Background
        dto.setEducationBackground(application.getEducationBackground());
        
        // 6. Work Experience
        dto.setWorkExperience(application.getWorkExperience());
        
        // ===== STEP 2: YOUR FAMILY =====
        
        // A. Family Contact
        dto.setFamilyMembers(application.getFamilyMembers());
        
        // B. Financial Supporter (Guarantor)
        dto.setGuarantorRelationship(application.getGuarantorRelationship());
        dto.setGuarantorName(application.getGuarantorName());
        dto.setGuarantorCountry(application.getGuarantorCountry());
        dto.setGuarantorAddress(application.getGuarantorAddress());
        dto.setGuarantorEmail(application.getGuarantorEmail());
        dto.setGuarantorWorkplace(application.getGuarantorWorkplace());
        dto.setGuarantorWorkplaceAddress(application.getGuarantorWorkplaceAddress());
        
        // C. Emergency Contact in China
        dto.setEmergencyContactName(application.getEmergencyContactName());
        dto.setEmergencyCountry(application.getEmergencyCountry());
        dto.setEmergencyContactEmail(application.getEmergencyContactEmail());
        dto.setEmergencyContactAddress(application.getEmergencyContactAddress());
        
        // ===== STEP 3: DECLARATION & AGREEMENT =====
        
        dto.setTermsAccepted(application.getTermsAccepted());
        dto.setConsentGiven(application.getConsentGiven());
        dto.setAccuracyDeclared(application.getAccuracyDeclared());
        dto.setPaymentPolicyAccepted(application.getPaymentPolicyAccepted());
        dto.setRefundPolicyAccepted(application.getRefundPolicyAccepted());
        dto.setComplianceAgreed(application.getComplianceAgreed());
        
        // ===== STEP 4: UPLOAD DOCUMENTS =====
        
        dto.setPassportPath(application.getPassportPath());
        dto.setAcademicCertificatePath(application.getAcademicCertificatePath());
        dto.setAcademicTranscriptPath(application.getAcademicTranscriptPath());
        dto.setLanguageCertificatePath(application.getLanguageCertificatePath());
        dto.setPhysicalExaminationPath(application.getPhysicalExaminationPath());
        dto.setNoCriminalCertificatePath(application.getNoCriminalCertificatePath());
        dto.setBankStatementPath(application.getBankStatementPath());
        dto.setPhotoPath(application.getPhotoPath());
        dto.setResumePath(application.getResumePath());
        dto.setAwardCertificatesPath(application.getAwardCertificatesPath());
        dto.setParentIdPath(application.getParentIdPath());
        
        // ===== STEP 5: FINAL STEP (PAYMENT & NEXT STEPS) =====
        
        dto.setPayment(application.getPayment());
        dto.setFinalDeclaration(application.getFinalDeclaration());
        
        // Application Status
        dto.setStatus(application.getStatus());
        dto.setCurrentStep(application.getCurrentStep());
        dto.setNotes(application.getNotes());
        dto.setAdminNotes(application.getAdminNotes());
        
        // Timestamps
        dto.setCreatedAt(formatDateTime(application.getCreatedAt()));
        dto.setUpdatedAt(formatDateTime(application.getUpdatedAt()));
        dto.setLastUpdated(formatDateTime(application.getLastUpdated()));
        dto.setSubmittedAt(formatDateTime(application.getSubmittedAt()));
        dto.setApprovedAt(formatDateTime(application.getApprovedAt()));
        dto.setRejectedAt(formatDateTime(application.getRejectedAt()));
        
        return dto;
    }
    
    public Application toEntity(ApplicationDTO dto) {
        if (dto == null) {
            return null;
        }
        
        Application application = new Application();
        
        // Basic fields
        application.setId(dto.getId());
        application.setApplicationId(dto.getApplicationId());
        application.setUserId(dto.getUserId());
        application.setProgramName(dto.getProgramName());
        application.setUniversityName(dto.getUniversityName());
        application.setApplicationFees(dto.getApplicationFees());
        application.setServiceFees(dto.getServiceFees());
        
        // ===== STEP 1: YOUR INFORMATION =====
        
        // 1. Contact Details
        application.setEmail(dto.getEmail());
        application.setPhone(dto.getPhone());
        application.setWhatsapp(dto.getWhatsapp());
        
        // 2. Student's Information
        application.setFirstName(dto.getFirstName());
        application.setLastName(dto.getLastName());
        application.setDateOfBirth(parseDate(dto.getDateOfBirth()));
        application.setPlaceOfBirth(dto.getPlaceOfBirth());
        application.setGender(dto.getGender() != null ? Application.Gender.valueOf(dto.getGender()) : null);
        application.setMaritalStatus(dto.getMaritalStatus() != null ? Application.MaritalStatus.valueOf(dto.getMaritalStatus()) : null);
        application.setPassportNumber(dto.getPassportNumber());
        application.setPassportExpiry(parseDate(dto.getPassportExpiry()));
        
        // 3. Language Proficiency
        application.setEnglishLevel(dto.getEnglishLevel() != null ? Application.EnglishLevel.valueOf(dto.getEnglishLevel()) : null);
        application.setEnglishCertificate(dto.getEnglishCertificate() != null ? Application.EnglishCertificate.valueOf(dto.getEnglishCertificate()) : null);
        application.setEnglishScore(dto.getEnglishScore());
        
        // 4. Home Address Details
        application.setCountry(dto.getCountry());
        application.setFullAddress(dto.getFullAddress());
        application.setProvince(dto.getProvince());
        application.setPostalCode(dto.getPostalCode());
        
        // 5. Educational Background
        application.setEducationBackground(dto.getEducationBackground());
        
        // 6. Work Experience
        application.setWorkExperience(dto.getWorkExperience());
        
        // ===== STEP 2: YOUR FAMILY =====
        
        // A. Family Contact
        application.setFamilyMembers(dto.getFamilyMembers());
        
        // B. Financial Supporter (Guarantor)
        application.setGuarantorRelationship(dto.getGuarantorRelationship());
        application.setGuarantorName(dto.getGuarantorName());
        application.setGuarantorCountry(dto.getGuarantorCountry());
        application.setGuarantorAddress(dto.getGuarantorAddress());
        application.setGuarantorEmail(dto.getGuarantorEmail());
        application.setGuarantorWorkplace(dto.getGuarantorWorkplace());
        application.setGuarantorWorkplaceAddress(dto.getGuarantorWorkplaceAddress());
        
        // C. Emergency Contact in China
        application.setEmergencyContactName(dto.getEmergencyContactName());
        application.setEmergencyCountry(dto.getEmergencyCountry());
        application.setEmergencyContactEmail(dto.getEmergencyContactEmail());
        application.setEmergencyContactAddress(dto.getEmergencyContactAddress());
        
        // ===== STEP 3: DECLARATION & AGREEMENT =====
        
        application.setTermsAccepted(dto.getTermsAccepted());
        application.setConsentGiven(dto.getConsentGiven());
        application.setAccuracyDeclared(dto.getAccuracyDeclared());
        application.setPaymentPolicyAccepted(dto.getPaymentPolicyAccepted());
        application.setRefundPolicyAccepted(dto.getRefundPolicyAccepted());
        application.setComplianceAgreed(dto.getComplianceAgreed());
        
        // ===== STEP 4: UPLOAD DOCUMENTS =====
        
        application.setPassportPath(dto.getPassportPath());
        application.setAcademicCertificatePath(dto.getAcademicCertificatePath());
        application.setAcademicTranscriptPath(dto.getAcademicTranscriptPath());
        application.setLanguageCertificatePath(dto.getLanguageCertificatePath());
        application.setPhysicalExaminationPath(dto.getPhysicalExaminationPath());
        application.setNoCriminalCertificatePath(dto.getNoCriminalCertificatePath());
        application.setBankStatementPath(dto.getBankStatementPath());
        application.setPhotoPath(dto.getPhotoPath());
        application.setResumePath(dto.getResumePath());
        application.setAwardCertificatesPath(dto.getAwardCertificatesPath());
        application.setParentIdPath(dto.getParentIdPath());
        
        // ===== STEP 5: FINAL STEP (PAYMENT & NEXT STEPS) =====
        
        application.setPayment(dto.getPayment());
        application.setFinalDeclaration(dto.getFinalDeclaration());
        
        // Application Status
        application.setStatus(dto.getStatus());
        application.setCurrentStep(dto.getCurrentStep());
        application.setNotes(dto.getNotes());
        application.setAdminNotes(dto.getAdminNotes());
        
        return application;
    }
    
    private String formatDate(LocalDate date) {
        return date != null ? date.format(DATE_FORMATTER) : null;
    }
    
    // Méthode pour formater les String en LocalDateTime
    private String formatDateTime(String dateTime) {
        if (dateTime == null) {
            return null;
        }
        return dateTime; // Retourne la string telle quelle
    }
    
    // Méthode pour formater LocalDateTime en String
    private String formatDateTime(LocalDateTime dateTime) {
        return dateTime != null ? dateTime.format(DATETIME_FORMATTER) : null;
    }
    
    private LocalDate parseDate(String dateStr) {
        if (dateStr == null || dateStr.trim().isEmpty()) {
            return null;
        }
        try {
            return LocalDate.parse(dateStr, DATE_FORMATTER);
        } catch (Exception e) {
            // Try alternative formats if needed
            return null;
        }
    }
}
