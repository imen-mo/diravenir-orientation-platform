package com.dira.diravenir1.service;

import com.dira.diravenir1.Entities.EmailOtp;
import com.dira.diravenir1.Repository.EmailOtpRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Slf4j
public class OtpService {

    private final EmailOtpRepository emailOtpRepository;
    private final EmailService emailService;

    @Value("${app.otp.length:6}")
    private int otpLength;

    @Value("${app.otp.expiry-minutes:10}")
    private int otpExpiryMinutes;

    @Value("${app.otp.max-daily-attempts:5}")
    private int maxDailyAttempts;

    @Value("${app.otp.security.max-retry-attempts:3}")
    private int maxRetryAttempts;

    @Value("${app.otp.security.block-duration-minutes:30}")
    private int blockDurationMinutes;

    @Value("${app.email.templates.otp.subject:Code de vérification Diravenir}")
    private String otpSubject;

    @Value("${app.email.templates.otp.from:Diravenir <noreply@diravenir.com>}")
    private String otpFrom;

    /**
     * Génère et envoie un code OTP par email
     */
    @Transactional
    public boolean generateAndSendOtp(String email) {
        try {
            log.info("🔐 Génération d'OTP pour l'email: {}", email);

            // Vérifier les tentatives quotidiennes
            if (hasExceededDailyLimit(email)) {
                log.warn("⚠️ Limite quotidienne dépassée pour l'email: {}", email);
                return false;
            }

            // Vérifier si l'utilisateur est bloqué
            if (isUserBlocked(email)) {
                log.warn("🚫 Utilisateur bloqué pour l'email: {}", email);
                return false;
            }

            // Supprimer l'ancien OTP s'il existe
            emailOtpRepository.deleteByEmail(email);

            // Générer un nouveau code OTP
            String otpCode = generateOtpCode();
            LocalDateTime now = LocalDateTime.now();
            LocalDateTime expiryTime = now.plusMinutes(otpExpiryMinutes);

            // Créer et sauvegarder l'OTP
            EmailOtp emailOtp = EmailOtp.builder()
                    .email(email)
                    .otpCode(otpCode)
                    .expiryTime(expiryTime)
                    .isUsed(false)
                    .attempts(0)
                    .maxAttempts(maxRetryAttempts)
                    .build();

            emailOtpRepository.save(emailOtp);
            log.info("✅ OTP sauvegardé pour l'email: {} avec expiration: {}", email, expiryTime);

            // Envoyer l'email OTP
            String emailBody = generateOtpEmailBody(otpCode);
            emailService.sendEmail(email, otpSubject, emailBody);

            log.info("📧 Email OTP envoyé avec succès à: {}", email);
            return true;

        } catch (Exception e) {
            log.error("❌ Erreur lors de la génération/envoi de l'OTP pour {}: {}", email, e.getMessage());
            return false;
        }
    }

    /**
     * Vérifie un code OTP
     */
    @Transactional
    public boolean verifyOtp(String email, String otpCode) {
        try {
            log.info("🔍 Vérification OTP pour l'email: {}", email);

            Optional<EmailOtp> otpOptional = emailOtpRepository.findByEmail(email);
            if (otpOptional.isEmpty()) {
                log.warn("❌ Aucun OTP trouvé pour l'email: {}", email);
                return false;
            }

            EmailOtp emailOtp = otpOptional.get();

            // Vérifier si l'OTP est expiré
            if (LocalDateTime.now().isAfter(emailOtp.getExpiryTime())) {
                log.warn("⏰ OTP expiré pour l'email: {}", email);
                emailOtpRepository.deleteByEmail(email);
                return false;
            }

            // Vérifier si l'OTP a été utilisé
            if (emailOtp.isUsed()) {
                log.warn("🚫 OTP déjà utilisé pour l'email: {}", email);
                return false;
            }

            // Vérifier le nombre de tentatives
            if (emailOtp.getAttempts() >= emailOtp.getMaxAttempts()) {
                log.warn("🚫 Nombre maximum de tentatives atteint pour l'email: {}", email);
                blockUser(email);
                return false;
            }

            // Vérifier le code OTP
            if (emailOtp.getOtpCode().equals(otpCode)) {
                // Marquer l'OTP comme utilisé
                emailOtp.setUsed(true);
                emailOtpRepository.save(emailOtp);
                
                log.info("✅ OTP vérifié avec succès pour l'email: {}", email);
                return true;
            } else {
                // Incrémenter le compteur de tentatives
                emailOtp.setAttempts(emailOtp.getAttempts() + 1);
                emailOtpRepository.save(emailOtp);

                log.warn("❌ Code OTP incorrect pour l'email: {} (tentative {}/{})", 
                    email, emailOtp.getAttempts(), emailOtp.getMaxAttempts());

                // Bloquer l'utilisateur si le nombre max de tentatives est atteint
                if (emailOtp.getAttempts() >= emailOtp.getMaxAttempts()) {
                    blockUser(email);
                }

                return false;
            }

        } catch (Exception e) {
            log.error("❌ Erreur lors de la vérification de l'OTP pour {}: {}", email, e.getMessage());
            return false;
        }
    }

