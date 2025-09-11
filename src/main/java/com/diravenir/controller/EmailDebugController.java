package com.diravenir.controller;

import com.diravenir.service.EmailVerificationService;
import com.diravenir.service.EmailOTPService;
import com.diravenir.repository.UtilisateurRepository;
import com.diravenir.Entities.Utilisateur;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/debug/email")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class EmailDebugController {

    private final EmailVerificationService emailVerificationService;
    private final EmailOTPService emailOTPService;
    private final UtilisateurRepository utilisateurRepository;

    /**
     * Endpoint de test simple
     */
    @GetMapping("/test")
    public ResponseEntity<Map<String, String>> testEndpoint() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Endpoint de debug accessible !");
        response.put("timestamp", java.time.LocalDateTime.now().toString());
        return ResponseEntity.ok(response);
    }

    /**
     * Endpoint pour déboguer les problèmes d'email
     */
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getEmailStatus() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            response.put("status", "success");
            response.put("message", "Service d'email opérationnel");
            response.put("timestamp", java.time.LocalDateTime.now());
            response.put("frontendUrl", "http://localhost:5173");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de la vérification du statut email: {}", e.getMessage());
            
            response.put("status", "error");
            response.put("message", "Erreur du service email: " + e.getMessage());
            response.put("timestamp", java.time.LocalDateTime.now());
            
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * Endpoint pour forcer la vérification d'un email (mode debug)
     */
    @PostMapping("/force-verify/{email}")
    public ResponseEntity<Map<String, String>> forceVerifyEmail(@PathVariable String email) {
        Map<String, String> response = new HashMap<>();
        
        try {
            log.info("🔧 [DEBUG] Force verification pour l'email: {}", email);
            
            Optional<Utilisateur> utilisateurOpt = utilisateurRepository.findByEmail(email);
            
            if (utilisateurOpt.isEmpty()) {
                response.put("status", "error");
                response.put("message", "Utilisateur non trouvé avec l'email: " + email);
                return ResponseEntity.badRequest().body(response);
            }
            
            Utilisateur utilisateur = utilisateurOpt.get();
            
            if (utilisateur.isCompteActif()) {
                response.put("status", "success");
                response.put("message", "Le compte est déjà vérifié pour: " + email);
                return ResponseEntity.ok(response);
            }
            
            // Forcer l'activation du compte
            utilisateur.setCompteActif(true);
            utilisateurRepository.save(utilisateur);
            
            log.info("✅ [DEBUG] Compte forcé comme vérifié pour: {}", email);
            
            response.put("status", "success");
            response.put("message", "Compte forcé comme vérifié pour: " + email);
            response.put("redirectUrl", "/login");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("❌ [DEBUG] Erreur lors de la vérification forcée: {}", e.getMessage());
            
            response.put("status", "error");
            response.put("message", "Erreur lors de la vérification forcée: " + e.getMessage());
            
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * Endpoint pour obtenir les informations de debug d'un utilisateur
     */
    @GetMapping("/user-info/{email}")
    public ResponseEntity<Map<String, Object>> getUserInfo(@PathVariable String email) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Optional<Utilisateur> utilisateurOpt = utilisateurRepository.findByEmail(email);
            
            if (utilisateurOpt.isEmpty()) {
                response.put("status", "error");
                response.put("message", "Utilisateur non trouvé");
                return ResponseEntity.badRequest().body(response);
            }
            
            Utilisateur utilisateur = utilisateurOpt.get();
            
            response.put("status", "success");
            response.put("user", Map.of(
                "id", utilisateur.getId(),
                "email", utilisateur.getEmail(),
                "nom", utilisateur.getNom(),
                "prenom", utilisateur.getPrenom(),
                "compteActif", utilisateur.isCompteActif(),
                "role", utilisateur.getRole().name(),
                "dateCreation", utilisateur.getDateCreation()
            ));
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération des infos utilisateur: {}", e.getMessage());
            
            response.put("status", "error");
            response.put("message", "Erreur lors de la récupération des informations: " + e.getMessage());
            
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * Endpoint pour renvoyer un email de vérification (mode debug)
     */
    @PostMapping("/resend-verification/{email}")
    public ResponseEntity<Map<String, String>> resendVerification(@PathVariable String email) {
        Map<String, String> response = new HashMap<>();
        
        try {
            log.info("🔧 [DEBUG] Renvoi de vérification pour: {}", email);
            
            boolean success = emailVerificationService.resendVerificationEmail(email);
            
            if (success) {
                response.put("status", "success");
                response.put("message", "Email de vérification renvoyé avec succès à: " + email);
                response.put("note", "Vérifiez les logs du serveur pour voir le lien de vérification");
            } else {
                response.put("status", "error");
                response.put("message", "Impossible de renvoyer l'email de vérification");
                response.put("suggestion", "Utilisez /force-verify/{email} pour forcer la vérification");
            }
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("❌ [DEBUG] Erreur lors du renvoi: {}", e.getMessage());
            
            response.put("status", "error");
            response.put("message", "Erreur lors du renvoi: " + e.getMessage());
            response.put("suggestion", "Utilisez /force-verify/{email} pour forcer la vérification");
            
            return ResponseEntity.badRequest().body(response);
        }
    }
}
