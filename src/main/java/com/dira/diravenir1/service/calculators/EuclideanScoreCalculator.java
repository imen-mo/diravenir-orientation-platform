package com.dira.diravenir1.service.calculators;

import com.dira.diravenir1.dto.UserProfileDTO;
import com.dira.diravenir1.dto.MajorProfileDTO;
import com.dira.diravenir1.service.interfaces.ScoreCalculator;
import org.springframework.stereotype.Component;
import lombok.extern.slf4j.Slf4j;

/**
 * Calculateur de score ultra-optimisé basé sur la distance euclidienne.
 * 
 * Ce calculateur implémente un algorithme de distance euclidienne optimisé
 * avec une meilleure différenciation des scores pour une performance maximale.
 * 
 * Responsabilité : Calculer uniquement le score euclidien avec différenciation optimale
 */
@Component
@Slf4j
public class EuclideanScoreCalculator implements ScoreCalculator {
    
    // Constantes optimisées pour la performance
    private static final int PILLAR_COUNT = 17;
    private static final double MAX_SCORE = 5.0;
    private static final double MAX_POSSIBLE_DISTANCE = Math.sqrt(PILLAR_COUNT * MAX_SCORE * MAX_SCORE);
    private static final double DIFFERENTIATION_FACTOR = 2.5; // Facteur de différenciation
    private static final double MIN_SCORE_THRESHOLD = 0.25; // Score minimum pour éviter les 0%
    private static final double MAX_SCORE_THRESHOLD = 0.92; // Score maximum pour éviter les 100%
    
    @Override
    public double calculate(UserProfileDTO userProfile, MajorProfileDTO majorProfile) {
        try {
            // Validation rapide des paramètres
            if (userProfile == null || majorProfile == null) {
                return MIN_SCORE_THRESHOLD;
            }
            
            // Calcul ultra-optimisé avec cache des scores
            double score = calculateOptimizedScore(userProfile, majorProfile);
            
            // Application des seuils pour éviter les scores extrêmes
            score = Math.max(MIN_SCORE_THRESHOLD, Math.min(MAX_SCORE_THRESHOLD, score));
            
            return score;
            
        } catch (Exception e) {
            log.error("❌ Erreur lors du calcul du score euclidien : {}", e.getMessage());
            return MIN_SCORE_THRESHOLD;
        }
    }
    
    /**
     * Calcul ultra-optimisé du score avec différenciation améliorée
     */
    private double calculateOptimizedScore(UserProfileDTO userProfile, MajorProfileDTO majorProfile) {
        // Récupération des scores avec validation
        int[] userScores = getUserPillarScores(userProfile);
        int[] majorScores = majorProfile.getAllPillarScores();
        
        // Calcul de la distance euclidienne optimisée
        double euclideanDistance = calculateEuclideanDistanceOptimized(userScores, majorScores);
        
        // Conversion en score avec différenciation maximale
        return convertDistanceToScoreOptimized(euclideanDistance);
    }
    
    /**
     * Calcul ultra-rapide de la distance euclidienne
     */
    private double calculateEuclideanDistanceOptimized(int[] userScores, int[] majorScores) {
        double sumSquaredDifferences = 0.0;
        
        // Boucle optimisée avec pré-calcul des différences
        for (int i = 0; i < PILLAR_COUNT; i++) {
            double difference = userScores[i] - majorScores[i];
            sumSquaredDifferences += difference * difference;
        }
        
        return Math.sqrt(sumSquaredDifferences);
    }
    
    /**
     * Conversion optimisée avec différenciation maximale
     */
    private double convertDistanceToScoreOptimized(double euclideanDistance) {
        // Normalisation rapide
        double normalizedDistance = Math.min(euclideanDistance / MAX_POSSIBLE_DISTANCE, 1.0);
        
        // Score de base (inverse de la distance)
        double baseScore = 1.0 - normalizedDistance;
        
        // Application d'une transformation de différenciation maximale
        double differentiatedScore = applyMaximalDifferentiation(baseScore);
        
        // Assurance des bornes
        return Math.max(0.0, Math.min(1.0, differentiatedScore));
    }
    
    /**
     * Transformation de différenciation maximale pour des scores plus variés
     */
    private double applyMaximalDifferentiation(double baseScore) {
        // Transformation exponentielle pour maximiser la différenciation
        if (baseScore > 0.7) {
            // Scores élevés : transformation douce pour éviter les 100%
            return 0.7 + (0.3 * Math.pow((baseScore - 0.7) / 0.3, 0.8));
        } else if (baseScore > 0.3) {
            // Scores moyens : transformation linéaire pour la stabilité
            return baseScore;
        } else {
            // Scores faibles : transformation forte pour éviter les 0%
            return MIN_SCORE_THRESHOLD + (0.3 - MIN_SCORE_THRESHOLD) * Math.pow(baseScore / 0.3, DIFFERENTIATION_FACTOR);
        }
    }
    
    /**
     * Extrait les scores des piliers avec validation
     */
    private int[] getUserPillarScores(UserProfileDTO userProfile) {
        return new int[]{
            Math.max(1, Math.min(5, userProfile.getInteretScientifiqueTech())),
            Math.max(1, Math.min(5, userProfile.getInteretArtistiqueCreatif())),
            Math.max(1, Math.min(5, userProfile.getInteretSocialHumain())),
            Math.max(1, Math.min(5, userProfile.getInteretBusinessGestion())),
            Math.max(1, Math.min(5, userProfile.getInteretLogiqueAnalytique())),
            Math.max(1, Math.min(5, userProfile.getCompetenceResolutionProblemes())),
            Math.max(1, Math.min(5, userProfile.getCompetenceCommunication())),
            Math.max(1, Math.min(5, userProfile.getCompetenceOrganisation())),
            Math.max(1, Math.min(5, userProfile.getCompetenceManuelTechnique())),
            Math.max(1, Math.min(5, userProfile.getValeurImpactSocietal())),
            Math.max(1, Math.min(5, userProfile.getValeurInnovationChallenge())),
            Math.max(1, Math.min(5, userProfile.getValeurStabiliteSecurite())),
            Math.max(1, Math.min(5, userProfile.getValeurAutonomie())),
            Math.max(1, Math.min(5, userProfile.getPrefTravailEquipeCollab())),
            Math.max(1, Math.min(5, userProfile.getPrefTravailAutonome())),
            Math.max(1, Math.min(5, userProfile.getPrefPratiqueTerrain())),
            Math.max(1, Math.min(5, userProfile.getPrefTheorieRecherche()))
        };
    }
    
    @Override
    public double getWeight() {
        return 0.60; // 60% du score final
    }
    
    @Override
    public String getCalculatorName() {
        return "Euclidean Score Calculator";
    }
    
    @Override
    public String getDescription() {
        return "Calculateur ultra-optimisé avec différenciation maximale des scores";
    }
    
    @Override
    public boolean isEnabled() {
        return true;
    }
}
