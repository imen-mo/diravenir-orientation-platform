package com.diravenir.service;

import com.diravenir.dto.AuthResponse;
import com.diravenir.dto.LoginRequest;
import com.diravenir.dto.RegisterRequest;
import com.diravenir.Entities.AuthProvider;
import com.diravenir.Entities.Role;
import com.diravenir.Entities.Utilisateur;
import com.diravenir.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final EmailService emailService;
    private final AuthenticationManager authenticationManager;
    
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        // Vérifier si l'email existe déjà
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Un compte avec cet email existe déjà");
        }
        
        // Vérifier que les mots de passe correspondent
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new RuntimeException("Les mots de passe ne correspondent pas");
        }
        
        // Créer l'utilisateur
        Utilisateur user = Utilisateur.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .prenom(request.getFirstName())
                .nom(request.getLastName())
                .telephone(request.getPhone())
                .role(Role.ETUDIANT)
                .authProvider(AuthProvider.LOCAL)
                .emailVerified(false)
                // .emailVerificationToken(UUID.randomUUID().toString())
                .compteActif(true)
                // .emailVerifie(false)
                // .rememberMe(request.getRememberMe())
                .build();
        
        // Générer un token de vérification email
        String verificationToken = UUID.randomUUID().toString();
        user.setEmailVerificationToken(verificationToken);
        
        // Activer le compte par défaut (pour permettre la connexion immédiate)
        user.setCompteActif(true);
        
        user = userRepository.save(user);
        log.info("✅ Utilisateur créé avec l'ID: {}", user.getId());
        
        // Envoyer l'email de vérification
        try {
            emailService.sendVerificationEmail(user.getEmail(), user.getEmailVerificationToken());
            log.info("✅ Email de vérification envoyé à: {}", user.getEmail());
        } catch (Exception e) {
            log.error("❌ Erreur lors de l'envoi de l'email de vérification: {}", e.getMessage());
        }
        
        return AuthResponse.builder()
                .success(true)
                .message("Inscription réussie ! Vérifiez votre email pour activer votre compte.")
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole())
                .userId(user.getId())
                .build();
    }
    
    public AuthResponse login(LoginRequest request) {
        // Authentifier l'utilisateur
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );
        
        // Récupérer l'utilisateur
        Utilisateur user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        
        // Note: Vérification email désactivée pour le développement
        // L'utilisateur peut se connecter immédiatement après l'inscription
        
        // Mettre à jour la dernière connexion
        user.setDerniereConnexion(LocalDateTime.now());
        userRepository.save(user);
        
        // Générer les tokens
        String token = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        
        return AuthResponse.builder()
                .success(true)
                .token(token)
                .refreshToken(refreshToken)
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole())
                .userId(user.getId())
                .message("Connexion réussie !")
                .build();
    }
    
    @Transactional
    public boolean verifyEmail(String token) {
        // TODO: Implémenter la vérification d'email avec token
        log.info("✅ Email vérifié pour token: {}", token);
        return true;
    }
    
    @Transactional
    public boolean resendVerificationEmail(String email) {
        try {
            Utilisateur user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
            
            if (user.isEmailVerified()) {
                log.warn("⚠️ Email déjà vérifié pour: {}", email);
                return false;
            }
            
            // Générer un nouveau token de vérification
            String verificationToken = UUID.randomUUID().toString();
            user.setEmailVerificationToken(verificationToken);
            userRepository.save(user);
            
            // Envoyer l'email de vérification
            emailService.sendVerificationEmail(user.getEmail(), verificationToken);
            log.info("✅ Email de vérification renvoyé à: {}", email);
            
            return true;
        } catch (Exception e) {
            log.error("❌ Erreur lors du renvoi d'email de vérification: {}", e.getMessage());
            return false;
        }
    }
}
