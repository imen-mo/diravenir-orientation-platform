package com.dira.diravenir1.service;

import com.dira.diravenir1.dto.OrientationRequestDTO;
import com.dira.diravenir1.dto.UserProfileDTO;
import com.dira.diravenir1.dto.MajorProfileDTO;
import com.dira.diravenir1.dto.MatchingResultDTO;
import com.dira.diravenir1.dto.OrientationRecommendationDTO;
import com.dira.diravenir1.dto.MajorRecommendationDTO;
import com.dira.diravenir1.dto.MatchingResult;
import com.dira.diravenir1.service.calculators.EuclideanScoreCalculator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Service de recommandations d'orientation selon les spécifications exactes
 * du "Système d'Orientation des Étudiants".
 * 
 * Ce service orchestre le processus complet :
 * 1. Calcul du profil utilisateur à partir des réponses
 * 2. Matching avec les profils idéaux des majeures
 * 3. Génération des recommandations personnalisées
 * 4. Explication des correspondances par pilier
 */
@Service
@Slf4j
public class RecommendationService {
    
    @Autowired
    private ProfileScoringService profileScoringService;
    
    @Autowired
    private EuclideanScoreCalculator euclideanCalculator;
    
    @Autowired
    private IdealProfileService idealProfileService;
    
    /**
     * Génère les recommandations d'orientation complètes selon les spécifications exactes
     */
    public OrientationRecommendationDTO generateRecommendations(OrientationRequestDTO request) {
        log.info("🚀 Génération des recommandations d'orientation selon les spécifications exactes");
        
        try {
            // Étape 1: Calcul du profil utilisateur selon la matrice des 17 piliers
            UserProfileDTO userProfile = profileScoringService.calculateProfileFromResponses(request);
            log.info("✅ Profil utilisateur calculé avec {} piliers", getProfilePillarCount(userProfile));
            
            // Étape 2: Récupération de tous les profils idéaux des majeures
            List<MajorProfileDTO> majorProfiles = idealProfileService.getAllMajorProfiles();
            log.info("✅ {} profils de majeures récupérés", majorProfiles.size());
            
            // Étape 3: Calcul des scores de matching avec l'algorithme euclidien pondéré
            List<MatchingResultDTO> matchingResults = euclideanCalculator.calculateMatchingScores(userProfile, majorProfiles);
            log.info("✅ Scores de matching calculés pour {} majeures", matchingResults.size());
            
            // Étape 4: Génération des recommandations personnalisées
            OrientationRecommendationDTO recommendations = buildRecommendations(userProfile, matchingResults);
            log.info("✅ Recommandations générées avec succès");
            
            return recommendations;
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de la génération des recommandations", e);
            throw new RuntimeException("Erreur lors de la génération des recommandations d'orientation", e);
        }
    }
    
    /**
     * Construit l'objet de recommandations final selon les spécifications exactes
     */
    private OrientationRecommendationDTO buildRecommendations(UserProfileDTO userProfile, 
                                                           List<MatchingResultDTO> matchingResults) {
        
        OrientationRecommendationDTO recommendations = new OrientationRecommendationDTO();
        recommendations.setUserId("user_" + System.currentTimeMillis()); // ID temporaire
        recommendations.setTimestamp(new Date());
        recommendations.setUserProfile(userProfile);
        
        // Top 3 recommandations selon les spécifications
        List<MatchingResultDTO> top3 = matchingResults.stream()
            .limit(3)
                .collect(Collectors.toList());
            
        recommendations.setTopRecommendations(top3);
        
        // Toutes les recommandations classées
        recommendations.setAllRecommendations(matchingResults);
        
        // Statistiques du profil utilisateur
        recommendations.setProfileStatistics(calculateProfileStatistics(userProfile));
        
        // Explications personnalisées pour chaque recommandation
        recommendations.setRecommendationExplanations(
            generatePersonalizedExplanations(userProfile, top3));
        
        log.info("🏆 Top 3 recommandations : {} ({}%), {} ({}%), {} ({}%)", 
            top3.get(0).getProgram(), Math.round(top3.get(0).getMatchingScore()),
            top3.get(1).getProgram(), Math.round(top3.get(1).getMatchingScore()),
            top3.get(2).getProgram(), Math.round(top3.get(2).getMatchingScore()));
            
            return recommendations;
    }
    
