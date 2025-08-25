package com.dira.diravenir1.dto;

import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * DTO représentant le résultat d'un matching entre un utilisateur et une majeure
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MatchingResult {
    
    // Informations de la majeure
    private String majorId;
    private String program;              // Nom du programme (ex: Medicine, Dentistry)
    private String category;             // Catégorie du programme (ex: Medical and Health Sciences)
    
    // Score de correspondance global (0-100%)
    private double globalScore;
    
    // Scores détaillés par composant
    private double euclideanScore;      // Score de distance euclidienne
    private double forceAnalysisScore;  // Score d'analyse des forces
    private double criticalPillarScore; // Score des piliers critiques
    
    // Métadonnées du matching
    private String algorithmUsed;       // Nom de l'algorithme utilisé
    private long processingTimeMs;      // Temps de traitement en millisecondes
    private String matchingDate;        // Date du matching
    
    /**
     * Retourne le score global en pourcentage
     * 
     * @return Score en pourcentage (0-100)
     */
    public double getGlobalScorePercentage() {
        return globalScore * 100.0;
    }
    
    /**
     * Retourne le score euclidien en pourcentage
     * 
     * @return Score euclidien en pourcentage (0-100)
     */
    public double getEuclideanScorePercentage() {
        return euclideanScore * 100.0;
    }
    
    /**
     * Retourne le score d'analyse des forces en pourcentage
     * 
     * @return Score des forces en pourcentage (0-100)
     */
    public double getForceAnalysisScorePercentage() {
        return forceAnalysisScore * 100.0;
    }
    
    /**
     * Retourne le score des piliers critiques en pourcentage
     * 
     * @return Score des piliers critiques en pourcentage (0-100)
     */
    public double getCriticalPillarScorePercentage() {
        return criticalPillarScore * 100.0;
    }
    
    /**
     * Vérifie si le matching est de bonne qualité (score > 70%)
     * 
     * @return true si le matching est de bonne qualité, false sinon
     */
    public boolean isHighQualityMatch() {
        return globalScore > 0.70;
    }
    
    /**
     * Vérifie si le matching est de qualité moyenne (score entre 50-70%)
     * 
     * @return true si le matching est de qualité moyenne, false sinon
     */
    public boolean isMediumQualityMatch() {
        return globalScore >= 0.50 && globalScore <= 0.70;
    }
    
    /**
     * Vérifie si le matching est de faible qualité (score < 50%)
     * 
     * @return true si le matching est de faible qualité, false sinon
     */
    public boolean isLowQualityMatch() {
        return globalScore < 0.50;
    }
    
    /**
     * Retourne une description textuelle de la qualité du matching
     * 
     * @return Description de la qualité
     */
    public String getQualityDescription() {
        if (isHighQualityMatch()) {
            return "Excellente correspondance";
        } else if (isMediumQualityMatch()) {
            return "Bonne correspondance";
        } else {
            return "Correspondance limitée";
        }
    }
}
