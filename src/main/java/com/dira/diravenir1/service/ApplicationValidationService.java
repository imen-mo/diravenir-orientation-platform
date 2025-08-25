package com.dira.diravenir1.service;

import com.dira.diravenir1.Entities.Application;
import com.dira.diravenir1.dto.ApplicationDTO;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

@Service
@Validated
public class ApplicationValidationService {
    
    // Patterns de validation
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@(.+)$");
    private static final Pattern PHONE_PATTERN = Pattern.compile("^\\+212[0-9]{9}$");
    private static final Pattern PASSPORT_PATTERN = Pattern.compile("^[A-Z0-9]{6,15}$");
    
    // Constantes de validation
    private static final int MIN_AGE = 15;
    private static final int MIN_PASSPORT_VALIDITY_MONTHS = 6;
    private static final int MAX_FILE_SIZE_MB = 5;
    
    /**
     * Valide une application complète
     */
    public ValidationResult validateApplication(Application application) {
        List<String> errors = new ArrayList<>();
        
        // Valider chaque étape
        ValidationResult step1Result = validateStep1(application);
        errors.addAll(step1Result.getErrors());
        
        ValidationResult step2Result = validateStep2(application);
        errors.addAll(step2Result.getErrors());
        
        ValidationResult step3Result = validateStep3(application);
        errors.addAll(step3Result.getErrors());
        
        ValidationResult step4Result = validateStep4(application);
        errors.addAll(step4Result.getErrors());
        
        ValidationResult step5Result = validateStep5(application);
        errors.addAll(step5Result.getErrors());
        
        return new ValidationResult(errors.isEmpty(), errors);
    }
    
    /**
     * Valide l'étape 1 : Your Information
     */
    public ValidationResult validateStep1(Application application) {
        List<String> errors = new ArrayList<>();
        
        // 1. Contact Details
        if (!isValidEmail(application.getEmail())) {
            errors.add("Email invalide ou manquant");
        }
        
        if (!isValidPhone(application.getPhone())) {
            errors.add("Numéro de téléphone invalide (format: +212XXXXXXXXX)");
        }
        
        if (application.getWhatsapp() != null && !isValidPhone(application.getWhatsapp())) {
            errors.add("Numéro WhatsApp invalide (format: +212XXXXXXXXX)");
        }
        
        // 2. Student's Information
        if (!isValidName(application.getFirstName(), "prénom")) {
            errors.add("Prénom invalide (2-50 caractères)");
        }
        
        if (!isValidName(application.getLastName(), "nom")) {
            errors.add("Nom invalide (2-50 caractères)");
        }
        
        if (!isValidDateOfBirth(application.getDateOfBirth())) {
            errors.add("Date de naissance invalide (âge minimum: " + MIN_AGE + " ans)");
        }
        
        if (application.getPlaceOfBirth() == null || application.getPlaceOfBirth().trim().isEmpty()) {
            errors.add("Lieu de naissance requis");
        }
        
        if (application.getGender() == null) {
            errors.add("Genre requis");
        }
        
        if (application.getMaritalStatus() == null) {
            errors.add("Statut marital requis");
        }
        
        if (!isValidPassportNumber(application.getPassportNumber())) {
            errors.add("Numéro de passeport invalide (6-15 caractères alphanumériques)");
        }
        
        if (!isValidPassportExpiry(application.getPassportExpiry())) {
            errors.add("Date d'expiration du passeport invalide (minimum " + MIN_PASSPORT_VALIDITY_MONTHS + " mois)");
        }
        
        // 3. Language Proficiency
        if (application.getEnglishLevel() == null) {
            errors.add("Niveau d'anglais requis");
        }
        
        if (application.getEnglishCertificate() == null) {
            errors.add("Certificat d'anglais requis");
        }
        
        if (application.getEnglishCertificate() != Application.EnglishCertificate.NONE && 
            (application.getEnglishScore() == null || application.getEnglishScore().trim().isEmpty())) {
            errors.add("Score d'anglais requis si certificat fourni");
        }
        
        // 4. Home Address Details
        if (application.getCountry() == null || application.getCountry().trim().isEmpty()) {
            errors.add("Pays requis");
        }
        
        if (application.getFullAddress() == null || application.getFullAddress().trim().isEmpty()) {
            errors.add("Adresse complète requise");
        }
        
        // 5. Educational Background
        if (application.getEducationBackground() == null || application.getEducationBackground().trim().isEmpty()) {
            errors.add("Formation académique requise");
        }
        
        // 6. Work Experience
        if (application.getWorkExperience() == null || application.getWorkExperience().trim().isEmpty()) {
            errors.add("Expérience professionnelle requise");
        }
        
        return new ValidationResult(errors.isEmpty(), errors);
    }
    
