package com.dira.diravenir1.Controller;

import com.dira.diravenir1.payload.LoginRequest;
import com.dira.diravenir1.payload.SignupRequest;
import com.dira.diravenir1.payload.JwtResponse;
import com.dira.diravenir1.service.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final UtilisateurService utilisateurService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final LoginAttemptService loginAttemptService;
    private final RateLimitService rateLimitService;
    private final AuthenticationManager authenticationManager;
    private final EmailVerificationService emailVerificationService;
    private final UserStatusService userStatusService;

    /**
     * Inscription (signup) avec sécurité renforcée
     */
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest request, HttpServletRequest httpRequest) {
        String ip = getClientIpAddress(httpRequest);
        
        logger.info("🔍 TENTATIVE D'INSCRIPTION - IP: {} | Email: {}", ip, request.getEmail());
        
        // Vérification du rate limiting pour l'inscription
        if (rateLimitService.isSignupRateLimited(ip)) {
            logger.warn("🚫 INSCRIPTION BLOQUÉE - IP: {} | Rate limit dépassé", ip);
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .body(Map.of("error", "Trop de tentatives d'inscription. Veuillez réessayer plus tard."));
        }
        
        try {
            logger.info("🔍 VÉRIFICATION DES DONNÉES - IP: {} | Validation en cours", ip);
            
            // Validation des données
            request.normalizeData();
            
            if (!request.isPasswordConfirmed()) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Les mots de passe ne correspondent pas"));
            }
            
            if (!request.isStrongPassword()) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Le mot de passe ne respecte pas les critères de sécurité"));
            }
            
            // Vérification si l'email existe déjà
            if (utilisateurService.existsByEmail(request.getEmail())) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Un compte avec cet email existe déjà"));
            }
            
            // Inscription de l'utilisateur
            logger.info("🔄 Tentative d'inscription de l'utilisateur...");
            try {
                utilisateurService.registerUser(request);
                logger.info("✅ Utilisateur inscrit avec succès dans la base de données");
            } catch (Exception userError) {
                logger.error("❌ ERREUR LORS DE L'INSCRIPTION UTILISATEUR: {}", userError.getMessage(), userError);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Map.of("error", "Erreur lors de l'inscription: " + userError.getMessage()));
            }
            
            // Envoyer l'email de vérification de manière asynchrone pour ne pas bloquer la réponse
            try {
                emailVerificationService.sendVerificationEmail(request.getEmail());
                logger.info("✅ Email de vérification envoyé avec succès à : {}", request.getEmail());
            } catch (Exception emailError) {
                // Log l'erreur d'email mais ne pas faire échouer l'inscription
                logger.warn("⚠️ Échec de l'envoi de l'email de vérification à {} : {}", 
                           request.getEmail(), emailError.getMessage());
                // L'utilisateur peut toujours se connecter et demander un nouvel email de vérification
            }
            
            logger.info("✅ INSCRIPTION RÉUSSIE - Email: {} | IP: {}", request.getEmail(), ip);
            
            return ResponseEntity.ok(Map.of(
                "message", "Compte créé avec succès. Veuillez vérifier votre email pour activer votre compte.",
                "email", request.getEmail(),
                "status", "success"
            ));
            
        } catch (SecurityException e) {
            logger.warn("🚫 INSCRIPTION ÉCHOUÉE - IP: {} | Raison: {}", ip, e.getMessage());
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            logger.error("❌ ERREUR INTERNE - IP: {} | Erreur: {}", ip, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Erreur interne du serveur. Veuillez réessayer plus tard."));
        }
    }

    /**
     * Connexion (signin) avec sécurité renforcée
     */
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest request, HttpServletRequest httpRequest) {
        String ip = getClientIpAddress(httpRequest);
        
        // Vérification du rate limiting
        if (rateLimitService.isRateLimited(ip, "/api/auth/signin")) {
            logger.warn("🚫 CONNEXION BLOQUÉE - IP: {} | Rate limit dépassé", ip);
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .body(Map.of("error", "Trop de tentatives de connexion. Veuillez réessayer plus tard."));
        }
        
        // Vérifier si l'IP est bloquée
        if (loginAttemptService.isBlocked(ip)) {
            logger.warn("🚫 TENTATIVE DE CONNEXION BLOQUÉE - IP: {} | Compte bloqué temporairement", ip);
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .body(Map.of("error", "Trop de tentatives échouées. Compte temporairement bloqué."));
        }
        
        try {
            // Normalisation de l'email
            String normalizedEmail = request.getEmail() != null ? request.getEmail().trim().toLowerCase() : null;
            
            // Authentification
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(normalizedEmail, request.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String username = authentication.getName();
            String jwt = jwtService.generateToken(username);

            // Marquer l'utilisateur comme online
            userStatusService.markUserAsOnline(username);

            // Connexion réussie - réinitialiser les tentatives
            loginAttemptService.loginSucceeded(ip);

            logger.info("✅ CONNEXION RÉUSSIE - Email: {} | IP: {}", username, ip);

            return ResponseEntity.ok(new JwtResponse(jwt, jwtService.getExpiration()));

        } catch (AuthenticationException ex) {
            // Connexion échouée - incrémenter les tentatives
            loginAttemptService.loginFailed(ip);
            
            int attempts = loginAttemptService.getAttempts(ip);
            int remainingAttempts = 5 - attempts;
            
            String errorMessage = remainingAttempts > 0 ? 
                String.format("Email ou mot de passe incorrect. Tentatives restantes: %d", remainingAttempts) :
                "Trop de tentatives échouées. Compte temporairement bloqué.";
                
            logger.warn("🔴 CONNEXION ÉCHOUÉE - IP: {} | Tentatives: {}/5", ip, attempts);
            
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", errorMessage));
        }
    }



    /**
     * Déconnexion (logout)
     */
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest httpRequest) {
        String ip = getClientIpAddress(httpRequest);
        
        try {
            // Extraire le token JWT de l'en-tête Authorization
            String authHeader = httpRequest.getHeader("Authorization");
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                
                try {
                    String username = jwtService.extractUsername(token);
                    
                    // Marquer l'utilisateur comme offline
                    userStatusService.markUserAsOffline(username);
                    
                    // Vérifier que le token est valide avant de le blacklister
                    if (jwtService.isTokenValid(token, username)) {
                        // Ajouter le token à la liste noire
                        jwtService.blacklistToken(token);
                        logger.info("✅ Token JWT ajouté à la liste noire - IP: {}", ip);
                    } else {
                        logger.warn("⚠️ Token JWT invalide lors du logout - IP: {}", ip);
                    }
                } catch (Exception tokenError) {
                    logger.warn("⚠️ Erreur lors du traitement du token JWT - IP: {} | Erreur: {}", ip, tokenError.getMessage());
                }
            } else {
                logger.info("ℹ️ Aucun token JWT trouvé dans l'en-tête Authorization - IP: {}", ip);
            }
            
            // Nettoyer le contexte de sécurité
            SecurityContextHolder.clearContext();
            
            logger.info("✅ DÉCONNEXION RÉUSSIE - IP: {}", ip);
            
            return ResponseEntity.ok(Map.of(
                "message", "Déconnexion réussie",
                "timestamp", System.currentTimeMillis()
            ));
            
        } catch (Exception e) {
            logger.error("❌ ERREUR LORS DE LA DÉCONNEXION - IP: {} | Erreur: {}", ip, e.getMessage(), e);
            
            // Même en cas d'erreur, on nettoie le contexte de sécurité
            SecurityContextHolder.clearContext();
            
            return ResponseEntity.ok(Map.of(
                "message", "Déconnexion effectuée",
                "warning", "Erreur lors du traitement du token",
                "timestamp", System.currentTimeMillis()
            ));
        }
    }

    /**
     * Déconnexion de tous les appareils (logout all devices)
     */
    @PostMapping("/logout-all")
    public ResponseEntity<?> logoutAllDevices(HttpServletRequest httpRequest) {
        String ip = getClientIpAddress(httpRequest);
        
        try {
            // Extraire le token JWT de l'en-tête Authorization
            String authHeader = httpRequest.getHeader("Authorization");
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                
                try {
                    String username = jwtService.extractUsername(token);
                    
                    // Vérifier que le token est valide avant de le blacklister
                    if (jwtService.isTokenValid(token, username)) {
                        // Ajouter le token actuel à la liste noire
                        jwtService.blacklistToken(token);
                        
                        // Ici vous pourriez ajouter une logique pour invalider tous les tokens de l'utilisateur
                        // Par exemple, en ajoutant un timestamp de déconnexion globale dans la base de données
                        // ou en utilisant un service de gestion des sessions
                        
                        logger.info("✅ DÉCONNEXION GLOBALE - Utilisateur: {} | IP: {}", username, ip);
                    } else {
                        logger.warn("⚠️ Token JWT invalide lors du logout global - IP: {}", ip);
                    }
                } catch (Exception tokenError) {
                    logger.warn("⚠️ Erreur lors du traitement du token JWT pour logout global - IP: {} | Erreur: {}", ip, tokenError.getMessage());
                }
            } else {
                logger.info("ℹ️ Aucun token JWT trouvé dans l'en-tête Authorization pour logout global - IP: {}", ip);
            }
            
            // Nettoyer le contexte de sécurité
            SecurityContextHolder.clearContext();
            
            return ResponseEntity.ok(Map.of(
                "message", "Déconnexion de tous les appareils réussie",
                "timestamp", System.currentTimeMillis()
            ));
            
        } catch (Exception e) {
            logger.error("❌ ERREUR LORS DE LA DÉCONNEXION GLOBALE - IP: {} | Erreur: {}", ip, e.getMessage(), e);
            
            // Même en cas d'erreur, on nettoie le contexte de sécurité
            SecurityContextHolder.clearContext();
            
            return ResponseEntity.ok(Map.of(
                "message", "Déconnexion globale effectuée",
                "warning", "Erreur lors du traitement",
                "timestamp", System.currentTimeMillis()
            ));
        }
    }

    /**
     * Vérification de la validité du token
     */
    @GetMapping("/verify")
    public ResponseEntity<?> verifyToken(HttpServletRequest httpRequest) {
        String ip = getClientIpAddress(httpRequest);
        
        try {
            String authHeader = httpRequest.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Token manquant ou invalide"));
            }
            
            String token = authHeader.substring(7);
            String username = jwtService.extractUsername(token);
            
            if (jwtService.isTokenExpired(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Token expiré"));
            }
            
            return ResponseEntity.ok(Map.of(
                "valid", true,
                "username", username
            ));
            
        } catch (Exception e) {
            logger.warn("🚫 VÉRIFICATION TOKEN ÉCHOUÉE - IP: {} | Erreur: {}", ip, e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Token invalide"));
        }
    }

    /**
     * Vérification de l'email
     */
    @GetMapping("/verify-email")
    public ResponseEntity<?> verifyEmail(@RequestParam String token, HttpServletRequest httpRequest) {
        String ip = getClientIpAddress(httpRequest);
        
        try {
            boolean isValid = emailVerificationService.verifyEmailToken(token);
            
            if (isValid) {
                logger.info("✅ VÉRIFICATION EMAIL RÉUSSIE - IP: {}", ip);
                return ResponseEntity.ok(Map.of(
                    "message", "Email vérifié avec succès. Votre compte est maintenant actif."
                ));
            } else {
                logger.warn("🚫 VÉRIFICATION EMAIL ÉCHOUÉE - IP: {} | Token invalide", ip);
                return ResponseEntity.badRequest().body(Map.of(
                    "error", "Token de vérification invalide ou expiré"
                ));
            }
        } catch (Exception e) {
            logger.error("❌ ERREUR VÉRIFICATION EMAIL - IP: {} | Erreur: {}", ip, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Erreur lors de la vérification"));
        }
    }

    /**
     * Demande d'un nouvel email de vérification
     */
    @PostMapping("/resend-verification")
    public ResponseEntity<?> resendVerificationEmail(@RequestBody Map<String, String> request, HttpServletRequest httpRequest) {
        String ip = getClientIpAddress(httpRequest);
        String email = request.get("email");
        
        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email requis"));
        }
        
        try {
            logger.info("📧 DEMANDE RENVOI EMAIL VÉRIFICATION - Email: {} | IP: {}", email, ip);
            
            // Vérifier si l'utilisateur existe
            if (!utilisateurService.existsByEmail(email)) {
                return ResponseEntity.badRequest().body(Map.of(
                    "error", "Aucun compte trouvé avec cet email"
                ));
            }
            
            // Envoyer un nouvel email de vérification
            emailVerificationService.sendVerificationEmail(email);
            
            logger.info("✅ NOUVEL EMAIL VÉRIFICATION ENVOYÉ - Email: {} | IP: {}", email, ip);
            
            return ResponseEntity.ok(Map.of(
                "message", "Nouvel email de vérification envoyé avec succès"
            ));
            
        } catch (Exception e) {
            logger.error("❌ ERREUR RENVOI EMAIL VÉRIFICATION - IP: {} | Erreur: {}", ip, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Erreur lors de l'envoi de l'email"));
        }
    }

    /**
     * Demande de réinitialisation de mot de passe
     */
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request, HttpServletRequest httpRequest) {
        String ip = getClientIpAddress(httpRequest);
        String email = request.get("email");
        
        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email requis"));
        }
        
        try {
            // Vérifier si l'utilisateur existe
            if (!utilisateurService.existsByEmail(email)) {
                // Ne pas révéler si l'email existe ou non
                logger.info("📧 DEMANDE RÉINITIALISATION - Email: {} | IP: {}", email, ip);
                return ResponseEntity.ok(Map.of(
                    "message", "Si l'email existe, un lien de réinitialisation a été envoyé"
                ));
            }
            
            // Envoyer l'email de réinitialisation
            emailVerificationService.sendPasswordResetEmail(email);
            
            logger.info("📧 EMAIL RÉINITIALISATION ENVOYÉ - Email: {} | IP: {}", email, ip);
            
            return ResponseEntity.ok(Map.of(
                "message", "Si l'email existe, un lien de réinitialisation a été envoyé"
            ));
            
        } catch (Exception e) {
            logger.error("❌ ERREUR RÉINITIALISATION - IP: {} | Erreur: {}", ip, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Erreur lors de l'envoi de l'email"));
        }
    }

    /**
     * Réinitialisation de mot de passe
     */
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request, HttpServletRequest httpRequest) {
        String ip = getClientIpAddress(httpRequest);
        String token = request.get("token");
        String newPassword = request.get("newPassword");
        
        if (token == null || newPassword == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Token et nouveau mot de passe requis"));
        }
        
        try {
            String email = emailVerificationService.getEmailFromResetToken(token);
            
            if (email == null) {
                logger.warn("🚫 RÉINITIALISATION ÉCHOUÉE - IP: {} | Token invalide", ip);
                return ResponseEntity.badRequest().body(Map.of(
                    "error", "Token de réinitialisation invalide ou expiré"
                ));
            }
            
            // TODO: Implémenter la mise à jour du mot de passe dans UtilisateurService
            // utilisateurService.updatePassword(email, newPassword);
            
            // Invalider le token
            emailVerificationService.invalidateResetToken(token);
            
            logger.info("✅ MOT DE PASSE RÉINITIALISÉ - Email: {} | IP: {}", email, ip);
            
            return ResponseEntity.ok(Map.of(
                "message", "Mot de passe réinitialisé avec succès"
            ));
            
        } catch (Exception e) {
            logger.error("❌ ERREUR RÉINITIALISATION - IP: {} | Erreur: {}", ip, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Erreur lors de la réinitialisation"));
        }
    }

    /**
     * Test de configuration email (pour diagnostic)
     */
    @PostMapping("/test-email")
    public ResponseEntity<?> testEmailConfiguration(HttpServletRequest httpRequest) {
        String ip = getClientIpAddress(httpRequest);
        
        logger.info("🧪 TEST DE CONFIGURATION EMAIL - IP: {}", ip);
        
        try {
            // Test simple de la configuration email
            emailVerificationService.sendVerificationEmail("test@example.com");
            
            logger.info("✅ Test de configuration email réussi");
            return ResponseEntity.ok(Map.of(
                "message", "Configuration email testée avec succès",
                "status", "OK",
                "timestamp", System.currentTimeMillis()
            ));
            
        } catch (Exception e) {
            logger.error("❌ ÉCHEC DU TEST DE CONFIGURATION EMAIL - IP: {} | Erreur: {}", ip, e.getMessage(), e);
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                        "error", "Échec du test de configuration email",
                        "details", e.getMessage(),
                        "timestamp", System.currentTimeMillis()
                    ));
        }
    }

    /**
     * Vérifier le statut de l'utilisateur connecté
     */
    @GetMapping("/status")
    public ResponseEntity<?> getUserStatus(HttpServletRequest httpRequest) {
        try {
            String authHeader = httpRequest.getHeader("Authorization");
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                String username = jwtService.extractUsername(token);
                
                if (jwtService.isTokenValid(token, username)) {
                    boolean isOnline = userStatusService.isUserOnline(username);
                    return ResponseEntity.ok(Map.of(
                        "email", username,
                        "online", isOnline,
                        "timestamp", System.currentTimeMillis()
                    ));
                }
            }
            
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Token invalide ou expiré"));
                    
        } catch (Exception e) {
            logger.error("❌ ERREUR LORS DE LA VÉRIFICATION DU STATUT - Erreur: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Erreur lors de la vérification du statut"));
        }
    }

    /**
     * Mettre à jour l'activité de l'utilisateur (heartbeat)
     */
    @PostMapping("/heartbeat")
    public ResponseEntity<?> updateUserActivity(HttpServletRequest httpRequest) {
        try {
            String authHeader = httpRequest.getHeader("Authorization");
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                String username = jwtService.extractUsername(token);
                
                if (jwtService.isTokenValid(token, username)) {
                    userStatusService.updateUserActivity(username);
                    return ResponseEntity.ok(Map.of(
                        "message", "Activité mise à jour",
                        "timestamp", System.currentTimeMillis()
                    ));
                }
            }
            
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Token invalide ou expiré"));
                    
        } catch (Exception e) {
            logger.error("❌ ERREUR LORS DE LA MISE À JOUR DE L'ACTIVITÉ - Erreur: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Erreur lors de la mise à jour de l'activité"));
        }
    }

    /**
     * Obtention de l'adresse IP réelle du client
     */
    private String getClientIpAddress(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty() && !"unknown".equalsIgnoreCase(xForwardedFor)) {
            return xForwardedFor.split(",")[0].trim();
        }
        
        String xRealIp = request.getHeader("X-Real-IP");
        if (xRealIp != null && !xRealIp.isEmpty() && !"unknown".equalsIgnoreCase(xRealIp)) {
            return xRealIp;
        }
        
        return request.getRemoteAddr();
    }
}
