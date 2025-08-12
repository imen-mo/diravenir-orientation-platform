package com.dira.diravenir1.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

import java.util.Properties;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Value("${spring.mail.host:smtp.gmail.com}")
    private String mailHost;

    @Value("${spring.mail.port:587}")
    private int mailPort;

    @Value("${spring.mail.username}")
    private String mailUsername;

    @Value("${spring.mail.password}")
    private String mailPassword;

    @Value("${app.frontend.url:http://localhost:3000}")
    private String frontendUrl;

    private JavaMailSender mailSender;

    public void sendVerificationEmail(String to, String token) {
        try {
            logger.info("📧 Tentative d'envoi d'email de vérification à : {}", to);
            
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

            JavaMailSender sender = getMailSender();
            if (sender == null) {
                throw new RuntimeException("Service email non configuré");
            }
            
            sender.send(message);
            logger.info("✅ Email de vérification envoyé avec succès à : {}", to);
            
        } catch (Exception e) {
            logger.error("❌ ERREUR CRITIQUE lors de l'envoi de l'email de vérification à {} : {}", to, e.getMessage());
            logger.error("❌ Détails de l'erreur:", e);
            
            // Lever l'exception pour que le service appelant puisse la gérer
            throw new RuntimeException("Échec de l'envoi de l'email de vérification: " + e.getMessage(), e);
        }
    }

    public void sendPasswordResetEmail(String to, String token) {
        try {
            logger.info("📧 Tentative d'envoi d'email de réinitialisation à : {}", to);
            
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

            JavaMailSender sender = getMailSender();
            if (sender == null) {
                throw new RuntimeException("Service email non configuré");
            }
            
            sender.send(message);
            logger.info("✅ Email de réinitialisation envoyé avec succès à : {}", to);
            
        } catch (Exception e) {
            logger.error("❌ ERREUR CRITIQUE lors de l'envoi de l'email de réinitialisation à {} : {}", to, e.getMessage());
            logger.error("❌ Détails de l'erreur:", e);
            
            // Lever l'exception pour que le service appelant puisse la gérer
            throw new RuntimeException("Échec de l'envoi de l'email de réinitialisation: " + e.getMessage(), e);
        }
    }

    private JavaMailSender getMailSender() {
        if (mailSender == null) {
            try {
                logger.info("🔧 Configuration du service email - Host: {} | Port: {} | Username: {}", 
                           mailHost, mailPort, mailUsername != null ? "CONFIGURÉ" : "NON CONFIGURÉ");
                
                // Validation de la configuration
                if (mailUsername == null || mailUsername.trim().isEmpty()) {
                    throw new RuntimeException("Nom d'utilisateur email non configuré");
                }
                if (mailPassword == null || mailPassword.trim().isEmpty()) {
                    throw new RuntimeException("Mot de passe email non configuré");
                }
                
                JavaMailSenderImpl sender = new JavaMailSenderImpl();
                sender.setHost(mailHost);
                sender.setPort(mailPort);
                sender.setUsername(mailUsername);
                sender.setPassword(mailPassword);

                Properties props = sender.getJavaMailProperties();
                props.put("mail.transport.protocol", "smtp");
                props.put("mail.smtp.auth", "true");
                props.put("mail.smtp.starttls.enable", "true");
                props.put("mail.smtp.connectiontimeout", "10000"); // Augmenté à 10 secondes
                props.put("mail.smtp.timeout", "10000"); // Augmenté à 10 secondes
                props.put("mail.smtp.writetimeout", "10000"); // Augmenté à 10 secondes
                props.put("mail.smtp.ssl.trust", "smtp.gmail.com");
                props.put("mail.smtp.ssl.protocols", "TLSv1.2");
                props.put("mail.debug", "false"); // Désactivé en production
                props.put("mail.smtp.ssl.checkserveridentity", "false"); // Pour éviter les problèmes de certificat

                mailSender = sender;
                logger.info("✅ Service email configuré avec succès");
                
            } catch (Exception e) {
                logger.error("❌ ERREUR LORS DE LA CONFIGURATION DU SERVICE EMAIL: {}", e.getMessage());
                logger.error("❌ Détails de l'erreur:", e);
                throw new RuntimeException("Impossible de configurer le service email: " + e.getMessage(), e);
            }
        }
        return mailSender;
    }
} 