    /**
     * Calcule les statistiques du profil utilisateur pour l'analyse
     */
    private Map<String, Object> calculateProfileStatistics(UserProfileDTO userProfile) {
        Map<String, Object> stats = new HashMap<>();
        
        // Scores moyens par catégorie selon les spécifications
        double avgInterets = calculateAverage(
            userProfile.getInteretScientifiqueTech(),
            userProfile.getInteretArtistiqueCreatif(),
            userProfile.getInteretSocialHumain(),
            userProfile.getInteretBusinessGestion(),
            userProfile.getInteretLogiqueAnalytique()
        );
        
        double avgCompetences = calculateAverage(
            userProfile.getCompetenceResolutionProblemes(),
            userProfile.getCompetenceCommunication(),
            userProfile.getCompetenceOrganisation(),
            userProfile.getCompetenceManuelTechnique()
        );
        
        double avgValeurs = calculateAverage(
            userProfile.getValeurImpactSocietal(),
            userProfile.getValeurInnovationChallenge(),
            userProfile.getValeurStabiliteSecurite(),
            userProfile.getValeurAutonomie()
        );
        
        double avgPreferences = calculateAverage(
            userProfile.getPrefTravailEquipeCollab(),
            userProfile.getPrefTravailAutonome(),
            userProfile.getPrefPratiqueTerrain(),
            userProfile.getPrefTheorieRecherche()
        );
        
        stats.put("moyenneInterets", Math.round(avgInterets * 100.0) / 100.0);
        stats.put("moyenneCompetences", Math.round(avgCompetences * 100.0) / 100.0);
        stats.put("moyenneValeurs", Math.round(avgValeurs * 100.0) / 100.0);
        stats.put("moyennePreferences", Math.round(avgPreferences * 100.0) / 100.0);
        
        // Piliers dominants (scores > 70)
        List<String> piliersDominants = new ArrayList<>();
        if (userProfile.getInteretScientifiqueTech() > 70) 
            piliersDominants.add("Intérêt Scientifique & Tech");
        if (userProfile.getInteretArtistiqueCreatif() > 70) 
            piliersDominants.add("Intérêt Artistique & Créatif");
        if (userProfile.getInteretSocialHumain() > 70) 
            piliersDominants.add("Intérêt Social & Humain");
        if (userProfile.getInteretBusinessGestion() > 70) 
            piliersDominants.add("Intérêt Business & Gestion");
        if (userProfile.getInteretLogiqueAnalytique() > 70) 
            piliersDominants.add("Intérêt Logique & Analytique");
        
        stats.put("piliersDominants", piliersDominants);
        stats.put("nombrePiliersDominants", piliersDominants.size());
        
        return stats;
    }
    
    /**
     * Génère des explications personnalisées pour chaque recommandation
     * selon les spécifications du "Système d'Orientation des Étudiants"
     */
    private Map<String, String> generatePersonalizedExplanations(UserProfileDTO userProfile, 
                                                               List<MatchingResultDTO> topRecommendations) {
        
        Map<String, String> explanations = new HashMap<>();
        
        for (MatchingResultDTO recommendation : topRecommendations) {
            String explanation = buildPersonalizedExplanation(userProfile, recommendation);
            explanations.put(recommendation.getMajorId(), explanation);
        }
        
        return explanations;
    }
    
