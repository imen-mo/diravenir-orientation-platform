package com.dira.diravenir1.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Program {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Attributs principaux basés sur l'image 3
    private String majorName;        // Nom du major (ex: "Civil Engineering", "Mechanical Engineering")
    private String universityName;   // Nom de l'université
    private String description;      // Description du programme

    // Attributs supplémentaires pour les détails du programme
    private String degreeType;       // Bachelor, Master, PhD
    private String location;         // Ville du campus
    private String campusCity;       // Ville du campus principal
    private Integer duration;        // Durée en années
    private String language;         // Langue d'enseignement
    private String universityRanking; // Classement de l'université
    private String programRanking;   // Classement du programme
    private Boolean scholarshipAvailable; // Bourse disponible
    private BigDecimal tuitionFees;  // Frais de scolarité
    private String applyBefore;      // Date limite d'inscription

    // Relations
    @ManyToOne
    @JoinColumn(name = "destination_id")
    private Destination destination;

    // Relation partenaire supprimée

    @ManyToOne
    @JoinColumn(name = "universite_id")
    private Universite universite;

    // Statut du programme
    @Enumerated(EnumType.STRING)
    private ProgramStatus status = ProgramStatus.OPENED; // OPENED, COMING_SOON, CLOSED

    // Image du programme
    private String programImage;     // URL de l'image du programme

    // Métadonnées
    private String createdAt;
    private String updatedAt;

    public enum ProgramStatus {
        OPENED,
        COMING_SOON,
        CLOSED
    }
} 