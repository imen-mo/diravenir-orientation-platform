package com.diravenir.Entities;

import jakarta.persistence.*;
import lombok.*;
import com.diravenir.Entities.Destination;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "universite")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Universite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nom;                    // Nom de l'université
    
    @Column(nullable = false)
    private String nomEn;                  // Nom en anglais
    
    @Column(nullable = false)
    private String pays;                   // Pays de l'université
    
    @Column(nullable = false)
    private String ville;                  // Ville de l'université
    
    private String adresse;                // Adresse complète
    private String telephone;              // Numéro de téléphone
    private String email;                  // Email de contact
    private String siteWeb;                // Site web officiel
    private String logoUrl;                // URL du logo de l'université
    private String imageUrl;               // URL de l'image principale
    private String description;            // Description de l'université
    
    @Column(nullable = false)
    private String type;                   // Type (publique, privée, etc.)
    
    private String accreditation;          // Accréditations
    private String ranking;                // Classement international
    private String anneeFondation;        // Année de fondation
    private String nombreEtudiants;       // Nombre d'étudiants
    private String nombreEnseignants;     // Nombre d'enseignants
    private String campus;                 // Informations sur le campus
    private String facilites;              // Facilités disponibles
    private String partenariats;          // Partenariats internationaux
    private String programmes;             // Types de programmes offerts
    private String fraisInscription;      // Frais d'inscription
    private String logement;               // Options de logement
    private String transport;              // Transport et accessibilité
    private String securite;               // Sécurité sur le campus
    private String activites;              // Activités étudiantes
    private String associations;           // Associations étudiantes
    private String bibliotheque;           // Services de bibliothèque
    private String laboratoires;           // Laboratoires et équipements
    private String recherche;              // Activités de recherche
    private String international;          // Programmes internationaux
    private String bourses;                // Bourses disponibles
    private String conditions;             // Conditions d'admission
    private String documents;              // Documents requis
    private String deadlines;              // Dates limites
    private String contactPerson;          // Personne de contact
    private String notes;                  // Notes additionnelles

    // Relations
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "destination_id", nullable = false)
    private Destination destination;

    @OneToMany(mappedBy = "universite", cascade = CascadeType.ALL)
    private List<Program> programs;

    // Statut d'activation
    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    // Métadonnées
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
} 
