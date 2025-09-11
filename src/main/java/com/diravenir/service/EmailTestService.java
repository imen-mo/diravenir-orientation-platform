package com.diravenir.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailTestService {

    private final JavaMailSender mailSender;
    private final EmailService emailService;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${app.admin.email:admin@diravenir.com}")
    private String adminEmail;

    public Map<String, Object> testEmailConfiguration() {
        Map<String, Object> result = new HashMap<>();
        
        try {
            log.info("🧪 Test de la configuration email...");
            
            // Test 1: Configuration de base
            boolean configValid = testBasicConfiguration();
            result.put("configValid", configValid);
            
            // Test 2: Envoi d'email simple
            boolean sendTest = testEmailSending();
            result.put("sendTest", sendTest);
            
            // Test 3: Test avec le service email
            boolean serviceTest = testEmailService();
            result.put("serviceTest", serviceTest);
            
            // Informations de diagnostic
            result.put("fromEmail", fromEmail);
            result.put("adminEmail", adminEmail);
            result.put("timestamp", LocalDateTime.now());
            
            if (configValid && sendTest && serviceTest) {
                result.put("status", "success");
                result.put("message", "✅ Tous les tests email sont passés avec succès");
            } else {
                result.put("status", "error");
                result.put("message", "❌ Certains tests email ont échoué");
            }
            
        } catch (Exception e) {
            log.error("❌ Erreur lors du test email: {}", e.getMessage());
            result.put("status", "error");
            result.put("message", "Erreur: " + e.getMessage());
            result.put("exception", e.getClass().getSimpleName());
        }
        
        return result;
    }

    private boolean testBasicConfiguration() {
        try {
            // Vérifier que les propriétés sont définies
            if (fromEmail == null || fromEmail.trim().isEmpty()) {
                log.error("❌ spring.mail.username n'est pas défini");
                return false;
            }
            
            if (adminEmail == null || adminEmail.trim().isEmpty()) {
                log.error("❌ app.admin.email n'est pas défini");
                return false;
            }
            
            log.info("✅ Configuration de base valide");
            return true;
            
        } catch (Exception e) {
            log.error("❌ Erreur de configuration: {}", e.getMessage());
            return false;
        }
    }

    private boolean testEmailSending() {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(adminEmail);
            message.setSubject("🧪 Test Email - Diravenir");
            message.setText("Ceci est un email de test envoyé le " + LocalDateTime.now() + 
                          "\n\nSi vous recevez cet email, la configuration email fonctionne correctement.");
            
            mailSender.send(message);
            log.info("✅ Email de test envoyé avec succès");
            return true;
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de l'envoi de l'email de test: {}", e.getMessage());
            return false;
        }
    }

    private boolean testEmailService() {
        try {
            // Test avec le service email existant
            String testSubject = "🧪 Test Service Email - Diravenir";
            String testContent = "Test du service email le " + LocalDateTime.now();
            
            emailService.sendWelcomeEmail(adminEmail, "Admin Test");
            boolean sent = true;
            
            if (sent) {
                log.info("✅ Test du service email réussi");
                return true;
            } else {
                log.error("❌ Le service email a retourné false");
                return false;
            }
            
        } catch (Exception e) {
            log.error("❌ Erreur lors du test du service email: {}", e.getMessage());
            return false;
        }
    }

    public Map<String, Object> testSpecificEmail(String toEmail, String subject, String content) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            log.info("🧪 Test d'envoi d'email spécifique vers: {}", toEmail);
            
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject(subject != null ? subject : "🧪 Test Email - Diravenir");
            message.setText(content != null ? content : "Email de test envoyé le " + LocalDateTime.now());
            
            mailSender.send(message);
            
            result.put("status", "success");
            result.put("message", "✅ Email envoyé avec succès vers " + toEmail);
            result.put("timestamp", LocalDateTime.now());
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de l'envoi vers {}: {}", toEmail, e.getMessage());
            result.put("status", "error");
            result.put("message", "Erreur: " + e.getMessage());
            result.put("exception", e.getClass().getSimpleName());
        }
        
        return result;
    }
}
