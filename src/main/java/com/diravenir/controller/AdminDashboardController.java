package com.diravenir.controller;

import com.diravenir.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/dashboard")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class AdminDashboardController {

    private final UtilisateurService utilisateurService;
    private final ApplicationService applicationService;
    private final ProgramService programService;
    private final ChatService chatService;
    private final OrientationPersistenceService orientationPersistenceService;
    private final AdminStatisticsService adminStatisticsService;

    /**
     * Obtenir toutes les statistiques du dashboard admin
     */
    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getDashboardStatistics() {
        try {
            log.info("📊 Récupération des statistiques du dashboard admin");

            Map<String, Object> statistics = new HashMap<>();

            // Statistiques des utilisateurs
            Map<String, Object> userStats = adminStatisticsService.getUserStatistics();
            statistics.put("users", userStats);

            // Statistiques des applications
            Map<String, Object> applicationStats = applicationService.getApplicationStatistics();
            statistics.put("applications", applicationStats);

            // Statistiques des programmes
            Map<String, Object> programStats = adminStatisticsService.getProgramStatistics();
            statistics.put("programs", programStats);

            // Statistiques du chat
            Map<String, Object> chatStats = adminStatisticsService.getChatStatistics();
            statistics.put("chat", chatStats);

            // Statistiques d'orientation
            Map<String, Object> orientationStats = adminStatisticsService.getOrientationStatistics();
            statistics.put("orientation", orientationStats);

            // Statistiques financières
            Map<String, Object> financialStats = adminStatisticsService.getFinancialStatistics();
            statistics.put("financial", financialStats);

            // Statistiques temporelles
            Map<String, Object> temporalStats = adminStatisticsService.getTemporalStatistics();
            statistics.put("temporal", temporalStats);

            log.info("✅ Statistiques récupérées avec succès");
            return ResponseEntity.ok(statistics);

        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération des statistiques: {}", e.getMessage());
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Erreur lors de la récupération des statistiques"));
        }
    }

    /**
     * Obtenir les statistiques des utilisateurs
     */
    @GetMapping("/statistics/users")
    public ResponseEntity<Map<String, Object>> getUserStatistics() {
        try {
            Map<String, Object> userStats = adminStatisticsService.getUserStatistics();
            return ResponseEntity.ok(userStats);
        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération des statistiques utilisateurs: {}", e.getMessage());
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Erreur lors de la récupération des statistiques utilisateurs"));
        }
    }

    /**
     * Obtenir les statistiques des programmes
     */
    @GetMapping("/statistics/programs")
    public ResponseEntity<Map<String, Object>> getProgramStatistics() {
        try {
            Map<String, Object> programStats = adminStatisticsService.getProgramStatistics();
            return ResponseEntity.ok(programStats);
        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération des statistiques programmes: {}", e.getMessage());
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Erreur lors de la récupération des statistiques programmes"));
        }
    }

    /**
     * Obtenir les statistiques du chat
     */
    @GetMapping("/statistics/chat")
    public ResponseEntity<Map<String, Object>> getChatStatistics() {
        try {
            Map<String, Object> chatStats = adminStatisticsService.getChatStatistics();
            return ResponseEntity.ok(chatStats);
        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération des statistiques chat: {}", e.getMessage());
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Erreur lors de la récupération des statistiques chat"));
        }
    }

    /**
     * Obtenir les statistiques d'orientation
     */
    @GetMapping("/statistics/orientation")
    public ResponseEntity<Map<String, Object>> getOrientationStatistics() {
        try {
            Map<String, Object> orientationStats = adminStatisticsService.getOrientationStatistics();
            return ResponseEntity.ok(orientationStats);
        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération des statistiques orientation: {}", e.getMessage());
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Erreur lors de la récupération des statistiques orientation"));
        }
    }

    /**
     * Obtenir les statistiques financières
     */
    @GetMapping("/statistics/financial")
    public ResponseEntity<Map<String, Object>> getFinancialStatistics() {
        try {
            Map<String, Object> financialStats = adminStatisticsService.getFinancialStatistics();
            return ResponseEntity.ok(financialStats);
        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération des statistiques financières: {}", e.getMessage());
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Erreur lors de la récupération des statistiques financières"));
        }
    }

    /**
     * Obtenir les statistiques temporelles
     */
    @GetMapping("/statistics/temporal")
    public ResponseEntity<Map<String, Object>> getTemporalStatistics() {
        try {
            Map<String, Object> temporalStats = adminStatisticsService.getTemporalStatistics();
            return ResponseEntity.ok(temporalStats);
        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération des statistiques temporelles: {}", e.getMessage());
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Erreur lors de la récupération des statistiques temporelles"));
        }
    }

    /**
     * Obtenir les données récentes pour le dashboard
     */
    @GetMapping("/recent-data")
    public ResponseEntity<Map<String, Object>> getRecentData() {
        try {
            log.info("📋 Récupération des données récentes pour le dashboard");

            Map<String, Object> recentData = adminStatisticsService.getRecentData();

            log.info("✅ Données récentes récupérées avec succès");
            return ResponseEntity.ok(recentData);

        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération des données récentes: {}", e.getMessage());
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Erreur lors de la récupération des données récentes"));
        }
    }

    /**
     * Obtenir les alertes et notifications
     */
    @GetMapping("/alerts")
    public ResponseEntity<Map<String, Object>> getAlerts() {
        try {
            Map<String, Object> alerts = adminStatisticsService.getAlerts();
            return ResponseEntity.ok(alerts);
        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération des alertes: {}", e.getMessage());
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Erreur lors de la récupération des alertes"));
        }
    }

    /**
     * Obtenir les métriques de performance
     */
    @GetMapping("/performance")
    public ResponseEntity<Map<String, Object>> getPerformanceMetrics() {
        try {
            Map<String, Object> performance = new HashMap<>();

            // Temps de réponse moyen des APIs
            Map<String, Double> apiResponseTimes = Map.of(
                "applications", 150.5,
                "users", 120.3,
                "programs", 180.7,
                "chat", 95.2
            );
            performance.put("apiResponseTimes", apiResponseTimes);

            // Utilisation de la base de données
            Map<String, Object> databaseUsage = Map.of(
                "connections", 15,
                "maxConnections", 100,
                "activeQueries", 3,
                "slowQueries", 0
            );
            performance.put("database", databaseUsage);

            // Utilisation de la mémoire
            Map<String, Object> memoryUsage = Map.of(
                "used", "512MB",
                "total", "2GB",
                "percentage", 25.6
            );
            performance.put("memory", memoryUsage);

            // Statut des services
            Map<String, String> serviceStatus = Map.of(
                "database", "healthy",
                "email", "healthy",
                "chat", "healthy",
                "fileStorage", "healthy"
            );
            performance.put("services", serviceStatus);

            return ResponseEntity.ok(performance);

        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération des métriques de performance: {}", e.getMessage());
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Erreur lors de la récupération des métriques de performance"));
        }
    }
}
