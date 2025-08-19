package com.dira.diravenir1.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import lombok.Data;

/**
 * Configuration des poids des algorithmes de matching.
 * 
 * Cette classe permet d'externaliser les paramètres de pondération
 * des différents composants de l'algorithme d'orientation.
 * 
 * Les valeurs peuvent être configurées dans application.yml
 */
@Component
@ConfigurationProperties(prefix = "matching.algorithm")
@Data
public class AlgorithmWeightsConfig {
    
    /**
     * Poids du calculateur euclidien (distance euclidienne)
     * Valeur par défaut : 60% du score final
     */
    private double euclideanWeight = 0.60;
    
    /**
     * Poids de l'analyse des forces dominantes
     * Valeur par défaut : 25% du score final
     */
    private double forceAnalysisWeight = 0.25;
    
    /**
     * Poids de la correspondance des piliers critiques
     * Valeur par défaut : 15% du score final
     */
    private double criticalPillarWeight = 0.15;
    
    /**
     * Seuil minimum pour considérer une correspondance comme valide
     * Valeur par défaut : 30% (0.30)
     */
    private double minimumMatchThreshold = 0.30;
    
    /**
     * Seuil pour une correspondance de haute qualité
     * Valeur par défaut : 80% (0.80)
     */
    private double highQualityThreshold = 0.80;
    
    /**
     * Seuil pour une correspondance de qualité moyenne
     * Valeur par défaut : 60% (0.60)
     */
    private double mediumQualityThreshold = 0.60;
    
    /**
     * Nombre maximum de recommandations à générer
     * Valeur par défaut : 3
     */
    private int maxRecommendations = 3;
    
    /**
     * Vérifie que la somme des poids est égale à 1.0
     * 
     * @return true si la configuration est valide, false sinon
     */
    public boolean isValid() {
        double totalWeight = euclideanWeight + forceAnalysisWeight + criticalPillarWeight;
        return Math.abs(totalWeight - 1.0) < 0.001; // Tolérance de 0.001
    }
    
    /**
     * Retourne la somme des poids pour validation
     * 
     * @return Somme des poids
     */
    public double getTotalWeight() {
        return euclideanWeight + forceAnalysisWeight + criticalPillarWeight;
    }
    
    /**
     * Normalise les poids pour qu'ils somment à 1.0
     */
    public void normalizeWeights() {
        double totalWeight = getTotalWeight();
        if (totalWeight > 0) {
            euclideanWeight /= totalWeight;
            forceAnalysisWeight /= totalWeight;
            criticalPillarWeight /= totalWeight;
        }
    }
    
    /**
     * Retourne une description de la configuration
     * 
     * @return Description formatée
     */
    public String getConfigurationDescription() {
        return String.format(
            "Configuration des poids : Euclidien=%.1f%%, Forces=%.1f%%, Piliers=%.1f%% (Total: %.1f%%)",
            euclideanWeight * 100,
            forceAnalysisWeight * 100,
            criticalPillarWeight * 100,
            getTotalWeight() * 100
        );
    }
    
    /**
     * Valide et normalise la configuration au démarrage
     */
    public void validateAndNormalize() {
        if (!isValid()) {
            System.out.println("⚠️ Configuration des poids invalide. Normalisation automatique...");
            normalizeWeights();
            System.out.println("✅ Configuration normalisée : " + getConfigurationDescription());
        } else {
            System.out.println("✅ Configuration des poids valide : " + getConfigurationDescription());
        }
    }
}
