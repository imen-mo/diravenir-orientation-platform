package com.dira.diravenir1.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;
import java.util.List;

/**
 * DTO pour les résultats de matching entre un profil utilisateur et une majeure
 * selon les spécifications exactes du "Système d'Orientation des Étudiants".
 * 
 * Ce DTO contient :
 * - Les informations de la majeure
 * - Le score de matching calculé
 * - Les différences détaillées par pilier
 * - Les métadonnées de calcul
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MatchingResultDTO {
    
    /**
     * Identifiant unique de la majeure
     */
    private String majorId;
    
    /**
     * Nom de la majeure
     */
    private String program;
    
    /**
     * Catégorie de la majeure (ex: "Engineering & Architecture", "Business & Management")
     */
    private String category;
    
    /**
     * Score de matching calculé selon l'algorithme euclidien pondéré
     * Score sur 100% : "Votre profil correspond à X% à cette majeure"
     */
    private double matchingScore;
    
    /**
     * Différences détaillées par pilier pour l'analyse
     * Permet d'expliquer pourquoi cette majeure correspond à l'utilisateur
     */
    private Map<String, Double> pillarScores;
    
    /**
     * Rang de la majeure dans les recommandations (1 = meilleure correspondance)
     */
    private Integer rank;
    
    /**
     * Niveau de correspondance qualitatif
     */
    private String matchLevel;
    
    /**
     * Description de la majeure pour l'utilisateur
     */
    private String description;
    
    /**
     * Université proposant cette majeure
     */
    private String university;
    
    /**
     * Pays de l'université
     */
    private String country;
    
    /**
     * Durée des études
     */
    private String duration;
    
    /**
     * Langue d'enseignement
     */
    private String language;
    
    /**
     * Frais de scolarité (approximatif)
     */
    private String tuitionFees;
    
    /**
     * Métadonnées de calcul
     */
    private String calculationMethod;
    private Long calculationTimeMs;
    private String algorithmVersion;
    
    // Les annotations Lombok génèrent automatiquement les constructeurs
    // Pas besoin de constructeur manuel
    
    /**
     * Détermine le niveau de correspondance qualitatif basé sur le score
     */
    public String getMatchLevel() {
        if (matchingScore >= 90) {
            return "Excellente correspondance";
        } else if (matchingScore >= 80) {
            return "Très bonne correspondance";
        } else if (matchingScore >= 70) {
            return "Bonne correspondance";
        } else if (matchingScore >= 60) {
            return "Correspondance correcte";
        } else if (matchingScore >= 50) {
            return "Correspondance limitée";
        } else {
            return "Faible correspondance";
        }
    }
    
    /**
     * Vérifie si la correspondance est excellente (>90%)
     */
    public boolean isExcellentMatch() {
        return matchingScore >= 90;
    }
    
    /**
     * Vérifie si la correspondance est très bonne (>80%)
     */
    public boolean isVeryGoodMatch() {
        return matchingScore >= 80;
    }
    
    /**
     * Vérifie si la correspondance est bonne (>70%)
     */
    public boolean isGoodMatch() {
        return matchingScore >= 70;
    }
    
    /**
     * Vérifie si la correspondance est acceptable (>60%)
     */
    public boolean isAcceptableMatch() {
        return matchingScore >= 60;
    }
    
    /**
     * Récupère le score de matching formaté en pourcentage
     */
    public String getFormattedScore() {
        return String.format("%.1f%%", matchingScore);
    }
    
    /**
     * Récupère le score de matching arrondi
     */
    public int getRoundedScore() {
        return (int) Math.round(matchingScore);
    }
    
    /**
     * Calcule la moyenne des différences par pilier
     */
    public double getAveragePillarDifference() {
        if (pillarScores == null || pillarScores.isEmpty()) {
            return 0.0;
        }
        
        return pillarScores.values().stream()
            .mapToDouble(Double::doubleValue)
            .average()
            .orElse(0.0);
    }
    
    /**
     * Identifie les piliers avec la meilleure correspondance (différence < 10)
     */
    public List<String> getBestMatchingPillars() {
        if (pillarScores == null) {
            return List.of();
        }
        
        return pillarScores.entrySet().stream()
            .filter(entry -> entry.getValue() < 10.0)
            .map(Map.Entry::getKey)
            .toList();
    }
    
    /**
     * Identifie les piliers avec la plus forte différence (> 30)
     */
    public List<String> getWeakestMatchingPillars() {
        if (pillarScores == null) {
            return List.of();
        }
        
        return pillarScores.entrySet().stream()
            .filter(entry -> entry.getValue() > 30.0)
            .map(Map.Entry::getKey)
            .toList();
    }
    
    /**
     * Génère un résumé de la correspondance
     */
    public String generateMatchSummary() {
        StringBuilder summary = new StringBuilder();
        summary.append(String.format("🎯 %s\n", program));
        summary.append(String.format("📊 Score de correspondance : %s\n", getFormattedScore()));
        summary.append(String.format("🏷️ Niveau : %s\n", getMatchLevel()));
        
        if (category != null) {
            summary.append(String.format("📂 Catégorie : %s\n", category));
        }
        
        if (university != null) {
            summary.append(String.format("🏫 Université : %s\n", university));
        }
        
        if (country != null) {
            summary.append(String.format("🌍 Pays : %s\n", country));
        }
        
        // Analyse des piliers
        List<String> bestPillars = getBestMatchingPillars();
        if (!bestPillars.isEmpty()) {
            summary.append(String.format("✅ Points forts : %s\n", String.join(", ", bestPillars)));
        }
        
        List<String> weakPillars = getWeakestMatchingPillars();
        if (!weakPillars.isEmpty()) {
            summary.append(String.format("⚠️ Points d'attention : %s\n", String.join(", ", weakPillars)));
        }
        
        return summary.toString();
    }
    
    /**
     * Compare avec un autre résultat de matching
     */
    public int compareTo(MatchingResultDTO other) {
        return Double.compare(other.matchingScore, this.matchingScore);
    }
    
    /**
     * Vérifie si les données sont valides
     */
    public boolean isValid() {
        return majorId != null && !majorId.isEmpty() &&
               program != null && !program.isEmpty() &&
               matchingScore >= 0 && matchingScore <= 100;
    }
}
