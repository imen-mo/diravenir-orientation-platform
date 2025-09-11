package com.diravenir.controller;

import com.diravenir.Entities.OrientationResult;
import com.diravenir.dto.OrientationRequestDTO;
import com.diravenir.dto.OrientationResultDTO;
import com.diravenir.service.OrientationPersistenceService;
import com.diravenir.service.OrientationCalculationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/orientation")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class OrientationPersistenceController {
    
    private final OrientationPersistenceService persistenceService;
    private final OrientationCalculationService calculationService;
    
    /**
     * Sauvegarde les réponses d'un test d'orientation
     */
    @PostMapping("/save-answers")
    public ResponseEntity<Map<String, Object>> saveAnswers(@RequestBody OrientationRequestDTO request) {
        try {
            log.info("💾 Sauvegarde des réponses pour: {}", request.getStudentInfo().getEmail());
            
            var test = persistenceService.saveOrientationAnswers(request);
            
            Map<String, Object> response = Map.of(
                "success", true,
                "message", "Réponses sauvegardées avec succès",
                "testId", test.getId(),
                "studentEmail", test.getStudentEmail(),
                "testStatus", test.getTestStatus().toString()
            );
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("Erreur lors de la sauvegarde des réponses: {}", e.getMessage(), e);
            Map<String, Object> errorResponse = Map.of(
                "success", false,
                "error", e.getMessage()
            );
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    /**
     * Sauvegarde les résultats d'orientation
     */
    @PostMapping("/save-results")
    public ResponseEntity<Map<String, Object>> saveResults(@RequestBody Map<String, Object> request) {
        try {
            log.info("💾 Sauvegarde des résultats");
            
            Long testId = Long.valueOf(request.get("testId").toString());
            Map<String, Integer> userProfile = (Map<String, Integer>) request.get("userProfile");
            List<Map<String, Object>> recommendationsData = (List<Map<String, Object>>) request.get("recommendations");
            
            // Convertir les recommandations en DTO
            var recommendations = recommendationsData.stream()
                    .map(this::convertToRecommendationDto)
                    .toList();
            
            var result = persistenceService.saveOrientationResults(testId, userProfile, recommendations);
            
            Map<String, Object> response = Map.of(
                "success", true,
                "message", "Résultats sauvegardés avec succès",
                "resultId", result.getId(),
                "topScore", result.getTopRecommendationScore(),
                "topMajor", result.getTopRecommendationMajor()
            );
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("Erreur lors de la sauvegarde des résultats: {}", e.getMessage(), e);
            Map<String, Object> errorResponse = Map.of(
                "success", false,
                "error", e.getMessage()
            );
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    /**
     * Récupère les résultats d'un étudiant par email
     */
    @GetMapping("/results/{email}")
    public ResponseEntity<Map<String, Object>> getResultsByEmail(@PathVariable String email) {
        try {
            log.info("📊 Récupération des résultats pour: {}", email);
            
            Optional<OrientationResultDTO> resultOpt = persistenceService.getResultsByStudentEmail(email);
            
            if (resultOpt.isEmpty()) {
                Map<String, Object> response = Map.of(
                    "success", false,
                    "message", "Aucun résultat trouvé pour cet étudiant"
                );
                return ResponseEntity.notFound().build();
            }
            
            OrientationResultDTO result = resultOpt.get();
            
            Map<String, Object> response = Map.of(
                "success", true,
                "studentEmail", result.getOrientationTest().getStudentEmail(),
                "studentName", result.getOrientationTest().getStudentName(),
                "topScore", result.getTopRecommendationScore(),
                "topMajor", result.getTopRecommendationMajor(),
                "calculatedAt", result.getCalculatedAt(),
                "recommendationsCount", result.getRecommendations().size()
            );
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des résultats: {}", e.getMessage(), e);
            Map<String, Object> errorResponse = Map.of(
                "success", false,
                "error", e.getMessage()
            );
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    /**
     * Récupère les statistiques globales
     */
    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getStatistics() {
        try {
            log.info("📈 Récupération des statistiques");
            
            Map<String, Object> statistics = persistenceService.getGlobalStatistics();
            
            Map<String, Object> response = Map.of(
                "success", true,
                "statistics", statistics
            );
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des statistiques: {}", e.getMessage(), e);
            Map<String, Object> errorResponse = Map.of(
                "success", false,
                "error", e.getMessage()
            );
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    /**
     * Endpoint complet : calcul + sauvegarde
     */
    @PostMapping("/calculate-and-save")
    public ResponseEntity<Map<String, Object>> calculateAndSave(@RequestBody OrientationRequestDTO request) {
        try {
            log.info("🎯 Calcul et sauvegarde complète pour: {}", request.getStudentInfo().getEmail());
            
            // 1. Calculer le profil utilisateur
            Map<String, Integer> userProfile = calculationService.calculateUserProfile(request);
            
            // 2. Obtenir les recommandations
            var recommendations = calculationService.getRecommendationsWithIdealProfiles(userProfile);
            
            // 3. Sauvegarder les réponses
            var test = persistenceService.saveOrientationAnswers(request);
            
            // 4. Sauvegarder les résultats
            var result = persistenceService.saveOrientationResults(test.getId(), userProfile, recommendations);
            
            Map<String, Object> response = Map.of(
                "success", true,
                "message", "Calcul et sauvegarde réussis",
                "userProfile", userProfile,
                "recommendations", recommendations,
                "testId", test.getId(),
                "resultId", result.getId(),
                "topScore", result.getTopRecommendationScore(),
                "topMajor", result.getTopRecommendationMajor()
            );
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("Erreur lors du calcul et sauvegarde: {}", e.getMessage(), e);
            Map<String, Object> errorResponse = Map.of(
                "success", false,
                "error", e.getMessage()
            );
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    private com.diravenir.dto.MajorRecommendationDto convertToRecommendationDto(Map<String, Object> data) {
        return com.diravenir.dto.MajorRecommendationDto.builder()
                .majorCode((String) data.get("majorCode"))
                .majorName((String) data.get("majorName"))
                .matchingScore((Double) data.get("matchingScore"))
                .matchingPercentage((String) data.get("matchingPercentage"))
                .category((String) data.get("category"))
                .description((String) data.get("description"))
                .whyThisMajor((String) data.get("whyThisMajor"))
                .reasoning((String) data.get("reasoning"))
                .build();
    }
}
