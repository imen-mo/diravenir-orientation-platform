package com.dira.diravenir1.dto;

import com.dira.diravenir1.Entities.Program;
import com.dira.diravenir1.Entities.Universite;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProgramDTO {
    private Long id;
    
    // Nouvelle structure unifiée des colonnes
    private String campusCity;           // Ville du campus
    private String universities;         // Nom de l'université
    private String universityRanking;    // Classement de l'université
    private String applyBefore;          // Date limite d'inscription
    private String category;             // Catégorie
    private String program;              // Nom du programme
    private String degreeType;           // Type de diplôme
    private String tuitionFees;          // Frais de scolarité
    private Integer duration;            // Durée en années
    private String language;             // Langue d'enseignement
    private String scholarship;          // Bourse disponible
    private String description;          // Description générale
    private String aboutThisProgram;     // À propos de ce programme
    private String whyThisProgram;       // Pourquoi ce programme
    private String aboutTheUniversity;   // À propos de l'université
    
    private Program.ProgramStatus status;
    private String programImage;
    
    // IDs des relations
    private Long destinationId;
    private Long universiteId;
    
    // Informations des relations (optionnel)
    private String destinationName;
    private String universiteName;
    
    // Objet université complet pour accéder au logo_url
    private Universite universite;
} 