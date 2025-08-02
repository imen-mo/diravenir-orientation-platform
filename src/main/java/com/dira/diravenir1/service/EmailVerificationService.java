package com.dira.diravenir1.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class EmailVerificationService {

    private static final Logger logger = LoggerFactory.getLogger(EmailVerificationService.class);
    
    @Autowired
    private EmailService emailService;

    private final ConcurrentHashMap<String, VerificationToken> verificationTokens = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, VerificationToken> passwordResetTokens = new ConcurrentHashMap<>();
    private final SecureRandom secureRandom = new SecureRandom();

    public void sendVerificationEmail(String email) {
        String token = generateToken();
        LocalDateTime expiry = LocalDateTime.now().plusHours(24); // 24 heures
        
        VerificationToken verificationToken = new VerificationToken(token, email, expiry);
        verificationTokens.put(token, verificationToken);
        
        emailService.sendVerificationEmail(email, token);
        
        logger.info("✅ Token de vérification généré pour : {}", email);
    }

    public void sendPasswordResetEmail(String email) {
        String token = generateToken();
        LocalDateTime expiry = LocalDateTime.now().plusHours(1); // 1 heure
        
        VerificationToken resetToken = new VerificationToken(token, email, expiry);
        passwordResetTokens.put(token, resetToken);
        
        emailService.sendPasswordResetEmail(email, token);
        
        logger.info("✅ Token de réinitialisation généré pour : {}", email);
    }

    public boolean verifyEmailToken(String token) {
        VerificationToken verificationToken = verificationTokens.get(token);
        
        if (verificationToken == null) {
            logger.warn("🚫 Token de vérification invalide : {}", token);
            return false;
        }
        
        if (verificationToken.isExpired()) {
            verificationTokens.remove(token);
            logger.warn("🚫 Token de vérification expiré : {}", token);
            return false;
        }
        
        // Token valide - le supprimer après utilisation
        verificationTokens.remove(token);
        logger.info("✅ Email vérifié avec succès : {}", verificationToken.getEmail());
        return true;
    }

    public String getEmailFromResetToken(String token) {
        VerificationToken resetToken = passwordResetTokens.get(token);
        
        if (resetToken == null || resetToken.isExpired()) {
            if (resetToken != null) {
                passwordResetTokens.remove(token);
            }
            return null;
        }
        
        return resetToken.getEmail();
    }

    public void invalidateResetToken(String token) {
        passwordResetTokens.remove(token);
    }

    private String generateToken() {
        byte[] bytes = new byte[32];
        secureRandom.nextBytes(bytes);
        StringBuilder token = new StringBuilder();
        
        for (byte b : bytes) {
            token.append(String.format("%02x", b));
        }
        
        return token.toString();
    }

    public static class VerificationToken {
        private final String token;
        private final String email;
        private final LocalDateTime expiry;

        public VerificationToken(String token, String email, LocalDateTime expiry) {
            this.token = token;
            this.email = email;
            this.expiry = expiry;
        }

        public String getToken() { return token; }
        public String getEmail() { return email; }
        public LocalDateTime getExpiry() { return expiry; }
        
        public boolean isExpired() {
            return LocalDateTime.now().isAfter(expiry);
        }
    }
} 