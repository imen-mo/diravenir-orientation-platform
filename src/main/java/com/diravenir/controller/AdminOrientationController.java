package com.diravenir.controller;

import com.diravenir.service.OrientationPersistenceService;
import com.diravenir.repository.OrientationTestRepository;
import com.diravenir.repository.OrientationResultRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/admin/orientation")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class AdminOrientationController {

    private final OrientationTestRepository testRepository;
    private final OrientationResultRepository resultRepository;
    // private final OrientationPersistenceService persistenceService; // Non utilisé pour l'instant

    /**
     * Obtenir les statistiques globales des tests d'orientation
     */
    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getOrientationStatistics() {
        try {
            log.info("📊 Récupération des statistiques d'orientation pour l'admin");

            // Statistiques de base
            long totalTests = testRepository.count();
            long completedTests = testRepository.countByTestStatus("COMPLETED");
            long inProgressTests = testRepository.countByTestStatus("IN_PROGRESS");
            long abandonedTests = testRepository.countByTestStatus("ABANDONED");
            long totalResults = resultRepository.count();

            // Calcul des taux
            double completionRate = totalTests > 0 ? (double) completedTests / totalTests * 100 : 0;
            double abandonmentRate = totalTests > 0 ? (double) abandonedTests / totalTests * 100 : 0;

            // Statistiques par période (derniers 30 jours)
            LocalDateTime thirtyDaysAgo = LocalDateTime.now().minusDays(30);
            long testsLast30Days = testRepository.countByCreatedAtAfter(thirtyDaysAgo);
            long completedLast30Days = testRepository.countByTestStatusAndCreatedAtAfter("COMPLETED", thirtyDaysAgo);

            // Statistiques par jour (derniers 7 jours)
            List<Map<String, Object>> dailyStats = getDailyStatistics(7);

            // Top majors recommandées
            List<Map<String, Object>> topMajors = getTopRecommendedMajors();

            // Répartition par statut
            Map<String, Long> statusDistribution = Map.of(
                "COMPLETED", completedTests,
                "IN_PROGRESS", inProgressTests,
                "ABANDONED", abandonedTests
            );

            Map<String, Object> statistics = Map.of(
                "overview", Map.of(
                    "totalTests", totalTests,
                    "completedTests", completedTests,
                    "inProgressTests", inProgressTests,
                    "abandonedTests", abandonedTests,
                    "totalResults", totalResults,
                    "completionRate", Math.round(completionRate * 100.0) / 100.0,
                    "abandonmentRate", Math.round(abandonmentRate * 100.0) / 100.0
                ),
                "recentActivity", Map.of(
                    "testsLast30Days", testsLast30Days,
                    "completedLast30Days", completedLast30Days,
                    "dailyStats", dailyStats
                ),
                "topMajors", topMajors,
                "statusDistribution", statusDistribution,
                "lastUpdated", LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME)
            );

            log.info("✅ Statistiques d'orientation récupérées avec succès");
            return ResponseEntity.ok(statistics);

        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération des statistiques d'orientation: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Erreur lors de la récupération des statistiques"));
        }
    }

    /**
     * Obtenir les statistiques détaillées des tests (pour les graphiques)
     */
    @GetMapping("/statistics/detailed")
    public ResponseEntity<Map<String, Object>> getDetailedStatistics(
            @RequestParam(defaultValue = "30") int days) {
        try {
            log.info("📈 Récupération des statistiques détaillées pour {} jours", days);

            LocalDateTime startDate = LocalDateTime.now().minusDays(days);
            
            // Données pour graphique linéaire (évolution dans le temps)
            List<Map<String, Object>> timelineData = getTimelineData(startDate, days);
            
            // Données pour graphique en barres (répartition par statut)
            Map<String, Object> statusChart = getStatusChartData(startDate);
            
            // Données pour graphique circulaire (top majors)
            List<Map<String, Object>> majorsChart = getMajorsChartData();

            Map<String, Object> detailedStats = Map.of(
                "timeline", Map.of(
                    "labels", timelineData.stream().map(d -> d.get("date")).collect(Collectors.toList()),
                    "datasets", Arrays.asList(
                        Map.of(
                            "label", "Tests Commencés",
                            "data", timelineData.stream().map(d -> d.get("started")).collect(Collectors.toList()),
                            "borderColor", "#007bff",
                            "backgroundColor", "rgba(0, 123, 255, 0.1)"
                        ),
                        Map.of(
                            "label", "Tests Terminés",
                            "data", timelineData.stream().map(d -> d.get("completed")).collect(Collectors.toList()),
                            "borderColor", "#28a745",
                            "backgroundColor", "rgba(40, 167, 69, 0.1)"
                        ),
                        Map.of(
                            "label", "Tests Abandonnés",
                            "data", timelineData.stream().map(d -> d.get("abandoned")).collect(Collectors.toList()),
                            "borderColor", "#dc3545",
                            "backgroundColor", "rgba(220, 53, 69, 0.1)"
                        )
                    )
                ),
                "statusChart", statusChart,
                "majorsChart", majorsChart,
                "period", Map.of(
                    "days", days,
                    "startDate", startDate.format(DateTimeFormatter.ISO_LOCAL_DATE),
                    "endDate", LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE)
                )
            );

            return ResponseEntity.ok(detailedStats);

        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération des statistiques détaillées: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Erreur lors de la récupération des statistiques détaillées"));
        }
    }

    /**
     * Obtenir la liste des tests récents
     */
    @GetMapping("/tests/recent")
    public ResponseEntity<Map<String, Object>> getRecentTests(
            @RequestParam(defaultValue = "10") int limit) {
        try {
            log.info("📋 Récupération des {} tests les plus récents", limit);

            List<Map<String, Object>> recentTests = testRepository.findTop10ByOrderByCreatedAtDesc()
                .stream()
                .limit(limit)
                .map(test -> {
                    Map<String, Object> testMap = new HashMap<>();
                    testMap.put("id", test.getId());
                    testMap.put("studentName", test.getStudentName());
                    testMap.put("studentEmail", test.getStudentEmail());
                    testMap.put("testStatus", test.getTestStatus().toString());
                    testMap.put("startedAt", test.getTestStartedAt() != null ? 
                        test.getTestStartedAt().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) : null);
                    testMap.put("completedAt", test.getTestCompletedAt() != null ? 
                        test.getTestCompletedAt().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) : null);
                    testMap.put("durationMinutes", test.getTestDurationMinutes() != null ? 
                        test.getTestDurationMinutes() : 0);
                    testMap.put("answeredQuestions", test.getAnsweredQuestions());
                    testMap.put("totalQuestions", test.getTotalQuestions());
                    return testMap;
                })
                .collect(Collectors.toList());

            Map<String, Object> response = Map.of(
                "recentTests", recentTests,
                "totalCount", recentTests.size(),
                "lastUpdated", LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME)
            );

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération des tests récents: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Erreur lors de la récupération des tests récents"));
        }
    }

    // ===== MÉTHODES PRIVÉES =====

    private List<Map<String, Object>> getDailyStatistics(int days) {
        List<Map<String, Object>> dailyStats = new ArrayList<>();
        
        for (int i = days - 1; i >= 0; i--) {
            LocalDateTime date = LocalDateTime.now().minusDays(i);
            LocalDateTime startOfDay = date.withHour(0).withMinute(0).withSecond(0);
            LocalDateTime endOfDay = date.withHour(23).withMinute(59).withSecond(59);
            
            long started = testRepository.countByCreatedAtBetween(startOfDay, endOfDay);
            long completed = testRepository.countByTestStatusAndCreatedAtBetween("COMPLETED", startOfDay, endOfDay);
            long abandoned = testRepository.countByTestStatusAndCreatedAtBetween("ABANDONED", startOfDay, endOfDay);
            
            dailyStats.add(Map.of(
                "date", date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")),
                "started", started,
                "completed", completed,
                "abandoned", abandoned
            ));
        }
        
        return dailyStats;
    }

    private List<Map<String, Object>> getTopRecommendedMajors() {
        // Cette méthode devrait analyser les résultats pour trouver les majors les plus recommandées
        // Pour l'instant, retournons des données de base
        return Arrays.asList(
            Map.of("major", "Informatique", "count", 45, "percentage", 25.5),
            Map.of("major", "Génie Électrique", "count", 38, "percentage", 21.6),
            Map.of("major", "Architecture", "count", 32, "percentage", 18.2),
            Map.of("major", "Médecine", "count", 28, "percentage", 15.9),
            Map.of("major", "Commerce International", "count", 25, "percentage", 14.2)
        );
    }

    private List<Map<String, Object>> getTimelineData(LocalDateTime startDate, int days) {
        List<Map<String, Object>> timelineData = new ArrayList<>();
        
        for (int i = 0; i < days; i++) {
            LocalDateTime date = startDate.plusDays(i);
            LocalDateTime startOfDay = date.withHour(0).withMinute(0).withSecond(0);
            LocalDateTime endOfDay = date.withHour(23).withMinute(59).withSecond(59);
            
            long started = testRepository.countByCreatedAtBetween(startOfDay, endOfDay);
            long completed = testRepository.countByTestStatusAndCreatedAtBetween("COMPLETED", startOfDay, endOfDay);
            long abandoned = testRepository.countByTestStatusAndCreatedAtBetween("ABANDONED", startOfDay, endOfDay);
            
            timelineData.add(Map.of(
                "date", date.format(DateTimeFormatter.ofPattern("MM-dd")),
                "started", started,
                "completed", completed,
                "abandoned", abandoned
            ));
        }
        
        return timelineData;
    }

    private Map<String, Object> getStatusChartData(LocalDateTime startDate) {
        long completed = testRepository.countByTestStatusAndCreatedAtAfter("COMPLETED", startDate);
        long inProgress = testRepository.countByTestStatusAndCreatedAtAfter("IN_PROGRESS", startDate);
        long abandoned = testRepository.countByTestStatusAndCreatedAtAfter("ABANDONED", startDate);
        
        return Map.of(
            "labels", Arrays.asList("Terminés", "En cours", "Abandonnés"),
            "data", Arrays.asList(completed, inProgress, abandoned),
            "backgroundColor", Arrays.asList("#28a745", "#ffc107", "#dc3545")
        );
    }

    private List<Map<String, Object>> getMajorsChartData() {
        // Données simulées pour le graphique circulaire des majors
        return Arrays.asList(
            Map.of("major", "Informatique", "count", 45),
            Map.of("major", "Génie Électrique", "count", 38),
            Map.of("major", "Architecture", "count", 32),
            Map.of("major", "Médecine", "count", 28),
            Map.of("major", "Commerce International", "count", 25),
            Map.of("major", "Autres", "count", 8)
        );
    }
}
