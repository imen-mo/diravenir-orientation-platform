package com.dira.diravenir1.service.calculators;

import com.dira.diravenir1.dto.UserProfileDTO;
import com.dira.diravenir1.dto.MajorProfileDTO;
import com.dira.diravenir1.dto.MatchingResultDTO;
import com.dira.diravenir1.service.calculators.ScoreCalculator;
import org.springframework.stereotype.Component;
import lombok.extern.slf4j.Slf4j;
import java.util.List;
import java.util.ArrayList;

/**
 * Calculateur de score basé sur l'analyse des forces dominantes.
 * 
 * Ce calculateur respecte le principe OCP en étant extensible sans modification :
 * - Identifie les forces dominantes de l'utilisateur et de la majeure
 * - Calcule la correspondance entre ces forces
 * - Prend en compte l'intensité des forces
 * 
 * Avantages :
 * - Met l'accent sur les points forts de l'utilisateur
 * - Résultats plus personnalisés
 * - Prend en compte l'intensité des préférences
 * 
 * Inconvénients :
 * - Peut ignorer les forces moyennes importantes
 * - Nécessite une définition claire des forces dominantes
 */
@Component
@Slf4j
public class ForceAnalysisCalculator implements ScoreCalculator {
    
    // Nombre de forces dominantes à analyser
    private static final int TOP_FORCES_COUNT = 3;
    
    // Seuil pour considérer une force comme dominante (sur 5)
    private static final int DOMINANT_FORCE_THRESHOLD = 4;
    
    @Override
    public List<MatchingResultDTO> calculateMatchingScores(UserProfileDTO userProfile, List<MajorProfileDTO> majorProfiles) {
        List<MatchingResultDTO> results = new ArrayList<>();
        
        for (MajorProfileDTO majorProfile : majorProfiles) {
            try {
                log.debug("💪 Analyse des forces dominantes pour {}", majorProfile.getProgram());
                
                // Récupération des scores des piliers
                int[] userScores = getUserPillarScores(userProfile);
                int[] majorScores = getMajorPillarScores(majorProfile);
                
                // Identification des forces dominantes
                int[] userTopForces = findTopForces(userScores, TOP_FORCES_COUNT);
                int[] majorTopForces = findTopForces(majorScores, TOP_FORCES_COUNT);
                
                // Calcul du score de correspondance des forces
                double forceMatchScore = calculateForceMatch(userScores, majorScores, userTopForces, majorTopForces);
                
                // Bonus pour l'intensité des forces dominantes
                double intensityBonus = calculateIntensityBonus(userScores, majorScores, userTopForces, majorTopForces);
                
                // Score final combiné
                double finalScore = (forceMatchScore * 0.8) + (intensityBonus * 0.2);
                
                // Conversion en score sur 100
                double score100 = finalScore * 100;
                
                log.debug("🎯 Score forces dominantes : {:.1f}%, Bonus intensité : {:.1f}%, Final : {:.1f}%", 
                    forceMatchScore * 100, intensityBonus * 100, score100);
                
                // Création du résultat
                MatchingResultDTO result = MatchingResultDTO.builder()
                    .majorId(majorProfile.getMajorId())
                    .program(majorProfile.getProgram())
                    .category(majorProfile.getCategory())
                    .matchingScore(score100)
                    .calculationMethod("Force Analysis")
                    .algorithmVersion("2.0")
                    .build();
                
                results.add(result);
                
            } catch (Exception e) {
                log.error("❌ Erreur lors de l'analyse des forces pour {} : {}", 
                    majorProfile.getProgram(), e.getMessage(), e);
                
                // Résultat par défaut en cas d'erreur
                MatchingResultDTO errorResult = MatchingResultDTO.builder()
                    .majorId(majorProfile.getMajorId())
                    .program(majorProfile.getProgram())
                    .category(majorProfile.getCategory())
                    .matchingScore(0.0)
                    .calculationMethod("Force Analysis (Error)")
                    .algorithmVersion("2.0")
                    .build();
                
                results.add(errorResult);
            }
        }
        
        // Tri par score décroissant
        results.sort((a, b) -> Double.compare(b.getMatchingScore(), a.getMatchingScore()));
        
        return results;
    }
    
