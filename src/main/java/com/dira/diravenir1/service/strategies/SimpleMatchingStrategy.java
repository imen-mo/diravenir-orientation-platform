package com.dira.diravenir1.service.strategies;

import com.dira.diravenir1.dto.UserProfileDTO;
import com.dira.diravenir1.dto.MajorProfileDTO;
import com.dira.diravenir1.service.interfaces.MatchingStrategy;
import org.springframework.stereotype.Component;
import lombok.extern.slf4j.Slf4j;

/**
 * Stratégie de matching simple basée sur la correspondance directe des scores.
 * 
 * Cette stratégie respecte le principe OCP en étant extensible sans modification :
 * - Calcule la correspondance directe entre les scores utilisateur et majeure
 * - Utilise une approche simple de pourcentage de correspondance
 * - Idéale pour les tests et les cas de base
 * 
 * Avantages :
 * - Simple à comprendre et maintenir
 * - Rapide à exécuter
 * - Résultats prévisibles
 * 
 * Inconvénients :
 * - Moins sophistiquée que les autres stratégies
 * - Ne prend pas en compte l'importance relative des piliers
 * - Peut donner des résultats trop linéaires
 */
@Component
@Slf4j
public class SimpleMatchingStrategy implements MatchingStrategy {
    
    @Override
    public double execute(UserProfileDTO userProfile, MajorProfileDTO majorProfile) {
        try {
            // Vérification des paramètres null
            if (userProfile == null || majorProfile == null) {
                log.warn("⚠️ Profil null détecté - userProfile: {}, majorProfile: {}", 
                    userProfile == null ? "null" : "non-null",
                    majorProfile == null ? "null" : "non-null");
                return 0.0;
            }
            
            log.debug("📊 Exécution de la stratégie simple pour {}", majorProfile.getMajorName());
            
            // Récupération des scores des piliers
            int[] userScores = getUserPillarScores(userProfile);
            int[] majorScores = majorProfile.getAllPillarScores();
            
            // Calcul du score de correspondance simple
            double matchScore = calculateSimpleMatch(userScores, majorScores);
            
            log.debug("🎯 Score de correspondance simple : {:.1f}%", matchScore * 100);
            
            return matchScore;
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de l'exécution de la stratégie simple : {}", e.getMessage(), e);
            return 0.0;
        }
    }
    
    @Override
    public String getAlgorithmName() {
        return "Simple Matching Strategy";
    }
    
    @Override
    public int getPriority() {
        return 3; // Priorité basse, utilisée en dernier recours
    }
    
    /**
     * Calcule le score de correspondance simple entre deux profils
     * 
     * @param userScores Scores du profil utilisateur
     * @param majorScores Scores du profil majeure
     * @return Score de correspondance entre 0.0 et 1.0 (0% à 100%)
     */
    private double calculateSimpleMatch(int[] userScores, int[] majorScores) {
        if (userScores == null || majorScores == null || 
            userScores.length == 0 || majorScores.length == 0) {
            return 0.0;
        }
        
        int totalPillars = Math.min(userScores.length, majorScores.length);
        double totalScore = 0.0;
        
        // Optimisation : calcul direct sans appel de méthode pour chaque pilier
        for (int i = 0; i < totalPillars; i++) {
            int userScore = userScores[i];
            int majorScore = majorScores[i];
            
            // Calcul direct du score pour ce pilier
            double difference = Math.abs(userScore - majorScore);
            double pillarScore;
            
            if (difference == 0) {
                pillarScore = 1.0;
            } else if (difference <= 25) {
                pillarScore = 0.8;
            } else if (difference <= 50) {
                pillarScore = 0.5;
            } else if (difference <= 75) {
                pillarScore = 0.2;
            } else {
                pillarScore = 0.05;
            }
            
            totalScore += pillarScore;
        }
        
        // Retourne la moyenne des scores des piliers
        return totalScore / totalPillars;
    }
    
    /**
     * Calcule le score de correspondance pour un pilier spécifique
     * 
     * @param userScore Score de l'utilisateur pour ce pilier (1-5)
     * @param majorScore Score de la majeure pour ce pilier (1-5)
     * @return Score de correspondance entre 0.0 et 1.0
     */
    private double calculatePillarScore(int userScore, int majorScore) {
        // Normalisation des scores (1-5) vers (0-1)
        double normalizedUserScore = (userScore - 1) / 4.0;
        double normalizedMajorScore = (majorScore - 1) / 4.0;
        
        // Calcul de la correspondance basée sur la proximité
        double difference = Math.abs(normalizedUserScore - normalizedMajorScore);
        
        if (difference == 0.0) {
            return 1.0; // Correspondance parfaite
        } else if (difference <= 0.25) {
            return 0.8; // Très proche
        } else if (difference <= 0.5) {
            return 0.5; // Proche
        } else if (difference <= 0.75) {
            return 0.2; // Éloigné
        } else {
            return 0.05; // Très éloigné
        }
    }
    
    /**
     * Extrait les scores des piliers du profil utilisateur
     * 
     * @param userProfile Le profil utilisateur
     * @return Tableau des 17 scores des piliers
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
}
