package com.diravenir.controller;

import com.diravenir.service.StudentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class StudentController {

    private final StudentService studentService;

    /**
     * Récupérer les statistiques de l'étudiant connecté
     */
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStudentStats() {
        try {
            log.info("Récupération des statistiques étudiant");
            Map<String, Object> stats = studentService.getStudentStats();
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des statistiques étudiant", e);
            return ResponseEntity.status(500)
                .body(Map.of("error", "Erreur lors de la récupération des statistiques"));
        }
    }

    /**
     * Récupérer les applications de l'étudiant connecté
     */
    @GetMapping("/applications")
    public ResponseEntity<Map<String, Object>> getStudentApplications() {
        try {
            log.info("Récupération des applications étudiant");
            Map<String, Object> applications = studentService.getStudentApplications();
            return ResponseEntity.ok(applications);
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des applications étudiant", e);
            return ResponseEntity.status(500)
                .body(Map.of("error", "Erreur lors de la récupération des applications"));
        }
    }

    /**
     * Récupérer les résultats de tests de l'étudiant connecté
     */
    @GetMapping("/test-results")
    public ResponseEntity<Map<String, Object>> getStudentTestResults() {
        try {
            log.info("Récupération des résultats de tests étudiant");
            Map<String, Object> testResults = studentService.getStudentTestResults();
            return ResponseEntity.ok(testResults);
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des résultats de tests", e);
            return ResponseEntity.status(500)
                .body(Map.of("error", "Erreur lors de la récupération des résultats de tests"));
        }
    }

    /**
     * Récupérer les données de timeline de l'étudiant connecté
     */
    @GetMapping("/timeline")
    public ResponseEntity<Map<String, Object>> getStudentTimeline() {
        try {
            log.info("Récupération des données timeline étudiant");
            Map<String, Object> timeline = studentService.getStudentTimeline();
            return ResponseEntity.ok(timeline);
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des données timeline", e);
            return ResponseEntity.status(500)
                .body(Map.of("error", "Erreur lors de la récupération des données timeline"));
        }
    }

    /**
     * Récupérer les programmes sauvegardés de l'étudiant connecté
     */
    @GetMapping("/saved-programs")
    public ResponseEntity<Map<String, Object>> getSavedPrograms() {
        try {
            log.info("Récupération des programmes sauvegardés");
            Map<String, Object> savedPrograms = studentService.getSavedPrograms();
            return ResponseEntity.ok(savedPrograms);
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des programmes sauvegardés", e);
            return ResponseEntity.status(500)
                .body(Map.of("error", "Erreur lors de la récupération des programmes sauvegardés"));
        }
    }

    /**
     * Récupérer le profil de l'étudiant connecté
     */
    @GetMapping("/profile")
    public ResponseEntity<Map<String, Object>> getStudentProfile() {
        try {
            log.info("Récupération du profil étudiant");
            Map<String, Object> profile = studentService.getStudentProfile();
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", profile);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Erreur lors de la récupération du profil étudiant", e);
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("error", "Erreur lors de la récupération du profil");
            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    /**
     * Mettre à jour le profil de l'étudiant connecté
     */
    @PutMapping("/profile")
    public ResponseEntity<Map<String, Object>> updateStudentProfile(@RequestBody Map<String, Object> profileData) {
        try {
            log.info("Mise à jour du profil étudiant");
            Map<String, Object> updatedProfile = studentService.updateStudentProfile(profileData);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Profil mis à jour avec succès");
            response.put("data", updatedProfile);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Erreur lors de la mise à jour du profil étudiant", e);
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("error", "Erreur lors de la mise à jour du profil");
            return ResponseEntity.status(500).body(errorResponse);
        }
    }
}