    /**
     * Calcule le score de correspondance des forces dominantes
     */
    private double calculateForceMatch(int[] userScores, int[] majorScores, 
                                     int[] userTopForces, int[] majorTopForces) {
        double totalScore = 0.0;
        int validComparisons = 0;
        
        for (int userForceIndex : userTopForces) {
            if (userForceIndex >= 0 && userForceIndex < userScores.length) {
                double bestMatch = 0.0;
                
                // Trouve la meilleure correspondance avec les forces de la majeure
                for (int majorForceIndex : majorTopForces) {
                    if (majorForceIndex >= 0 && majorForceIndex < majorScores.length) {
                        double match = calculateForceCorrespondence(
                            userScores[userForceIndex], 
                            majorScores[majorForceIndex]
                        );
                        bestMatch = Math.max(bestMatch, match);
                    }
                }
                
                totalScore += bestMatch;
                validComparisons++;
            }
        }
        
        return validComparisons > 0 ? totalScore / validComparisons : 0.0;
    }
    
    /**
     * Calcule le bonus d'intensité des forces dominantes
     */
    private double calculateIntensityBonus(int[] userScores, int[] majorScores,
                                         int[] userTopForces, int[] majorTopForces) {
        double userIntensity = calculateAverageIntensity(userScores, userTopForces);
        double majorIntensity = calculateAverageIntensity(majorScores, majorTopForces);
        
        // Bonus si les deux ont des forces très intenses
        if (userIntensity >= DOMINANT_FORCE_THRESHOLD && majorIntensity >= DOMINANT_FORCE_THRESHOLD) {
            return 0.3; // Bonus de 30%
        } else if (userIntensity >= DOMINANT_FORCE_THRESHOLD || majorIntensity >= DOMINANT_FORCE_THRESHOLD) {
            return 0.15; // Bonus de 15%
        }
        
        return 0.0; // Pas de bonus
    }
    
    /**
     * Calcule la correspondance entre deux forces
     */
    private double calculateForceCorrespondence(int userScore, int majorScore) {
        int diff = Math.abs(userScore - majorScore);
        
        if (diff == 0) return 1.0;      // Correspondance parfaite
        if (diff == 1) return 0.9;      // Très proche
        if (diff == 2) return 0.7;      // Proche
        if (diff == 3) return 0.4;      // Éloigné
        return 0.1;                      // Très éloigné
    }
    
    /**
     * Calcule l'intensité moyenne des forces dominantes
     */
    private double calculateAverageIntensity(int[] scores, int[] forceIndices) {
        double totalIntensity = 0.0;
        int validForces = 0;
        
        for (int index : forceIndices) {
            if (index >= 0 && index < scores.length) {
                totalIntensity += scores[index];
                validForces++;
            }
        }
        
        return validForces > 0 ? totalIntensity / validForces : 0.0;
    }
    
    /**
     * Trouve les indices des n forces dominantes
     */
    private int[] findTopForces(int[] scores, int n) {
        int[] topIndices = new int[n];
        boolean[] used = new boolean[scores.length];
        
        for (int i = 0; i < n; i++) {
            int maxIndex = -1;
            int maxScore = -1;
            
            for (int j = 0; j < scores.length; j++) {
                if (!used[j] && scores[j] > maxScore) {
                    maxScore = scores[j];
                    maxIndex = j;
                }
            }
            
            if (maxIndex != -1) {
                topIndices[i] = maxIndex;
                used[maxIndex] = true;
            }
        }
        
        return topIndices;
    }
    
