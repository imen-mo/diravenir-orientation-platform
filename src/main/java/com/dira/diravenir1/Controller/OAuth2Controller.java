package com.dira.diravenir1.Controller;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.core.Authentication;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/oauth2")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "http://localhost:3005"}, allowCredentials = "true")
@RequiredArgsConstructor
public class OAuth2Controller {

    private static final Logger log = LoggerFactory.getLogger(OAuth2Controller.class);

    /**
     * Vérifie le statut de l'authentification OAuth2
     */
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getOAuth2Status(HttpServletRequest request) {
        try {
            Map<String, Object> response = new HashMap<>();
            
            // Vérifier l'authentification Spring Security
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth != null && auth.isAuthenticated() && auth.getPrincipal() instanceof OAuth2User) {
                OAuth2User oauth2User = (OAuth2User) auth.getPrincipal();
                
                response.put("status", "authenticated");
                response.put("authenticated", true);
                response.put("user", oauth2User.getAttributes());
                response.put("message", "Utilisateur OAuth2 authentifié");
                
                log.info("✅ Statut OAuth2: Utilisateur authentifié - {}", oauth2User.getAttribute("email").toString());
            } else {
                // Vérifier la session HTTP
                HttpSession session = request.getSession(false);
                if (session != null && session.getAttribute("isOAuth2User") != null) {
                    response.put("status", "session_authenticated");
                    response.put("authenticated", true);
                    response.put("user", Map.of(
                        "email", session.getAttribute("userEmail"),
                        "name", session.getAttribute("userName"),
                        "givenName", session.getAttribute("userGivenName"),
                        "familyName", session.getAttribute("userFamilyName"),
                        "picture", session.getAttribute("userPicture")
                    ));
                    response.put("message", "Utilisateur OAuth2 authentifié via session");
                    
                    log.info("✅ Statut OAuth2: Utilisateur authentifié via session - {}", session.getAttribute("userEmail"));
                } else {
                    response.put("status", "not_authenticated");
                    response.put("authenticated", false);
                    response.put("message", "Aucun utilisateur OAuth2 authentifié");
                    
                    log.info("ℹ️ Statut OAuth2: Aucun utilisateur authentifié");
                }
            }
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de la vérification du statut OAuth2: {}", e.getMessage(), e);
            
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("authenticated", false);
            errorResponse.put("message", "Erreur lors de la vérification du statut: " + e.getMessage());
            
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    /**
     * Obtient l'URL de connexion Google
     */
    @GetMapping("/google/login-url")
    public ResponseEntity<Map<String, Object>> getGoogleLoginUrl() {
        try {
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("loginUrl", "/oauth2/authorization/google");
            response.put("message", "URL de connexion Google générée");
            
            log.info("🔗 URL de connexion Google générée");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de la génération de l'URL Google: {}", e.getMessage(), e);
            
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", "Erreur lors de la génération de l'URL: " + e.getMessage());
            
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    /**
     * Traite le callback OAuth2 depuis le frontend
     */
    @PostMapping("/google/callback")
    public ResponseEntity<Map<String, Object>> handleGoogleCallback(@RequestBody Map<String, Object> userData, HttpServletRequest request) {
        try {
            log.info("🔄 Callback OAuth2 reçu: {}", userData);
            
            // Vérifier si l'utilisateur est authentifié
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth != null && auth.isAuthenticated() && auth.getPrincipal() instanceof OAuth2User) {
                OAuth2User oauth2User = (OAuth2User) auth.getPrincipal();
                
                Map<String, Object> response = new HashMap<>();
                response.put("status", "success");
                response.put("authenticated", true);
                response.put("user", oauth2User.getAttributes());
                response.put("message", "Utilisateur OAuth2 authentifié avec succès");
                
                log.info("✅ Callback OAuth2 traité avec succès pour: {}", oauth2User.getAttribute("email").toString());
                
                return ResponseEntity.ok(response);
            } else {
                // Vérifier la session HTTP
                HttpSession session = request.getSession(false);
                if (session != null && session.getAttribute("isOAuth2User") != null) {
                    Map<String, Object> response = new HashMap<>();
                    response.put("status", "success");
                    response.put("authenticated", true);
                    response.put("user", Map.of(
                        "email", session.getAttribute("userEmail"),
                        "name", session.getAttribute("userName"),
                        "givenName", session.getAttribute("userGivenName"),
                        "familyName", session.getAttribute("userFamilyName"),
                        "picture", session.getAttribute("userPicture")
                    ));
                    response.put("message", "Utilisateur OAuth2 authentifié via session");
                    
                    log.info("✅ Callback OAuth2 traité via session pour: {}", session.getAttribute("userEmail"));
                    
                    return ResponseEntity.ok(response);
                } else {
                    Map<String, Object> errorResponse = new HashMap<>();
                    errorResponse.put("status", "error");
                    errorResponse.put("authenticated", false);
                    errorResponse.put("message", "Utilisateur non authentifié");
                    
                    log.warn("⚠️ Callback OAuth2: Utilisateur non authentifié");
                    
                    return ResponseEntity.badRequest().body(errorResponse);
                }
            }
            
        } catch (Exception e) {
            log.error("❌ Erreur lors du traitement du callback OAuth2: {}", e.getMessage(), e);
            
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", "Erreur lors du traitement du callback: " + e.getMessage());
            
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    /**
     * Déconnecte l'utilisateur OAuth2
     */
    @PostMapping("/logout")
    public ResponseEntity<Map<String, Object>> logout(HttpServletRequest request) {
        try {
            // Invalider la session
            HttpSession session = request.getSession(false);
            if (session != null) {
                session.invalidate();
                log.info("🔓 Session OAuth2 invalidée");
            }
            
            // Nettoyer le contexte de sécurité
            SecurityContextHolder.clearContext();
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Déconnexion OAuth2 réussie");
            
            log.info("✅ Déconnexion OAuth2 réussie");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de la déconnexion OAuth2: {}", e.getMessage(), e);
            
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", "Erreur lors de la déconnexion: " + e.getMessage());
            
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
}
