package com.diravenir.controller;

import com.diravenir.repository.UtilisateurRepository;
import com.diravenir.repository.ProgramRepository;
import com.diravenir.repository.CandidatureRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class AdminStatsController {

    private final UtilisateurRepository userRepository;
    private final ProgramRepository programRepository;
    private final CandidatureRepository candidatureRepository;

    /**
     * Récupérer les statistiques générales pour le dashboard admin
     */
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getAdminStats() {
        try {
            log.info("📊 Récupération des statistiques admin");

            // Compter les utilisateurs
            long totalUsers = userRepository.count();
            
            // Compter les programmes
            long totalPrograms = programRepository.count();
            
            // Compter les candidatures
            long totalApplications = candidatureRepository.count();
            
            // Compter les connexions récentes (dernières 24h)
            LocalDateTime yesterday = LocalDateTime.now().minusDays(1);
            long recentLogins = userRepository.countRecentLogins(yesterday);

            Map<String, Object> stats = Map.of(
                "totalUsers", totalUsers,
                "totalPrograms", totalPrograms,
                "totalApplications", totalApplications,
                "recentLogins", recentLogins
            );

            log.info("✅ Statistiques récupérées: {} utilisateurs, {} programmes, {} candidatures", 
                    totalUsers, totalPrograms, totalApplications);

            return ResponseEntity.ok(stats);

        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération des statistiques: {}", e.getMessage());
            return ResponseEntity.internalServerError().body(Map.of(
                "error", "Erreur lors de la récupération des statistiques"
            ));
        }
    }
}
