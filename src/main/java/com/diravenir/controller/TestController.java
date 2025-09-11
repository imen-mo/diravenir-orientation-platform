package com.diravenir.controller;

import com.diravenir.repository.OrientationMajorRepository;
import com.diravenir.repository.IdealProfileRepository;
import com.diravenir.service.OrientationScoringService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
@RequiredArgsConstructor
@Slf4j
public class TestController {

    private final OrientationMajorRepository majorRepository;
    private final IdealProfileRepository idealProfileRepository;
    private final OrientationScoringService scoringService;

    @GetMapping("/database-status")
    public ResponseEntity<Map<String, Object>> getDatabaseStatus() {
        try {
            long majorCount = majorRepository.count();
            long idealProfileCount = idealProfileRepository.count();
            
            Map<String, Object> status = new HashMap<>();
            status.put("success", true);
            status.put("majorCount", majorCount);
            status.put("idealProfileCount", idealProfileCount);
            status.put("message", "Base de données accessible");
            
            log.info("📊 Statut base de données - Majeures: {}, Profils idéaux: {}", majorCount, idealProfileCount);
            
            return ResponseEntity.ok(status);
        } catch (Exception e) {
            log.error("❌ Erreur lors de la vérification de la base de données: {}", e.getMessage());
            
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            
            return ResponseEntity.internalServerError().body(error);
        }
    }

    @GetMapping("/sample-majors")
    public ResponseEntity<Map<String, Object>> getSampleMajors() {
        try {
            var majors = majorRepository.findByIsActiveTrueOrderByDisplayOrderAsc();
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("count", majors.size());
            response.put("majors", majors.stream().limit(5).map(major -> Map.of(
                "id", major.getId(),
                "name", major.getMajorName(),
                "code", major.getMajorCode(),
                "category", major.getCategory()
            )));
            
            log.info("📋 Échantillon de {} majeures récupérées", majors.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération des majeures: {}", e.getMessage());
            
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            
            return ResponseEntity.internalServerError().body(error);
        }
    }

    @GetMapping("/test-scoring")
    public ResponseEntity<Map<String, Object>> testScoring() {
        try {
            // Test avec des réponses d'exemple
            Map<String, String> testAnswers = new HashMap<>();
            testAnswers.put("q1", "A"); // Créer
            testAnswers.put("q2", "A"); // Découvertes/Tech
            testAnswers.put("q3", "A"); // Électronique
            testAnswers.put("q4", "A"); // Décomposer
            testAnswers.put("q5", "D"); // Réparer
            testAnswers.put("q6", "C"); // Essayer
            testAnswers.put("q7", "B"); // Systèmes efficaces
            testAnswers.put("q8", "A"); // Labo
            testAnswers.put("q9", "B"); // Innovation
            testAnswers.put("q10", "D"); // Techno avancée
            testAnswers.put("q11", "A"); // Seul
            testAnswers.put("q12", "A"); // Faits
            testAnswers.put("q13", "A"); // Logique
            testAnswers.put("q14", "A"); // Sciences
            
            // Utiliser le service de scoring
            Map<String, Integer> profile = scoringService.calculateUserProfile(testAnswers);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("testAnswers", testAnswers);
            response.put("calculatedProfile", profile);
            response.put("message", "Test de scoring réussi");
            
            log.info("🧪 Test de scoring réussi avec {} piliers calculés", profile.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("❌ Erreur lors du test de scoring: {}", e.getMessage());
            
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            
            return ResponseEntity.internalServerError().body(error);
        }
    }
}
