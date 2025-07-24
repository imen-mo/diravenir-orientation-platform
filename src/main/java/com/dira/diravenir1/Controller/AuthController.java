package com.dira.diravenir1.Controller;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.http.ResponseEntity;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import com.dira.diravenir1.service.UtilisateurService;       // <-- import pour UtilisateurService
import org.springframework.security.crypto.password.PasswordEncoder; // <-- import PasswordEncoder
import com.dira.diravenir1.payload.SignupRequest;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UtilisateurService utilisateurService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody @Valid SignupRequest request) {
        if (utilisateurService.existsByEmail(request.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Email is already in use!");
        }

        // Encode le mot de passe avant d’enregistrer
        request.setMotDePasse(passwordEncoder.encode(request.getMotDePasse()));

        utilisateurService.createUser(request);

        return ResponseEntity.ok("User registered successfully!");
}
}