    /**
     * Valide l'étape 2 : Your Family
     */
    public ValidationResult validateStep2(Application application) {
        List<String> errors = new ArrayList<>();
        
        // A. Family Contact
        if (application.getFamilyMembers() == null || application.getFamilyMembers().trim().isEmpty()) {
            errors.add("Informations familiales requises");
        }
        
        // B. Financial Supporter (Guarantor)
        if (application.getGuarantorRelationship() == null || application.getGuarantorRelationship().trim().isEmpty()) {
            errors.add("Relation avec le garant financier requise");
        }
        
        if (application.getGuarantorName() == null || application.getGuarantorName().trim().isEmpty()) {
            errors.add("Nom du garant financier requis");
        }
        
        if (application.getGuarantorCountry() == null || application.getGuarantorCountry().trim().isEmpty()) {
            errors.add("Pays du garant financier requis");
        }
        
        if (application.getGuarantorAddress() == null || application.getGuarantorAddress().trim().isEmpty()) {
            errors.add("Adresse du garant financier requise");
        }
        
        if (application.getGuarantorEmail() != null && !isValidEmail(application.getGuarantorEmail())) {
            errors.add("Email du garant financier invalide");
        }
        
        // C. Emergency Contact in China
        if (application.getEmergencyCountry() == null || application.getEmergencyCountry().trim().isEmpty()) {
            errors.add("Pays du contact d'urgence requis");
        }
        
        return new ValidationResult(errors.isEmpty(), errors);
    }
    
    /**
     * Valide l'étape 3 : Declaration & Agreement
     */
    public ValidationResult validateStep3(Application application) {
        List<String> errors = new ArrayList<>();
        
        if (!Boolean.TRUE.equals(application.getDeclaration1())) {
            errors.add("Acceptation des conditions générales requise");
        }
        
        if (!Boolean.TRUE.equals(application.getDeclaration2())) {
            errors.add("Consentement au traitement des données requis");
        }
        
        if (!Boolean.TRUE.equals(application.getDeclaration3())) {
            errors.add("Déclaration d'exactitude des informations requise");
        }
        
        if (!Boolean.TRUE.equals(application.getDeclaration4())) {
            errors.add("Acceptation de la politique de paiement requise");
        }
        
        if (!Boolean.TRUE.equals(application.getDeclaration5())) {
            errors.add("Acceptation de la politique de remboursement requise");
        }
        
        if (!Boolean.TRUE.equals(application.getDeclaration6())) {
            errors.add("Acceptation de la conformité requise");
        }
        
        return new ValidationResult(errors.isEmpty(), errors);
    }
    
    /**
     * Valide l'étape 4 : Upload Documents
     */
    public ValidationResult validateStep4(Application application) {
        List<String> errors = new ArrayList<>();
        
        // Documents obligatoires
        if (application.getPassportPath() == null || application.getPassportPath().trim().isEmpty()) {
            errors.add("Pages du passeport requises");
        }
        
        if (application.getAcademicCertificatePath() == null || application.getAcademicCertificatePath().trim().isEmpty()) {
            errors.add("Certificat académique le plus élevé requis");
        }
        
        if (application.getAcademicTranscriptPath() == null || application.getAcademicTranscriptPath().trim().isEmpty()) {
            errors.add("Relevé de notes académique requis");
        }
        
        if (application.getNonCriminalCertificatePath() == null || application.getNonCriminalCertificatePath().trim().isEmpty()) {
            errors.add("Certificat de non-condamnation requis");
        }
        
        if (application.getPhotoPath() == null || application.getPhotoPath().trim().isEmpty()) {
            errors.add("Photo personnelle (format passeport) requise");
        }
        
        return new ValidationResult(errors.isEmpty(), errors);
    }
    
