package com.dira.diravenir1.Controller;

import com.dira.diravenir1.dto.AuthenticationRequest;
import com.dira.diravenir1.dto.AuthenticationResponse;
import com.dira.diravenir1.dto.RegisterRequest;
import com.dira.diravenir1.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import com.dira.diravenir1.dto.UtilisateurDTO;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@Valid @RequestBody RegisterRequest request) {
        try {
            // L'inscription crée l'utilisateur, envoie l'email ET retourne un JWT (compte inactif)
            AuthenticationResponse response = authenticationService.register(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("❌ Erreur lors de l'inscription: " + e.getMessage());
            throw e;
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(@Valid @RequestBody AuthenticationRequest request) {
        try {
            AuthenticationResponse response = authenticationService.authenticate(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("❌ Erreur lors de la connexion: " + e.getMessage());
            throw e;
        }
    }

    @GetMapping("/verify-email")
    public ResponseEntity<Map<String, String>> verifyEmail(@RequestParam String token) {
        try {
            // Validation du token
            if (token == null || token.trim().isEmpty()) {
                Map<String, String> response = new HashMap<>();
                response.put("message", "❌ Token de vérification manquant ou vide.");
                response.put("status", "error");
                return ResponseEntity.badRequest().body(response);
            }
            
            boolean success = authenticationService.verifyEmail(token.trim());
            
            Map<String, String> response = new HashMap<>();
            if (success) {
                response.put("message", "✅ Email vérifié avec succès ! Votre compte est maintenant actif. Vous pouvez vous connecter.");
                response.put("status", "success");
                response.put("redirectUrl", "/login");
            } else {
                // Message d'erreur pour les tokens déjà utilisés
                response.put("message", "⚠️ Ce lien a déjà été utilisé ! Votre compte est déjà actif. Vous pouvez vous connecter.");
                response.put("status", "error");
            }
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("❌ Erreur lors de la vérification email: " + e.getMessage());
            Map<String, String> response = new HashMap<>();
            response.put("message", "❌ Erreur lors de la vérification email: " + e.getMessage());
            response.put("status", "error");
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/resend-verification")
    public ResponseEntity<Map<String, String>> resendVerificationEmail(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        try {
            boolean success = authenticationService.resendVerificationEmail(email);
            
            Map<String, String> response = new HashMap<>();
            if (success) {
                response.put("message", "📧 Email de vérification renvoyé avec succès !");
                response.put("status", "success");
            } else {
                response.put("message", "❌ Échec du renvoi de l'email de vérification.");
                response.put("status", "error");
            }
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("❌ Erreur lors du renvoi de l'email de vérification: " + e.getMessage());
            Map<String, String> response = new HashMap<>();
            response.put("message", "❌ Erreur lors du renvoi de l'email de vérification: " + e.getMessage());
            response.put("status", "error");
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/oauth2-user")
    public ResponseEntity<Map<String, Object>> getOAuth2User(
            @RequestParam String email,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String givenName,
            @RequestParam(required = false) String familyName) {
        try {
            System.out.println("🔍 Récupération des informations OAuth2 pour: " + email);
            System.out.println("👤 Nom complet: " + name);
            System.out.println("📝 Prénom: " + givenName);
            System.out.println("📝 Nom de famille: " + familyName);
            
            // Récupérer ou créer l'utilisateur
            UtilisateurDTO user = authenticationService.findByEmail(email);
            
                               if (user == null) {
                       // Créer un nouvel utilisateur OAuth2 avec les données Google
                       System.out.println("🆕 Création d'un nouvel utilisateur OAuth2: " + email);
                       user = authenticationService.createOAuth2UserWithGoogleData(email, givenName, familyName, name);
                   }
            
            // Générer un JWT pour l'utilisateur
            String token = authenticationService.generateJwtForUser(user.getEmail());
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("user", user);
            response.put("token", token);
            response.put("message", "Utilisateur OAuth2 connecté avec succès");
            
            System.out.println("✅ Utilisateur OAuth2 connecté: " + user.getEmail());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            System.err.println("❌ Erreur lors de la récupération OAuth2: " + e.getMessage());
            e.printStackTrace();
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", "Erreur lors de la récupération des informations utilisateur: " + e.getMessage());
            
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<Map<String, String>> forgotPassword(@RequestParam String email) {
        try {
            boolean success = authenticationService.forgotPassword(email);
            
            Map<String, String> response = new HashMap<>();
            if (success) {
                response.put("message", "📧 Email de réinitialisation envoyé avec succès !");
                response.put("status", "success");
            } else {
                response.put("message", "❌ Échec de l'envoi de l'email de réinitialisation.");
                response.put("status", "error");
            }
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("❌ Erreur lors de la demande de réinitialisation: " + e.getMessage());
            Map<String, String> response = new HashMap<>();
            response.put("message", "❌ Erreur lors de la demande de réinitialisation: " + e.getMessage());
            response.put("status", "error");
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, String>> resetPassword(
            @RequestParam String token,
            @RequestParam String newPassword) {
        try {
            boolean success = authenticationService.resetPassword(token, newPassword);
            
            Map<String, String> response = new HashMap<>();
            if (success) {
                response.put("message", "✅ Mot de passe réinitialisé avec succès !");
                response.put("status", "success");
            } else {
                response.put("message", "❌ Échec de la réinitialisation du mot de passe.");
                response.put("status", "error");
            }
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("❌ Erreur lors de la réinitialisation du mot de passe: " + e.getMessage());
            Map<String, String> response = new HashMap<>();
            response.put("message", "❌ Erreur lors de la réinitialisation du mot de passe: " + e.getMessage());
            response.put("status", "error");
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "✅ Service d'authentification opérationnel");
        response.put("timestamp", java.time.LocalDateTime.now().toString());
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/create-admin")
    public ResponseEntity<Map<String, String>> createAdmin() {
        try {
            // Créer un admin par défaut
            String adminEmail = "admin@diravenir.com";
            String adminPassword = "Admin123!";
            String adminNom = "Admin";
            String adminPrenom = "Diravenir";
            
            // Vérifier si l'admin existe déjà
            if (authenticationService.userExists(adminEmail)) {
                Map<String, String> response = new HashMap<>();
                response.put("message", "⚠️ L'administrateur existe déjà !");
                response.put("status", "warning");
                return ResponseEntity.ok(response);
            }
            
            // Créer l'admin
            boolean success = authenticationService.createAdmin(adminEmail, adminPassword, adminNom, adminPrenom);
            
            Map<String, String> response = new HashMap<>();
            if (success) {
                response.put("message", "✅ Administrateur créé avec succès !\nEmail: " + adminEmail + "\nMot de passe: " + adminPassword);
                response.put("status", "success");
                response.put("email", adminEmail);
                response.put("password", adminPassword);
            } else {
                response.put("message", "❌ Échec de la création de l'administrateur.");
                response.put("status", "error");
            }
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "❌ Erreur lors de la création de l'admin: " + e.getMessage());
            response.put("status", "error");
            return ResponseEntity.internalServerError().body(response);
        }
    }
    
    @GetMapping("/check-admin")
    public ResponseEntity<Map<String, Object>> checkAdmin() {
        try {
            String adminEmail = "admin@diravenir.com";
            
            if (!authenticationService.userExists(adminEmail)) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "❌ L'administrateur n'existe pas");
                response.put("status", "error");
                return ResponseEntity.ok(response);
            }
            
            // Récupérer les détails de l'admin
            Map<String, Object> adminDetails = authenticationService.getAdminDetails(adminEmail);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "✅ Administrateur trouvé");
            response.put("status", "success");
            response.put("admin", adminDetails);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "❌ Erreur lors de la vérification: " + e.getMessage());
            response.put("status", "error");
            return ResponseEntity.internalServerError().body(response);
        }
    }

    /**
     * Récupérer le profil de l'utilisateur connecté
     */
    @GetMapping("/profile")
    public ResponseEntity<Map<String, Object>> getUserProfile(@RequestHeader("Authorization") String authHeader) {
        try {
            // Extraire le token JWT
            String token = authHeader.replace("Bearer ", "");
            
            // Récupérer l'email depuis le token
            String email = authenticationService.getEmailFromToken(token);
            
            if (email == null) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "❌ Token invalide");
                response.put("status", "error");
                return ResponseEntity.badRequest().body(response);
            }
            
            // Récupérer le profil complet
            UtilisateurDTO userProfile = authenticationService.getUserProfile(email);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "✅ Profil récupéré avec succès");
                response.put("status", "success");
            response.put("user", userProfile);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            System.err.println("❌ Erreur lors de la récupération du profil: " + e.getMessage());
            Map<String, Object> response = new HashMap<>();
            response.put("message", "❌ Erreur lors de la récupération du profil: " + e.getMessage());
            response.put("status", "error");
            return ResponseEntity.internalServerError().body(response);
        }
    }

    /**
     * Mettre à jour le profil de l'utilisateur connecté
     */
    @PutMapping("/profile")
    public ResponseEntity<Map<String, Object>> updateUserProfile(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody Map<String, Object> profileData) {
        try {
            // Extraire le token JWT
            String token = authHeader.replace("Bearer ", "");
            
            // Récupérer l'email depuis le token
            String email = authenticationService.getEmailFromToken(token);
            
            if (email == null) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "❌ Token invalide");
                response.put("status", "error");
                return ResponseEntity.badRequest().body(response);
            }
            
            // Mettre à jour le profil
            UtilisateurDTO updatedProfile = authenticationService.updateUserProfile(email, profileData);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "✅ Profil mis à jour avec succès");
            response.put("status", "success");
            response.put("user", updatedProfile);
                
                return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            System.err.println("❌ Erreur lors de la mise à jour du profil: " + e.getMessage());
            Map<String, Object> response = new HashMap<>();
            response.put("message", "❌ Erreur lors de la mise à jour du profil: " + e.getMessage());
            response.put("status", "error");
            return ResponseEntity.internalServerError().body(response);
        }
    }

    /**
     * Récupérer les paramètres de l'utilisateur connecté
     */
    @GetMapping("/settings")
    public ResponseEntity<Map<String, Object>> getUserSettings(@RequestHeader("Authorization") String authHeader) {
        try {
            // Extraire le token JWT
            String token = authHeader.replace("Bearer ", "");
            
            // Récupérer l'email depuis le token
            String email = authenticationService.getEmailFromToken(token);
            
            if (email == null) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "❌ Token invalide");
                response.put("status", "error");
                return ResponseEntity.badRequest().body(response);
            }
            
            // Récupérer les paramètres
            Map<String, Object> userSettings = authenticationService.getUserSettings(email);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "✅ Paramètres récupérés avec succès");
            response.put("status", "success");
            response.put("settings", userSettings);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            System.err.println("❌ Erreur lors de la récupération des paramètres: " + e.getMessage());
            Map<String, Object> response = new HashMap<>();
            response.put("message", "❌ Erreur lors de la récupération des paramètres: " + e.getMessage());
            response.put("status", "error");
            return ResponseEntity.internalServerError().body(response);
        }
    }

    /**
     * Mettre à jour les paramètres de l'utilisateur connecté
     */
    @PutMapping("/settings")
    public ResponseEntity<Map<String, Object>> updateUserSettings(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody Map<String, Object> settingsData) {
        try {
            // Extraire le token JWT
            String token = authHeader.replace("Bearer ", "");
            
            // Récupérer l'email depuis le token
            String email = authenticationService.getEmailFromToken(token);
            
            if (email == null) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "❌ Token invalide");
                response.put("status", "error");
                return ResponseEntity.badRequest().body(response);
            }
            
            // Mettre à jour les paramètres
            Map<String, Object> updatedSettings = authenticationService.updateUserSettings(email, settingsData);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "✅ Paramètres mis à jour avec succès");
            response.put("status", "success");
            response.put("settings", updatedSettings);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            System.err.println("❌ Erreur lors de la mise à jour des paramètres: " + e.getMessage());
            Map<String, Object> response = new HashMap<>();
            response.put("message", "❌ Erreur lors de la mise à jour des paramètres: " + e.getMessage());
            response.put("status", "error");
            return ResponseEntity.internalServerError().body(response);
        }
    }


}
