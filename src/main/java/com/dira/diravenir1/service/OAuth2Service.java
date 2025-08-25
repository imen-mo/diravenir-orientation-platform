package com.dira.diravenir1.service;

import com.dira.diravenir1.dto.AuthenticationResponse;
import com.dira.diravenir1.dto.RegisterRequest;
import com.dira.diravenir1.Entities.Etudiant;
import com.dira.diravenir1.Entities.Role;
import com.dira.diravenir1.Repository.EtudiantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OAuth2Service {

    private final EtudiantRepository etudiantRepository;
    private final AuthenticationService authenticationService;
    private final PasswordEncoder passwordEncoder;

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String googleClientSecret;

    /**
     * Traite l'authentification Google OAuth2
     */
    public Map<String, Object> processGoogleAuthentication(
            String email, String name, String givenName, String familyName, String picture) {
        
        try {
            // Vérifier si l'utilisateur existe déjà
            Optional<Etudiant> existingUser = etudiantRepository.findByEmail(email);
            
            if (existingUser.isPresent()) {
                // Utilisateur existe, le connecter
                return handleExistingUser(existingUser.get());
            } else {
                // Utilisateur n'existe pas, le créer
                return handleNewUser(email, name, givenName, familyName, picture);
            }
            
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Erreur lors du traitement OAuth2: " + e.getMessage());
            return errorResponse;
        }
    }

    /**
     * Gère un utilisateur existant
     */
    private Map<String, Object> handleExistingUser(Etudiant etudiant) {
        try {
            // Créer une réponse d'authentification
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Connexion Google réussie !");
            response.put("user", Map.of(
                "id", etudiant.getId(),
                "email", etudiant.getEmail(),
                "nom", etudiant.getNom(),
                "prenom", etudiant.getPrenom(),
                "role", "ETUDIANT"
            ));
            response.put("isNewUser", false);
            
            return response;
            
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Erreur lors de la connexion: " + e.getMessage());
            return errorResponse;
        }
    }

    /**
     * Gère un nouvel utilisateur
     */
    private Map<String, Object> handleNewUser(String email, String name, String givenName, String familyName, String picture) {
        try {
            // Créer un nouvel étudiant
            Etudiant newEtudiant = new Etudiant();
            newEtudiant.setEmail(email);
            newEtudiant.setNom(familyName != null ? familyName : name);
            newEtudiant.setPrenom(givenName != null ? givenName : name);
            newEtudiant.setTelephone(null); // Pas de téléphone via Google
            newEtudiant.setPassword(passwordEncoder.encode(generateRandomPassword()));
            newEtudiant.setCompteActif(true); // Compte actif immédiatement via Google
            newEtudiant.setRole(Role.ETUDIANT);
            
            // Sauvegarder l'étudiant
            Etudiant savedEtudiant = etudiantRepository.save(newEtudiant);
            
            // Créer une réponse d'authentification
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Compte créé et connexion Google réussie !");
            response.put("user", Map.of(
                "id", savedEtudiant.getId(),
                "email", savedEtudiant.getEmail(),
                "nom", savedEtudiant.getNom(),
                "prenom", savedEtudiant.getPrenom(),
                "role", "ETUDIANT"
            ));
            response.put("isNewUser", true);
            
            return response;
            
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Erreur lors de la création du compte: " + e.getMessage());
            return errorResponse;
        }
    }

    /**
     * Génère un mot de passe aléatoire pour les utilisateurs Google
     */
    private String generateRandomPassword() {
        return UUID.randomUUID().toString().replace("-", "").substring(0, 16);
    }

    /**
     * Génère l'URL de connexion Google
     */
    public String getGoogleLoginUrl() {
        // URL de base pour l'authentification Google
        String baseUrl = "https://accounts.google.com/oauth/authorize";
        String redirectUri = "http://localhost:8084/api/oauth2/google/callback";
        String scope = "openid profile email";
        
        return String.format("%s?client_id=%s&redirect_uri=%s&scope=%s&response_type=code",
            baseUrl, googleClientId, redirectUri, scope);
    }
}