    /**
     * Valide l'étape 5 : Final Step (Payment & Next Steps)
     */
    public ValidationResult validateStep5(Application application) {
        List<String> errors = new ArrayList<>();
        
        if (application.getProgramName() == null || application.getProgramName().trim().isEmpty()) {
            errors.add("Nom du programme requis");
        }
        
        if (application.getUniversityName() == null || application.getUniversityName().trim().isEmpty()) {
            errors.add("Nom de l'université requis");
        }
        
        if (application.getApplicationFees() == null || application.getApplicationFees().trim().isEmpty()) {
            errors.add("Frais de candidature requis");
        }
        
        if (application.getServiceFees() == null || application.getServiceFees().trim().isEmpty()) {
            errors.add("Frais de service requis");
        }
        
        if (!Boolean.TRUE.equals(application.getFinalDeclaration())) {
            errors.add("Déclaration finale requise");
        }
        
        return new ValidationResult(errors.isEmpty(), errors);
    }
    
    /**
     * Valide un fichier uploadé
     */
    public ValidationResult validateFile(String fileName, long fileSizeBytes, String fileType) {
        List<String> errors = new ArrayList<>();
        
        // Vérifier le type de fichier
        if (!isValidFileType(fileType)) {
            errors.add("Type de fichier non autorisé. Types acceptés: .jpg, .jpeg, .png, .bmp, .doc, .docx, .pdf, .xls, .xlsx");
        }
        
        // Vérifier la taille du fichier
        long maxSizeBytes = MAX_FILE_SIZE_MB * 1024 * 1024;
        if (fileSizeBytes > maxSizeBytes) {
            errors.add("Taille de fichier trop importante. Maximum: " + MAX_FILE_SIZE_MB + " MB");
        }
        
        // Vérifier le nom du fichier
        if (fileName == null || fileName.trim().isEmpty()) {
            errors.add("Nom de fichier requis");
        }
        
        return new ValidationResult(errors.isEmpty(), errors);
    }
    
    // ===== MÉTHODES DE VALIDATION PRIVÉES =====
    
    private boolean isValidEmail(String email) {
        return email != null && EMAIL_PATTERN.matcher(email).matches();
    }
    
    private boolean isValidPhone(String phone) {
        return phone != null && PHONE_PATTERN.matcher(phone).matches();
    }
    
    private boolean isValidName(String name, String fieldName) {
        return name != null && name.trim().length() >= 2 && name.trim().length() <= 50;
    }
    
    private boolean isValidDateOfBirth(LocalDate dateOfBirth) {
        if (dateOfBirth == null) return false;
        
        LocalDate now = LocalDate.now();
        Period age = Period.between(dateOfBirth, now);
        return age.getYears() >= MIN_AGE;
    }
    
    private boolean isValidPassportNumber(String passportNumber) {
        return passportNumber != null && PASSPORT_PATTERN.matcher(passportNumber.toUpperCase()).matches();
    }
    
    private boolean isValidPassportExpiry(LocalDate passportExpiry) {
        if (passportExpiry == null) return false;
        
        LocalDate now = LocalDate.now();
        LocalDate minValidDate = now.plusMonths(MIN_PASSPORT_VALIDITY_MONTHS);
        return passportExpiry.isAfter(minValidDate);
    }
    
    private boolean isValidFileType(String fileType) {
        if (fileType == null) return false;
        
        String[] allowedTypes = {
            "image/jpeg", "image/jpg", "image/png", "image/bmp",
            "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/pdf",
            "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        };
        
        for (String allowedType : allowedTypes) {
            if (allowedType.equals(fileType)) {
                return true;
            }
        }
        return false;
    }
    
    // ===== CLASSE INTERNE POUR LES RÉSULTATS =====
    
    public static class ValidationResult {
        private final boolean valid;
        private final List<String> errors;
        
        public ValidationResult(boolean valid, List<String> errors) {
            this.valid = valid;
            this.errors = errors;
        }
        
        public boolean isValid() {
            return valid;
        }
        
        public List<String> getErrors() {
            return errors;
        }
        
        public String getFirstError() {
            return errors.isEmpty() ? null : errors.get(0);
        }
        
        public String getAllErrorsAsString() {
            return String.join("; ", errors);
        }
    }
}
