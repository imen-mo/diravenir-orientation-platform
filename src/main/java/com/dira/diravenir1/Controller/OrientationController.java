package com.dira.diravenir1.Controller;

import com.dira.diravenir1.dto.OrientationRequestDTO;
import com.dira.diravenir1.dto.OrientationRecommendationDTO;
import com.dira.diravenir1.dto.UserProfileDTO;
import com.dira.diravenir1.dto.MajorProfileDTO;
import com.dira.diravenir1.service.RecommendationService;
import com.dira.diravenir1.service.IdealProfileService;
import com.dira.diravenir1.service.ProfileScoringService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Map;

/**
 * Contrôleur d'orientation selon les spécifications exactes
 * du "Système d'Orientation des Étudiants".
 * 
 * Ce contrôleur gère :
 * - Le calcul des profils utilisateur
 * - La génération des recommandations
 * - L'accès aux profils idéaux des majeures
 * - L'analyse des correspondances
 */
@RestController
@RequestMapping("/api/orientation")
@CrossOrigin(origins = "*")
@Slf4j
public class OrientationController {

    @Autowired
    private RecommendationService recommendationService;
    
    @Autowired
    private IdealProfileService idealProfileService;
    
    @Autowired
    private ProfileScoringService profileScoringService;
    
    /**
     * Génère les recommandations d'orientation complètes selon les spécifications exactes
     * POST /api/orientation/recommendations
     */
    @PostMapping("/recommendations")
    public ResponseEntity<OrientationRecommendationDTO> generateRecommendations(
            @RequestBody OrientationRequestDTO request) {
        
        log.info("🚀 Demande de génération de recommandations d'orientation reçue");
        log.info("📝 Questions reçues : {}", getQuestionsSummary(request));
        
        try {
            long startTime = System.currentTimeMillis();
            
            // Génération des recommandations avec l'algorithme euclidien pondéré
            OrientationRecommendationDTO recommendations = recommendationService.generateRecommendations(request);
            
            long endTime = System.currentTimeMillis();
            recommendations.setCalculationTimeMs(endTime - startTime);
            recommendations.setTotalMajorsEvaluated(recommendations.getAllRecommendations().size());
            recommendations.setTotalPillarsAnalyzed(17); // Selon les spécifications exactes
            
            log.info("✅ Recommandations générées avec succès en {} ms", endTime - startTime);
            log.info("🏆 Top recommandation : {} ({}%)", 
                recommendations.getTopRecommendations().get(0).getProgram(),
                Math.round(recommendations.getTopRecommendations().get(0).getMatchingScore()));
            
            return ResponseEntity.ok(recommendations);
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de la génération des recommandations", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Calcule uniquement le profil utilisateur selon la matrice des 17 piliers
     * POST /api/orientation/profile
     */
    @PostMapping("/profile")
    public ResponseEntity<UserProfileDTO> calculateUserProfile(
            @RequestBody OrientationRequestDTO request) {
        
        log.info("🧮 Demande de calcul de profil utilisateur reçue");
        
        try {
            UserProfileDTO userProfile = profileScoringService.calculateProfileFromResponses(request);
            
            log.info("✅ Profil utilisateur calculé avec {} piliers", getProfilePillarCount(userProfile));
            log.info("📊 Scores moyens - Intérêts: {}, Compétences: {}, Valeurs: {}, Préférences: {}", 
                calculateAverageScore(userProfile, "interet"),
                calculateAverageScore(userProfile, "competence"),
                calculateAverageScore(userProfile, "valeur"),
                calculateAverageScore(userProfile, "pref"));
            
            return ResponseEntity.ok(userProfile);
            
        } catch (Exception e) {
            log.error("❌ Erreur lors du calcul du profil utilisateur", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Endpoint principal pour le calcul d'orientation (compatibilité frontend)
     * POST /api/orientation/calculate
     */
    @PostMapping("/calculate")
    public ResponseEntity<OrientationRecommendationDTO> calculateOrientation(
            @RequestBody OrientationRequestDTO request) {
        
        log.info("🚀 Demande de calcul d'orientation reçue (endpoint /calculate)");
        log.info("📝 Questions reçues : {}", getQuestionsSummary(request));
        
        try {
            long startTime = System.currentTimeMillis();
            
            // Génération des recommandations avec l'algorithme euclidien pondéré
            OrientationRecommendationDTO recommendations = recommendationService.generateRecommendations(request);
            
            long endTime = System.currentTimeMillis();
            recommendations.setCalculationTimeMs(endTime - startTime);
            recommendations.setTotalMajorsEvaluated(recommendations.getAllRecommendations().size());
            recommendations.setTotalPillarsAnalyzed(17); // Selon les spécifications exactes
            
            log.info("✅ Orientation calculée avec succès en {} ms", endTime - startTime);
            log.info("🏆 Top recommandation : {} ({}%)", 
                recommendations.getTopRecommendations().get(0).getProgram(),
                Math.round(recommendations.getTopRecommendations().get(0).getMatchingScore()));
            
            return ResponseEntity.ok(recommendations);
            
        } catch (Exception e) {
            log.error("❌ Erreur lors du calcul d'orientation", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Récupère tous les profils idéaux des majeures disponibles
     * GET /api/orientation/ideal-profiles
     */
    @GetMapping("/ideal-profiles")
    public ResponseEntity<List<MajorProfileDTO>> getAllIdealProfiles() {
        
        log.info("📚 Demande de récupération de tous les profils idéaux");
        
        try {
            List<MajorProfileDTO> profiles = idealProfileService.getAllMajorProfiles();
            
            log.info("✅ {} profils idéaux récupérés avec succès", profiles.size());
            
            return ResponseEntity.ok(profiles);
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération des profils idéaux", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Récupère un profil idéal spécifique par nom de majeure
     * GET /api/orientation/ideal-profiles/{majorName}
     */
    @GetMapping("/ideal-profiles/{majorName}")
    public ResponseEntity<MajorProfileDTO> getIdealProfile(@PathVariable String majorName) {
        
        log.info("🎯 Demande de profil idéal pour la majeure : {}", majorName);
        
        try {
            Map<String, Integer> profile = idealProfileService.getIdealProfile(majorName);
            
            if (profile == null) {
                log.warn("⚠️ Profil idéal non trouvé pour la majeure : {}", majorName);
                return ResponseEntity.notFound().build();
            }
            
            MajorProfileDTO majorProfile = idealProfileService.convertToMajorProfileDTO(majorName, profile);
            
            log.info("✅ Profil idéal récupéré pour {} avec {} piliers", majorName, profile.size());
            
            return ResponseEntity.ok(majorProfile);
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération du profil idéal pour {}", majorName, e);
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Récupère les noms de toutes les majeures disponibles
     * GET /api/orientation/majors
     */
    @GetMapping("/majors")
    public ResponseEntity<List<String>> getAllMajorNames() {
        
        log.info("📋 Demande de récupération de tous les noms de majeures");
        
        try {
            List<String> majorNames = idealProfileService.getAllMajorNames();
            
            log.info("✅ {} noms de majeures récupérés avec succès", majorNames.size());
            
            return ResponseEntity.ok(majorNames);
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération des noms de majeures", e);
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /**
     * Vérifie si une majeure existe
     * GET /api/orientation/majors/{majorName}/exists
     */
    @GetMapping("/majors/{majorName}/exists")
    public ResponseEntity<Map<String, Boolean>> checkMajorExists(@PathVariable String majorName) {
        
        log.info("🔍 Vérification de l'existence de la majeure : {}", majorName);
        
        try {
            boolean exists = idealProfileService.majorExists(majorName);
            
            log.info("✅ Majeure '{}' existe : {}", majorName, exists);
            
            return ResponseEntity.ok(Map.of("exists", exists));
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de la vérification de l'existence de la majeure {}", majorName, e);
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /**
     * Récupère les statistiques des profils idéaux
     * GET /api/orientation/statistics
     */
    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getProfileStatistics() {
        
        log.info("📊 Demande de statistiques des profils idéaux");
        
        try {
            int totalProfiles = idealProfileService.getTotalProfilesCount();
            List<String> majorNames = idealProfileService.getAllMajorNames();
            
            Map<String, Object> stats = Map.of(
                "totalProfiles", totalProfiles,
                "totalMajors", majorNames.size(),
                "algorithmVersion", "2.0",
                "scoringMatrix", "17 Pillars Matrix v2.0",
                "matchingAlgorithm", "Euclidean Distance Weighted",
                "normalizationMethod", "0-100 Scale"
            );
            
            log.info("✅ Statistiques récupérées : {} profils, {} majeures", totalProfiles, majorNames.size());
            
            return ResponseEntity.ok(stats);
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération des statistiques", e);
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /**
     * Test de santé du système d'orientation
     * GET /api/orientation/health
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        
        log.info("🏥 Vérification de la santé du système d'orientation");
        
        try {
            int totalProfiles = idealProfileService.getTotalProfilesCount();
            List<String> majorNames = idealProfileService.getAllMajorNames();
            
            Map<String, Object> health = Map.of(
                "status", "HEALTHY",
                "timestamp", System.currentTimeMillis(),
                "totalProfiles", totalProfiles,
                "totalMajors", majorNames.size(),
                "algorithmVersion", "2.0",
                "scoringMatrix", "17 Pillars Matrix v2.0",
                "matchingAlgorithm", "Euclidean Distance Weighted"
            );
            
            log.info("✅ Système d'orientation en bonne santé : {} profils, {} majeures", totalProfiles, majorNames.size());
            
            return ResponseEntity.ok(health);
            
        } catch (Exception e) {
            log.error("❌ Système d'orientation en mauvaise santé", e);
            
            Map<String, Object> health = Map.of(
                "status", "UNHEALTHY",
                "timestamp", System.currentTimeMillis(),
                "error", e.getMessage()
            );
            
            return ResponseEntity.status(503).body(health);
        }
    }
    
    // ===== MÉTHODES UTILITAIRES =====
    
    /**
     * Génère un résumé des questions reçues pour le logging
     */
    private String getQuestionsSummary(OrientationRequestDTO request) {
        if (request == null) return "Aucune question";
        
        StringBuilder summary = new StringBuilder();
        summary.append("Q1:").append(request.getQuestion1() != null ? request.getQuestion1() : "null").append(", ");
        summary.append("Q2:").append(request.getQuestion2() != null ? request.getQuestion2().size() : "0").append(" réponses, ");
        summary.append("Q3:").append(request.getQuestion3() != null ? request.getQuestion3() : "null").append(", ");
        summary.append("Q4:").append(request.getQuestion4() != null ? request.getQuestion4() : "null").append(", ");
        summary.append("Q5:").append(request.getQuestion5() != null ? request.getQuestion5().size() : "0").append(" réponses, ");
        summary.append("Q6:").append(request.getQuestion6() != null ? request.getQuestion6() : "null").append(", ");
        summary.append("Q7:").append(request.getQuestion7() != null ? request.getQuestion7() : "null").append(", ");
        summary.append("Q8:").append(request.getQuestion8() != null ? request.getQuestion8() : "null").append(", ");
        summary.append("Q9:").append(request.getQuestion9() != null ? request.getQuestion9().size() : "0").append(" curseurs, ");
        summary.append("Q10:").append(request.getQuestion10() != null ? request.getQuestion10() : "null").append(", ");
        summary.append("Q11:").append(request.getQuestion11() != null ? request.getQuestion11() : "null").append(", ");
        summary.append("Q12:").append(request.getQuestion12() != null ? request.getQuestion12() : "null").append(", ");
        summary.append("Q13:").append(request.getQuestion13() != null ? request.getQuestion13() : "null").append(", ");
        summary.append("Q14:").append(request.getQuestion14() != null ? request.getQuestion14().size() : "0").append(" matières");
        
        return summary.toString();
    }
    
    /**
     * Compte le nombre de piliers dans le profil utilisateur
     */
    private int getProfilePillarCount(UserProfileDTO userProfile) {
        if (userProfile == null) return 0;
        
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
     * Calcule le score moyen pour une catégorie de piliers
     */
    private double calculateAverageScore(UserProfileDTO userProfile, String category) {
        if (userProfile == null) return 0.0;
        
        double sum = 0.0;
        int count = 0;
        
        switch (category.toLowerCase()) {
            case "interet":
                sum += getScoreOrZero(userProfile.getInteretScientifiqueTech());
                sum += getScoreOrZero(userProfile.getInteretArtistiqueCreatif());
                sum += getScoreOrZero(userProfile.getInteretSocialHumain());
                sum += getScoreOrZero(userProfile.getInteretBusinessGestion());
                sum += getScoreOrZero(userProfile.getInteretLogiqueAnalytique());
                count = 5;
                break;
            case "competence":
                sum += getScoreOrZero(userProfile.getCompetenceResolutionProblemes());
                sum += getScoreOrZero(userProfile.getCompetenceCommunication());
                sum += getScoreOrZero(userProfile.getCompetenceOrganisation());
                sum += getScoreOrZero(userProfile.getCompetenceManuelTechnique());
                count = 4;
                break;
            case "valeur":
                sum += getScoreOrZero(userProfile.getValeurImpactSocietal());
                sum += getScoreOrZero(userProfile.getValeurInnovationChallenge());
                sum += getScoreOrZero(userProfile.getValeurStabiliteSecurite());
                sum += getScoreOrZero(userProfile.getValeurAutonomie());
                count = 4;
                break;
            case "pref":
                sum += getScoreOrZero(userProfile.getPrefTravailEquipeCollab());
                sum += getScoreOrZero(userProfile.getPrefTravailAutonome());
                sum += getScoreOrZero(userProfile.getPrefPratiqueTerrain());
                sum += getScoreOrZero(userProfile.getPrefTheorieRecherche());
                count = 4;
                break;
        }
        
        return count > 0 ? sum / count : 0.0;
    }
    
    /**
     * Récupère le score ou 0 si null
     */
    private double getScoreOrZero(int score) {
        return score;
    }
}
