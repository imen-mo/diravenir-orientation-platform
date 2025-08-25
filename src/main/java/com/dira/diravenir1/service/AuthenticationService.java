package com.dira.diravenir1.service;

import com.dira.diravenir1.Entities.Role;
import com.dira.diravenir1.Entities.Utilisateur;
import com.dira.diravenir1.Entities.Etudiant;
import com.dira.diravenir1.Repository.UtilisateurRepository;
import com.dira.diravenir1.dto.AuthenticationRequest;
import com.dira.diravenir1.dto.AuthenticationResponse;
import com.dira.diravenir1.dto.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.HashMap;
import com.dira.diravenir1.dto.UtilisateurDTO;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final EmailVerificationService emailVerificationService;
    private final PasswordResetService passwordResetService;

    public AuthenticationResponse register(RegisterRequest request) {
        try {
            System.out.println("🚀 Début de l'inscription pour: " + request.getEmail());
            
            // Validation des données
            if (request.getNom() == null || request.getNom().trim().isEmpty()) {
                throw new RuntimeException("❌ Le nom est requis");
            }
            if (request.getPrenom() == null || request.getPrenom().trim().isEmpty()) {
                throw new RuntimeException("❌ Le prénom est requis");
            }
            if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
                throw new RuntimeException("❌ L'email est requis");
            }
            if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
                throw new RuntimeException("❌ Le mot de passe est requis");
            }

            // Validation email basique (juste @ et .)
            if (!request.getEmail().contains("@") || !request.getEmail().contains(".")) {
                throw new RuntimeException("❌ Format d'email invalide");
            }

            // Vérifier si l'email existe déjà
            if (utilisateurRepository.findByEmail(request.getEmail()).isPresent()) {
                throw new RuntimeException("❌ Un utilisateur avec cet email existe déjà");
            }

            System.out.println("✅ Validation des données réussie");

            // Créer le nouvel utilisateur
            Utilisateur utilisateur = Utilisateur.builder()
                    .nom(request.getNom().trim())
                    .prenom(request.getPrenom().trim())
                    .email(request.getEmail().trim().toLowerCase())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .telephone(request.getTelephone() != null ? request.getTelephone().trim() : null)
                    .role(Role.ETUDIANT) // Par défaut, les nouveaux utilisateurs sont des étudiants
                    .compteActif(false) // Compte inactif jusqu'à vérification email
                    .dateCreation(LocalDateTime.now())
                    .build();

            System.out.println("✅ Utilisateur construit: " + utilisateur.getEmail());

            // Sauvegarder l'utilisateur
            Utilisateur savedUtilisateur = utilisateurRepository.save(utilisateur);
            System.out.println("✅ Utilisateur sauvegardé en base avec ID: " + savedUtilisateur.getId());

            // Générer et envoyer l'email de vérification
            boolean emailSent = emailVerificationService.generateAndSendVerificationEmail(savedUtilisateur);

            if (!emailSent) {
                System.err.println("❌ Échec de l'envoi de l'email de vérification");
                throw new RuntimeException("❌ Échec de l'envoi de l'email de vérification");
            }

            // Générer le token JWT (compte inactif mais token généré pour la sécurité)
            String token = jwtService.generateTokenForUser(savedUtilisateur.getEmail(), savedUtilisateur.getRole().toString());
            System.out.println("✅ Token JWT généré");

            System.out.println("✅ Utilisateur enregistré avec succès: " + savedUtilisateur.getEmail());
            System.out.println("📧 Email de vérification envoyé: " + emailSent);

            return AuthenticationResponse.builder()
                    .token(token)
                    .userEmail(savedUtilisateur.getEmail())
                    .userName(savedUtilisateur.getNom() + " " + savedUtilisateur.getPrenom())
                    .role(savedUtilisateur.getRole().toString())
                    .build();

        } catch (Exception e) {
            System.err.println("❌ Erreur lors de l'enregistrement: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    /**
     * Nouvelle méthode pour l'inscription qui envoie seulement un email de vérification
     */
    public boolean registerAndSendVerificationEmail(RegisterRequest request) {
        try {
            System.out.println("🚀 Début de l'inscription (sans JWT) pour: " + request.getEmail());
            
            // Validation des données
            if (request.getNom() == null || request.getNom().trim().isEmpty()) {
                throw new RuntimeException("❌ Le nom est requis");
            }
            if (request.getPrenom() == null || request.getPrenom().trim().isEmpty()) {
                throw new RuntimeException("❌ Le prénom est requis");
            }
            if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
                throw new RuntimeException("❌ L'email est requis");
            }
            if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
                throw new RuntimeException("❌ Le mot de passe est requis");
            }

            // Vérifier si l'email existe déjà
            if (utilisateurRepository.findByEmail(request.getEmail()).isPresent()) {
                throw new RuntimeException("❌ Un utilisateur avec cet email existe déjà");
            }

            System.out.println("✅ Validation des données réussie");

            // Créer le nouvel utilisateur
            Utilisateur utilisateur = Utilisateur.builder()
                    .nom(request.getNom().trim())
                    .prenom(request.getPrenom().trim())
                    .email(request.getEmail().trim().toLowerCase())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .telephone(request.getTelephone() != null ? request.getTelephone().trim() : null)
                    .role(Role.ETUDIANT)
                    .compteActif(false) // Compte inactif jusqu'à vérification email
                    .dateCreation(LocalDateTime.now())
                    .build();

            System.out.println("✅ Utilisateur construit: " + utilisateur.getEmail());

            // Sauvegarder l'utilisateur
            Utilisateur savedUtilisateur = utilisateurRepository.save(utilisateur);
            System.out.println("✅ Utilisateur sauvegardé en base avec ID: " + savedUtilisateur.getId());

            // Générer et envoyer l'email de vérification
            boolean emailSent = emailVerificationService.generateAndSendVerificationEmail(savedUtilisateur);

            if (!emailSent) {
                System.err.println("❌ Échec de l'envoi de l'email de vérification");
                return false;
            }

            System.out.println("✅ Utilisateur enregistré avec succès: " + savedUtilisateur.getEmail());
            System.out.println("📧 Email de vérification envoyé: " + emailSent);

            return true;

        } catch (Exception e) {
            System.err.println("❌ Erreur lors de l'enregistrement: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        try {
            // Authentifier l'utilisateur
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            // Récupérer l'utilisateur
            Utilisateur utilisateur = utilisateurRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("❌ Utilisateur non trouvé"));

            // Vérifier si le compte est actif
            if (!utilisateur.isCompteActif()) {
                throw new RuntimeException("❌ Compte non vérifié. Veuillez vérifier votre email.");
            }

            // Mettre à jour la dernière connexion
            utilisateur.setDerniereConnexion(LocalDateTime.now());
            utilisateurRepository.save(utilisateur);

            // Générer le token JWT
            String token = jwtService.generateTokenForUser(utilisateur.getEmail(), utilisateur.getRole().toString());

            System.out.println("✅ Connexion réussie pour: " + utilisateur.getEmail());

            return AuthenticationResponse.builder()
                    .token(token)
                    .userEmail(utilisateur.getEmail())
                    .userName(utilisateur.getNom() + " " + utilisateur.getPrenom())
                    .role(utilisateur.getRole().toString())
                    .build();

        } catch (Exception e) {
            System.err.println("❌ Erreur lors de l'authentification: " + e.getMessage());
            throw e;
        }
    }

    /**
     * Vérifie un email avec un token
     */
    public boolean verifyEmail(String token) {
        return emailVerificationService.verifyEmail(token);
    }

    /**
     * Renvoie un email de vérification
     */
    public boolean resendVerificationEmail(String email) {
        return emailVerificationService.resendVerificationEmail(email);
    }

    /**
     * Oublie le mot de passe
     */
    public boolean forgotPassword(String email) {
        return passwordResetService.generateAndSendResetEmail(email);
    }

    /**
     * Réinitialise le mot de passe
     */
    public boolean resetPassword(String token, String newPassword) {
        return passwordResetService.resetPassword(token, newPassword);
    }

    /**
     * Valide un token de réinitialisation
     */
    public boolean validateResetToken(String token) {
        return passwordResetService.validateResetToken(token);
    }
    
    /**
     * Vérifie si un utilisateur existe
     */
    public boolean userExists(String email) {
        return utilisateurRepository.findByEmail(email).isPresent();
    }
    
    /**
     * Crée un administrateur
     */
    public boolean createAdmin(String email, String password, String nom, String prenom) {
        try {
            // Vérifier si l'admin existe déjà
            if (utilisateurRepository.findByEmail(email).isPresent()) {
                System.out.println("⚠️ L'administrateur existe déjà: " + email);
                return false;
            }
            
            // Créer l'admin avec compte actif
            Utilisateur admin = Utilisateur.builder()
                    .nom(nom)
                    .prenom(prenom)
                    .email(email.toLowerCase())
                    .password(passwordEncoder.encode(password))
                    .role(Role.ADMIN)
                    .compteActif(true) // Admin actif immédiatement
                    .dateCreation(LocalDateTime.now())
                    .build();
            
            // Sauvegarder l'admin
            Utilisateur savedAdmin = utilisateurRepository.save(admin);
            System.out.println("✅ Administrateur créé avec succès: " + savedAdmin.getEmail());
            
            return true;
        } catch (Exception e) {
            System.err.println("❌ Erreur lors de la création de l'admin: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }
    
    /**
     * Récupère les détails d'un administrateur
     */
    public Map<String, Object> getAdminDetails(String email) {
        try {
            Utilisateur admin = utilisateurRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Administrateur non trouvé"));
            
            Map<String, Object> details = new HashMap<>();
            details.put("id", admin.getId());
            details.put("email", admin.getEmail());
            details.put("nom", admin.getNom());
            details.put("prenom", admin.getPrenom());
            details.put("role", admin.getRole().toString());
            details.put("compteActif", admin.isCompteActif());
            details.put("dateCreation", admin.getDateCreation());
            
            // Afficher le hash du mot de passe pour debug
            details.put("passwordHash", admin.getPassword());
            details.put("passwordLength", admin.getPassword().length());
            
            return details;
        } catch (Exception e) {
            System.err.println("❌ Erreur lors de la récupération des détails admin: " + e.getMessage());
            throw e;
        }
    }
    
    /**
     * Génère un JWT pour un utilisateur OAuth2
     */
    public String generateJwtForUser(String email) {
        try {
            Utilisateur utilisateur = utilisateurRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
            
            return jwtService.generateTokenForUser(utilisateur.getEmail(), utilisateur.getRole().toString());
        } catch (Exception e) {
            System.err.println("❌ Erreur lors de la génération du JWT pour OAuth2: " + e.getMessage());
            throw e;
        }
    }
    
        /**
     * Crée un nouvel utilisateur OAuth2 avec les données Google
     */
    public UtilisateurDTO createOAuth2UserWithGoogleData(String email, String givenName, String familyName, String fullName) {
        try {
            System.out.println("🆕 Création d'un nouvel utilisateur OAuth2 avec données Google: " + email);
            System.out.println("📝 Prénom Google: " + givenName);
            System.out.println("👤 Nom de famille Google: " + familyName);
            System.out.println("👤 Nom complet Google: " + fullName);

            // Logique intelligente pour le nom et prénom
            String prenom = givenName != null ? givenName : "";
            String nom = "";
            
            if (familyName != null && !familyName.isEmpty()) {
                // Si on a un nom de famille, l'utiliser
                nom = familyName;
            } else if (fullName != null && !fullName.isEmpty()) {
                // Sinon, essayer d'extraire le nom de famille du nom complet
                String[] nameParts = fullName.split("\\s+");
                if (nameParts.length > 1) {
                    prenom = nameParts[0];
                    nom = nameParts[nameParts.length - 1];
                } else {
                    prenom = fullName;
                }
            }

            System.out.println("🎯 Nom final: " + nom);
            System.out.println("🎯 Prénom final: " + prenom);

            // Créer un nouvel utilisateur OAuth2 avec les données Google
            Utilisateur oauth2User = Utilisateur.builder()
                    .email(email.toLowerCase())
                    .nom(nom)
                    .prenom(prenom)
                    .password("") // Pas de mot de passe pour OAuth2
                    .role(Role.ETUDIANT)
                    .compteActif(true) // Compte actif directement pour OAuth2
                    .dateCreation(LocalDateTime.now())
                    .languePreferee("fr") // Par défaut
                    .build();
            
            // Sauvegarder l'utilisateur
            Utilisateur savedUser = utilisateurRepository.save(oauth2User);
            System.out.println("✅ Utilisateur OAuth2 créé avec succès: " + savedUser.getEmail());
            System.out.println("👤 Nom: " + savedUser.getNom());
            System.out.println("📝 Prénom: " + savedUser.getPrenom());
            
            return mapToDTO(savedUser);
            
        } catch (Exception e) {
            System.err.println("❌ Erreur lors de la création de l'utilisateur OAuth2: " + e.getMessage());
            throw e;
        }
    }

    /**
     * Récupère un utilisateur par email
     */
    public UtilisateurDTO findByEmail(String email) {
        try {
            Utilisateur utilisateur = utilisateurRepository.findByEmail(email)
                    .orElse(null);
            
            if (utilisateur != null) {
                UtilisateurDTO dto = new UtilisateurDTO();
                dto.setId(utilisateur.getId());
                dto.setNom(utilisateur.getNom());
                dto.setPrenom(utilisateur.getPrenom());
                dto.setEmail(utilisateur.getEmail());
                dto.setMotDePasse(utilisateur.getPassword());
                dto.setRole(utilisateur.getRole());
                dto.setCompteActif(utilisateur.isCompteActif());
                dto.setDateCreation(utilisateur.getDateCreation());
                dto.setDerniereConnexion(utilisateur.getDerniereConnexion());
                dto.setLanguePreferee(utilisateur.getLanguePreferee());
                dto.setPhotoProfil(utilisateur.getPhotoProfil());
                return dto;
            }
            
            return null;
        } catch (Exception e) {
            System.err.println("❌ Erreur lors de la récupération de l'utilisateur: " + e.getMessage());
            throw e;
        }
    }

    /**
     * Convertit un Utilisateur en UtilisateurDTO
     */
    private UtilisateurDTO mapToDTO(Utilisateur utilisateur) {
        UtilisateurDTO dto = new UtilisateurDTO();
        dto.setId(utilisateur.getId());
        dto.setNom(utilisateur.getNom());
        dto.setPrenom(utilisateur.getPrenom());
        dto.setEmail(utilisateur.getEmail());
        dto.setMotDePasse(utilisateur.getPassword());
        dto.setRole(utilisateur.getRole());
        dto.setCompteActif(utilisateur.isCompteActif());
        dto.setDateCreation(utilisateur.getDateCreation());
        dto.setDerniereConnexion(utilisateur.getDerniereConnexion());
        dto.setLanguePreferee(utilisateur.getLanguePreferee());
        dto.setPhotoProfil(utilisateur.getPhotoProfil());
        return dto;
    }

    /**
     * Extrait l'email depuis un token JWT
     */
    public String getEmailFromToken(String token) {
        try {
            return jwtService.extractUsername(token);
        } catch (Exception e) {
            System.err.println("❌ Erreur lors de l'extraction de l'email depuis le token: " + e.getMessage());
            return null;
        }
    }

    /**
     * Récupère le profil complet d'un utilisateur
     */
    public UtilisateurDTO getUserProfile(String email) {
        try {
            Utilisateur utilisateur = utilisateurRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé: " + email));
            
            return mapToDTO(utilisateur);
        } catch (Exception e) {
            System.err.println("❌ Erreur lors de la récupération du profil: " + e.getMessage());
            throw e;
        }
    }

    /**
     * Met à jour le profil d'un utilisateur
     */
    public UtilisateurDTO updateUserProfile(String email, Map<String, Object> profileData) {
        try {
            Utilisateur utilisateur = utilisateurRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé: " + email));
            
            // Mettre à jour les champs de base (Utilisateur)
            if (profileData.containsKey("nom")) {
                utilisateur.setNom((String) profileData.get("nom"));
            }
            if (profileData.containsKey("prenom")) {
                utilisateur.setPrenom((String) profileData.get("prenom"));
            }
            if (profileData.containsKey("telephone")) {
                utilisateur.setTelephone((String) profileData.get("telephone"));
            }
            if (profileData.containsKey("dateNaissance")) {
                String dateStr = (String) profileData.get("dateNaissance");
                if (dateStr != null && !dateStr.isEmpty()) {
                    utilisateur.setDateNaissance(java.time.LocalDate.parse(dateStr));
                }
            }
            if (profileData.containsKey("languePreferee")) {
                utilisateur.setLanguePreferee((String) profileData.get("languePreferee"));
            }
            
            // Mettre à jour les champs spécifiques à Etudiant si l'utilisateur est un étudiant
            if (utilisateur instanceof Etudiant) {
                Etudiant etudiant = (Etudiant) utilisateur;
                
                if (profileData.containsKey("genre")) {
                    etudiant.setGenre((String) profileData.get("genre"));
                }
                if (profileData.containsKey("nationalite")) {
                    etudiant.setNationalite((String) profileData.get("nationalite"));
                }
                if (profileData.containsKey("pays")) {
                    etudiant.setPays((String) profileData.get("pays"));
                }
                if (profileData.containsKey("ville")) {
                    etudiant.setVille((String) profileData.get("ville"));
                }
                if (profileData.containsKey("adresse")) {
                    etudiant.setAdresse((String) profileData.get("adresse"));
                }
                if (profileData.containsKey("etablissement")) {
                    etudiant.setEtablissement((String) profileData.get("etablissement"));
                }
                if (profileData.containsKey("niveauEtude")) {
                    etudiant.setNiveauEtude((String) profileData.get("niveauEtude"));
                }
                if (profileData.containsKey("anneeEtude")) {
                    etudiant.setAnneeEtude((String) profileData.get("anneeEtude"));
                }
                if (profileData.containsKey("specialite")) {
                    etudiant.setSpecialite((String) profileData.get("specialite"));
                }
            }
            
            // Sauvegarder les modifications
            Utilisateur savedUtilisateur = utilisateurRepository.save(utilisateur);
            System.out.println("✅ Profil mis à jour avec succès: " + savedUtilisateur.getEmail());
            
            return mapToDTO(savedUtilisateur);
        } catch (Exception e) {
            System.err.println("❌ Erreur lors de la mise à jour du profil: " + e.getMessage());
            throw e;
        }
    }

    /**
     * Récupère les paramètres d'un utilisateur
     */
    public Map<String, Object> getUserSettings(String email) {
        try {
            Utilisateur utilisateur = utilisateurRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé: " + email));
            
            Map<String, Object> settings = new HashMap<>();
            
            // Préférences générales
            settings.put("languePreferee", utilisateur.getLanguePreferee() != null ? utilisateur.getLanguePreferee() : "fr");
            settings.put("theme", "light"); // Par défaut
            settings.put("timezone", "Europe/Paris"); // Par défaut
            
            // Notifications (par défaut)
            settings.put("notifications", true);
            settings.put("emailNotifications", true);
            settings.put("pushNotifications", false);
            settings.put("smsNotifications", false);
            
            // Tests et orientation (par défaut)
            settings.put("saveTestResults", true);
            settings.put("personalizedRecommendations", true);
            settings.put("weeklyDigest", false);
            settings.put("newProgramsAlert", true);
            
            // Confidentialité (par défaut)
            settings.put("dataAnalytics", false);
            settings.put("shareProfile", false);
            settings.put("marketingEmails", false);
            
            // Sécurité (par défaut)
            settings.put("twoFactorAuth", false);
            settings.put("loginNotifications", true);
            settings.put("sessionTimeout", 30);
            
            return settings;
        } catch (Exception e) {
            System.err.println("❌ Erreur lors de la récupération des paramètres: " + e.getMessage());
            throw e;
        }
    }

    /**
     * Met à jour les paramètres d'un utilisateur
     */
    public Map<String, Object> updateUserSettings(String email, Map<String, Object> settingsData) {
        try {
            Utilisateur utilisateur = utilisateurRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé: " + email));
            
            // Mettre à jour les champs de paramètres
            if (settingsData.containsKey("languePreferee")) {
                utilisateur.setLanguePreferee((String) settingsData.get("languePreferee"));
            }
            
            // Sauvegarder les modifications
            Utilisateur savedUtilisateur = utilisateurRepository.save(utilisateur);
            System.out.println("✅ Paramètres mis à jour avec succès: " + savedUtilisateur.getEmail());
            
            // Retourner les paramètres mis à jour
            return getUserSettings(email);
        } catch (Exception e) {
            System.err.println("❌ Erreur lors de la mise à jour des paramètres: " + e.getMessage());
            throw e;
        }
    }
}