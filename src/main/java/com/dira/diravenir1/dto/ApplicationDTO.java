package com.dira.diravenir1.dto;

import java.time.LocalDateTime;

public class ApplicationDTO {
    
    // Identifiants
    private Long id;
    private String applicationId;
    
    // Contact Details
    private String email;
    private String phone;
    private String whatsapp;
    
    // Student's Information
    private String firstName;
    private String lastName;
    private String dateOfBirth;
    private String placeOfBirth;
    private String gender;
    private String maritalStatus;
    private String passportNumber;
    private String passportExpiry;
    
    // Language Proficiency
    private String englishLevel;
    private String englishCertificate;
    private String englishScore;
    
    // Home Address Details
    private String country;
    private String fullAddress;
    private String province;
    private String postalCode;
    
    // Educational Background (JSON stored as TEXT)
    private String educationBackground;
    
    // Work Experience (JSON stored as TEXT)
    private String workExperience;
    
    // Family Information (JSON stored as TEXT)
    private String familyMembers;
    
    // Financial Supporter (Guarantor)
    private String guarantorRelationship;
    private String guarantorName;
    private String guarantorCountry;
    private String guarantorAddress;
    private String guarantorEmail;
    private String guarantorWorkplace;
    private String guarantorWorkplaceAddress;
    
    // Emergency Contact in China
    private String emergencyName;
    private String emergencyCountry;
    private String emergencyEmail;
    private String emergencyAddress;
    
    // Emergency Contact Details (pour compatibilité)
    private String emergencyContactName;
    private String emergencyContactEmail;
    private String emergencyContactAddress;
    
    // Declarations
    private Boolean declaration1;
    private Boolean declaration2;
    private Boolean declaration3;
    private Boolean declaration4;
    private Boolean declaration5;
    private Boolean declaration6;
    
    // Terms and Consent
    private Boolean termsAccepted;
    private Boolean consentGiven;
    private Boolean accuracyDeclared;
    private Boolean paymentPolicyAccepted;
    private Boolean refundPolicyAccepted;
    private Boolean complianceAgreed;
    
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
    private String paymentMethod;
    private String paymentStatus;
    private String payment; // Alias pour compatibilité
    
    // Application Status
    private String status;
    private Integer currentStep;
    private Boolean finalDeclaration;
    
    // Program Information
    private String programName;
    private String universityName;
    
    // Fees
    private String applicationFees;
    private String serviceFees;
    
    // Notes and Admin
    private String notes;
    private String adminNotes;
    
    // Timestamps
    private String createdAt;
    private String updatedAt;
    private String lastUpdated;
    private String submittedAt;
    private String approvedAt;
    private String rejectedAt;
    
    // User who created the application
    private Long userId;
    
    // Constructors
    public ApplicationDTO() {}
    
    // Getters and Setters pour les nouvelles propriétés
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getApplicationId() { return applicationId; }
    public void setApplicationId(String applicationId) { this.applicationId = applicationId; }
    
    public String getProvince() { return province; }
    public void setProvince(String province) { this.province = province; }
    
    public String getPostalCode() { return postalCode; }
    public void setPostalCode(String postalCode) { this.postalCode = postalCode; }
    
    public String getEmergencyContactName() { 
        return emergencyContactName != null ? emergencyContactName : emergencyName; 
    }
    public void setEmergencyContactName(String emergencyContactName) { 
        this.emergencyContactName = emergencyContactName; 
        if (this.emergencyName == null) {
            this.emergencyName = emergencyContactName;
        }
    }
    
    public String getEmergencyContactEmail() { 
        return emergencyContactEmail != null ? emergencyContactEmail : emergencyEmail; 
    }
    public void setEmergencyContactEmail(String emergencyContactEmail) { 
        this.emergencyContactEmail = emergencyContactEmail; 
        if (this.emergencyEmail == null) {
            this.emergencyEmail = emergencyContactEmail;
        }
    }
    
    public String getEmergencyContactAddress() { 
        return emergencyContactAddress != null ? emergencyContactAddress : emergencyAddress; 
    }
    public void setEmergencyContactAddress(String emergencyContactAddress) { 
        this.emergencyContactAddress = emergencyContactAddress; 
        if (this.emergencyAddress == null) {
            this.emergencyAddress = emergencyContactAddress;
        }
    }
    
    public Boolean getTermsAccepted() { return termsAccepted; }
    public void setTermsAccepted(Boolean termsAccepted) { this.termsAccepted = termsAccepted; }
    
    public Boolean getConsentGiven() { return consentGiven; }
    public void setConsentGiven(Boolean consentGiven) { this.consentGiven = consentGiven; }
    
    public Boolean getAccuracyDeclared() { return accuracyDeclared; }
    public void setAccuracyDeclared(Boolean accuracyDeclared) { this.accuracyDeclared = accuracyDeclared; }
    
