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

    // Nouvelle structure unifiée des colonnes
    @Column(nullable = false)
    private String campusCity;           // Ville du campus (ex: Nicosia)
    
    @Column(nullable = false)
    private String universities;         // Nom de l'université (ex: Near East University)
    
    private String universityRanking;    // Classement de l'université (ex: N/A, Top 2%)
    private String applyBefore;          // Date limite d'inscription (ex: 31st July)
    
    @Column(nullable = false)
    private String category;             // Catégorie (ex: Medical and Health Sciences)
    
    @Column(nullable = false)
    private String program;              // Nom du programme (ex: Medicine, Dentistry)
    
    @Column(nullable = false)
    private String degreeType;           // Type de diplôme (ex: Bachelor, Master)
    
    private String tuitionFees;          // Frais de scolarité (ex: 18,000 RMB/year, 10135$)
    private Integer duration;            // Durée en années (ex: 6 years)
    private String language;             // Langue d'enseignement (ex: English)
    private String scholarship;          // Bourse disponible (ex: Available for eligible international students)
    
    @Column(columnDefinition = "LONGTEXT")
    private String description;          // Description générale du programme
    
    @Column(columnDefinition = "LONGTEXT")
    private String aboutThisProgram;     // À propos de ce programme
    
    @Column(columnDefinition = "LONGTEXT")
    private String whyThisProgram;       // Pourquoi ce programme
    
    @Column(columnDefinition = "LONGTEXT")
    private String aboutTheUniversity;   // À propos de l'université

    // Relations
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "destination_id", nullable = false)
    private Destination destination;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "universite_id", nullable = false)
    private Universite universite;

    // Statut du programme
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProgramStatus status = ProgramStatus.OPENED; // OPENED, COMING_SOON, CLOSED

    // Image du programme
    private String programImage;     // URL de l'image du programme

    // Métadonnées
    @Column(nullable = false)
    private String createdAt;
    
    @Column(nullable = false)
    private String updatedAt;

    public enum ProgramStatus {
        OPENED,
        COMING_SOON,
        CLOSED
    }
} 