package com.diravenir.service;

import com.diravenir.Entities.EmailOtp;
import com.diravenir.repository.EmailOtpRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class EmailOTPService {
    
    private static final Logger log = LoggerFactory.getLogger(EmailOTPService.class);
    
    private final EmailOtpRepository otpRepository;
    private final JavaMailSender emailSender;
    
    @Value("${app.otp.expiry-minutes:10}")
    private int otpExpiryMinutes;
    
    @Value("${app.otp.max-daily-attempts:5}")
    private int maxDailyAttempts;
    
    @Value("${app.otp.length:6}")
    private int otpLength;
    
    @Value("${app.email.from:noreply@diravenir.com}")
    private String fromEmail;
    
    @Value("${app.email.subject:Code de vérification Diravenir}")
    private String emailSubject;
    
    /**
     * Générer et envoyer un OTP par email
     */
    @Transactional
    public OTPResult sendOTP(String email) {
        try {
            // Vérifier les tentatives quotidiennes
            if (hasExceededDailyLimit(email)) {
                return OTPResult.failure("Limite quotidienne de tentatives OTP dépassée. Réessayez demain.");
            }
    
            // Désactiver l'ancien OTP s'il existe
            deactivatePreviousOTP(email);
            
            // Générer un nouveau OTP
            String otpCode = generateOTP();
            LocalDateTime expiryTime = LocalDateTime.now().plusMinutes(otpExpiryMinutes);
            
            // Créer et sauvegarder l'OTP
            EmailOtp emailOTP = EmailOtp.builder()
                .email(email)
                .otpCode(otpCode)
                .expiryTime(expiryTime)
                .isUsed(false)
                .attempts(0)
                .maxAttempts(3)
                .build();
            
            EmailOtp savedOTP = otpRepository.save(emailOTP);
            
            // Envoyer l'email
            boolean emailSent = sendOTPEmail(email, otpCode);
            
            if (emailSent) {
                log.info("OTP envoyé avec succès à {}", email);
                return OTPResult.success("Code de vérification envoyé à " + email, savedOTP.getId());
            } else {
                // Supprimer l'OTP si l'email n'a pas pu être envoyé
                otpRepository.delete(savedOTP);
                return OTPResult.failure("Impossible d'envoyer l'email. Vérifiez l'adresse email.");
            }
            
        } catch (Exception e) {
            log.error("Erreur lors de l'envoi de l'OTP: {}", e.getMessage());
            return OTPResult.failure("Erreur lors de l'envoi du code de vérification: " + e.getMessage());
        }
    }
    
    /**
     * Vérifier un OTP
     */
    @Transactional
    public OTPVerificationResult verifyOTP(String email, String otpCode) {
        try {
            // Trouver l'OTP valide
            Optional<EmailOtp> otpOpt = otpRepository.findValidOtpByEmail(email, LocalDateTime.now());
            
            if (otpOpt.isEmpty()) {
                return OTPVerificationResult.failure("Code de vérification invalide ou expiré");
            }
            
            EmailOtp otp = otpOpt.get();
            
            // Vérifier le code OTP
            if (!otp.getOtpCode().equals(otpCode)) {
                otp.incrementAttempts();
                otpRepository.save(otp);
                
                if (!otp.canRetry()) {
                    return OTPVerificationResult.failure("Trop de tentatives. Votre compte est temporairement bloqué.");
                }
                
                return OTPVerificationResult.failure("Code de vérification incorrect. Tentatives restantes: " + (otp.getMaxAttempts() - otp.getAttempts()));
            }
            
            // Marquer l'OTP comme utilisé
            otp.markAsUsed();
            otpRepository.save(otp);
            
            log.info("OTP vérifié avec succès pour {}", email);
            return OTPVerificationResult.success("Code de vérification validé avec succès");
            
        } catch (Exception e) {
            log.error("Erreur lors de la vérification de l'OTP: {}", e.getMessage());
            return OTPVerificationResult.failure("Erreur lors de la vérification: " + e.getMessage());
        }
    }
    
    /**
     * Générer un code OTP aléatoire
     */
    private String generateOTP() {
        Random random = new Random();
        StringBuilder otp = new StringBuilder();
        
        for (int i = 0; i < otpLength; i++) {
            otp.append(random.nextInt(10));
        }
        
        return otp.toString();
    }
    
    /**
     * Envoyer l'email avec l'OTP
     */
    private boolean sendOTPEmail(String email, String otpCode) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setFrom(fromEmail);
            message.setSubject(emailSubject);
            message.setText("Votre code de vérification Diravenir est: " + otpCode + "\n\nCe code expire dans " + otpExpiryMinutes + " minutes.\n\nNe partagez pas ce code avec qui que ce soit.");
            
            emailSender.send(message);
            return true;
            
        } catch (Exception e) {
            log.error("Erreur lors de l'envoi de l'email OTP: {}", e.getMessage());
            return false;
        }
    }
    
    /**
     * Vérifier si l'utilisateur a dépassé la limite quotidienne
     */
    private boolean hasExceededDailyLimit(String email) {
        LocalDateTime startOfDay = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0).withNano(0);
        long dailyCount = otpRepository.countByEmailAndCreatedAtAfter(email, startOfDay);
        return dailyCount >= maxDailyAttempts;
    }
    
    /**
     * Désactiver l'ancien OTP s'il existe
     */
    private void deactivatePreviousOTP(String email) {
        List<EmailOtp> existingOtps = otpRepository.findByEmail(email);
        if (!existingOtps.isEmpty()) {
            EmailOtp otp = existingOtps.get(0);
            otp.markAsUsed();
            otpRepository.save(otp);
        }
    }
    
    /**
     * Nettoyer les OTP expirés (tâche planifiée)
     */
    @Scheduled(fixedRate = 300000) // Toutes les 5 minutes
    @Transactional
    public void cleanupExpiredOTPs() {
        try {
            int deletedCount = otpRepository.deleteByExpiryTimeBefore(LocalDateTime.now());
            if (deletedCount > 0) {
                log.info("{} OTP expirés supprimés", deletedCount);
            }
        } catch (Exception e) {
            log.error("Erreur lors du nettoyage des OTP expirés: {}", e.getMessage());
        }
    }
    
    /**
     * Classe de résultat pour l'envoi d'OTP
     */
    public static class OTPResult {
        private final boolean success;
        private final String message;
        private final Long otpId;
        
        private OTPResult(boolean success, String message, Long otpId) {
            this.success = success;
            this.message = message;
            this.otpId = otpId;
        }
        
        public static OTPResult success(String message, Long otpId) {
            return new OTPResult(true, message, otpId);
        }
        
        public static OTPResult failure(String message) {
            return new OTPResult(false, message, null);
        }
        
        public boolean isSuccess() { return success; }
        public String getMessage() { return message; }
        public Long getOtpId() { return otpId; }
    }
    
    /**
     * Classe de résultat pour la vérification d'OTP
     */
    public static class OTPVerificationResult {
        private final boolean success;
        private final String message;
        
        private OTPVerificationResult(boolean success, String message) {
            this.success = success;
            this.message = message;
        }
        
        public static OTPVerificationResult success(String message) {
            return new OTPVerificationResult(true, message);
        }
        
        public static OTPVerificationResult failure(String message) {
            return new OTPVerificationResult(false, message);
        }
        
        public boolean isSuccess() { return success; }
        public String getMessage() { return message; }
    }
    
    /**
     * Renvoyer un OTP (méthode de compatibilité)
     */
    public OTPResult resendOTP(String email) {
        return sendOTP(email);
    }
    
    /**
     * Vérifier si un email a été récemment vérifié
     */
    public boolean isEmailRecentlyVerified(String email) {
        try {
            List<EmailOtp> recentOtps = otpRepository.findByEmail(email);
            if (!recentOtps.isEmpty()) {
                EmailOtp otp = recentOtps.get(0);
                // Considérer comme récemment vérifié si l'OTP a été utilisé dans les dernières 24h
                return otp.isUsed() && 
                       otp.getUpdatedAt() != null && 
                       otp.getUpdatedAt().isAfter(LocalDateTime.now().minusHours(24));
            }
            return false;
        } catch (Exception e) {
            log.error("Erreur lors de la vérification de l'email récemment vérifié: {}", e.getMessage());
            return false;
        }
    }
}
