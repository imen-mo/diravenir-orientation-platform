package com.dira.diravenir1.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class SessionCleanupService {

    private final UserStatusService userStatusService;

    /**
     * Nettoyer les sessions expirées toutes les 5 minutes
     * Les utilisateurs inactifs depuis plus de 30 minutes seront marqués comme offline
     */
    @Scheduled(fixedRate = 300000) // 5 minutes
    public void cleanupExpiredSessions() {
        try {
            log.info("🧹 Début du nettoyage automatique des sessions expirées");
            userStatusService.cleanupExpiredSessions(30); // 30 minutes d'inactivité
            log.info("✅ Nettoyage automatique des sessions terminé");
        } catch (Exception e) {
            log.error("❌ Erreur lors du nettoyage automatique des sessions", e);
        }
    }

    /**
     * Nettoyer les sessions expirées toutes les heures
     * Les utilisateurs inactifs depuis plus de 2 heures seront marqués comme offline
     */
    @Scheduled(fixedRate = 3600000) // 1 heure
    public void cleanupLongExpiredSessions() {
        try {
            log.info("🧹 Début du nettoyage des sessions longuement expirées");
            userStatusService.cleanupExpiredSessions(120); // 2 heures d'inactivité
            log.info("✅ Nettoyage des sessions longuement expirées terminé");
        } catch (Exception e) {
            log.error("❌ Erreur lors du nettoyage des sessions longuement expirées", e);
        }
    }
}
