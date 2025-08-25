package com.dira.diravenir1.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * DTO pour les recommandations d'orientation complètes selon les spécifications exactes
 * du "Système d'Orientation des Étudiants".
 * 
 * Ce DTO contient :
 * - Le profil utilisateur calculé
 * - Les top 3 recommandations
 * - Toutes les recommandations classées
 * - Les statistiques du profil
 * - Les explications personnalisées
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrientationRecommendationDTO {
    
    /**
     * Identifiant unique de la session de recommandation
     */
    private String userId;
    
    /**
     * Timestamp de génération des recommandations
     */
    private Date timestamp;
    
    /**
     * Profil utilisateur calculé selon la matrice des 17 piliers
     */
    private UserProfileDTO userProfile;
    
    /**
     * Top 3 recommandations avec les scores les plus élevés
     * Selon les spécifications : "Afficher les 3 majeures avec les scores les plus élevés"
     */
    private List<MatchingResultDTO> topRecommendations;
    
    /**
     * Toutes les recommandations classées par score décroissant
     */
    private List<MatchingResultDTO> allRecommendations;
    
    /**
     * Statistiques du profil utilisateur pour l'analyse
     * - Moyennes par catégorie de piliers
     * - Piliers dominants
     * - Analyse des forces
     */
    private Map<String, Object> profileStatistics;
    
    /**
     * Explications personnalisées pour chaque recommandation
     * Selon les spécifications : "Pourquoi cette majeure est faite pour vous"
     * Générées dynamiquement en identifiant les piliers où les scores 
     * de l'utilisateur et de la majeure sont les plus élevés
     */
    private Map<String, String> recommendationExplanations;
    
    /**
     * Métadonnées de la session
     */
    private String sessionId;
    private String algorithmVersion;
    private String calculationMethod;
    
    /**
     * Informations de performance
     */
    private Long calculationTimeMs;
    private Integer totalMajorsEvaluated;
    private Integer totalPillarsAnalyzed;
    
    /**
     * Configuration de l'algorithme utilisée
     */
    private String matchingAlgorithm;
    private String scoringMatrix;
    private String normalizationMethod;
    
    // Les annotations Lombok génèrent automatiquement les constructeurs
    // Pas besoin de constructeur manuel
    
    /**
     * Vérifie si les recommandations sont valides
     */
    public boolean isValid() {
        return topRecommendations != null && !topRecommendations.isEmpty() &&
               userProfile != null &&
               allRecommendations != null && !allRecommendations.isEmpty();
    }
    
    /**
     * Récupère le score de matching le plus élevé
     */
    public double getHighestScore() {
        if (topRecommendations == null || topRecommendations.isEmpty()) {
            return 0.0;
        }
        return topRecommendations.get(0).getMatchingScore();
    }
    
    /**
     * Récupère le score de matching le plus bas
     */
    public double getLowestScore() {
        if (allRecommendations == null || allRecommendations.isEmpty()) {
            return 0.0;
        }
        return allRecommendations.get(allRecommendations.size() - 1).getMatchingScore();
    }
    
    /**
     * Calcule la moyenne des scores de matching
     */
    public double getAverageScore() {
        if (allRecommendations == null || allRecommendations.isEmpty()) {
            return 0.0;
        }
        
        return allRecommendations.stream()
            .mapToDouble(MatchingResultDTO::getMatchingScore)
            .average()
            .orElse(0.0);
    }
    
    /**
     * Récupère le nombre de majeures avec un score > 80%
     */
    public long getHighMatchCount() {
        if (allRecommendations == null) {
            return 0;
        }
        
        return allRecommendations.stream()
            .filter(r -> r.getMatchingScore() > 80.0)
            .count();
    }
    
    /**
     * Récupère le nombre de majeures avec un score > 60%
     */
    public long getGoodMatchCount() {
        if (allRecommendations == null) {
            return 0;
        }
        
        return allRecommendations.stream()
            .filter(r -> r.getMatchingScore() > 60.0)
            .count();
    }
    
    /**
     * Récupère les recommandations par catégorie
     */
    public Map<String, List<MatchingResultDTO>> getRecommendationsByCategory() {
        if (allRecommendations == null) {
            return Map.of();
        }
        
        return allRecommendations.stream()
            .collect(java.util.stream.Collectors.groupingBy(MatchingResultDTO::getCategory));
    }
    
    /**
     * Récupère les explications pour une majeure spécifique
     */
    public String getExplanationForMajor(String majorId) {
        if (recommendationExplanations == null) {
            return "Explication non disponible";
        }
        
        return recommendationExplanations.getOrDefault(majorId, 
            "Cette majeure correspond bien à votre profil général.");
    }
    
    /**
     * Génère un résumé des recommandations
     */
    public String generateSummary() {
        if (!isValid()) {
            return "Recommandations non disponibles";
        }
        
        StringBuilder summary = new StringBuilder();
        summary.append("🎯 RÉSUMÉ DES RECOMMANDATIONS D'ORIENTATION\n\n");
        
        summary.append("🏆 TOP 3 RECOMMANDATIONS :\n");
        for (int i = 0; i < Math.min(3, topRecommendations.size()); i++) {
            MatchingResultDTO rec = topRecommendations.get(i);
            summary.append(String.format("%d. %s : %.1f%%\n", 
                i + 1, rec.getProgram(), rec.getMatchingScore()));
        }
        
        summary.append("\n📊 STATISTIQUES :\n");
        summary.append(String.format("• Score moyen : %.1f%%\n", getAverageScore()));
        summary.append(String.format("• Excellentes correspondances (>80%%) : %d majeures\n", getHighMatchCount()));
        summary.append(String.format("• Bonnes correspondances (>60%%) : %d majeures\n", getGoodMatchCount()));
        summary.append(String.format("• Total évalué : %d majeures\n", totalMajorsEvaluated != null ? totalMajorsEvaluated : 0));
        
        if (calculationTimeMs != null) {
            summary.append(String.format("• Temps de calcul : %d ms\n", calculationTimeMs));
        }
        
        return summary.toString();
    }
}
