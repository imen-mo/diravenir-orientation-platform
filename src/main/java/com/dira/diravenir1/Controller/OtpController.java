package com.dira.diravenir1.Controller;

import com.dira.diravenir1.service.OtpService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/otp")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class OtpController {

    private final OtpService otpService;

    /**
     * Génère et envoie un code OTP par email
     */
    @PostMapping("/send")
    public ResponseEntity<Map<String, Object>> sendOtp(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            
            if (email == null || email.trim().isEmpty()) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "❌ L'email est requis");
                response.put("error", "EMAIL_REQUIRED");
                return ResponseEntity.badRequest().body(response);
            }

            log.info("🔐 Demande d'envoi d'OTP pour l'email: {}", email);

            boolean success = otpService.generateAndSendOtp(email);

            Map<String, Object> response = new HashMap<>();
            if (success) {
                response.put("success", true);
                response.put("message", "✅ Code OTP envoyé avec succès à " + email);
                response.put("email", email);
                response.put("timestamp", java.time.LocalDateTime.now());
                
                log.info("✅ OTP envoyé avec succès à: {}", email);
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("message", "❌ Impossible d'envoyer le code OTP");
                response.put("error", "OTP_SEND_FAILED");
                response.put("email", email);
                
                log.warn("❌ Échec de l'envoi d'OTP à: {}", email);
                return ResponseEntity.badRequest().body(response);
            }

        } catch (Exception e) {
            log.error("❌ Erreur lors de l'envoi de l'OTP: {}", e.getMessage());
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "❌ Erreur interne du serveur");
            response.put("error", "INTERNAL_ERROR");
            response.put("details", e.getMessage());
            
            return ResponseEntity.internalServerError().body(response);
        }
    }

    /**
     * Vérifie un code OTP
     */
    @PostMapping("/verify")
    public ResponseEntity<Map<String, Object>> verifyOtp(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            String otpCode = request.get("otpCode");

            if (email == null || email.trim().isEmpty()) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "❌ L'email est requis");
                response.put("error", "EMAIL_REQUIRED");
                return ResponseEntity.badRequest().body(response);
            }

            if (otpCode == null || otpCode.trim().isEmpty()) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "❌ Le code OTP est requis");
                response.put("error", "OTP_CODE_REQUIRED");
                return ResponseEntity.badRequest().body(response);
            }

            log.info("🔍 Vérification OTP pour l'email: {}", email);

            boolean isValid = otpService.verifyOtp(email, otpCode.trim());

            Map<String, Object> response = new HashMap<>();
            if (isValid) {
                response.put("success", true);
                response.put("message", "✅ Code OTP vérifié avec succès");
                response.put("email", email);
                response.put("verified", true);
                response.put("timestamp", java.time.LocalDateTime.now());
                
                log.info("✅ OTP vérifié avec succès pour: {}", email);
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("message", "❌ Code OTP invalide ou expiré");
                response.put("error", "INVALID_OTP");
                response.put("email", email);
                response.put("verified", false);
                
                log.warn("❌ OTP invalide pour: {}", email);
                return ResponseEntity.badRequest().body(response);
            }

        } catch (Exception e) {
            log.error("❌ Erreur lors de la vérification de l'OTP: {}", e.getMessage());
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "❌ Erreur interne du serveur");
            response.put("error", "INTERNAL_ERROR");
            response.put("details", e.getMessage());
            
            return ResponseEntity.internalServerError().body(response);
        }
    }

    /**
     * Vérifie le statut d'un OTP
     */
    @GetMapping("/status/{email}")
    public ResponseEntity<Map<String, Object>> getOtpStatus(@PathVariable String email) {
        try {
            if (email == null || email.trim().isEmpty()) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "❌ L'email est requis");
                response.put("error", "EMAIL_REQUIRED");
                return ResponseEntity.badRequest().body(response);
            }

            log.info("🔍 Vérification du statut OTP pour l'email: {}", email);

            String status = otpService.getOtpStatus(email.trim());

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("email", email);
            response.put("status", status);
            response.put("timestamp", java.time.LocalDateTime.now());
            
            // Traduire le statut en français
            String statusMessage = switch (status) {
                case "NO_OTP" -> "Aucun OTP généré";
                case "USED" -> "OTP déjà utilisé";
                case "EXPIRED" -> "OTP expiré";
                case "BLOCKED" -> "Compte temporairement bloqué";
                case "VALID" -> "OTP valide";
                default -> "Erreur de statut";
            };
            
            response.put("statusMessage", statusMessage);
            
            log.info("✅ Statut OTP récupéré pour {}: {}", email, status);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération du statut OTP: {}", e.getMessage());
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "❌ Erreur interne du serveur");
            response.put("error", "INTERNAL_ERROR");
            response.put("details", e.getMessage());
            
            return ResponseEntity.internalServerError().body(response);
        }
    }

    /**
     * Renvoie un code OTP (si autorisé)
     */
    @PostMapping("/resend")
    public ResponseEntity<Map<String, Object>> resendOtp(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            
            if (email == null || email.trim().isEmpty()) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "❌ L'email est requis");
                response.put("error", "EMAIL_REQUIRED");
                return ResponseEntity.badRequest().body(response);
            }

            log.info("🔄 Demande de renvoi d'OTP pour l'email: {}", email);

            boolean success = otpService.generateAndSendOtp(email);

            Map<String, Object> response = new HashMap<>();
            if (success) {
                response.put("success", true);
                response.put("message", "✅ Nouveau code OTP envoyé avec succès");
                response.put("email", email);
                response.put("timestamp", java.time.LocalDateTime.now());
                
                log.info("✅ OTP renvoyé avec succès à: {}", email);
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("message", "❌ Impossible de renvoyer le code OTP");
                response.put("error", "OTP_RESEND_FAILED");
                response.put("email", email);
                
                log.warn("❌ Échec du renvoi d'OTP à: {}", email);
                return ResponseEntity.badRequest().body(response);
            }

        } catch (Exception e) {
            log.error("❌ Erreur lors du renvoi de l'OTP: {}", e.getMessage());
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "❌ Erreur interne du serveur");
            response.put("error", "INTERNAL_ERROR");
            response.put("details", e.getMessage());
            
            return ResponseEntity.internalServerError().body(response);
        }
    }

    /**
     * Endpoint de test pour vérifier que le service OTP fonctionne
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "✅ Service OTP opérationnel");
        response.put("timestamp", java.time.LocalDateTime.now());
        response.put("service", "OTP Service");
        response.put("version", "1.0.0");
        
        return ResponseEntity.ok(response);
    }
}
