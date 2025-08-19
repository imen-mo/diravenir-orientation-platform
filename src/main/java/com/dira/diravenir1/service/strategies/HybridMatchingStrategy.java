package com.dira.diravenir1.service.strategies;

import com.dira.diravenir1.dto.UserProfileDTO;
import com.dira.diravenir1.dto.MajorProfileDTO;
import com.dira.diravenir1.service.interfaces.MatchingStrategy;
import org.springframework.stereotype.Component;
import lombok.extern.slf4j.Slf4j;

/**
 * Stratégie de matching hybride qui combine plusieurs approches pour une évaluation
 * plus nuancée et équilibrée.
 * 
 * Cette stratégie respecte le principe OCP en étant extensible sans modification :
 * - Combine distance euclidienne et analyse des forces dominantes
 * - Prend en compte l'importance relative des piliers
 * - Adapte le calcul selon le type de majeure
 * 
 * Avantages :
 * - Plus sophistiquée que la stratégie euclidienne simple
 * - Prend en compte les spécificités des majeures
 * - Résultats plus nuancés et réalistes
 * 
 * Inconvénients :
 * - Plus complexe à maintenir
 * - Nécessite une configuration fine
 */
@Component
@Slf4j
public class HybridMatchingStrategy implements MatchingStrategy {
    
    // Poids pour les différents composants du score hybride
    private static final double EUCLIDEAN_WEIGHT = 0.6;      // 60% pour la distance euclidienne
    private static final double FORCE_ANALYSIS_WEIGHT = 0.25; // 25% pour l'analyse des forces
    private static final double CRITICAL_PILLAR_WEIGHT = 0.15; // 15% pour les piliers critiques
    
    @Override
    public double execute(UserProfileDTO userProfile, MajorProfileDTO majorProfile) {
        try {
            log.debug("🔄 Exécution de la stratégie hybride pour {}", majorProfile.getMajorName());
            
            // 1. Calcul de la distance euclidienne (60%)
            double euclideanScore = calculateEuclideanScore(userProfile, majorProfile);
            
            // 2. Analyse des forces dominantes (25%)
            double forceAnalysisScore = calculateForceAnalysisScore(userProfile, majorProfile);
            
            // 3. Correspondance des piliers critiques (15%)
            double criticalPillarScore = calculateCriticalPillarScore(userProfile, majorProfile);
            
            // 4. Combinaison pondérée des scores
            double finalScore = (euclideanScore * EUCLIDEAN_WEIGHT) +
                               (forceAnalysisScore * FORCE_ANALYSIS_WEIGHT) +
                               (criticalPillarScore * CRITICAL_PILLAR_WEIGHT);
            
            log.debug("🎯 Scores composants - Euclidien: {:.1f}%, Forces: {:.1f}%, Critique: {:.1f}%", 
                euclideanScore * 100, forceAnalysisScore * 100, criticalPillarScore * 100);
            log.debug("🏆 Score final hybride : {:.1f}%", finalScore * 100);
            
            return Math.min(1.0, Math.max(0.0, finalScore)); // Normalisation 0-1
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de l'exécution de la stratégie hybride : {}", e.getMessage(), e);
            return 0.0;
        }
    }
    
    @Override
    public String getAlgorithmName() {
        return "Hybrid Matching Strategy";
    }
    
    @Override
    public int getPriority() {
        return 2; // Priorité moyenne, après la stratégie euclidienne
    }
    
    /**
     * Calcule le score basé sur la distance euclidienne
     */
    private double calculateEuclideanScore(UserProfileDTO userProfile, MajorProfileDTO majorProfile) {
        int[] userScores = getUserPillarScores(userProfile);
        int[] majorScores = majorProfile.getAllPillarScores();
        
        double distance = calculateEuclideanDistance(userScores, majorScores);
        return convertDistanceToScore(distance);
    }
    
    /**
     * Calcule le score basé sur l'analyse des forces dominantes
     */
    private double calculateForceAnalysisScore(UserProfileDTO userProfile, MajorProfileDTO majorProfile) {
        // Identifie les 3 forces dominantes de l'utilisateur
        int[] userScores = getUserPillarScores(userProfile);
        int[] topUserForces = findTopForces(userScores, 3);
        
        // Identifie les 3 forces dominantes de la majeure
        int[] majorScores = majorProfile.getAllPillarScores();
        int[] topMajorForces = findTopForces(majorScores, 3);
        
        // Calcule la correspondance entre les forces dominantes
        int matches = countMatchingForces(topUserForces, topMajorForces);
        
        // Score basé sur le nombre de correspondances (0-100%)
        return matches / 3.0;
    }
    