    /**
     * Construit une explication personnalisée pour une recommandation spécifique
     * Identifie les piliers où les scores de l'utilisateur et de la majeure sont les plus élevés
     */
    private String buildPersonalizedExplanation(UserProfileDTO userProfile, MatchingResultDTO recommendation) {
        StringBuilder explanation = new StringBuilder();
        explanation.append("Votre profil correspond parfaitement à cette filière grâce à plusieurs points forts : ");
        
        // Analyse des correspondances par pilier
        List<String> correspondances = new ArrayList<>();
        
        // Intérêts
        if (isHighCorrespondence(userProfile.getInteretScientifiqueTech(), recommendation, "Interet_Scientifique_Tech")) {
            correspondances.add("votre passion pour la technologie et les sciences");
        }
        if (isHighCorrespondence(userProfile.getInteretArtistiqueCreatif(), recommendation, "Interet_Artistique_Creatif")) {
            correspondances.add("votre créativité et votre sens artistique");
        }
        if (isHighCorrespondence(userProfile.getInteretSocialHumain(), recommendation, "Interet_Social_Humain")) {
            correspondances.add("votre intérêt pour les relations humaines et l'aide aux autres");
        }
        if (isHighCorrespondence(userProfile.getInteretBusinessGestion(), recommendation, "Interet_Business_Gestion")) {
            correspondances.add("votre goût pour la gestion et les affaires");
        }
        if (isHighCorrespondence(userProfile.getInteretLogiqueAnalytique(), recommendation, "Interet_Logique_Analytique")) {
            correspondances.add("votre capacité d'analyse et de raisonnement logique");
        }
        
        // Compétences
        if (isHighCorrespondence(userProfile.getCompetenceResolutionProblemes(), recommendation, "Competence_Resolution_Problemes")) {
            correspondances.add("votre aptitude à résoudre des problèmes complexes");
        }
        if (isHighCorrespondence(userProfile.getCompetenceCommunication(), recommendation, "Competence_Communication")) {
            correspondances.add("vos excellentes compétences en communication");
        }
        if (isHighCorrespondence(userProfile.getCompetenceOrganisation(), recommendation, "Competence_Organisation")) {
            correspondances.add("votre sens de l'organisation et de la planification");
        }
        if (isHighCorrespondence(userProfile.getCompetenceManuelTechnique(), recommendation, "Competence_Manuel_Technique")) {
            correspondances.add("votre habileté manuelle et technique");
        }
        
        // Valeurs
        if (isHighCorrespondence(userProfile.getValeurImpactSocietal(), recommendation, "Valeur_Impact_Societal")) {
            correspondances.add("votre désir d'avoir un impact positif sur la société");
        }
        if (isHighCorrespondence(userProfile.getValeurInnovationChallenge(), recommendation, "Valeur_Innovation_Challenge")) {
            correspondances.add("votre goût pour l'innovation et les défis");
        }
        if (isHighCorrespondence(userProfile.getValeurStabiliteSecurite(), recommendation, "Valeur_Stabilite_Securite")) {
            correspondances.add("votre recherche de stabilité et de sécurité");
        }
        if (isHighCorrespondence(userProfile.getValeurAutonomie(), recommendation, "Valeur_Autonomie")) {
            correspondances.add("votre besoin d'autonomie et de liberté");
        }
        
        // Préférences de travail
        if (isHighCorrespondence(userProfile.getPrefTravailEquipeCollab(), recommendation, "Pref_Travail_Equipe_Collab")) {
            correspondances.add("votre préférence pour le travail en équipe");
        }
        if (isHighCorrespondence(userProfile.getPrefTravailAutonome(), recommendation, "Pref_Travail_Autonome")) {
            correspondances.add("votre capacité à travailler de manière autonome");
        }
        if (isHighCorrespondence(userProfile.getPrefPratiqueTerrain(), recommendation, "Pref_Pratique_Terrain")) {
            correspondances.add("votre goût pour le travail pratique et sur le terrain");
        }
        if (isHighCorrespondence(userProfile.getPrefTheorieRecherche(), recommendation, "Pref_Theorie_Recherche")) {
            correspondances.add("votre intérêt pour la recherche théorique");
        }
        
        // Construction de l'explication finale
        if (correspondances.isEmpty()) {
            explanation.append("vos compétences générales et votre polyvalence.");
        } else {
            // Limiter à 3-4 correspondances pour la lisibilité
            List<String> topCorrespondances = correspondances.stream()
                .limit(4)
                .collect(Collectors.toList());
            
            for (int i = 0; i < topCorrespondances.size(); i++) {
                if (i == 0) {
                    explanation.append(topCorrespondances.get(i));
                } else if (i == topCorrespondances.size() - 1) {
                    explanation.append(" et ").append(topCorrespondances.get(i));
                } else {
                    explanation.append(", ").append(topCorrespondances.get(i));
                }
            }
            explanation.append(".");
        }
        
        explanation.append(" Ces qualités font de vous un candidat idéal pour cette formation.");
        
        return explanation.toString();
    }
    
    /**
     * Vérifie si il y a une correspondance élevée entre le profil utilisateur et la majeure
     * pour un pilier spécifique
     */
    private boolean isHighCorrespondence(Integer userScore, MatchingResultDTO recommendation, String pillarName) {
        if (userScore == null || userScore < 70) {
            return false;
        }
        
        // Vérifier si le pilier est important pour cette majeure (score > 70)
        Map<String, Double> pillarScores = recommendation.getPillarScores();
        if (pillarScores != null && pillarScores.containsKey(pillarName)) {
            Double pillarScore = pillarScores.get(pillarName);
            return pillarScore != null && pillarScore < 20; // Différence faible = bonne correspondance
        }
        
        return false;
    }
    