    public Boolean getPaymentPolicyAccepted() { return paymentPolicyAccepted; }
    public void setPaymentPolicyAccepted(Boolean paymentPolicyAccepted) { this.paymentPolicyAccepted = paymentPolicyAccepted; }
    
    public Boolean getRefundPolicyAccepted() { return refundPolicyAccepted; }
    public void setRefundPolicyAccepted(Boolean refundPolicyAccepted) { this.refundPolicyAccepted = refundPolicyAccepted; }
    
    public Boolean getComplianceAgreed() { return complianceAgreed; }
    public void setComplianceAgreed(Boolean complianceAgreed) { this.complianceAgreed = complianceAgreed; }
    
    public String getNoCriminalCertificatePath() { 
        return noCriminalCertificatePath != null ? noCriminalCertificatePath : nonCriminalCertificatePath; 
    }
    public void setNoCriminalCertificatePath(String noCriminalCertificatePath) { 
        this.noCriminalCertificatePath = noCriminalCertificatePath; 
        if (this.nonCriminalCertificatePath == null) {
            this.nonCriminalCertificatePath = noCriminalCertificatePath;
        }
    }
    
    public String getPayment() { 
        return payment != null ? payment : paymentMethod; 
    }
    public void setPayment(String payment) { 
        this.payment = payment; 
        if (this.paymentMethod == null) {
            this.paymentMethod = payment;
        }
    }
    
    public Boolean getFinalDeclaration() { return finalDeclaration; }
    public void setFinalDeclaration(Boolean finalDeclaration) { this.finalDeclaration = finalDeclaration; }
    
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    
    public String getAdminNotes() { return adminNotes; }
    public void setAdminNotes(String adminNotes) { this.adminNotes = adminNotes; }
    
    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
    
    public String getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(String updatedAt) { this.updatedAt = updatedAt; }
    
    public String getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(String lastUpdated) { this.lastUpdated = lastUpdated; }
    
    public String getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(String submittedAt) { this.submittedAt = submittedAt; }
    
    public String getApprovedAt() { return approvedAt; }
    public void setApprovedAt(String approvedAt) { this.approvedAt = approvedAt; }
    
    public String getRejectedAt() { return rejectedAt; }
    public void setRejectedAt(String rejectedAt) { this.rejectedAt = rejectedAt; }
    
    // Getters and Setters existants
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    
    public String getWhatsapp() { return whatsapp; }
    public void setWhatsapp(String whatsapp) { this.whatsapp = whatsapp; }
    
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    
    public String getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(String dateOfBirth) { this.dateOfBirth = dateOfBirth; }
    
    public String getPlaceOfBirth() { return placeOfBirth; }
    public void setPlaceOfBirth(String placeOfBirth) { this.placeOfBirth = placeOfBirth; }
    
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    
    public String getMaritalStatus() { return maritalStatus; }
    public void setMaritalStatus(String maritalStatus) { this.maritalStatus = maritalStatus; }
    
    public String getPassportNumber() { return passportNumber; }
    public void setPassportNumber(String passportNumber) { this.passportNumber = passportNumber; }
    
    public String getPassportExpiry() { return passportExpiry; }
    public void setPassportExpiry(String passportExpiry) { this.passportExpiry = passportExpiry; }
    
    public String getEnglishLevel() { return englishLevel; }
    public void setEnglishLevel(String englishLevel) { this.englishLevel = englishLevel; }
    
    public String getEnglishCertificate() { return englishCertificate; }
    public void setEnglishCertificate(String englishCertificate) { this.englishCertificate = englishCertificate; }
    