    /**
     * Calcule le score basé sur la correspondance des piliers critiques
     */
    private double calculateCriticalPillarScore(UserProfileDTO userProfile, MajorProfileDTO majorProfile) {
        // Piliers critiques pour chaque type de majeure
        int[] criticalPillars = getCriticalPillarsForMajor(majorProfile.getMajorName());
        
        if (criticalPillars.length == 0) {
            return 0.5; // Score neutre si pas de piliers critiques définis
        }
        
        int[] userScores = getUserPillarScores(userProfile);
        int[] majorScores = majorProfile.getAllPillarScores();
        
        double totalScore = 0.0;
        for (int pillarIndex : criticalPillars) {
            if (pillarIndex >= 0 && pillarIndex < userScores.length) {
                // Calcule la correspondance pour ce pilier critique
                double pillarScore = calculatePillarCorrespondence(
                    userScores[pillarIndex], 
                    majorScores[pillarIndex]
                );
                totalScore += pillarScore;
            }
        }
        
        return totalScore / criticalPillars.length;
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
     * Calcule la distance euclidienne entre deux vecteurs
     */
    private double calculateEuclideanDistance(int[] userScores, int[] majorScores) {
        double sumSquaredDiff = 0.0;
        for (int i = 0; i < userScores.length && i < majorScores.length; i++) {
            double diff = userScores[i] - majorScores[i];
            sumSquaredDiff += diff * diff;
        }
        return Math.sqrt(sumSquaredDiff);
    }
    
    /**
     * Convertit une distance euclidienne en score de correspondance (0-100%)
     */
    private double convertDistanceToScore(double distance) {
        // Distance maximale possible avec des scores 1-5 : sqrt(17 * 4²) = sqrt(272) ≈ 16.5
        double maxDistance = 16.5;
        double normalizedDistance = Math.min(distance / maxDistance, 1.0);
        return 1.0 - normalizedDistance;
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
     * Compte le nombre de forces correspondantes
     */
    private int countMatchingForces(int[] userForces, int[] majorForces) {
        int matches = 0;
        for (int userForce : userForces) {
            for (int majorForce : majorForces) {
                if (userForce == majorForce) {
                    matches++;
                    break;
                }
            }
        }
        return matches;
    }
    
    /**
     * Définit les piliers critiques pour chaque type de majeure
     */
    private int[] getCriticalPillarsForMajor(String majorName) {
        if (majorName == null) return new int[0];
        
        String majorLower = majorName.toLowerCase();
        
        if (majorLower.contains("informatique") || majorLower.contains("computer")) {
            return new int[]{0, 4, 5}; // Scientifique, Logique, Résolution problèmes
        } else if (majorLower.contains("art") || majorLower.contains("design")) {
            return new int[]{1, 8, 10}; // Artistique, Manuel, Innovation
        } else if (majorLower.contains("business") || majorLower.contains("gestion")) {
            return new int[]{3, 6, 7}; // Business, Communication, Organisation
        } else if (majorLower.contains("médecine") || majorLower.contains("santé")) {
            return new int[]{2, 6, 9}; // Social, Communication, Impact sociétal
        } else if (majorLower.contains("ingénieur") || majorLower.contains("engineering")) {
            return new int[]{0, 4, 8}; // Scientifique, Logique, Manuel
        }
        
        return new int[0]; // Pas de piliers critiques spécifiques
    }
    
    /**
     * Calcule la correspondance pour un pilier spécifique
     */
    private double calculatePillarCorrespondence(int userScore, int majorScore) {
        int diff = Math.abs(userScore - majorScore);
        if (diff == 0) return 1.0;      // Correspondance parfaite
        if (diff == 1) return 0.8;      // Très proche
        if (diff == 2) return 0.6;      // Proche
        if (diff == 3) return 0.4;      // Éloigné
        return 0.2;                      // Très éloigné
    }
}
