package com.dira.diravenir1.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Value("${spring.mail.username:your-email@gmail.com}")
    private String mailUsername;

    @Value("${app.frontend.url:http://localhost:3000}")
    private String frontendUrl;

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    /**
     * Vérifie si la configuration email est complète
     */
    private boolean isEmailConfigured() {
        return mailUsername != null && 
               !mailUsername.equals("your-email@gmail.com") && 
               mailUsername.contains("@");
    }

    /**
     * Envoie un email de vérification UNIQUEMENT lors du signup
     * Cette méthode ne doit PAS être appelée pour les utilisateurs OAuth2
     */
    public void sendVerificationEmail(String to, String token) {
        try {
            logger.info("📧 Tentative d'envoi d'email de vérification à : {}", to);
            
            // Validation de la configuration email
            if (!isEmailConfigured()) {
                logger.warn("⚠️ Configuration email manquante - Email non envoyé mais inscription réussie");
                // Ne pas lever d'exception, juste logger un avertissement
                return;
            }
            
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(mailUsername);
            message.setTo(to);
            message.setSubject("Vérification de votre compte Diravenir");
            
            String verificationUrl = frontendUrl + "/verify-email?token=" + token;
            
            message.setText(String.format(
                "Bonjour,\n\n" +
                "Merci de vous être inscrit sur Diravenir.\n\n" +
                "Pour activer votre compte, veuillez cliquer sur le lien suivant :\n" +
                "%s\n\n" +
                "Ce lien expirera dans 24 heures.\n\n" +
                "Si vous n'avez pas créé de compte, ignorez cet email.\n\n" +
                "Cordialement,\n" +
                "L'équipe Diravenir",
                verificationUrl
            ));

            mailSender.send(message);
            logger.info("✅ Email de vérification envoyé avec succès à : {}", to);
            
        } catch (Exception e) {
            logger.warn("⚠️ Échec de l'envoi de l'email de vérification à {} : {}", to, e.getMessage());
            // Ne pas lever d'exception pour ne pas faire échouer l'inscription
        }
    }

    /**
     * Envoie un email de réinitialisation de mot de passe
     * Cette méthode peut être appelée pour tous les utilisateurs
     */
    public void sendPasswordResetEmail(String to, String token) {
        try {
            logger.info("📧 Tentative d'envoi d'email de réinitialisation à : {}", to);
            
            // Validation de la configuration email
            if (!isEmailConfigured()) {
                logger.error("❌ Configuration email manquante - Impossible d'envoyer l'email");
                throw new RuntimeException("Service email non configuré. Veuillez configurer les propriétés email.");
            }
            
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(mailUsername);
            message.setTo(to);
            message.setSubject("Réinitialisation de votre mot de passe - Diravenir");
            
            String resetUrl = frontendUrl + "/reset-password?token=" + token;
            
            message.setText(String.format(
                "Bonjour,\n\n" +
                "Vous avez demandé la réinitialisation de votre mot de passe.\n\n" +
                "Pour définir un nouveau mot de passe, cliquez sur le lien suivant :\n" +
                "%s\n\n" +
                "Ce lien expirera dans 1 heure.\n\n" +
                "Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.\n\n" +
                "Cordialement,\n" +
                "L'équipe Diravenir",
                resetUrl
            ));

            mailSender.send(message);
            logger.info("✅ Email de réinitialisation envoyé avec succès à : {}", to);
            
        } catch (Exception e) {
            logger.error("❌ ERREUR CRITIQUE lors de l'envoi de l'email de réinitialisation à {} : {}", to, e.getMessage());
            logger.error("❌ Détails de l'erreur:", e);
            
            // Lever l'exception pour que le service appelant puisse la gérer
            throw new RuntimeException("Échec de l'envoi de l'email de réinitialisation: " + e.getMessage(), e);
        }
    }

    /**
     * Teste la configuration email
     */
    public boolean testEmailConfiguration() {
        try {
            if (!isEmailConfigured()) {
                logger.warn("⚠️ Configuration email incomplète");
                return false;
            }
            
            logger.info("✅ Configuration email valide - Username: {}", mailUsername);
            return true;
            
        } catch (Exception e) {
            logger.error("❌ Erreur lors du test de la configuration email: {}", e.getMessage());
            return false;
        }
    }

    /**
     * Vérifie si l'email doit être envoyé (uniquement pour les utilisateurs locaux, pas OAuth2)
     */
    public boolean shouldSendEmail(String provider) {
        // Envoyer des emails uniquement pour les utilisateurs locaux, pas pour OAuth2
        boolean shouldSend = provider == null || "local".equals(provider);
        logger.info("📧 Décision d'envoi d'email - Provider: {} | Envoyer: {}", provider, shouldSend);
        return shouldSend;
    }
} 