package com.diravenir.controller;

import com.diravenir.Entities.*;
import com.diravenir.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class StudentDashboardController {

    private final UtilisateurRepository userRepository;
    private final ApplicationRepository applicationRepository;
    private final ProgramRepository programRepository;
    private final OrientationTestRepository orientationTestRepository;
    private final OrientationResultRepository orientationResultRepository;
    private final SavedProgramRepository savedProgramRepository;

    /**
     * Récupérer les statistiques du dashboard étudiant
     */
    @GetMapping("/dashboard/stats")
    public ResponseEntity<Map<String, Object>> getStudentStats(@RequestParam String email) {
        try {
            log.info("📊 Récupération des statistiques pour l'étudiant: {}", email);

            // Récupérer l'étudiant par email
            Utilisateur user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

            // Compter les candidatures de l'étudiant - DONNÉES RÉELLES DE LA BASE
            long totalApplications = applicationRepository.countByUserId(user.getId());
            log.info("📊 Candidatures réelles trouvées: {}", totalApplications);
            
            // Compter les tests d'orientation complétés - DONNÉES RÉELLES DE LA BASE
            long completedTests = orientationTestRepository.countByStudentEmailAndTestStatus(email, TestStatus.COMPLETED);
            long totalTests = orientationTestRepository.countByStudentEmail(email);
            log.info("📊 Tests réels trouvés: {} complétés sur {}", completedTests, totalTests);
            
            // Compter les programmes sauvegardés - DONNÉES RÉELLES DE LA BASE
            long savedPrograms = savedProgramRepository.countByEtudiantEmail(email);
            log.info("📊 Programmes sauvegardés réels trouvés: {}", savedPrograms);
            
            // Calculer le pourcentage de completion du profil
            int profileCompletion = calculateProfileCompletion(user);

            Map<String, Object> stats = Map.of(
                "totalApplications", totalApplications,
                "completedTests", completedTests,
                "totalTests", totalTests,
                "savedPrograms", savedPrograms,
                "profileCompletion", profileCompletion
            );

            log.info("✅ Statistiques récupérées pour {}: {} candidatures, {} tests", 
                    email, totalApplications, completedTests);

            return ResponseEntity.ok(stats);
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération des statistiques: {}", e.getMessage());
            return ResponseEntity.internalServerError().body(Map.of(
                "error", "Erreur lors de la récupération des statistiques: " + e.getMessage()
            ));
        }
    }

    /**
     * Récupérer les candidatures de l'étudiant
     */
    @GetMapping("/dashboard/applications")
    public ResponseEntity<Map<String, Object>> getStudentApplications(@RequestParam String email) {
        try {
            log.info("📋 Récupération des candidatures pour l'étudiant: {}", email);

            // Récupérer l'étudiant par email
            Utilisateur user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

            // Récupérer les candidatures de l'étudiant
            List<Application> applications = applicationRepository.findByUserId(user.getId());

            // Transformer en format frontend
            List<Map<String, Object>> applicationsList = applications.stream()
                .map(application -> {
                    Map<String, Object> app = new HashMap<>();
                    app.put("id", application.getId());
                    app.put("status", application.getStatus());
                    app.put("date", application.getCreatedAt().toString());
                    app.put("createdAt", application.getCreatedAt().toString());
                    
                    if (application.getProgramName() != null) {
                        app.put("program", application.getProgramName());
                        app.put("university", application.getUniversityName());
                        app.put("destination", application.getUniversityName());
                        app.put("tuitionFees", "À déterminer");
                    }
                    
                    return app;
                })
                .collect(Collectors.toList());
            
            Map<String, Object> response = Map.of(
                "applications", applicationsList,
                "total", applicationsList.size()
            );

            log.info("✅ {} candidatures récupérées pour {}", applicationsList.size(), email);

            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération des candidatures: {}", e.getMessage());
            return ResponseEntity.internalServerError().body(Map.of(
                "error", "Erreur lors de la récupération des candidatures: " + e.getMessage()
            ));
        }
    }

    /**
     * Récupérer les résultats des tests d'orientation
     */
    @GetMapping("/dashboard/test-results")
    public ResponseEntity<Map<String, Object>> getStudentTestResults(@RequestParam String email) {
        try {
            log.info("🧪 Récupération des résultats de tests pour l'étudiant: {}", email);

            // Récupérer les tests d'orientation de l'étudiant
            List<OrientationTest> tests = orientationTestRepository.findByStudentEmail(email);

            // Transformer en format frontend
            List<Map<String, Object>> testResults = tests.stream()
                .map(test -> {
                    Map<String, Object> result = new HashMap<>();
                    result.put("id", test.getId());
                    result.put("testName", "Test d'Orientation Professionnelle");
                    result.put("date", test.getTestCompletedAt() != null ? 
                        test.getTestCompletedAt().toString() : test.getTestStartedAt().toString());
                    result.put("status", test.getTestStatus().toString());
                    result.put("duration", test.getTestDurationMinutes() + " minutes");
                    result.put("category", "Orientation");
                    result.put("description", "Évaluation de vos intérêts professionnels et de votre profil de carrière.");
                    
                    // Calculer un score basé sur les réponses
                    int score = calculateTestScore(test);
                    result.put("score", score);
                    result.put("maxScore", 100);
                    
                    // Générer des résultats basés sur les données du test
                    Map<String, Object> results = generateTestResults(test, score);
                    result.put("results", results);
                    
                    return result;
                })
                .collect(Collectors.toList());

            Map<String, Object> response = Map.of(
                "testResults", testResults,
                "total", testResults.size()
            );

            log.info("✅ {} résultats de tests récupérés pour {}", testResults.size(), email);

            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération des résultats de tests: {}", e.getMessage());
            return ResponseEntity.internalServerError().body(Map.of(
                "error", "Erreur lors de la récupération des résultats de tests: " + e.getMessage()
            ));
        }
    }

    /**
     * Récupérer la timeline des activités de l'étudiant
     */
    @GetMapping("/dashboard/timeline")
    public ResponseEntity<Map<String, Object>> getStudentTimeline(@RequestParam String email) {
        try {
            log.info("📅 Récupération de la timeline pour l'étudiant: {}", email);

            // Récupérer l'étudiant par email
            Utilisateur user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

            // Générer une timeline basée sur les données réelles
            List<Map<String, Object>> timeline = generateTimeline(user.getId());

            Map<String, Object> response = Map.of(
                "timeline", timeline
            );

            log.info("✅ Timeline générée pour {}", email);

            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération de la timeline: {}", e.getMessage());
            return ResponseEntity.internalServerError().body(Map.of(
                "error", "Erreur lors de la récupération de la timeline: " + e.getMessage()
            ));
        }
    }


    /**
     * Récupérer les programmes sauvegardés de l'étudiant
     */
    @GetMapping("/programs")
    public ResponseEntity<Map<String, Object>> getSavedPrograms(@RequestParam String email) {
        try {
            log.info("🎓 Récupération des programmes sauvegardés pour l'étudiant: {}", email);

            // Récupérer les programmes sauvegardés de l'étudiant
            List<SavedProgram> savedPrograms = savedProgramRepository.findByEtudiantEmail(email);

            // Transformer en format frontend
            List<Map<String, Object>> programsList = savedPrograms.stream()
                .map(savedProgram -> {
                    Program program = savedProgram.getProgram();
                    Map<String, Object> prog = new HashMap<>();
                    prog.put("id", program.getId());
                    prog.put("name", program.getProgram());
                    prog.put("university", program.getUniversities());
                    prog.put("country", program.getCampusCity());
                    prog.put("field", program.getCategory());
                    prog.put("duration", program.getDuration() + " ans");
                    prog.put("tuition", program.getTuitionFees());
                    prog.put("language", program.getLanguage());
                    prog.put("description", "Programme " + program.getProgram() + " à " + program.getUniversities());
                    prog.put("requirements", "Licence ou équivalent");
                    prog.put("applicationDeadline", "2024-06-15");
                    prog.put("startDate", "2024-09-01");
                    prog.put("savedAt", savedProgram.getSavedAt().toString());
                    prog.put("notes", savedProgram.getNotes());
                    return prog;
                })
                .collect(Collectors.toList());

            Map<String, Object> response = Map.of(
                "programs", programsList,
                "total", programsList.size()
            );

            log.info("✅ {} programmes sauvegardés récupérés pour {}", programsList.size(), email);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération des programmes sauvegardés: {}", e.getMessage());
            return ResponseEntity.internalServerError().body(Map.of(
                "error", "Erreur lors de la récupération des programmes sauvegardés: " + e.getMessage()
            ));
        }
    }

    /**
     * Sauvegarder un programme
     */
    @PostMapping("/save-program")
    public ResponseEntity<Map<String, Object>> saveProgram(@RequestBody Map<String, Object> request) {
        try {
            String email = (String) request.get("userEmail");
            Long programId = Long.valueOf(request.get("programId").toString());
            
            log.info("💾 Sauvegarde du programme {} pour l'étudiant {}", programId, email);

            // Récupérer l'étudiant
            Utilisateur user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

            // Vérifier si le programme est déjà sauvegardé
            Optional<SavedProgram> existingSavedProgram = savedProgramRepository.findByEtudiantIdAndProgramId(user.getId(), programId);
            if (existingSavedProgram.isPresent()) {
                return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Programme déjà sauvegardé"
                ));
            }

            // Récupérer le programme
            Program program = programRepository.findById(programId)
                .orElseThrow(() -> new RuntimeException("Programme non trouvé"));

            // Créer la sauvegarde
            SavedProgram savedProgram = new SavedProgram((Etudiant) user, program);
            savedProgramRepository.save(savedProgram);

            log.info("✅ Programme {} sauvegardé pour {}", programId, email);

            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Programme sauvegardé avec succès"
            ));

        } catch (Exception e) {
            log.error("❌ Erreur lors de la sauvegarde du programme: {}", e.getMessage());
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "error", "Erreur lors de la sauvegarde: " + e.getMessage()
            ));
        }
    }

    /**
     * Retirer un programme des sauvegardés
     */
    @DeleteMapping("/saved-programs/{programId}")
    public ResponseEntity<Map<String, Object>> removeSavedProgram(
            @PathVariable Long programId, 
            @RequestParam String email) {
        try {
            log.info("🗑️ Suppression du programme {} des sauvegardés pour {}", programId, email);

            // Supprimer la sauvegarde
            savedProgramRepository.deleteByEtudiantEmailAndProgramId(email, programId);

            log.info("✅ Programme {} retiré des sauvegardés pour {}", programId, email);

            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Programme retiré des sauvegardés"
            ));

        } catch (Exception e) {
            log.error("❌ Erreur lors de la suppression du programme sauvegardé: {}", e.getMessage());
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "error", "Erreur lors de la suppression: " + e.getMessage()
            ));
        }
    }

    // ===== MÉTHODES UTILITAIRES =====

    private int calculateProfileCompletion(Utilisateur user) {
        int totalFields = 10;
        int completedFields = 0;
        
        if (user.getPrenom() != null && !user.getPrenom().isEmpty()) completedFields++;
        if (user.getNom() != null && !user.getNom().isEmpty()) completedFields++;
        if (user.getEmail() != null && !user.getEmail().isEmpty()) completedFields++;
        if (user.getTelephone() != null && !user.getTelephone().isEmpty()) completedFields++;
        if (user.getAdresse() != null && !user.getAdresse().isEmpty()) completedFields++;
        if (user.getDateNaissance() != null) completedFields++;
        if (user.getVille() != null && !user.getVille().isEmpty()) completedFields++;
        if (user.getPays() != null && !user.getPays().isEmpty()) completedFields++;
        if (user.getNationalite() != null && !user.getNationalite().isEmpty()) completedFields++;
        if (user.getGenre() != null && !user.getGenre().isEmpty()) completedFields++;
        
        return (completedFields * 100) / totalFields;
    }

    private int calculateTestScore(OrientationTest test) {
        // Calculer un score basé sur les réponses et la durée
        int baseScore = 70;
        if (test.getTestDurationMinutes() != null) {
            baseScore += Math.min(20, test.getTestDurationMinutes() / 2);
        }
        if (test.getAnsweredQuestions() != null && test.getTotalQuestions() != null) {
            double completionRate = (double) test.getAnsweredQuestions() / test.getTotalQuestions();
            baseScore += (int) (completionRate * 10);
        }
        return Math.min(100, baseScore);
    }

    private Map<String, Object> generateTestResults(OrientationTest test, int score) {
        Map<String, Object> results = new HashMap<>();
        
        // Générer des points forts basés sur le score
        List<String> strengths = new ArrayList<>();
        if (score >= 80) {
            strengths.addAll(Arrays.asList("Leadership", "Communication", "Analyse"));
        } else if (score >= 70) {
            strengths.addAll(Arrays.asList("Collaboration", "Adaptabilité", "Créativité"));
        } else {
            strengths.addAll(Arrays.asList("Persévérance", "Apprentissage", "Développement"));
        }
        results.put("strengths", strengths);
        
        // Générer des recommandations basées sur le score
        List<String> recommendations = new ArrayList<>();
        if (score >= 80) {
            recommendations.addAll(Arrays.asList("Management", "Consulting", "Entrepreneuriat"));
        } else if (score >= 70) {
            recommendations.addAll(Arrays.asList("Développement Logiciel", "Data Science", "Marketing"));
        } else {
            recommendations.addAll(Arrays.asList("Formation Continue", "Stage", "Mentorat"));
        }
        results.put("recommendations", recommendations);
        
        // Générer un profil de personnalité
        String personality = score >= 80 ? "Extraverti et Analytique" : 
                           score >= 70 ? "Équilibré et Collaboratif" : 
                           "Réfléchi et Persévérant";
        results.put("personality", personality);
        
        return results;
    }

    private List<Map<String, Object>> generateTimeline(Long userId) {
        List<Map<String, Object>> timeline = new ArrayList<>();
        
        // Récupérer les candidatures récentes
        List<Application> applications = applicationRepository.findByUserId(userId);
        
        // Grouper par mois
        Map<String, Integer> monthlyApplications = applications.stream()
            .collect(Collectors.groupingBy(
                a -> a.getCreatedAt().format(DateTimeFormatter.ofPattern("MMM yyyy")),
                Collectors.collectingAndThen(Collectors.counting(), Math::toIntExact)
            ));
        
        // Générer la timeline pour les 6 derniers mois
        LocalDateTime now = LocalDateTime.now();
        for (int i = 5; i >= 0; i--) {
            LocalDateTime month = now.minusMonths(i);
            String monthKey = month.format(DateTimeFormatter.ofPattern("MMM yyyy"));
            
            Map<String, Object> timelineItem = new HashMap<>();
            timelineItem.put("month", monthKey);
            timelineItem.put("applications", monthlyApplications.getOrDefault(monthKey, 0));
            timelineItem.put("tests", i % 2 == 0 ? 1 : 0); // Simulation des tests
            
            timeline.add(timelineItem);
        }
        
        return timeline;
    }
}
