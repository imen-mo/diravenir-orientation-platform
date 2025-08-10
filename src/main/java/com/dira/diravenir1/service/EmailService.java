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

            getMailSender().send(message);
            logger.info("✅ Email de vérification envoyé à : {}", to);
            
        } catch (Exception e) {
            logger.error("❌ Erreur lors de l'envoi de l'email de vérification à {} : {}", to, e.getMessage());
            // Ne pas lever d'exception pour ne pas interrompre le processus d'inscription
            // L'utilisateur peut toujours se connecter et demander un nouvel email de vérification
        }
    }

    public void sendPasswordResetEmail(String to, String token) {
        try {
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

            getMailSender().send(message);
            logger.info("✅ Email de réinitialisation envoyé à : {}", to);
            
        } catch (Exception e) {
            logger.error("❌ Erreur lors de l'envoi de l'email de réinitialisation à {} : {}", to, e.getMessage());
            // Ne pas lever d'exception pour ne pas interrompre le processus
        }
    }

    private JavaMailSender getMailSender() {
        if (mailSender == null) {
            JavaMailSenderImpl sender = new JavaMailSenderImpl();
            sender.setHost(mailHost);
            sender.setPort(mailPort);
            sender.setUsername(mailUsername);
            sender.setPassword(mailPassword);

            Properties props = sender.getJavaMailProperties();
            props.put("mail.transport.protocol", "smtp");
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.starttls.enable", "true");
            props.put("mail.debug", "false");

            mailSender = sender;
        }
        return mailSender;
    }
} 