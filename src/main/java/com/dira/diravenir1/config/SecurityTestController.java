package com.dira.diravenir1.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/security-test")
@CrossOrigin(origins = "*")
@Slf4j
public class SecurityTestController {

    /**
     * Test de l'endpoint public (pas d'authentification requise)
     */
    @GetMapping("/public")
    public ResponseEntity<Map<String, Object>> publicEndpoint() {
        log.info("🔓 Endpoint public accessible");
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Endpoint public accessible sans authentification");
        response.put("timestamp", java.time.LocalDateTime.now().toString());
        response.put("status", "SUCCESS");
        
        return ResponseEntity.ok(response);
    }

    /**
     * Test de l'endpoint protégé (authentification requise)
     */
    @GetMapping("/protected")
    public ResponseEntity<Map<String, Object>> protectedEndpoint() {
        log.info("🔐 Endpoint protégé accessible");
        
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Endpoint protégé accessible avec authentification");
        response.put("timestamp", java.time.LocalDateTime.now().toString());
        response.put("status", "SUCCESS");
        response.put("authenticated", authentication != null && authentication.isAuthenticated());
        
        if (authentication != null) {
            response.put("principal", authentication.getPrincipal().toString());
            response.put("authorities", authentication.getAuthorities().toString());
            
            // Si c'est un utilisateur OAuth2, extraire les informations
            if (authentication.getPrincipal() instanceof OAuth2User) {
                OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
                response.put("oauth2User", true);
                response.put("email", oauth2User.getAttribute("email"));
                response.put("name", oauth2User.getAttribute("name"));
            }
        }
        
        return ResponseEntity.ok(response);
    }

    /**
     * Test de l'endpoint d'administration (rôle ADMIN requis)
     */
    @GetMapping("/admin")
    public ResponseEntity<Map<String, Object>> adminEndpoint() {
        log.info("👑 Endpoint admin accessible");
        
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Endpoint admin accessible");
        response.put("timestamp", java.time.LocalDateTime.now().toString());
        response.put("status", "SUCCESS");
        response.put("authenticated", authentication != null && authentication.isAuthenticated());
        
        if (authentication != null) {
            response.put("principal", authentication.getPrincipal().toString());
            response.put("authorities", authentication.getAuthorities().toString());
        }
        
        return ResponseEntity.ok(response);
    }

    /**
     * Test de la configuration CORS
     */
    @PostMapping("/cors-test")
    public ResponseEntity<Map<String, Object>> corsTest(@RequestBody Map<String, Object> request) {
        log.info("🌐 Test CORS avec requête: {}", request);
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Test CORS réussi");
        response.put("timestamp", java.time.LocalDateTime.now().toString());
        response.put("status", "SUCCESS");
        response.put("receivedData", request);
        
        return ResponseEntity.ok(response);
    }

    /**
     * Test de la configuration OAuth2
     */
    @GetMapping("/oauth2-status")
    public ResponseEntity<Map<String, Object>> oauth2Status() {
        log.info("🔐 Vérification du statut OAuth2");
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Statut OAuth2");
        response.put("timestamp", java.time.LocalDateTime.now().toString());
        response.put("status", "SUCCESS");
        response.put("oauth2Enabled", true);
        response.put("googleProvider", "enabled");
        response.put("loginUrl", "/oauth2/authorization/google");
        
        return ResponseEntity.ok(response);
    }
}
