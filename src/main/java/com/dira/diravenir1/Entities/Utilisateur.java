package com.dira.diravenir1.Entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "utilisateurs")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Utilisateur {

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
    @Builder.Default
    private boolean compteActif = false;

    @Column(name = "photo_profil", length = 500)
    private String photoProfil;

    @ManyToOne
    @JoinColumn(name = "program_id")
    private Program program;

    @PrePersist
    protected void onCreate() {
        dateCreation = LocalDateTime.now();
        if (role == null) {
            role = Role.ETUDIANT;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        // Logique de mise à jour si nécessaire
    }
}
