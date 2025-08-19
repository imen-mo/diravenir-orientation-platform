package com.dira.diravenir1.Controller;

import com.dira.diravenir1.service.EmailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/test")
public class TestEmailController {

    private static final Logger logger = LoggerFactory.getLogger(TestEmailController.class);

    private final EmailService emailService;

    public TestEmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    /**
     * Test de la configuration email
     */
    @GetMapping("/email/config")
    public ResponseEntity<?> testEmailConfiguration() {
        try {
            logger.info("🔍 Test de la configuration email...");
            
            boolean isConfigured = emailService.testEmailConfiguration();
            
            if (isConfigured) {
                return ResponseEntity.ok(Map.of(
                    "status", "success",
                    "message", "Configuration email valide",
                    "configured", true
                ));
            } else {
                return ResponseEntity.badRequest().body(Map.of(
                    "status", "error",
                    "message", "Configuration email invalide ou manquante",
                    "configured", false,
                    "help", "Vérifiez les propriétés spring.mail.* dans application.properties"
                ));
            }
            
        } catch (Exception e) {
            logger.error("❌ Erreur lors du test de configuration email: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body(Map.of(
                "status", "error",
                "message", "Erreur lors du test de configuration: " + e.getMessage()
            ));
        }
    }

    /**
     * Test d'envoi d'email de vérification
     */
    @PostMapping("/email/send-verification")
    public ResponseEntity<?> sendTestVerificationEmail(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            if (email == null || email.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "status", "error",
                    "message", "Email requis"
                ));
            }

            logger.info("📧 Test d'envoi d'email de vérification à : {}", email);
            
            // Token de test
            String testToken = "test-token-" + System.currentTimeMillis();
            
            emailService.sendVerificationEmail(email, testToken);
            
            return ResponseEntity.ok(Map.of(
                "status", "success",
                "message", "Email de vérification envoyé avec succès",
                "email", email,
                "token", testToken
            ));
            
        } catch (Exception e) {
            logger.error("❌ Erreur lors de l'envoi du test email: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body(Map.of(
                "status", "error",
                "message", "Échec de l'envoi de l'email: " + e.getMessage(),
                "help", "Vérifiez la configuration email et les logs pour plus de détails"
            ));
        }
    }

    /**
     * Test d'envoi d'email de réinitialisation de mot de passe
     */
    @PostMapping("/email/send-reset")
    public ResponseEntity<?> sendTestPasswordResetEmail(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            if (email == null || email.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "status", "error",
                    "message", "Email requis"
                ));
            }

            logger.info("📧 Test d'envoi d'email de réinitialisation à : {}", email);
            
            // Token de test
            String testToken = "reset-token-" + System.currentTimeMillis();
            
            emailService.sendPasswordResetEmail(email, testToken);
            
            return ResponseEntity.ok(Map.of(
                "status", "success",
                "message", "Email de réinitialisation envoyé avec succès",
                "email", email,
                "token", testToken
            ));
            
        } catch (Exception e) {
            logger.error("❌ Erreur lors de l'envoi du test email: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body(Map.of(
                "status", "error",
                "message", "Échec de l'envoi de l'email: " + e.getMessage(),
                "help", "Vérifiez la configuration email et les logs pour plus de détails"
            ));
        }
    }
}