    /**
     * Génère un code OTP aléatoire
     */
    private String generateOtpCode() {
        Random random = new Random();
        StringBuilder otp = new StringBuilder();
        
        for (int i = 0; i < otpLength; i++) {
            otp.append(random.nextInt(10));
        }
        
        return otp.toString();
    }

    /**
     * Vérifie si l'utilisateur a dépassé la limite quotidienne
     */
    private boolean hasExceededDailyLimit(String email) {
        LocalDateTime startOfDay = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
        long dailyCount = emailOtpRepository.countByEmailAndCreatedAtAfter(email, startOfDay);
        
        return dailyCount >= maxDailyAttempts;
    }

    /**
     * Vérifie si l'utilisateur est bloqué
     */
    private boolean isUserBlocked(String email) {
        Optional<EmailOtp> lastOtp = emailOtpRepository.findByEmail(email);
        if (lastOtp.isEmpty()) {
            return false;
        }

        EmailOtp otp = lastOtp.get();
        if (otp.getAttempts() >= otp.getMaxAttempts()) {
            LocalDateTime blockTime = otp.getUpdatedAt();
            LocalDateTime unblockTime = blockTime.plusMinutes(blockDurationMinutes);
            
            return LocalDateTime.now().isBefore(unblockTime);
        }

        return false;
    }

    /**
     * Bloque un utilisateur temporairement
     */
    private void blockUser(String email) {
        log.warn("🚫 Blocage temporaire de l'utilisateur: {} pour {} minutes", email, blockDurationMinutes);
        // L'utilisateur sera automatiquement débloqué après blockDurationMinutes
    }

    /**
     * Génère le contenu HTML de l'email OTP
     */
    private String generateOtpEmailBody(String otpCode) {
        return String.format("""
            <html>
            <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #441048 0%%, #6b1b9a 100%%); color: white; padding: 30px; border-radius: 10px; text-align: center;">
                    <h1 style="margin: 0; font-size: 28px;">🔐 Code de Vérification</h1>
                    <p style="margin: 10px 0; font-size: 16px;">Votre code de vérification Diravenir</p>
                </div>
                
                <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-top: 20px; text-align: center;">
                    <div style="background: white; border: 3px solid #441048; border-radius: 15px; padding: 20px; margin: 20px 0;">
                        <h2 style="color: #441048; margin: 0; font-size: 36px; letter-spacing: 5px;">%s</h2>
                    </div>
                    
                    <p style="color: #6c757d; margin: 20px 0; font-size: 14px;">
                        Ce code expirera dans %d minutes.<br>
                        Ne partagez ce code avec personne.
                    </p>
                </div>
                
                <div style="background: #e9ecef; padding: 20px; border-radius: 10px; margin-top: 20px; text-align: center;">
                    <p style="margin: 0; color: #6c757d; font-size: 12px;">
                        Si vous n'avez pas demandé ce code, ignorez cet email.<br>
                        <strong>Diravenir</strong> - Votre partenaire pour les études à l'étranger
                    </p>
                </div>
            </body>
            </html>
            """, otpCode, otpExpiryMinutes);
    }

    /**
     * Nettoie les OTP expirés
     */
    @Transactional
    public void cleanupExpiredOtps() {
        try {
            LocalDateTime now = LocalDateTime.now();
            int deletedCount = emailOtpRepository.deleteByExpiryTimeBefore(now);
            log.info("🧹 Nettoyage des OTP expirés: {} supprimés", deletedCount);
        } catch (Exception e) {
            log.error("❌ Erreur lors du nettoyage des OTP expirés: {}", e.getMessage());
        }
    }

    /**
     * Vérifie le statut d'un OTP
     */
    public String getOtpStatus(String email) {
        try {
            Optional<EmailOtp> otpOptional = emailOtpRepository.findByEmail(email);
            if (otpOptional.isEmpty()) {
                return "NO_OTP";
            }

            EmailOtp emailOtp = otpOptional.get();
            
            if (emailOtp.isUsed()) {
                return "USED";
            }
            
            if (LocalDateTime.now().isAfter(emailOtp.getExpiryTime())) {
                return "EXPIRED";
            }
            
            if (emailOtp.getAttempts() >= emailOtp.getMaxAttempts()) {
                return "BLOCKED";
            }
            
            return "VALID";
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de la vérification du statut OTP: {}", e.getMessage());
            return "ERROR";
        }
    }
}
