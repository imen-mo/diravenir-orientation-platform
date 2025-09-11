package com.diravenir.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;

@Service
@ConditionalOnProperty(name = "app.email.mock", havingValue = "true", matchIfMissing = false)
@Slf4j
public class EmailServiceMock implements EmailServiceInterface {

    @Value("${app.frontend.url:http://localhost:5173}")
    private String frontendUrl;

    /**
     * Mock pour l'envoi d'email de vérification
     */
    public void sendVerificationEmail(String toEmail, String userName, String verificationToken) {
        log.info("📧 [MOCK] Envoi d'email de vérification à: {}", toEmail);
        
        String verificationUrl = frontendUrl + "/verify-email?token=" + verificationToken;
        
        log.info("🔗 [MOCK] Lien de vérification généré: {}", verificationUrl);
        log.info("📝 [MOCK] Contenu de l'email:");
        log.info("   📧 À: {}", toEmail);
        log.info("   👤 Nom: {}", userName);
        log.info("   🔗 Lien: {}", verificationUrl);
        log.info("   ⏰ Expiration: 24 heures");
        
        // Simuler un délai d'envoi
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        log.info("✅ [MOCK] Email de vérification 'envoyé' avec succès à: {}", toEmail);
    }

    /**
     * Mock pour l'envoi d'email de réinitialisation de mot de passe
     */
    public void sendPasswordResetEmail(String toEmail, String userName, String resetToken) {
        log.info("📧 [MOCK] Envoi d'email de réinitialisation à: {}", toEmail);
        
        String resetUrl = frontendUrl + "/reset-password?token=" + resetToken;
        
        log.info("🔗 [MOCK] Lien de réinitialisation généré: {}", resetUrl);
        log.info("📝 [MOCK] Contenu de l'email:");
        log.info("   📧 À: {}", toEmail);
        log.info("   👤 Nom: {}", userName);
        log.info("   🔗 Lien: {}", resetUrl);
        log.info("   ⏰ Expiration: 1 heure");
        
        // Simuler un délai d'envoi
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        log.info("✅ [MOCK] Email de réinitialisation 'envoyé' avec succès à: {}", toEmail);
    }

    /**
     * Mock pour l'envoi d'email OTP
     */
    public void sendOTPEmail(String toEmail, String userName, String otpCode) {
        log.info("📧 [MOCK] Envoi d'email OTP à: {}", toEmail);
        
        log.info("🔐 [MOCK] Code OTP généré: {}", otpCode);
        log.info("📝 [MOCK] Contenu de l'email:");
        log.info("   📧 À: {}", toEmail);
        log.info("   👤 Nom: {}", userName);
        log.info("   🔐 Code OTP: {}", otpCode);
        log.info("   ⏰ Expiration: 10 minutes");
        
        // Simuler un délai d'envoi
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        log.info("✅ [MOCK] Email OTP 'envoyé' avec succès à: {}", toEmail);
    }

    /**
     * Mock pour l'envoi d'email de bienvenue
     */
    public void sendWelcomeEmail(String toEmail, String userName) {
        log.info("📧 [MOCK] Envoi d'email de bienvenue à: {}", toEmail);
        
        log.info("📝 [MOCK] Contenu de l'email:");
        log.info("   📧 À: {}", toEmail);
        log.info("   👤 Nom: {}", userName);
        log.info("   🔗 Lien de connexion: {}/login", frontendUrl);
        
        // Simuler un délai d'envoi
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        log.info("✅ [MOCK] Email de bienvenue 'envoyé' avec succès à: {}", toEmail);
    }

    /**
     * Mock pour l'envoi d'email de résultats d'orientation
     */
    public void sendOrientationResultsEmail(String toEmail, String userName, String testUuid, 
                                          String topRecommendation, Double topScore, 
                                          String userProfile) {
        log.info("📧 [MOCK] Envoi d'email de résultats d'orientation à: {}", toEmail);
        
        log.info("📝 [MOCK] Contenu de l'email:");
        log.info("   📧 À: {}", toEmail);
        log.info("   👤 Nom: {}", userName);
        log.info("   🆔 Test UUID: {}", testUuid);
        log.info("   🎯 Meilleure recommandation: {}", topRecommendation);
        log.info("   📊 Score: {}%", topScore);
        log.info("   🔗 Lien des résultats: {}/results/{}", frontendUrl, testUuid);
        
        // Simuler un délai d'envoi
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        log.info("✅ [MOCK] Email de résultats 'envoyé' avec succès à: {}", toEmail);
    }
}
