package com.diravenir.service;

import com.diravenir.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdminDashboardService {

    private final UtilisateurRepository utilisateurRepository;
    private final ApplicationRepository applicationRepository;
    private final ProgramRepository programRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final OrientationTestRepository orientationTestRepository;
    private final OrientationResultRepository orientationResultRepository;

    /**
     * Obtenir toutes les statistiques du dashboard
     */
    public Map<String, Object> getAllStatistics() {
        try {
            Map<String, Object> statistics = new HashMap<>();

            // Statistiques des utilisateurs
            statistics.put("users", getUserStatistics());

            // Statistiques des applications
            statistics.put("applications", getApplicationStatistics());

            // Statistiques des programmes
            statistics.put("programs", getProgramStatistics());

            // Statistiques du chat
            statistics.put("chat", getChatStatistics());

            // Statistiques d'orientation
            statistics.put("orientation", getOrientationStatistics());

            // Statistiques financières
            statistics.put("financial", getFinancialStatistics());

            // Statistiques temporelles
            statistics.put("temporal", getTemporalStatistics());

            return statistics;

        } catch (Exception e) {
            log.error("Erreur lors de la récupération des statistiques: {}", e.getMessage());
            throw new RuntimeException("Erreur lors de la récupération des statistiques", e);
        }
    }

    /**
     * Statistiques des utilisateurs
     */
    public Map<String, Object> getUserStatistics() {
        Map<String, Object> stats = new HashMap<>();

        // Total des utilisateurs
        long totalUsers = utilisateurRepository.count();
        stats.put("total", totalUsers);

        // Utilisateurs par rôle
        Map<String, Long> usersByRole = utilisateurRepository.findAll().stream()
            .collect(Collectors.groupingBy(
                user -> user.getRole().toString(),
                Collectors.counting()
            ));
        stats.put("byRole", usersByRole);

        // Utilisateurs actifs (compteActif = true)
        long activeUsers = utilisateurRepository.findActiveUsers().size();
        stats.put("active", activeUsers);

        // Utilisateurs inactifs
        long inactiveUsers = totalUsers - activeUsers;
        stats.put("inactive", inactiveUsers);

        // Nouveaux utilisateurs ce mois
        LocalDateTime startOfMonth = LocalDateTime.now().withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
        long newUsersThisMonth = utilisateurRepository.findAll().stream()
            .filter(user -> user.getDateCreation() != null && user.getDateCreation().isAfter(startOfMonth))
            .count();
        stats.put("newThisMonth", newUsersThisMonth);

        // Nouveaux utilisateurs cette semaine
        LocalDateTime startOfWeek = LocalDateTime.now().minusDays(7);
        long newUsersThisWeek = utilisateurRepository.findAll().stream()
            .filter(user -> user.getDateCreation() != null && user.getDateCreation().isAfter(startOfWeek))
            .count();
        stats.put("newThisWeek", newUsersThisWeek);

        // Utilisateurs avec applications
        long usersWithApplications = applicationRepository.findAll().stream()
            .map(com.diravenir.Entities.Application::getUserId)
            .distinct()
            .count();
        stats.put("withApplications", usersWithApplications);

        return stats;
    }

    /**
     * Statistiques des applications
     */
    public Map<String, Object> getApplicationStatistics() {
        Map<String, Object> stats = new HashMap<>();

        // Total des applications
        long totalApplications = applicationRepository.count();
        stats.put("total", totalApplications);

        // Applications par statut
        Map<String, Long> applicationsByStatus = applicationRepository.findAll().stream()
            .collect(Collectors.groupingBy(
                app -> app.getStatus() != null ? app.getStatus() : "UNKNOWN",
                Collectors.counting()
            ));
        stats.put("byStatus", applicationsByStatus);

        // Applications par statut de paiement
        Map<String, Long> applicationsByPaymentStatus = applicationRepository.findAll().stream()
            .collect(Collectors.groupingBy(
                app -> app.getPaymentStatus() != null ? app.getPaymentStatus().toString() : "UNKNOWN",
                Collectors.counting()
            ));
        stats.put("byPaymentStatus", applicationsByPaymentStatus);

        // Applications ce mois
        LocalDateTime startOfMonth = LocalDateTime.now().withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
        long applicationsThisMonth = applicationRepository.countByCreatedAtAfter(startOfMonth);
        stats.put("thisMonth", applicationsThisMonth);

        // Applications cette semaine
        LocalDateTime startOfWeek = LocalDateTime.now().minusDays(7);
        long applicationsThisWeek = applicationRepository.countByCreatedAtAfter(startOfWeek);
        stats.put("thisWeek", applicationsThisWeek);

        // Applications approuvées
        long approvedApplications = applicationRepository.countByStatus("APPROVED");
        stats.put("approved", approvedApplications);

        // Applications rejetées
        long rejectedApplications = applicationRepository.countByStatus("REJECTED");
        stats.put("rejected", rejectedApplications);

        // Applications en attente
        long pendingApplications = applicationRepository.countByStatus("PENDING");
        stats.put("pending", pendingApplications);

        return stats;
    }

    /**
     * Statistiques des programmes
     */
    public Map<String, Object> getProgramStatistics() {
        Map<String, Object> stats = new HashMap<>();

        // Total des programmes
        long totalPrograms = programRepository.count();
        stats.put("total", totalPrograms);

        // Programmes par statut
        Map<String, Long> programsByStatus = programRepository.findAll().stream()
            .collect(Collectors.groupingBy(
                program -> program.getStatus() != null ? program.getStatus().toString() : "UNKNOWN",
                Collectors.counting()
            ));
        stats.put("byStatus", programsByStatus);

        // Programmes par destination (campus_city)
        Map<String, Long> programsByDestination = programRepository.findAll().stream()
            .filter(program -> program.getCampusCity() != null)
            .collect(Collectors.groupingBy(
                com.diravenir.Entities.Program::getCampusCity,
                Collectors.counting()
            ));
        stats.put("byDestination", programsByDestination);

        // Programmes par université
        Map<String, Long> programsByUniversity = programRepository.findAll().stream()
            .filter(program -> program.getUniversities() != null)
            .collect(Collectors.groupingBy(
                com.diravenir.Entities.Program::getUniversities,
                Collectors.counting()
            ));
        stats.put("byUniversity", programsByUniversity);

        // Programmes par catégorie
        Map<String, Long> programsByCategory = programRepository.findAll().stream()
            .filter(program -> program.getCategory() != null)
            .collect(Collectors.groupingBy(
                com.diravenir.Entities.Program::getCategory,
                Collectors.counting()
            ));
        stats.put("byCategory", programsByCategory);

        // Programmes par type de diplôme
        Map<String, Long> programsByDegreeType = programRepository.findAll().stream()
            .filter(program -> program.getDegreeType() != null)
            .collect(Collectors.groupingBy(
                com.diravenir.Entities.Program::getDegreeType,
                Collectors.counting()
            ));
        stats.put("byDegreeType", programsByDegreeType);

        return stats;
    }

    /**
     * Statistiques du chat
     */
    public Map<String, Object> getChatStatistics() {
        Map<String, Object> stats = new HashMap<>();

        // Total des messages
        long totalMessages = chatMessageRepository.count();
        stats.put("totalMessages", totalMessages);

        // Messages non lus
        long unreadMessages = chatMessageRepository.findAll().stream()
            .filter(message -> !message.getIsRead())
            .count();
        stats.put("unreadMessages", unreadMessages);

        // Messages par jour (derniers 7 jours)
        Map<String, Long> messagesByDay = new HashMap<>();
        for (int i = 6; i >= 0; i--) {
            LocalDateTime day = LocalDateTime.now().minusDays(i).withHour(0).withMinute(0).withSecond(0);
            LocalDateTime nextDay = day.plusDays(1);
            long count = chatMessageRepository.findAll().stream()
                .filter(message -> message.getCreatedAt() != null && 
                    message.getCreatedAt().isAfter(day) && message.getCreatedAt().isBefore(nextDay))
                .count();
            String dayKey = day.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            messagesByDay.put(dayKey, count);
        }
        stats.put("messagesByDay", messagesByDay);

        // Messages par heure (dernières 24h)
        Map<String, Long> messagesByHour = new HashMap<>();
        for (int i = 23; i >= 0; i--) {
            LocalDateTime hour = LocalDateTime.now().minusHours(i).withMinute(0).withSecond(0);
            LocalDateTime nextHour = hour.plusHours(1);
            long count = chatMessageRepository.findAll().stream()
                .filter(message -> message.getCreatedAt() != null && 
                    message.getCreatedAt().isAfter(hour) && message.getCreatedAt().isBefore(nextHour))
                .count();
            String hourKey = hour.format(DateTimeFormatter.ofPattern("HH:mm"));
            messagesByHour.put(hourKey, count);
        }
        stats.put("messagesByHour", messagesByHour);

        return stats;
    }

    /**
     * Statistiques d'orientation
     */
    public Map<String, Object> getOrientationStatistics() {
        Map<String, Object> stats = new HashMap<>();

        // Total des tests d'orientation
        long totalTests = orientationTestRepository.count();
        stats.put("totalTests", totalTests);

        // Tests complétés
        long completedTests = orientationTestRepository.countByTestStatus("COMPLETED");
        stats.put("completedTests", completedTests);

        // Tests en cours
        long inProgressTests = orientationTestRepository.countByTestStatus("IN_PROGRESS");
        stats.put("inProgressTests", inProgressTests);

        // Taux de completion
        double completionRate = totalTests > 0 ? (double) completedTests / totalTests * 100 : 0;
        stats.put("completionRate", completionRate);

        // Tests par jour (derniers 30 jours)
        Map<String, Long> testsByDay = new HashMap<>();
        for (int i = 29; i >= 0; i--) {
            LocalDateTime day = LocalDateTime.now().minusDays(i).withHour(0).withMinute(0).withSecond(0);
            LocalDateTime nextDay = day.plusDays(1);
            long count = orientationTestRepository.findAll().stream()
                .filter(test -> test.getCreatedAt() != null && 
                    test.getCreatedAt().isAfter(day) && test.getCreatedAt().isBefore(nextDay))
                .count();
            String dayKey = day.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            testsByDay.put(dayKey, count);
        }
        stats.put("testsByDay", testsByDay);

        // Tests complétés par jour
        Map<String, Long> completedTestsByDay = new HashMap<>();
        for (int i = 29; i >= 0; i--) {
            LocalDateTime day = LocalDateTime.now().minusDays(i).withHour(0).withMinute(0).withSecond(0);
            LocalDateTime nextDay = day.plusDays(1);
            long count = orientationTestRepository.findAll().stream()
                .filter(test -> test.getTestCompletedAt() != null && 
                    test.getTestCompletedAt().isAfter(day) && test.getTestCompletedAt().isBefore(nextDay))
                .count();
            String dayKey = day.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            completedTestsByDay.put(dayKey, count);
        }
        stats.put("completedTestsByDay", completedTestsByDay);

        return stats;
    }

    /**
     * Statistiques financières
     */
    public Map<String, Object> getFinancialStatistics() {
        Map<String, Object> stats = new HashMap<>();

        // Applications avec paiement complété
        long paidApplications = applicationRepository.countByPaymentStatus(
            com.diravenir.Entities.Application.PaymentStatus.COMPLETED
        );
        stats.put("paidApplications", paidApplications);

        // Applications avec paiement en attente
        long pendingPayments = applicationRepository.countByPaymentStatus(
            com.diravenir.Entities.Application.PaymentStatus.PENDING
        );
        stats.put("pendingPayments", pendingPayments);

        // Applications avec paiement échoué
        long failedPayments = applicationRepository.countByPaymentStatus(
            com.diravenir.Entities.Application.PaymentStatus.FAILED
        );
        stats.put("failedPayments", failedPayments);

        // Taux de conversion (applications payées / total applications)
        long totalApplications = applicationRepository.count();
        double conversionRate = totalApplications > 0 ? (double) paidApplications / totalApplications * 100 : 0;
        stats.put("conversionRate", conversionRate);

        return stats;
    }

    /**
     * Statistiques temporelles
     */
    public Map<String, Object> getTemporalStatistics() {
        Map<String, Object> stats = new HashMap<>();

        // Activité par heure (dernières 24h)
        Map<String, Long> activityByHour = new HashMap<>();
        for (int i = 23; i >= 0; i--) {
            LocalDateTime hour = LocalDateTime.now().minusHours(i).withMinute(0).withSecond(0);
            LocalDateTime nextHour = hour.plusHours(1);
            long count = applicationRepository.findAll().stream()
                .filter(app -> app.getCreatedAt() != null && 
                    app.getCreatedAt().isAfter(hour) && app.getCreatedAt().isBefore(nextHour))
                .count();
            String hourKey = hour.format(DateTimeFormatter.ofPattern("HH:mm"));
            activityByHour.put(hourKey, count);
        }
        stats.put("activityByHour", activityByHour);

        // Activité par jour (derniers 30 jours)
        Map<String, Long> activityByDay = new HashMap<>();
        for (int i = 29; i >= 0; i--) {
            LocalDateTime day = LocalDateTime.now().minusDays(i).withHour(0).withMinute(0).withSecond(0);
            LocalDateTime nextDay = day.plusDays(1);
            long count = applicationRepository.findAll().stream()
                .filter(app -> app.getCreatedAt() != null && 
                    app.getCreatedAt().isAfter(day) && app.getCreatedAt().isBefore(nextDay))
                .count();
            String dayKey = day.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            activityByDay.put(dayKey, count);
        }
        stats.put("activityByDay", activityByDay);

        // Activité par mois (derniers 12 mois)
        Map<String, Long> activityByMonth = new HashMap<>();
        for (int i = 11; i >= 0; i--) {
            LocalDateTime month = LocalDateTime.now().minusMonths(i).withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
            LocalDateTime nextMonth = month.plusMonths(1);
            long count = applicationRepository.findAll().stream()
                .filter(app -> app.getCreatedAt() != null && 
                    app.getCreatedAt().isAfter(month) && app.getCreatedAt().isBefore(nextMonth))
                .count();
            String monthKey = month.format(DateTimeFormatter.ofPattern("yyyy-MM"));
            activityByMonth.put(monthKey, count);
        }
        stats.put("activityByMonth", activityByMonth);

        return stats;
    }

    /**
     * Obtenir les données récentes
     */
    public Map<String, Object> getRecentData() {
        Map<String, Object> recentData = new HashMap<>();

        // Applications récentes (dernières 10)
        List<com.diravenir.Entities.Application> recentApplications = applicationRepository
            .findAll().stream()
            .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
            .limit(10)
            .collect(Collectors.toList());
        recentData.put("recentApplications", recentApplications);

        // Utilisateurs récents (derniers 10)
        List<com.diravenir.Entities.Utilisateur> recentUsers = utilisateurRepository
            .findAll().stream()
            .filter(user -> user.getDateCreation() != null)
            .sorted((a, b) -> b.getDateCreation().compareTo(a.getDateCreation()))
            .limit(10)
            .collect(Collectors.toList());
        recentData.put("recentUsers", recentUsers);

        // Programmes récents (derniers 10)
        List<com.diravenir.Entities.Program> recentPrograms = programRepository
            .findAll().stream()
            .sorted((a, b) -> b.getId().compareTo(a.getId()))
            .limit(10)
            .collect(Collectors.toList());
        recentData.put("recentPrograms", recentPrograms);

        // Messages récents (derniers 10)
        List<com.diravenir.Entities.ChatMessage> recentMessages = chatMessageRepository
            .findAll().stream()
            .filter(message -> message.getCreatedAt() != null)
            .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
            .limit(10)
            .collect(Collectors.toList());
        recentData.put("recentMessages", recentMessages);

        // Tests récents (derniers 10)
        List<com.diravenir.Entities.OrientationTest> recentTests = orientationTestRepository
            .findAll().stream()
            .filter(test -> test.getCreatedAt() != null)
            .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
            .limit(10)
            .collect(Collectors.toList());
        recentData.put("recentTests", recentTests);

        return recentData;
    }

    /**
     * Obtenir les alertes
     */
    public Map<String, Object> getAlerts() {
        Map<String, Object> alerts = new HashMap<>();

        // Applications en attente
        long pendingApplications = applicationRepository.countByStatus("PENDING");
        if (pendingApplications > 0) {
            alerts.put("pendingApplications", Map.of(
                "count", pendingApplications,
                "message", pendingApplications + " applications en attente de traitement",
                "type", "warning"
            ));
        }

        // Messages non lus
        long unreadMessages = chatMessageRepository.findAll().stream()
            .filter(message -> !message.getIsRead())
            .count();
        if (unreadMessages > 0) {
            alerts.put("unreadMessages", Map.of(
                "count", unreadMessages,
                "message", unreadMessages + " messages non lus",
                "type", "info"
            ));
        }

        // Tests abandonnés
        long abandonedTests = orientationTestRepository.countByTestStatus("IN_PROGRESS");
        if (abandonedTests > 0) {
            alerts.put("abandonedTests", Map.of(
                "count", abandonedTests,
                "message", abandonedTests + " tests d'orientation abandonnés",
                "type", "warning"
            ));
        }

        // Paiements en attente
        long pendingPayments = applicationRepository.countByPaymentStatus(
            com.diravenir.Entities.Application.PaymentStatus.PENDING
        );
        if (pendingPayments > 0) {
            alerts.put("pendingPayments", Map.of(
                "count", pendingPayments,
                "message", pendingPayments + " paiements en attente",
                "type", "warning"
            ));
        }

        return alerts;
    }
}
