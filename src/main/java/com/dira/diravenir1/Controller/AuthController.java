package com.dira.diravenir1.Controller;
import org.springframework.security.core.AuthenticationException;

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
    private final RecaptchaService recaptchaService;
    private final LoginAttemptService loginAttemptService;
    private final AuthenticationManager authenticationManager;

    // ... tes méthodes signup et refreshToken inchangées

    /**
     * Connexion (signin) avec journalisation IP en cas d’échec
     */
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest request, HttpServletRequest httpRequest) {
        String ip = httpRequest.getRemoteAddr();
        try {
            // 1. Authentifier
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            // 2. Ajouter au contexte de sécurité
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // 3. Extraire le username et générer le token JWT
            String username = authentication.getName();
            String jwt = jwtService.generateToken(username);

            // 4. Retourner le token
            return ResponseEntity.ok(new JwtResponse(jwt));

        } catch (AuthenticationException ex) {
            // Log de l'IP en cas de tentative de connexion échouée
            logger.warn("Tentative de connexion échouée depuis IP: " + ip);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email ou mot de passe incorrect");
        }
    }
}
