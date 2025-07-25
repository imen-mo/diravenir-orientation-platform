package com.dira.diravenir1.Controller;

import com.dira.diravenir1.payload.SignupRequest;
import com.dira.diravenir1.security.JwtService;
import com.dira.diravenir1.service.LoginAttemptService;
import com.dira.diravenir1.service.RecaptchaService;
import com.dira.diravenir1.service.UtilisateurService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UtilisateurService utilisateurService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final RecaptchaService recaptchaService;
    private final LoginAttemptService loginAttemptService;  // <-- service pour gérer les tentatives

    /**
     * ✅ Route d'inscription AVEC vérification reCAPTCHA + blocage IP
     */
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody @Valid SignupRequest request,
                                          @RequestParam String recaptchaToken,
                                          HttpServletRequest httpRequest) {

        String ip = httpRequest.getRemoteAddr();
        if (loginAttemptService.isBlocked(ip)) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body("Trop de tentatives !");
        }

        if (!recaptchaService.verify(recaptchaToken)) {
            return ResponseEntity.badRequest().body("Captcha invalide");
        }

        if (utilisateurService.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        request.setMotDePasse(passwordEncoder.encode(request.getMotDePasse()));
        utilisateurService.createUser(request);

        return ResponseEntity.ok("User registered successfully!");
    }

    /**
     * ✅ Route d'inscription SANS reCAPTCHA (nouveau endpoint)
     */
    @PostMapping("/signup-simple")
    public ResponseEntity<?> register(@RequestBody @Valid SignupRequest request) {
        if (utilisateurService.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        request.setMotDePasse(passwordEncoder.encode(request.getMotDePasse()));
        utilisateurService.createUser(request);

        return ResponseEntity.ok("User registered successfully (without reCAPTCHA)!");
    }

    /**
     * ✅ Rafraîchir le token JWT
     */
    @PostMapping("/refresh")
    public ResponseEntity<Map<String, String>> refreshToken(HttpServletRequest request) {
        final String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        final String token = authHeader.substring(7);
        final String username = jwtService.extractUsername(token);

        if (jwtService.isTokenValid(token, username)) {
            String newToken = jwtService.generateToken(username);
            return ResponseEntity.ok(Map.of("accessToken", newToken));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
