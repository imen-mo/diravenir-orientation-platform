package com.dira.diravenir1.Controller;

import com.dira.diravenir1.payload.LoginRequest;
import com.dira.diravenir1.payload.SignupRequest;
import com.dira.diravenir1.payload.JwtResponse;
import com.dira.diravenir1.security.JwtService;
import com.dira.diravenir1.service.LoginAttemptService;
import com.dira.diravenir1.service.RecaptchaService;
import com.dira.diravenir1.service.UtilisateurService;
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

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final UtilisateurService utilisateurService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final RecaptchaService recaptchaService;
    private final LoginAttemptService loginAttemptService;
    private final AuthenticationManager authenticationManager;

    /**
     * Inscription (signup)
     */
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest request) {
        try {
            utilisateurService.registerUser(request); // à adapter selon ta logique métier
            return ResponseEntity.ok("Utilisateur enregistré avec succès");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erreur d'inscription : " + e.getMessage());
        }
    }

    /**
     * Connexion (signin)
     */
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest request, HttpServletRequest httpRequest) {
        String ip = httpRequest.getRemoteAddr();
        
        // Vérifier si l'IP est bloquée
        if (loginAttemptService.isBlocked(ip)) {
            logger.warn("🚫 TENTATIVE DE CONNEXION BLOQUÉE - IP: {} | Compte bloqué temporairement", ip);
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .body("Trop de tentatives échouées. Compte temporairement bloqué.");
        }
        
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String username = authentication.getName();
            String jwt = jwtService.generateToken(username);

            // Connexion réussie - réinitialiser les tentatives
            loginAttemptService.loginSucceeded(ip);

            return ResponseEntity.ok(new JwtResponse(jwt));

        } catch (AuthenticationException ex) {
            // Connexion échouée - incrémenter les tentatives
            loginAttemptService.loginFailed(ip);
            
            int attempts = loginAttemptService.getAttempts(ip);
            int remainingAttempts = 5 - attempts;
            
            String errorMessage = remainingAttempts > 0 ? 
                String.format("Email ou mot de passe incorrect. Tentatives restantes: %d", remainingAttempts) :
                "Trop de tentatives échouées. Compte temporairement bloqué.";
                
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorMessage);
        }
    }
}
