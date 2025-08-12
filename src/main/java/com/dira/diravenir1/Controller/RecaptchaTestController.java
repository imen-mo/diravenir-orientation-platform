package com.dira.diravenir1.Controller;

import com.dira.diravenir1.service.RecaptchaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/recaptcha")
@RequiredArgsConstructor
@Slf4j
public class RecaptchaTestController {

    private final RecaptchaService recaptchaService;

    /**
     * Test de vérification reCAPTCHA basique
     */
    @PostMapping("/test")
    public ResponseEntity<Map<String, Object>> testRecaptcha(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String action = request.get("action");
        
        log.info("🧪 Test reCAPTCHA - Token: {} | Action: {}", 
                token != null ? "PRÉSENT" : "ABSENT", action);
        
        Map<String, Object> response = new HashMap<>();
        
        if (token == null || token.trim().isEmpty()) {
            response.put("success", false);
            response.put("error", "Token reCAPTCHA manquant");
            return ResponseEntity.badRequest().body(response);
        }
        
        try {
            boolean isValid = recaptchaService.verify(token, action, false);
            response.put("success", isValid);
            response.put("message", isValid ? "Token reCAPTCHA valide" : "Token reCAPTCHA invalide");
            
            if (isValid) {
                response.put("action", action);
                response.put("timestamp", System.currentTimeMillis());
            }
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("🚫 Erreur lors du test reCAPTCHA: {}", e.getMessage());
            response.put("success", false);
            response.put("error", "Erreur interne: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    /**
     * Test de vérification reCAPTCHA stricte (score >= 0.7)
     */
    @PostMapping("/test/strict")
    public ResponseEntity<Map<String, Object>> testRecaptchaStrict(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String action = request.get("action");
        
        log.info("🧪 Test reCAPTCHA STRICT - Token: {} | Action: {}", 
                token != null ? "PRÉSENT" : "ABSENT", action);
        
        Map<String, Object> response = new HashMap<>();
        
        if (token == null || token.trim().isEmpty()) {
            response.put("success", false);
            response.put("error", "Token reCAPTCHA manquant");
            return ResponseEntity.badRequest().body(response);
        }
        
        try {
            boolean isValid = recaptchaService.verifyStrict(token, action);
            response.put("success", isValid);
            response.put("message", isValid ? "Token reCAPTCHA valide (strict)" : "Token reCAPTCHA invalide (strict)");
            
            if (isValid) {
                response.put("action", action);
                response.put("timestamp", System.currentTimeMillis());
            }
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("🚫 Erreur lors du test reCAPTCHA strict: {}", e.getMessage());
            response.put("success", false);
            response.put("error", "Erreur interne: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    /**
     * Test de vérification reCAPTCHA pour l'inscription
     */
    @PostMapping("/test/signup")
    public ResponseEntity<Map<String, Object>> testRecaptchaSignup(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        
        log.info("🧪 Test reCAPTCHA SIGNUP - Token: {}", 
                token != null ? "PRÉSENT" : "ABSENT");
        
        Map<String, Object> response = new HashMap<>();
        
        if (token == null || token.trim().isEmpty()) {
            response.put("success", false);
            response.put("error", "Token reCAPTCHA manquant");
            return ResponseEntity.badRequest().body(response);
        }
        
        try {
            boolean isValid = recaptchaService.verifySignup(token);
            response.put("success", isValid);
            response.put("message", isValid ? "Token reCAPTCHA valide pour inscription" : "Token reCAPTCHA invalide pour inscription");
            
            if (isValid) {
                response.put("action", "signup");
                response.put("timestamp", System.currentTimeMillis());
            }
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("🚫 Erreur lors du test reCAPTCHA signup: {}", e.getMessage());
            response.put("success", false);
            response.put("error", "Erreur interne: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    /**
     * Test de vérification reCAPTCHA pour la connexion
     */
    @PostMapping("/test/signin")
    public ResponseEntity<Map<String, Object>> testRecaptchaSignin(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        
        log.info("🧪 Test reCAPTCHA SIGNIN - Token: {}", 
                token != null ? "PRÉSENT" : "ABSENT");
        
        Map<String, Object> response = new HashMap<>();
        
        if (token == null || token.trim().isEmpty()) {
            response.put("success", false);
            response.put("error", "Token reCAPTCHA manquant");
            return ResponseEntity.badRequest().body(response);
        }
        
        try {
            boolean isValid = recaptchaService.verifySignin(token);
            response.put("success", isValid);
            response.put("message", isValid ? "Token reCAPTCHA valide pour connexion" : "Token reCAPTCHA invalide pour connexion");
            
            if (isValid) {
                response.put("action", "signin");
                response.put("timestamp", System.currentTimeMillis());
            }
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("🚫 Erreur lors du test reCAPTCHA signin: {}", e.getMessage());
            response.put("success", false);
            response.put("error", "Erreur interne: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    /**
     * Informations sur la configuration reCAPTCHA
     */
    @GetMapping("/info")
    public ResponseEntity<Map<String, Object>> getRecaptchaInfo() {
        Map<String, Object> info = new HashMap<>();
        info.put("version", "v3");
        info.put("description", "reCAPTCHA v3 avec score de confiance");
        info.put("thresholds", Map.of(
            "normal", 0.5,
            "strict", 0.7
        ));
        info.put("actions", new String[]{"submit", "signup", "signin", "login", "register"});
        info.put("timestamp", System.currentTimeMillis());
        
        return ResponseEntity.ok(info);
    }
}
