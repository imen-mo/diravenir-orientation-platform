package com.dira.diravenir1.dto;

import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * DTO représentant une recommandation de majeure pour un utilisateur
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Recommendation {
    
    // Informations de la majeure recommandée
    private String majorId;
    private String majorName;
    private String majorCategory;
    
    // Score de correspondance (0-100%)
    private double matchScore;
    
    // Position dans le classement (1 = première recommandation)
    private int rank;
    
    // Raisons de la recommandation
    private String primaryReason;       // Raison principale
    private String secondaryReason;     // Raison secondaire
    private String strengths;           // Points forts de la correspondance
    private String considerations;      // Points d'attention
    
    // Métadonnées
    private String recommendationDate;
    private String algorithmVersion;
    
    /**
     * Retourne le score de correspondance en pourcentage
     * 
     * @return Score en pourcentage (0-100)
     */
    public double getMatchScorePercentage() {
        return matchScore * 100.0;
    }
    
    /**
     * Retourne le score de correspondance formaté
     * 
     * @return Score formaté (ex: "85.5%")
     */
    public String getFormattedMatchScore() {
        return String.format("%.1f%%", getMatchScorePercentage());
    }
    
    /**
     * Retourne le rang formaté
     * 
     * @return Rang formaté (ex: "1er", "2ème", "3ème")
     */
    public String getFormattedRank() {
        switch (rank) {
            case 1:
                return "1er";
            case 2:
                return "2ème";
            case 3:
                return "3ème";
            default:
                return rank + "ème";
        }
    }
    
    /**
     * Vérifie si c'est la première recommandation
     * 
     * @return true si c'est la première recommandation, false sinon
     */
    public boolean isTopRecommendation() {
        return rank == 1;
    }
    
    /**
     * Vérifie si c'est une recommandation de haute qualité (score > 80%)
     * 
     * @return true si c'est une recommandation de haute qualité, false sinon
     */
    public boolean isHighQualityRecommendation() {
        return matchScore > 0.80;
    }
    
    /**
     * Retourne une description courte de la recommandation
     * 
     * @return Description courte
     */
    public String getShortDescription() {
        return String.format("%s - %s (%s)", 
            getFormattedRank(), 
            majorName, 
            getFormattedMatchScore());
    }
    
    /**
     * Retourne une description détaillée de la recommandation
     * 
     * @return Description détaillée
     */
    public String getDetailedDescription() {
        StringBuilder description = new StringBuilder();
        description.append(String.format("Recommandation %s : %s\n", 
            getFormattedRank(), majorName));
        description.append(String.format("Score de correspondance : %s\n", 
            getFormattedMatchScore()));
        description.append(String.format("Catégorie : %s\n", majorCategory));
        
        if (primaryReason != null && !primaryReason.isEmpty()) {
            description.append(String.format("Raison principale : %s\n", primaryReason));
        }
        
        if (strengths != null && !strengths.isEmpty()) {
            description.append(String.format("Points forts : %s\n", strengths));
        }
        
        if (considerations != null && !considerations.isEmpty()) {
            description.append(String.format("Points d'attention : %s\n", considerations));
        }
        
        return description.toString();
    }
}
