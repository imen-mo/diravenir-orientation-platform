package com.diravenir.controller;

import com.diravenir.service.EmailServiceInterface;
import com.diravenir.service.MockEmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Controller pour tester le système d'email
 */
@RestController
@RequestMapping("/api/email-test")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class EmailTestController {

    private final EmailServiceInterface emailService;
    
    @Value("${app.email.mock:false}")
    private boolean emailMockMode;

    /**
     * Test d'envoi d'email de vérification
     */
    @PostMapping("/verification")
    public ResponseEntity<Map<String, Object>> testVerificationEmail(@RequestParam String email) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            String testToken = "test-token-" + System.currentTimeMillis();
            emailService.sendVerificationEmail(email, "Test User", testToken);
            
            response.put("success", true);
            response.put("message", "Email de vérification envoyé avec succès");
            response.put("mode", emailMockMode ? "MOCK" : "RÉEL");
            response.put("token", testToken);
            
            if (emailMockMode) {
                response.put("verificationUrl", "/verify-email?token=" + testToken);
                response.put("note", "En mode MOCK, vérifiez les logs pour voir l'email");
            }
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("❌ Erreur lors du test d'email de vérification: {}", e.getMessage());
            response.put("success", false);
            response.put("message", "Erreur lors de l'envoi: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * Test d'envoi d'email OTP
     */
    @PostMapping("/otp")
    public ResponseEntity<Map<String, Object>> testOTPEmail(@RequestParam String email) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            String testOTP = "123456";
            emailService.sendOTPEmail(email, "Test User", testOTP);
            
            response.put("success", true);
            response.put("message", "Email OTP envoyé avec succès");
            response.put("mode", emailMockMode ? "MOCK" : "RÉEL");
            response.put("otp", testOTP);
            
            if (emailMockMode) {
                response.put("note", "En mode MOCK, vérifiez les logs pour voir l'email");
            }
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("❌ Erreur lors du test d'email OTP: {}", e.getMessage());
            response.put("success", false);
            response.put("message", "Erreur lors de l'envoi: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * Test d'envoi d'email de réinitialisation
     */
    @PostMapping("/reset")
    public ResponseEntity<Map<String, Object>> testResetEmail(@RequestParam String email) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            String testToken = "reset-token-" + System.currentTimeMillis();
            emailService.sendPasswordResetEmail(email, "Test User", testToken);
            
            response.put("success", true);
            response.put("message", "Email de réinitialisation envoyé avec succès");
            response.put("mode", emailMockMode ? "MOCK" : "RÉEL");
            response.put("token", testToken);
            
            if (emailMockMode) {
                response.put("resetUrl", "/reset-password?token=" + testToken);
                response.put("note", "En mode MOCK, vérifiez les logs pour voir l'email");
            }
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("❌ Erreur lors du test d'email de reset: {}", e.getMessage());
            response.put("success", false);
            response.put("message", "Erreur lors de l'envoi: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * Statut du service email
     */
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getEmailStatus() {
        Map<String, Object> response = new HashMap<>();
        
        response.put("mode", emailMockMode ? "MOCK" : "RÉEL");
        response.put("description", emailMockMode ? 
            "Les emails sont simulés et affichés dans les logs" : 
            "Les emails sont envoyés via SMTP");
        response.put("timestamp", System.currentTimeMillis());
        
        if (emailMockMode && emailService instanceof MockEmailService) {
            MockEmailService mockService = (MockEmailService) emailService;
            mockService.displayActiveTokens();
        }
        
        return ResponseEntity.ok(response);
    }

    /**
     * Basculer entre mode MOCK et RÉEL (pour les tests)
     */
    @PostMapping("/toggle-mode")
    public ResponseEntity<Map<String, Object>> toggleEmailMode() {
        Map<String, Object> response = new HashMap<>();
        
        response.put("currentMode", emailMockMode ? "MOCK" : "RÉEL");
        response.put("message", "Pour changer le mode, modifiez app.email.mock dans application.properties");
        response.put("note", "Redémarrez l'application après modification");
        
        return ResponseEntity.ok(response);
    }
}