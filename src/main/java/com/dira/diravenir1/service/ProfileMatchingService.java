package com.dira.diravenir1.service;

import com.dira.diravenir1.dto.UserProfileDTO;
import com.dira.diravenir1.dto.MajorProfileDTO;
import com.dira.diravenir1.dto.MatchingResult;
import com.dira.diravenir1.dto.MatchingResultDTO;
import com.dira.diravenir1.service.interfaces.MatchingStrategy;
import com.dira.diravenir1.service.calculators.ScoreCalculator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.stream.Collectors;

/**
 * Service spécialisé dans le matching des profils utilisateur avec les majeures.
 * 
 * RESPONSABILITÉ UNIQUE (SRP) : Gérer uniquement le processus de matching
 * 
 * Ce service :
 * - Coordonne les stratégies de matching
 * - Combine les calculateurs de scores
 * - Retourne les résultats de matching
 * 
 * Il ne gère PAS :
 * - Le mapping des réponses (responsabilité de ResponseMappingService)
 * - La génération des recommandations (responsabilité de RecommendationService)
 * - La configuration des algorithmes (responsabilité de ConfigurationService)
 */
@Service
@Slf4j
public class ProfileMatchingService {
    
    @Autowired
    private List<MatchingStrategy> matchingStrategies;
    
    @Autowired
    private List<ScoreCalculator> scoreCalculators;
    
    /**
     * Effectue le matching d'un profil utilisateur avec toutes les majeures disponibles
     * 
     * @param userProfile Le profil de l'utilisateur
     * @param availableMajors Liste des majeures disponibles
     * @return Liste des résultats de matching triés par score décroissant
     */
    public List<MatchingResult> matchAllMajors(UserProfileDTO userProfile, List<MajorProfileDTO> availableMajors) {
        log.info("🚀 Début du matching pour l'utilisateur avec {} majeures disponibles", availableMajors.size());
        
        long startTime = System.currentTimeMillis();
        List<MatchingResult> results = new ArrayList<>();
        
        try {
            // Vérification des données d'entrée
            if (userProfile == null) {
                throw new IllegalArgumentException("Le profil utilisateur ne peut pas être null");
            }
            if (availableMajors == null || availableMajors.isEmpty()) {
                log.warn("⚠️ Aucune majeure disponible pour le matching");
                return results;
            }
            
            // Tri des stratégies par priorité
            List<MatchingStrategy> sortedStrategies = getSortedStrategies();
            log.info("📊 Utilisation de {} stratégies de matching", sortedStrategies.size());
            
            // Tri des calculateurs par poids
            List<ScoreCalculator> sortedCalculators = getSortedCalculators();
            log.info("🧮 Utilisation de {} calculateurs de scores", sortedCalculators.size());
            
            // Matching avec chaque majeure
            for (MajorProfileDTO major : availableMajors) {
                MatchingResult result = matchUserWithMajor(userProfile, major, sortedStrategies, sortedCalculators);
                if (result != null) {
                    results.add(result);
                }
            }
            
            // Tri des résultats par score décroissant
            results.sort(Comparator.comparing(MatchingResult::getGlobalScore).reversed());
            
            long processingTime = System.currentTimeMillis() - startTime;
            log.info("✅ Matching terminé en {}ms. {} résultats générés", processingTime, results.size());
            
            // Log des 3 meilleurs résultats
            if (!results.isEmpty()) {
                log.info("🏆 Top 3 des correspondances :");
                for (int i = 0; i < Math.min(3, results.size()); i++) {
                    MatchingResult topResult = results.get(i);
                    log.info("   {}. {} : {:.1f}%", 
                        i + 1, 
                        topResult.getProgram(), 
                        topResult.getGlobalScorePercentage());
                }
            }
            
        } catch (Exception e) {
            log.error("❌ Erreur lors du matching : {}", e.getMessage(), e);
            throw new RuntimeException("Erreur lors du matching des profils", e);
        }
        
        return results;
    }
    
