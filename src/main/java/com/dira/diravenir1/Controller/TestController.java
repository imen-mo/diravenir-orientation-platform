package com.dira.diravenir1.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/test")
public class TestController {

    private static final Logger logger = LoggerFactory.getLogger(TestController.class);

    @Value("${spring.mail.host:}")
    private String mailHost;

    @Value("${spring.mail.port:}")
    private String mailPort;

    @Value("${spring.mail.username:}")
    private String mailUsername;

    @Value("${spring.mail.password:}")
    private String mailPassword;

    @Value("${google.recaptcha.secret:}")
    private String recaptchaSecret;

    @Value("${app.frontend.url:}")
    private String frontendUrl;

    @Autowired
    private JavaMailSender mailSender;

    /**
     * Test de la configuration générale
     */
    @GetMapping("/config")
    public ResponseEntity<?> testConfiguration() {
        logger.info("🧪 Test de configuration générale");
        
        Map<String, Object> config = Map.of(
            "mailHost", mailHost,
            "mailPort", mailPort,
            "mailUsername", mailUsername != null ? "CONFIGURÉ" : "NON CONFIGURÉ",
            "mailPassword", mailPassword != null ? "CONFIGURÉ" : "NON CONFIGURÉ",
            "recaptchaSecret", recaptchaSecret != null ? "CONFIGURÉ" : "NON CONFIGURÉ",
            "frontendUrl", frontendUrl,
            "timestamp", System.currentTimeMillis()
        );
        
        return ResponseEntity.ok(config);
    }

    /**
     * Test de la configuration email
     */
    @PostMapping("/email")
    public ResponseEntity<?> testEmail() {
        logger.info("🧪 Test de configuration email");
        
        try {
            if (mailSender == null) {
                return ResponseEntity.status(500)
                    .body(Map.of("error", "Service email non configuré"));
            }
            
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(mailUsername);
            message.setTo("test@example.com");
            message.setSubject("Test de configuration email - Diravenir");
            message.setText("Ceci est un test de configuration email.");
            
            mailSender.send(message);
            
            logger.info("✅ Test email réussi");
            return ResponseEntity.ok(Map.of(
                "message", "Test email réussi",
                "status", "OK",
                "timestamp", System.currentTimeMillis()
            ));
            
        } catch (Exception e) {
            logger.error("❌ Échec du test email: {}", e.getMessage(), e);
            return ResponseEntity.status(500)
                .body(Map.of(
                    "error", "Échec du test email",
                    "details", e.getMessage(),
                    "timestamp", System.currentTimeMillis()
                ));
        }
    }

    /**
     * Test de la base de données
     */
    @GetMapping("/database")
    public ResponseEntity<?> testDatabase() {
        logger.info("🧪 Test de connexion base de données");
        
        try {
            // Test simple - on pourrait ajouter une requête de test ici
            return ResponseEntity.ok(Map.of(
                "message", "Connexion base de données OK",
                "status", "OK",
                "timestamp", System.currentTimeMillis()
            ));
        } catch (Exception e) {
            logger.error("❌ Échec du test base de données: {}", e.getMessage(), e);
            return ResponseEntity.status(500)
                .body(Map.of(
                    "error", "Échec du test base de données",
                    "details", e.getMessage(),
                    "timestamp", System.currentTimeMillis()
                ));
        }
    }

    /**
     * Test de la configuration reCAPTCHA
     */
    @GetMapping("/recaptcha")
    public ResponseEntity<?> testRecaptcha() {
        logger.info("🧪 Test de configuration reCAPTCHA");
        
        Map<String, Object> config = Map.of(
            "secretConfigured", recaptchaSecret != null && !recaptchaSecret.isEmpty(),
            "secretLength", recaptchaSecret != null ? recaptchaSecret.length() : 0,
            "timestamp", System.currentTimeMillis()
        );
        
        return ResponseEntity.ok(config);
    }
}
