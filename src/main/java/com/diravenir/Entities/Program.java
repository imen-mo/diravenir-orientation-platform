package com.diravenir.Entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "program")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Program {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Nouvelle structure unifiée des colonnes avec mapping exact des colonnes
    @Column(name = "campus_city", nullable = false)
    private String campusCity;           // Ville du campus (ex: Hefei)
    
    @Column(name = "universities", nullable = false)
    private String universities;         // Nom de l'université (ex: Hefei University)
    
    @Column(name = "university_ranking")
    private String universityRanking;    // Classement de l'université (ex: 283)
    
    @Column(name = "apply_before")
    private String applyBefore;          // Date limite d'inscription (ex: 31st May)
    
    @Column(name = "category", nullable = false)
    private String category;             // Catégorie (ex: Civil & Construction Engineering)
    
    @Column(name = "program", nullable = false)
    private String program;              // Nom du programme (ex: Civil Engineering)
    
    @Column(name = "degree_type", nullable = false)
    private String degreeType;           // Type de diplôme (ex: Bachelor)
    
    @Column(name = "tuition_fees")
    private String tuitionFees;          // Frais de scolarité (ex: 18,000 RMB/year)
    
    @Column(name = "duration")
    private Integer duration;            // Durée en années (ex: 4)
    
    @Column(name = "language")
    private String language;             // Langue d'enseignement (ex: English)
    
    @Column(name = "scholarship")
    private String scholarship;          // Bourse disponible
    
    @Column(name = "description", columnDefinition = "LONGTEXT")
    private String description;          // Description générale du programme
    
    @Column(name = "about_this_program", columnDefinition = "LONGTEXT")
    private String aboutThisProgram;     // À propos de ce programme
    
    @Column(name = "why_this_program", columnDefinition = "LONGTEXT")
    private String whyThisProgram;       // Pourquoi ce programme
    
    @Column(name = "about_the_university", columnDefinition = "LONGTEXT")
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
    @Column(name = "status", nullable = false)
    private ProgramStatus status = ProgramStatus.OPENED; // OPENED, COMING_SOON, CLOSED

    // Indicateur d'activation du programme
    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true; // Par défaut, le programme est actif

    // Niveau du programme (Bachelor, Master, PhD, etc.)
    @Column(name = "level")
    private String level;

    // Nombre d'applications pour ce programme
    @Column(name = "application_count")
    private Long applicationCount = 0L; // Par défaut, aucune application

    // Image du programme
    @Column(name = "program_image")
    private String programImage;     // URL de l'image du programme

    // Métadonnées
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public enum ProgramStatus {
        OPENED,
        COMING_SOON,
        CLOSED
    }
} 
