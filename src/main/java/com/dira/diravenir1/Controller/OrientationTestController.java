package com.dira.diravenir1.Controller;

import com.dira.diravenir1.dto.OrientationRequestDTO;
import com.dira.diravenir1.dto.UserProfileDTO;
import com.dira.diravenir1.dto.OrientationRecommendationDTO;
import com.dira.diravenir1.dto.MatchingResultDTO;
import com.dira.diravenir1.dto.MajorProfileDTO;
import com.dira.diravenir1.service.MajorDescriptionService;
import com.dira.diravenir1.service.ProfileScoringService;
import com.dira.diravenir1.service.RecommendationService;
import com.dira.diravenir1.service.IdealProfileService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Contrôleur de test pour valider le système d'orientation complet.
 * 
 * Ce contrôleur permet de tester :
 * - Le calcul des profils utilisateur
 * - La génération des recommandations
 * - Les descriptions personnalisées des majeures
 */
@Slf4j
@RestController
@RequestMapping("/api/test/orientation")
@CrossOrigin(origins = "*")
public class OrientationTestController {

    @Autowired
    private ProfileScoringService profileScoringService;

    @Autowired
    private RecommendationService recommendationService;

    @Autowired
    private MajorDescriptionService majorDescriptionService;
    
    @Autowired
    private IdealProfileService idealProfileService;

