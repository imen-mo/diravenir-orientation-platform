package com.diravenir.Entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "utilisateur")
@Inheritance(strategy = InheritanceType.JOINED)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Utilisateur implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le mot de passe est requis")
    @Size(min = 6, message = "Le mot de passe doit contenir au moins 6 caractères")
    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(length = 50, nullable = false)
    private Role role;

    @NotBlank(message = "Le nom est requis")
    @Size(min = 2, max = 50, message = "Le nom doit contenir entre 2 et 50 caractères")
    @Column(nullable = false, length = 50)
    private String nom;

    @NotBlank(message = "Le prénom est requis")
    @Size(min = 2, max = 50, message = "Le prénom doit contenir entre 2 et 50 caractères")
    @Column(nullable = false, length = 50)
    private String prenom;

    @Column(name = "date_naissance")
    private LocalDate dateNaissance;

    @NotBlank(message = "L'email est requis")
    @Email(message = "Format d'email invalide")
    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Size(max = 20, message = "Le numéro de téléphone ne peut pas dépasser 20 caractères")
    @Column(length = 20)
    private String telephone;

    @Size(max = 10, message = "La langue préférée ne peut pas dépasser 10 caractères")
    @Column(name = "langue_preferee", length = 10)
    private String languePreferee;

    @Column(name = "date_creation", nullable = false)
    private LocalDateTime dateCreation;

    @Column(name = "derniere_connexion")
    private LocalDateTime derniereConnexion;

    @Column(name = "compte_actif", nullable = false)
    private boolean compteActif = false;

    @Column(name = "photo_profil", length = 500)
    private String photoProfil;

    // Relation avec les programmes supprimée temporairement
    // @ManyToOne
    // @JoinColumn(name = "program_id")
    // private Program program;

    // Champs pour OAuth2 Google
    @Column(name = "google_id", unique = true)
    private String googleId;

    @Column(name = "auth_provider")
    @Enumerated(EnumType.STRING)
    private AuthProvider authProvider = AuthProvider.LOCAL;

    @Column(name = "email_verifie")
    private Boolean emailVerified = false;

    @Column(name = "oauth2_access_token")
    private String oauth2AccessToken;

    @Column(name = "oauth2_refresh_token")
    private String oauth2RefreshToken;

    @Column(name = "oauth2_token_expiry")
    private LocalDateTime oauth2TokenExpiry;

    @Column(name = "compte_verifie")
    private Boolean compteVerifie = false;

    @Column(name = "email_verification_token", length = 100)
    private String emailVerificationToken;

    // Champs supplémentaires pour le profil utilisateur
    @Column(name = "genre", length = 20)
    private String genre;

    @Column(name = "nationalite", length = 50)
    private String nationalite;

    @Column(name = "pays", length = 50)
    private String pays;

    @Column(name = "ville", length = 50)
    private String ville;

    @Column(name = "adresse", length = 200)
    private String adresse;

    @Column(name = "etablissement", length = 100)
    private String etablissement;

    @Column(name = "niveau_etude", length = 50)
    private String niveauEtude;

    @Column(name = "annee_etude", length = 20)
    private String anneeEtude;

    @Column(name = "specialite", length = 100)
    private String specialite;

    @PrePersist
    protected void onCreate() {
        dateCreation = LocalDateTime.now();
        if (role == null) {
            role = Role.ETUDIANT;
        }
        if (authProvider == null) {
            authProvider = AuthProvider.LOCAL;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        // Logique de mise à jour si nécessaire
    }

    // Méthode utilitaire pour vérifier si l'email est vérifié
    public boolean isEmailVerified() {
        return emailVerified != null && emailVerified;
    }
    
    // Builder pattern manuel
    public static UtilisateurBuilder builder() {
        return new UtilisateurBuilder();
    }
    
    public static class UtilisateurBuilder {
        private Long id;
        private String password;
        private Role role;
        private String nom;
        private String prenom;
        private LocalDate dateNaissance;
        private String email;
        private String telephone;
        private String languePreferee;
        private LocalDateTime dateCreation;
        private LocalDateTime derniereConnexion;
        private boolean compteActif = false;
        private String photoProfil;
        // private Program program;
        private String googleId;
        private AuthProvider authProvider = AuthProvider.LOCAL;
        private Boolean emailVerified = false;
        private String oauth2AccessToken;
        private String oauth2RefreshToken;
        private LocalDateTime oauth2TokenExpiry;
        private Boolean compteVerifie = false;
        private String emailVerificationToken;
        private String genre;
        private String nationalite;
        private String pays;
        private String ville;
        private String adresse;
        private String etablissement;
        private String niveauEtude;
        private String anneeEtude;
        private String specialite;
        
        public UtilisateurBuilder id(Long id) { this.id = id; return this; }
        public UtilisateurBuilder password(String password) { this.password = password; return this; }
        public UtilisateurBuilder role(Role role) { this.role = role; return this; }
        public UtilisateurBuilder nom(String nom) { this.nom = nom; return this; }
        public UtilisateurBuilder prenom(String prenom) { this.prenom = prenom; return this; }
        public UtilisateurBuilder dateNaissance(LocalDate dateNaissance) { this.dateNaissance = dateNaissance; return this; }
        public UtilisateurBuilder email(String email) { this.email = email; return this; }
        public UtilisateurBuilder telephone(String telephone) { this.telephone = telephone; return this; }
        public UtilisateurBuilder languePreferee(String languePreferee) { this.languePreferee = languePreferee; return this; }
        public UtilisateurBuilder dateCreation(LocalDateTime dateCreation) { this.dateCreation = dateCreation; return this; }
        public UtilisateurBuilder derniereConnexion(LocalDateTime derniereConnexion) { this.derniereConnexion = derniereConnexion; return this; }
        public UtilisateurBuilder compteActif(boolean compteActif) { this.compteActif = compteActif; return this; }
        public UtilisateurBuilder photoProfil(String photoProfil) { this.photoProfil = photoProfil; return this; }
        // public UtilisateurBuilder program(Program program) { this.program = program; return this; }
        public UtilisateurBuilder googleId(String googleId) { this.googleId = googleId; return this; }
        public UtilisateurBuilder authProvider(AuthProvider authProvider) { this.authProvider = authProvider; return this; }
        public UtilisateurBuilder emailVerified(Boolean emailVerified) { this.emailVerified = emailVerified; return this; }
        public UtilisateurBuilder oauth2AccessToken(String oauth2AccessToken) { this.oauth2AccessToken = oauth2AccessToken; return this; }
        public UtilisateurBuilder oauth2RefreshToken(String oauth2RefreshToken) { this.oauth2RefreshToken = oauth2RefreshToken; return this; }
        public UtilisateurBuilder oauth2TokenExpiry(LocalDateTime oauth2TokenExpiry) { this.oauth2TokenExpiry = oauth2TokenExpiry; return this; }
        public UtilisateurBuilder compteVerifie(Boolean compteVerifie) { this.compteVerifie = compteVerifie; return this; }
        public UtilisateurBuilder emailVerificationToken(String emailVerificationToken) { this.emailVerificationToken = emailVerificationToken; return this; }
        public UtilisateurBuilder genre(String genre) { this.genre = genre; return this; }
        public UtilisateurBuilder nationalite(String nationalite) { this.nationalite = nationalite; return this; }
        public UtilisateurBuilder pays(String pays) { this.pays = pays; return this; }
        public UtilisateurBuilder ville(String ville) { this.ville = ville; return this; }
        public UtilisateurBuilder adresse(String adresse) { this.adresse = adresse; return this; }
        public UtilisateurBuilder etablissement(String etablissement) { this.etablissement = etablissement; return this; }
        public UtilisateurBuilder niveauEtude(String niveauEtude) { this.niveauEtude = niveauEtude; return this; }
        public UtilisateurBuilder anneeEtude(String anneeEtude) { this.anneeEtude = anneeEtude; return this; }
        public UtilisateurBuilder specialite(String specialite) { this.specialite = specialite; return this; }
        
        public Utilisateur build() {
            Utilisateur utilisateur = new Utilisateur();
            utilisateur.id = this.id;
            utilisateur.password = this.password;
            utilisateur.role = this.role;
            utilisateur.nom = this.nom;
            utilisateur.prenom = this.prenom;
            utilisateur.dateNaissance = this.dateNaissance;
            utilisateur.email = this.email;
            utilisateur.telephone = this.telephone;
            utilisateur.languePreferee = this.languePreferee;
            utilisateur.dateCreation = this.dateCreation;
            utilisateur.derniereConnexion = this.derniereConnexion;
            utilisateur.compteActif = this.compteActif;
            utilisateur.photoProfil = this.photoProfil;
            // utilisateur.program = this.program;
            utilisateur.googleId = this.googleId;
            utilisateur.authProvider = this.authProvider;
            utilisateur.emailVerified = this.emailVerified;
            utilisateur.oauth2AccessToken = this.oauth2AccessToken;
            utilisateur.oauth2RefreshToken = this.oauth2RefreshToken;
            utilisateur.oauth2TokenExpiry = this.oauth2TokenExpiry;
            utilisateur.compteVerifie = this.compteVerifie;
            utilisateur.emailVerificationToken = this.emailVerificationToken;
            utilisateur.genre = this.genre;
            utilisateur.nationalite = this.nationalite;
            utilisateur.pays = this.pays;
            utilisateur.ville = this.ville;
            utilisateur.adresse = this.adresse;
            utilisateur.etablissement = this.etablissement;
            utilisateur.niveauEtude = this.niveauEtude;
            utilisateur.anneeEtude = this.anneeEtude;
            utilisateur.specialite = this.specialite;
            return utilisateur;
        }
    }
    
    // Méthodes UserDetails pour l'authentification
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        // Pour le développement, permettre la connexion si le compte est actif
        // La vérification email peut être optionnelle
        return compteActif;
    }
    
    public String getFullName() {
        return prenom + " " + nom;
    }
    
    public String getInitials() {
        return (prenom.charAt(0) + "" + nom.charAt(0)).toUpperCase();
    }
    
    // Méthodes de compatibilité avec User
    public String getFirstName() {
        return prenom;
    }
    
    public String getLastName() {
        return nom;
    }
    
    public void setFirstName(String firstName) {
        this.prenom = firstName;
    }
    
    public void setLastName(String lastName) {
        this.nom = lastName;
    }
}