    /**
     * Extrait les scores des piliers du profil utilisateur
     */
    private int[] getUserPillarScores(UserProfileDTO userProfile) {
        return new int[]{
            userProfile.getInteretScientifiqueTech(),
            userProfile.getInteretArtistiqueCreatif(),
            userProfile.getInteretSocialHumain(),
            userProfile.getInteretBusinessGestion(),
            userProfile.getInteretLogiqueAnalytique(),
            userProfile.getCompetenceResolutionProblemes(),
            userProfile.getCompetenceCommunication(),
            userProfile.getCompetenceOrganisation(),
            userProfile.getCompetenceManuelTechnique(),
            userProfile.getValeurImpactSocietal(),
            userProfile.getValeurInnovationChallenge(),
            userProfile.getValeurStabiliteSecurite(),
            userProfile.getValeurAutonomie(),
            userProfile.getPrefTravailEquipeCollab(),
            userProfile.getPrefTravailAutonome(),
            userProfile.getPrefPratiqueTerrain(),
            userProfile.getPrefTheorieRecherche()
        };
    }
    
    /**
     * Extrait les scores des piliers du profil majeure
     */
    private int[] getMajorPillarScores(MajorProfileDTO majorProfile) {
        return new int[]{
            majorProfile.getInteretScientifiqueTech(),
            majorProfile.getInteretArtistiqueCreatif(),
            majorProfile.getInteretSocialHumain(),
            majorProfile.getInteretBusinessGestion(),
            majorProfile.getInteretLogiqueAnalytique(),
            majorProfile.getCompetenceResolutionProblemes(),
            majorProfile.getCompetenceCommunication(),
            majorProfile.getCompetenceOrganisation(),
            majorProfile.getCompetenceManuelTechnique(),
            majorProfile.getValeurImpactSocietal(),
            majorProfile.getValeurInnovationChallenge(),
            majorProfile.getValeurStabiliteSecurite(),
            majorProfile.getValeurAutonomie(),
            majorProfile.getPrefTravailEquipeCollab(),
            majorProfile.getPrefTravailAutonome(),
            majorProfile.getPrefPratiqueTerrain(),
            majorProfile.getPrefTheorieRecherche()
        };
    }
    
    @Override
    public String getAlgorithmName() {
        return "Force Analysis Calculator";
    }
    
    @Override
    public String getAlgorithmVersion() {
        return "2.0";
    }
    
    @Override
    public String getCalculatorName() {
        return "ForceAnalysisCalculator";
    }
    
    @Override
    public double getWeight() {
        return 0.8; // Poids pour l'analyse des forces
    }
    
    @Override
    public String getDescription() {
        return "Calculateur basé sur l'analyse des forces dominantes";
    }
    
    @Override
    public boolean isEnabled() {
        return true; // Toujours activé
    }
    
    @Override
    public double calculate(UserProfileDTO userProfile, MajorProfileDTO majorProfile) {
        try {
            // Récupération des scores des piliers
            int[] userScores = getUserPillarScores(userProfile);
            int[] majorScores = getMajorPillarScores(majorProfile);
            
            // Identification des forces dominantes
            int[] userTopForces = findTopForces(userScores, TOP_FORCES_COUNT);
            int[] majorTopForces = findTopForces(majorScores, TOP_FORCES_COUNT);
            
            // Calcul du score de correspondance des forces
            double forceMatchScore = calculateForceMatch(userScores, majorScores, userTopForces, majorTopForces);
            
            // Bonus pour l'intensité des forces dominantes
            double intensityBonus = calculateIntensityBonus(userScores, majorScores, userTopForces, majorTopForces);
            
            // Score final combiné
            double finalScore = (forceMatchScore * 0.8) + (intensityBonus * 0.2);
            
            // Conversion en score sur 100
            return finalScore * 100;
            
        } catch (Exception e) {
            log.error("❌ Erreur lors du calcul pour {} : {}", 
                majorProfile.getProgram(), e.getMessage(), e);
            return 0.0;
        }
    }
}
