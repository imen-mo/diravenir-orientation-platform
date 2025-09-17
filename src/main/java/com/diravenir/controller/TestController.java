package com.diravenir.controller;

import com.diravenir.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class TestController {
    
    private final JwtService jwtService;
    
    @Value("${google.client-id}")
    private String googleClientId;
    
    @Value("${frontend.url}")
    private String frontendUrl;
    
    @GetMapping("/oauth2/config")
    public ResponseEntity<Map<String, Object>> getOAuth2Config() {
        Map<String, Object> config = new HashMap<>();
        config.put("clientId", googleClientId);
        config.put("redirectUri", frontendUrl + "/oauth2-success");
        config.put("scopes", new String[]{"openid", "profile", "email"});
        config.put("authorizationUri", "https://accounts.google.com/o/oauth2/v2/auth");
        return ResponseEntity.ok(config);
    }
    
    @GetMapping("/oauth2/google-url")
    public ResponseEntity<Map<String, Object>> getGoogleLoginUrl() {
        String state = "test-state-" + Instant.now().toEpochMilli();
        String url = String.format(
            "https://accounts.google.com/o/oauth2/v2/auth?client_id=%s&redirect_uri=%s&response_type=code&scope=openid%%20profile%%20email&state=%s",
            googleClientId,
            frontendUrl + "/oauth2-success",
            state
        );
        
        Map<String, Object> response = new HashMap<>();
        response.put("url", url);
        response.put("state", state);
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/auth/validate-token")
    public ResponseEntity<Map<String, Object>> validateToken(@RequestHeader("Authorization") String authHeader) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            if (authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                
                if (jwtService.isTokenValid(token, null)) {
                    String email = jwtService.extractUsername(token);
                    response.put("valid", true);
                    response.put("email", email);
                    response.put("expiresAt", jwtService.extractClaim(token, claims -> claims.getExpiration()));
                    return ResponseEntity.ok(response);
                } else {
                    response.put("valid", false);
                    response.put("error", "Token invalide ou expiré");
                    return ResponseEntity.badRequest().body(response);
                }
            } else {
                response.put("valid", false);
                response.put("error", "Format d'autorisation invalide");
                return ResponseEntity.badRequest().body(response);
            }
        } catch (Exception e) {
            response.put("valid", false);
            response.put("error", "Erreur de validation: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @GetMapping("/auth/test-endpoint")
    public ResponseEntity<Map<String, Object>> testAuthEndpoint(@RequestHeader("Authorization") String authHeader) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            if (authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                
                if (jwtService.isTokenValid(token, null)) {
                    String email = jwtService.extractUsername(token);
                    response.put("message", "Endpoint protégé accessible");
                    response.put("email", email);
                    response.put("timestamp", Instant.now().toEpochMilli());
                    return ResponseEntity.ok(response);
                } else {
                    response.put("error", "Token invalide");
                    return ResponseEntity.status(401).body(response);
                }
            } else {
                response.put("error", "Token manquant");
                return ResponseEntity.status(401).body(response);
            }
        } catch (Exception e) {
            response.put("error", "Erreur d'authentification: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }
}