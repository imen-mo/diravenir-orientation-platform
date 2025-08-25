package com.dira.diravenir1.service.strategies;

import com.dira.diravenir1.dto.UserProfileDTO;
import com.dira.diravenir1.dto.MajorProfileDTO;
import com.dira.diravenir1.service.interfaces.MatchingStrategy;
import org.springframework.stereotype.Component;
import lombok.extern.slf4j.Slf4j;

/**
 * Stratégie de matching basée sur la distance euclidienne entre les profils.
 * 
 * Cette stratégie calcule la distance euclidienne entre les 17 piliers
 * du profil utilisateur et du profil majeure, puis la convertit en score
 * de correspondance (0-100%).
 * 
 * Avantages :
 * - Simple et mathématiquement solide
 * - Prend en compte tous les piliers
 * - Résultats reproductibles
 * 
 * Inconvénients :
 * - Traite tous les piliers de manière égale
 * - Ne prend pas en compte l'importance relative des piliers
 */
@Component
@Slf4j
public class EuclideanMatchingStrategy implements MatchingStrategy {
    
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
            
            log.debug("🧮 Calcul de la distance euclidienne entre utilisateur et {}", majorProfile.getProgram());
            
            // Récupération des scores des piliers
            int[] userScores = getUserPillarScores(userProfile);
            int[] majorScores = majorProfile.getAllPillarScores();
            
            // Calcul de la distance euclidienne
            double euclideanDistance = calculateEuclideanDistance(userScores, majorScores);
            
            // Conversion de la distance en score de correspondance (0-100%)
            double matchScore = convertDistanceToScore(euclideanDistance);
            
            log.debug("📐 Distance euclidienne : {:.3f} → Score : {:.1f}%", 
                euclideanDistance, matchScore * 100);
            
            return matchScore;
            
        } catch (Exception e) {
            log.error("❌ Erreur lors du calcul euclidien : {}", e.getMessage(), e);
            return 0.0; // Score minimal en cas d'erreur
        }
    }
    
    @Override
    public String getAlgorithmName() {
        return "Euclidean Matching Strategy";
    }
    
    @Override
    public int getPriority() {
        return 1; // Priorité haute pour cette stratégie fondamentale
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
    
    /**
     * Calcule la distance euclidienne entre deux vecteurs de scores
     * 
     * @param userScores Scores du profil utilisateur
     * @param majorScores Scores du profil majeure
     * @return Distance euclidienne
     */
    private double calculateEuclideanDistance(int[] userScores, int[] majorScores) {
        if (userScores.length != majorScores.length) {
            throw new IllegalArgumentException("Les profils doivent avoir le même nombre de piliers");
        }
        
        double sumSquaredDifferences = 0.0;
        
        for (int i = 0; i < userScores.length; i++) {
            double difference = userScores[i] - majorScores[i];
            sumSquaredDifferences += difference * difference;
        }
        
        return Math.sqrt(sumSquaredDifferences);
    }
    
    /**
     * Convertit une distance euclidienne en score de correspondance (0-100%)
     * 
     * Formule utilisée :
     * - Distance 0 = Score 100% (correspondance parfaite)
     * - Distance max = Score 0% (correspondance nulle)
     * - Conversion linéaire entre ces deux points
     * 
     * @param euclideanDistance La distance euclidienne calculée
     * @return Score de correspondance entre 0.0 et 1.0
     */
    private double convertDistanceToScore(double euclideanDistance) {
        // Distance maximale possible avec des scores 0-100 sur 17 piliers
        // Si tous les scores diffèrent de 100, la distance max = sqrt(17 * 100²) = sqrt(170000) ≈ 412
        double maxPossibleDistance = Math.sqrt(17 * 100 * 100);
        
        // Normalisation de la distance entre 0 et 1
        double normalizedDistance = Math.min(euclideanDistance / maxPossibleDistance, 1.0);
        
        // Conversion en score de correspondance (inverse de la distance)
        double matchScore = 1.0 - normalizedDistance;
        
        // Application d'une courbe de transformation pour améliorer la distribution
        // Utilisation d'une fonction sigmoïde pour accentuer les différences
        matchScore = applySigmoidTransformation(matchScore);
        
        // Assurance que le score reste entre 0 et 1
        return Math.max(0.0, Math.min(1.0, matchScore));
    }
    
    /**
     * Applique une transformation pour améliorer la distribution des scores
     * 
     * @param rawScore Score brut (0-1)
     * @return Score transformé
     */
    private double applySigmoidTransformation(double rawScore) {
        // Transformation plus agressive pour accentuer les différences
        // et donner des scores plus bas pour des profils très différents
        if (rawScore < 0.2) {
            return rawScore * 0.3; // Réduire drastiquement les scores très faibles
        } else if (rawScore < 0.4) {
            return rawScore * 0.5; // Réduire fortement les scores faibles
        } else if (rawScore < 0.6) {
            return rawScore * 0.7; // Réduire modérément les scores moyens
        } else if (rawScore < 0.8) {
            return rawScore * 0.85; // Réduire légèrement les scores moyens-élevés
        } else {
            return rawScore; // Garder les scores élevés
        }
    }
}