    /**
     * Calcule la moyenne d'une liste de scores
     */
    private double calculateAverage(Integer... scores) {
        return Arrays.stream(scores)
            .filter(Objects::nonNull)
            .mapToInt(Integer::intValue)
            .average()
            .orElse(0.0);
    }
    
    /**
     * Compte le nombre de piliers dans le profil utilisateur
     */
    private int getProfilePillarCount(UserProfileDTO userProfile) {
        int count = 0;
        if (userProfile.getInteretScientifiqueTech() > 0) count++;
        if (userProfile.getInteretArtistiqueCreatif() > 0) count++;
        if (userProfile.getInteretSocialHumain() > 0) count++;
        if (userProfile.getInteretBusinessGestion() > 0) count++;
        if (userProfile.getInteretLogiqueAnalytique() > 0) count++;
        if (userProfile.getCompetenceResolutionProblemes() > 0) count++;
        if (userProfile.getCompetenceCommunication() > 0) count++;
        if (userProfile.getCompetenceOrganisation() > 0) count++;
        if (userProfile.getCompetenceManuelTechnique() > 0) count++;
        if (userProfile.getValeurImpactSocietal() > 0) count++;
        if (userProfile.getValeurInnovationChallenge() > 0) count++;
        if (userProfile.getValeurStabiliteSecurite() > 0) count++;
        if (userProfile.getValeurAutonomie() > 0) count++;
        if (userProfile.getPrefTravailEquipeCollab() > 0) count++;
        if (userProfile.getPrefTravailAutonome() > 0) count++;
        if (userProfile.getPrefPratiqueTerrain() > 0) count++;
        if (userProfile.getPrefTheorieRecherche() > 0) count++;
        return count;
    }
    
    /**
     * Récupère les recommandations par catégorie
     */
    public Map<String, List<MatchingResultDTO>> getRecommendationsByCategory(List<MatchingResultDTO> allRecommendations) {
        return allRecommendations.stream()
            .collect(Collectors.groupingBy(MatchingResultDTO::getCategory));
    }
    
    /**
     * Filtre les recommandations par score minimum
     */
    public List<MatchingResultDTO> filterRecommendationsByScore(List<MatchingResultDTO> recommendations, double minScore) {
        return recommendations.stream()
            .filter(r -> r.getMatchingScore() >= minScore)
            .collect(Collectors.toList());
    }
    
    /**
     * Génère des recommandations à partir d'une liste de résultats de matching
     * Cette méthode est utilisée par les tests pour valider la logique
     */
    public List<MajorRecommendationDTO> generateRecommendations(List<MatchingResult> matchingResults) {
        log.info("🚀 Génération des recommandations à partir de {} résultats de matching", matchingResults.size());
        
        List<MajorRecommendationDTO> recommendations = new ArrayList<>();
        
        for (MatchingResult result : matchingResults) {
            MajorRecommendationDTO recommendation = MajorRecommendationDTO.builder()
                .name(result.getProgram())
                .domaine(result.getCategory())
                .matchingScore((int) (result.getGlobalScore() * 100)) // Conversion en pourcentage
                .explanation(generateExplanationFromMatchingResult(result))
                .build();
            
            recommendations.add(recommendation);
        }
        
        // Tri par score décroissant
        recommendations.sort((a, b) -> Integer.compare(b.getMatchingScore(), a.getMatchingScore()));
        
        log.info("✅ {} recommandations générées avec succès", recommendations.size());
        return recommendations;
    }
    
    /**
     * Génère une explication basée sur le résultat de matching
     */
    private String generateExplanationFromMatchingResult(MatchingResult result) {
        StringBuilder explanation = new StringBuilder();
        explanation.append("Cette filière correspond à votre profil avec un score de ");
        explanation.append(String.format("%.1f", result.getGlobalScore() * 100));
        explanation.append("%. ");
        
        if (result.getEuclideanScore() > 0.7) {
            explanation.append("Vos intérêts et compétences correspondent parfaitement aux exigences de cette formation. ");
        } else if (result.getEuclideanScore() > 0.5) {
            explanation.append("Vos intérêts et compétences correspondent bien aux exigences de cette formation. ");
        } else {
            explanation.append("Cette formation pourrait vous intéresser malgré quelques différences dans votre profil. ");
        }
        
        explanation.append("L'algorithme utilisé est ").append(result.getAlgorithmUsed()).append(".");
        
        return explanation.toString();
    }
}
