package com.dira.diravenir1.Entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le mot de passe est requis")
    @Size(min = 60, max = 255, message = "Le mot de passe doit être encodé")
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
    private boolean compteActif = true;

    @Column(name = "email_verifie", nullable = false)
    private boolean emailVerifie = false;

    // ======================
    // === NOUVEAUX CHAMPS ===
    // ======================
    
    @Column(name = "photo_profil", length = 500)
    private String photoProfil;

    @Column(name = "google_id", length = 100)
    private String googleId;

    @Column(name = "provider", length = 20)
    private String provider; // "google", "local", etc.

    @Column(name = "provider_id", length = 100)
    private String providerId;

    @ManyToOne
    @JoinColumn(name = "program_id")
    private Program program;

    @PrePersist
    protected void onCreate() {
        dateCreation = LocalDateTime.now();
        if (role == null) {
            role = Role.USER;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        // Logique de mise à jour si nécessaire
    }
}