    /**
     * Effectue le matching d'un utilisateur avec une majeure spécifique
     * 
     * @param userProfile Le profil de l'utilisateur
     * @param majorProfile Le profil de la majeure
     * @param strategies Les stratégies de matching triées par priorité
     * @param calculators Les calculateurs de scores triés par poids
     * @return Résultat du matching ou null en cas d'erreur
     */
    private MatchingResult matchUserWithMajor(
            UserProfileDTO userProfile, 
            MajorProfileDTO majorProfile,
            List<MatchingStrategy> strategies,
            List<ScoreCalculator> calculators) {
        
        try {
            long startTime = System.currentTimeMillis();
            
            // Utilisation de la stratégie principale (la plus prioritaire)
            MatchingStrategy primaryStrategy = strategies.get(0);
            double primaryScore = primaryStrategy.execute(userProfile, majorProfile);
            
            log.debug("🔍 Matching utilisateur avec {} : score principal = {:.3f} ({})", 
                majorProfile.getProgram(), 
                primaryScore, 
                primaryStrategy.getAlgorithmName());
            
            // Calcul des scores détaillés avec les calculateurs
            double euclideanScore = 0.0;
            double forceAnalysisScore = 0.0;
            double criticalPillarScore = 0.0;
            
            for (ScoreCalculator calculator : calculators) {
                try {
                    List<MatchingResultDTO> calculatorResults = calculator.calculateMatchingScores(userProfile, List.of(majorProfile));
                    if (!calculatorResults.isEmpty()) {
                        double score = calculatorResults.get(0).getMatchingScore() / 100.0; // Conversion en 0-1
                        
                        // Attribution du score selon le type de calculateur
                        if (calculator.getAlgorithmName().contains("Euclidean")) {
                            euclideanScore = score;
                        } else if (calculator.getAlgorithmName().contains("Force")) {
                            forceAnalysisScore = score;
                        } else if (calculator.getAlgorithmName().contains("Critical")) {
                            criticalPillarScore = score;
                        }
                        
                        log.debug("   📊 {} : {:.3f}", calculator.getAlgorithmName(), score);
                    }
                } catch (Exception e) {
                    log.warn("⚠️ Erreur avec le calculateur {} : {}", calculator.getAlgorithmName(), e.getMessage());
                }
            }
            
            // Calcul du score final pondéré
            double finalScore = calculateWeightedFinalScore(
                euclideanScore, forceAnalysisScore, criticalPillarScore, calculators);
            
            long processingTime = System.currentTimeMillis() - startTime;
            
            // Création du résultat
            MatchingResult result = MatchingResult.builder()
                .majorId(majorProfile.getMajorId())
                .program(majorProfile.getProgram())
                .category(majorProfile.getCategory())
                .globalScore(finalScore)
                .euclideanScore(euclideanScore)
                .forceAnalysisScore(forceAnalysisScore)
                .criticalPillarScore(criticalPillarScore)
                .algorithmUsed(primaryStrategy.getAlgorithmName())
                .processingTimeMs(processingTime)
                .matchingDate(java.time.LocalDateTime.now().toString())
                .build();
            
            return result;
            
        } catch (Exception e) {
            log.error("❌ Erreur lors du matching avec {} : {}", 
                majorProfile.getProgram(), e.getMessage(), e);
            return null;
        }
    }
    
    /**
     * Calcule le score final pondéré en utilisant les calculateurs
     * 
     * @param euclideanScore Score euclidien
     * @param forceAnalysisScore Score d'analyse des forces
     * @param criticalPillarScore Score des piliers critiques
     * @param calculators Liste des calculateurs avec leurs poids
     * @return Score final pondéré
     */
         private double calculateWeightedFinalScore(
             double euclideanScore, 
             double forceAnalysisScore, 
             double criticalPillarScore,
             List<ScoreCalculator> calculators) {
         
         // Poids fixes pour chaque type de calculateur
         double euclideanWeight = 0.65;      // 65% - Distance euclidienne
         double forceAnalysisWeight = 0.25;  // 25% - Analyse des forces
         double criticalPillarWeight = 0.10; // 10% - Piliers critiques
         
         double totalWeight = euclideanWeight + forceAnalysisWeight + criticalPillarWeight;
         double weightedSum = (euclideanScore * euclideanWeight) + 
                             (forceAnalysisScore * forceAnalysisWeight) + 
                             (criticalPillarScore * criticalPillarWeight);
         
         // Normalisation si nécessaire
         if (totalWeight > 0) {
             return weightedSum / totalWeight;
         } else {
             // Fallback : moyenne simple
             return (euclideanScore + forceAnalysisScore + criticalPillarScore) / 3.0;
         }
     }
    
    /**
     * Retourne les stratégies de matching triées par priorité
     * 
     * @return Liste des stratégies triées
     */
    private List<MatchingStrategy> getSortedStrategies() {
        return matchingStrategies.stream()
            .filter(MatchingStrategy::isEnabled)
            .sorted(Comparator.comparing(MatchingStrategy::getPriority))
            .collect(Collectors.toList());
    }
    
         /**
      * Retourne les calculateurs de scores triés par type
      * 
      * @return Liste des calculateurs triés par type
      */
     private List<ScoreCalculator> getSortedCalculators() {
         return scoreCalculators.stream()
             .filter(calc -> calc != null)
             .sorted(Comparator.comparing(ScoreCalculator::getAlgorithmName))
             .collect(Collectors.toList());
     }
     
     /**
      * Retourne le nombre de stratégies de matching disponibles
      * 
      * @return Nombre de stratégies
      */
     public int getAvailableStrategiesCount() {
         return (int) matchingStrategies.stream()
             .filter(MatchingStrategy::isEnabled)
             .count();
     }
     
     /**
      * Retourne le nombre de calculateurs de scores disponibles
      * 
      * @return Nombre de calculateurs
      */
     public int getAvailableCalculatorsCount() {
         return (int) scoreCalculators.stream()
             .filter(calc -> calc != null)
             .count();
     }
}