    public String getEnglishScore() { return englishScore; }
    public void setEnglishScore(String englishScore) { this.englishScore = englishScore; }
    
    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }
    
    public String getFullAddress() { return fullAddress; }
    public void setFullAddress(String fullAddress) { this.fullAddress = fullAddress; }
    
    public String getEducationBackground() { return educationBackground; }
    public void setEducationBackground(String educationBackground) { this.educationBackground = educationBackground; }
    
    public String getWorkExperience() { return workExperience; }
    public void setWorkExperience(String workExperience) { this.workExperience = workExperience; }
    
    public String getFamilyMembers() { return familyMembers; }
    public void setFamilyMembers(String familyMembers) { this.familyMembers = familyMembers; }
    
    public String getGuarantorRelationship() { return guarantorRelationship; }
    public void setGuarantorRelationship(String guarantorRelationship) { this.guarantorRelationship = guarantorRelationship; }
    
    public String getGuarantorName() { return guarantorName; }
    public void setGuarantorName(String guarantorName) { this.guarantorName = guarantorName; }
    
    public String getGuarantorCountry() { return guarantorCountry; }
    public void setGuarantorCountry(String guarantorCountry) { this.guarantorCountry = guarantorCountry; }
    
    public String getGuarantorAddress() { return guarantorAddress; }
    public void setGuarantorAddress(String guarantorAddress) { this.guarantorAddress = guarantorAddress; }
    
    public String getGuarantorEmail() { return guarantorEmail; }
    public void setGuarantorEmail(String guarantorEmail) { this.guarantorEmail = guarantorEmail; }
    
    public String getGuarantorWorkplace() { return guarantorWorkplace; }
    public void setGuarantorWorkplace(String guarantorWorkplace) { this.guarantorWorkplace = guarantorWorkplace; }
    
    public String getGuarantorWorkplaceAddress() { return guarantorWorkplaceAddress; }
    public void setGuarantorWorkplaceAddress(String guarantorWorkplaceAddress) { this.guarantorWorkplaceAddress = guarantorWorkplaceAddress; }
    
    public String getEmergencyName() { return emergencyName; }
    public void setEmergencyName(String emergencyName) { this.emergencyName = emergencyName; }
    
    public String getEmergencyCountry() { return emergencyCountry; }
    public void setEmergencyCountry(String emergencyCountry) { this.emergencyCountry = emergencyCountry; }
    
    public String getEmergencyEmail() { return emergencyEmail; }
    public void setEmergencyEmail(String emergencyEmail) { this.emergencyEmail = emergencyEmail; }
    
    public String getEmergencyAddress() { return emergencyAddress; }
    public void setEmergencyAddress(String emergencyAddress) { this.emergencyAddress = emergencyAddress; }
    
    public Boolean getDeclaration1() { return declaration1; }
    public void setDeclaration1(Boolean declaration1) { this.declaration1 = declaration1; }
    
    public Boolean getDeclaration2() { return declaration2; }
    public void setDeclaration2(Boolean declaration2) { this.declaration2 = declaration2; }
    
    public Boolean getDeclaration3() { return declaration3; }
    public void setDeclaration3(Boolean declaration3) { this.declaration3 = declaration3; }
    
    public Boolean getDeclaration4() { return declaration4; }
    public void setDeclaration4(Boolean declaration4) { this.declaration4 = declaration4; }
    
    public Boolean getDeclaration5() { return declaration5; }
    public void setDeclaration5(Boolean declaration5) { this.declaration5 = declaration5; }
    
    public Boolean getDeclaration6() { return declaration6; }
    public void setDeclaration6(Boolean declaration6) { this.declaration6 = declaration6; }
    
    public String getPassportPath() { return passportPath; }
    public void setPassportPath(String passportPath) { this.passportPath = passportPath; }
    
    public String getAcademicCertificatePath() { return academicCertificatePath; }
    public void setAcademicCertificatePath(String academicCertificatePath) { this.academicCertificatePath = academicCertificatePath; }
    
    public String getAcademicTranscriptPath() { return academicTranscriptPath; }
    public void setAcademicTranscriptPath(String academicTranscriptPath) { this.academicTranscriptPath = academicTranscriptPath; }
    
    public String getLanguageCertificatePath() { return languageCertificatePath; }
    public void setLanguageCertificatePath(String languageCertificatePath) { this.languageCertificatePath = languageCertificatePath; }
    
    public String getPhysicalExaminationPath() { return physicalExaminationPath; }
    public void setPhysicalExaminationPath(String physicalExaminationPath) { this.physicalExaminationPath = physicalExaminationPath; }
    
    public String getNonCriminalCertificatePath() { return nonCriminalCertificatePath; }
    public void setNonCriminalCertificatePath(String nonCriminalCertificatePath) { this.nonCriminalCertificatePath = nonCriminalCertificatePath; }
    
    public String getBankStatementPath() { return bankStatementPath; }
    public void setBankStatementPath(String bankStatementPath) { this.bankStatementPath = bankStatementPath; }
    
    public String getPhotoPath() { return photoPath; }
    public void setPhotoPath(String photoPath) { this.photoPath = photoPath; }
    
    public String getResumePath() { return resumePath; }
    public void setResumePath(String resumePath) { this.resumePath = resumePath; }
    
    public String getAwardCertificatesPath() { return awardCertificatesPath; }
    public void setAwardCertificatesPath(String awardCertificatesPath) { this.awardCertificatesPath = awardCertificatesPath; }
    
    public String getParentIdPath() { return parentIdPath; }
    public void setParentIdPath(String parentIdPath) { this.parentIdPath = parentIdPath; }
    
    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
    
    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public Integer getCurrentStep() { return currentStep; }
    public void setCurrentStep(Integer currentStep) { this.currentStep = currentStep; }
    
    public String getProgramName() { return programName; }
    public void setProgramName(String programName) { this.programName = programName; }
    
    public String getUniversityName() { return universityName; }
    public void setUniversityName(String universityName) { this.universityName = universityName; }
    
    public String getApplicationFees() { return applicationFees; }
    public void setApplicationFees(String applicationFees) { this.applicationFees = applicationFees; }
    
    public String getServiceFees() { return serviceFees; }
    public void setServiceFees(String serviceFees) { this.serviceFees = serviceFees; }
    
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
}
