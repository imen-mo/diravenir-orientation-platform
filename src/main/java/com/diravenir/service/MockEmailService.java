package com.diravenir.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

/**
 * Service d'email mock pour le développement et les tests
 * Affiche les emails dans les logs au lieu de les envoyer réellement
 */
@Service
@Slf4j
public class MockEmailService implements EmailServiceInterface {

    @Value("${app.frontend.url:http://localhost:3000}")
    private String frontendUrl;
    
    // Stockage des tokens pour simulation
    private final Map<String, String> verificationTokens = new ConcurrentHashMap<>();
    private final Map<String, String> resetTokens = new ConcurrentHashMap<>();

    @Override
    public void sendVerificationEmail(String toEmail, String userName, String verificationToken) {
        log.info("📧 [MOCK] Email de vérification à: {}", toEmail);
        log.info("🔗 [MOCK] Lien de vérification: {}/verify-email?token={}", frontendUrl, verificationToken);
        log.info("👤 [MOCK] Nom d'utilisateur: {}", userName);
        
        // Stocker le token pour simulation
        verificationTokens.put(verificationToken, toEmail);
        
        log.info("✅ [MOCK] Email de vérification 'envoyé' avec succès !");
        log.info("💡 [MOCK] Pour tester: Visitez {}/verify-email?token={}", frontendUrl, verificationToken);
    }

    @Override
    public void sendPasswordResetEmail(String toEmail, String userName, String resetToken) {
        log.info("📧 [MOCK] Email de réinitialisation à: {}", toEmail);
        log.info("🔗 [MOCK] Lien de reset: {}/reset-password?token={}", frontendUrl, resetToken);
        log.info("👤 [MOCK] Nom d'utilisateur: {}", userName);
        
        // Stocker le token pour simulation
        resetTokens.put(resetToken, toEmail);
        
        log.info("✅ [MOCK] Email de réinitialisation 'envoyé' avec succès !");
        log.info("💡 [MOCK] Pour tester: Visitez {}/reset-password?token={}", frontendUrl, resetToken);
    }

    @Override
    public void sendOTPEmail(String toEmail, String userName, String otpCode) {
        log.info("📧 [MOCK] Email OTP à: {}", toEmail);
        log.info("🔐 [MOCK] Code OTP: {}", otpCode);
        log.info("👤 [MOCK] Nom d'utilisateur: {}", userName);
        log.info("⏰ [MOCK] Expiration: {}", LocalDateTime.now().plusMinutes(10));
        
        log.info("✅ [MOCK] Email OTP 'envoyé' avec succès !");
        log.info("💡 [MOCK] Code OTP à utiliser: {}", otpCode);
    }

    @Override
    public void sendWelcomeEmail(String toEmail, String userName) {
        log.info("📧 [MOCK] Email de bienvenue à: {}", toEmail);
        log.info("👤 [MOCK] Nom d'utilisateur: {}", userName);
        log.info("🔗 [MOCK] Lien de connexion: {}/login", frontendUrl);
        
        log.info("✅ [MOCK] Email de bienvenue 'envoyé' avec succès !");
    }

    @Override
    public void sendOrientationResultsEmail(String toEmail, String userName, String testUuid, 
                                          String topRecommendation, Double topScore, 
                                          String userProfile) {
        log.info("📧 [MOCK] Email de résultats d'orientation à: {}", toEmail);
        log.info("👤 [MOCK] Nom d'utilisateur: {}", userName);
        log.info("🆔 [MOCK] Test UUID: {}", testUuid);
        log.info("🎯 [MOCK] Meilleure recommandation: {}", topRecommendation);
        log.info("📊 [MOCK] Score: {}%", topScore);
        log.info("🔗 [MOCK] Lien des résultats: {}/results/{}", frontendUrl, testUuid);
        
        log.info("✅ [MOCK] Email de résultats 'envoyé' avec succès !");
    }

    /**
     * Vérifie si un token de vérification existe (pour simulation)
     */
    public boolean isVerificationTokenValid(String token) {
        return verificationTokens.containsKey(token);
    }

    /**
     * Vérifie si un token de reset existe (pour simulation)
     */
    public boolean isResetTokenValid(String token) {
        return resetTokens.containsKey(token);
    }

    /**
     * Supprime un token de vérification (pour simulation)
     */
    public void removeVerificationToken(String token) {
        verificationTokens.remove(token);
    }

    /**
     * Supprime un token de reset (pour simulation)
     */
    public void removeResetToken(String token) {
        resetTokens.remove(token);
    }

    /**
     * Affiche tous les tokens actifs (pour debug)
     */
    public void displayActiveTokens() {
        log.info("🔍 [MOCK] Tokens de vérification actifs: {}", verificationTokens.size());
        log.info("🔍 [MOCK] Tokens de reset actifs: {}", resetTokens.size());
        
        verificationTokens.forEach((token, email) -> 
            log.info("📧 [MOCK] Token vérification: {} -> {}", token.substring(0, 8) + "...", email));
        
        resetTokens.forEach((token, email) -> 
            log.info("🔒 [MOCK] Token reset: {} -> {}", token.substring(0, 8) + "...", email));
    }
}