    /**
     * Test complet du système d'orientation
     */
    @PostMapping("/test-complete")
    public ResponseEntity<Map<String, Object>> testCompleteSystem(@RequestBody OrientationRequestDTO request) {
        log.info("🧪 Test complet du système d'orientation");
        
        try {
            Map<String, Object> result = new HashMap<>();
            
            // 1. Calcul du profil utilisateur
            log.info("📊 Calcul du profil utilisateur...");
            UserProfileDTO userProfile = profileScoringService.calculateProfileFromResponses(request);
            result.put("userProfile", userProfile);
            
            // 2. Génération des recommandations
            log.info("🎯 Génération des recommandations...");
            OrientationRecommendationDTO recommendations = recommendationService.generateRecommendations(request);
            result.put("recommendations", recommendations);
            
            // 3. Test des descriptions personnalisées pour les top 3
            if (recommendations != null && recommendations.getTopRecommendations() != null && !recommendations.getTopRecommendations().isEmpty()) {
                log.info("📝 Génération des descriptions personnalisées...");
                Map<String, String> personalizedDescriptions = new HashMap<>();
                
                // Test avec les 3 premières recommandations
                List<MatchingResultDTO> topRecs = recommendations.getTopRecommendations();
                for (int i = 0; i < Math.min(3, topRecs.size()); i++) {
                    MatchingResultDTO rec = topRecs.get(i);
                    String majorName = rec.getProgram();
                    Double score = rec.getMatchingScore();
                    
                    if (majorName != null && score != null) {
                        String description = majorDescriptionService.generatePersonalizedDescription(
                            majorName, 
                            score / 100.0, 
                            userProfile
                        );
                        personalizedDescriptions.put(majorName, description);
                    }
                }
                result.put("personalizedDescriptions", personalizedDescriptions);
            }
            
            result.put("status", "success");
            result.put("message", "Test complet réussi");
            
            log.info("✅ Test complet réussi");
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            log.error("❌ Erreur lors du test complet: {}", e.getMessage(), e);
            Map<String, Object> error = new HashMap<>();
            error.put("status", "error");
            error.put("message", "Erreur lors du test: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Test du calcul de profil utilisateur uniquement
     */
    @PostMapping("/test-profile")
    public ResponseEntity<Map<String, Object>> testProfileCalculation(@RequestBody OrientationRequestDTO request) {
        log.info("🧪 Test du calcul de profil utilisateur");
        
        try {
            UserProfileDTO userProfile = profileScoringService.calculateProfileFromResponses(request);
            
            Map<String, Object> result = new HashMap<>();
            result.put("status", "success");
            result.put("userProfile", userProfile);
            result.put("message", "Profil utilisateur calculé avec succès");
            
            log.info("✅ Profil utilisateur calculé avec succès");
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            log.error("❌ Erreur lors du calcul du profil: {}", e.getMessage(), e);
            Map<String, Object> error = new HashMap<>();
            error.put("status", "error");
            error.put("message", "Erreur lors du calcul du profil: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Test des recommandations uniquement
     */
    @PostMapping("/test-recommendations")
    public ResponseEntity<Map<String, Object>> testRecommendations(@RequestBody OrientationRequestDTO request) {
        log.info("🧪 Test des recommandations");
        
        try {
            OrientationRecommendationDTO recommendations = recommendationService.generateRecommendations(request);
            
            Map<String, Object> result = new HashMap<>();
            result.put("status", "success");
            result.put("recommendations", recommendations);
            result.put("count", recommendations.getAllRecommendations() != null ? recommendations.getAllRecommendations().size() : 0);
            result.put("message", "Recommandations générées avec succès");
            
            log.info("✅ {} recommandations générées avec succès", 
                recommendations.getAllRecommendations() != null ? recommendations.getAllRecommendations().size() : 0);
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de la génération des recommandations: {}", e.getMessage(), e);
            Map<String, Object> error = new HashMap<>();
            error.put("status", "error");
            error.put("message", "Erreur lors de la génération des recommandations: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Test des descriptions personnalisées
     */
    @PostMapping("/test-descriptions")
    public ResponseEntity<Map<String, Object>> testDescriptions(
            @RequestParam String majorName,
            @RequestParam double matchingScore,
            @RequestBody UserProfileDTO userProfile) {
        
        log.info("🧪 Test des descriptions personnalisées pour: {}", majorName);
        
        try {
            String description = majorDescriptionService.generatePersonalizedDescription(
                majorName, 
                matchingScore, 
                userProfile
            );
            
            Map<String, Object> result = new HashMap<>();
            result.put("status", "success");
            result.put("majorName", majorName);
            result.put("matchingScore", matchingScore);
            result.put("description", description);
            result.put("message", "Description personnalisée générée avec succès");
            
            log.info("✅ Description personnalisée générée avec succès");
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de la génération de la description: {}", e.getMessage(), e);
            Map<String, Object> error = new HashMap<>();
            error.put("status", "error");
            error.put("message", "Erreur lors de la génération de la description: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Test de santé du système
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        log.info("🏥 Vérification de la santé du système d'orientation");
        
        Map<String, Object> health = new HashMap<>();
        health.put("status", "healthy");
        health.put("service", "Orientation System");
        health.put("timestamp", System.currentTimeMillis());
        health.put("components", List.of(
            "ProfileScoringService",
            "RecommendationService", 
            "MajorDescriptionService"
        ));
        
        return ResponseEntity.ok(health);
    }

    /**
     * Test avec des données d'exemple
     */
    @GetMapping("/test-example")
    public ResponseEntity<Map<String, Object>> testWithExampleData() {
        log.info("🧪 Test avec des données d'exemple");
        
        try {
            // Création d'un exemple de questionnaire
            OrientationRequestDTO exampleRequest = createExampleRequest();
            
            // Test complet
            Map<String, Object> result = new HashMap<>();
            result.put("exampleRequest", exampleRequest);
            result.put("message", "Données d'exemple créées. Utilisez /test-complete pour tester le système complet.");
            
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de la création des données d'exemple: {}", e.getMessage(), e);
            Map<String, Object> error = new HashMap<>();
            error.put("status", "error");
            error.put("message", "Erreur lors de la création des données d'exemple: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Test simple de l'endpoint d'orientation - ACCÈS PUBLIC
     */
    @GetMapping("/test-simple")
    public ResponseEntity<Map<String, Object>> testSimple() {
        log.info("🧪 Test simple du système d'orientation");
        
        Map<String, Object> result = new HashMap<>();
        result.put("status", "success");
        result.put("message", "Système d'orientation accessible");
        result.put("timestamp", java.time.LocalDateTime.now().toString());
        result.put("endpoints", List.of(
            "/api/orientation/majors",
            "/api/orientation/ideal-profiles",
            "/api/orientation/recommendations",
            "/api/orientation/profile"
        ));
        
        return ResponseEntity.ok(result);
    }

    /**
     * Test de récupération des majeures - ACCÈS PUBLIC
     */
    @GetMapping("/test-majors")
    public ResponseEntity<Map<String, Object>> testMajors() {
        log.info("📚 Test de récupération des majeures");
        
        try {
            // Utiliser le service IdealProfileService pour récupérer les majeures
            List<String> majorNames = idealProfileService.getAllMajorNames();
            
            Map<String, Object> result = new HashMap<>();
            result.put("status", "success");
            result.put("message", "Majeures récupérées avec succès");
            result.put("count", majorNames.size());
            result.put("majors", majorNames);
            result.put("timestamp", java.time.LocalDateTime.now().toString());
            
            log.info("✅ {} majeures récupérées avec succès", majorNames.size());
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération des majeures: {}", e.getMessage(), e);
            Map<String, Object> error = new HashMap<>();
            error.put("status", "error");
            error.put("message", "Erreur lors de la récupération des majeures: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Test de récupération des profils idéaux - ACCÈS PUBLIC
     */
    @GetMapping("/test-ideal-profiles")
    public ResponseEntity<Map<String, Object>> testIdealProfiles() {
        log.info("🎯 Test de récupération des profils idéaux");
        
        try {
            // Utiliser le service IdealProfileService pour récupérer les profils
            List<MajorProfileDTO> profiles = idealProfileService.getAllMajorProfiles();
            
            Map<String, Object> result = new HashMap<>();
            result.put("status", "success");
            result.put("message", "Profils idéaux récupérés avec succès");
            result.put("count", profiles.size());
            result.put("profiles", profiles);
            result.put("timestamp", java.time.LocalDateTime.now().toString());
            
            log.info("✅ {} profils idéaux récupérés avec succès", profiles.size());
            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération des profils idéaux: {}", e.getMessage(), e);
            Map<String, Object> error = new HashMap<>();
            error.put("status", "error");
            error.put("message", "Erreur lors de la récupération des profils idéaux: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Crée un exemple de questionnaire pour les tests
     */
    private OrientationRequestDTO createExampleRequest() {
        OrientationRequestDTO request = new OrientationRequestDTO();
        
        // Question 1: Créer quelque chose de nouveau
        request.setQuestion1("A");
        
        // Question 2: Contenu internet préféré
        request.setQuestion2(List.of("découvertes scientifiques", "technologie et innovation", "art et culture"));
        
        // Question 3: Section magasin préférée
        request.setQuestion3("A");
        
        // Question 4: Réaction face à un problème
        request.setQuestion4("A");
        
        // Question 5: Activités naturelles
        request.setQuestion5(List.of("résoudre une équation complexe", "réparer un appareil", "dessiner ou peindre"));
        
        // Question 6: Préférence d'apprentissage
        request.setQuestion6("A");
        
        // Question 7: Type d'impact souhaité
        request.setQuestion7("B");
        
        // Question 8: Environnement de travail
        request.setQuestion8("A");
        
        // Question 9: Critères de carrière
        Map<String, Integer> careerCriteria = new HashMap<>();
        careerCriteria.put("securite", 3);
        careerCriteria.put("innovation", 5);
        careerCriteria.put("autonomie", 4);
        careerCriteria.put("salaire", 2);
        request.setQuestion9(careerCriteria);
        
        // Question 10: Motivation pour résoudre un problème
        request.setQuestion10("A");
        
        // Question 11: Préférence de travail
        request.setQuestion11("B");
        
        // Question 12: Style de présentation
        request.setQuestion12("A");
        
        // Question 13: Prise de décision
        request.setQuestion13("A");
        
        // Question 14: Matières préférées
        request.setQuestion14(List.of("sciences", "technologie et informatique"));
        
        return request;
    }
}
