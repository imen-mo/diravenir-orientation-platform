package com.dira.diravenir1.service;

import com.dira.diravenir1.Entities.Utilisateur;
import com.dira.diravenir1.Repository.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserStatusService {

    private final UtilisateurRepository utilisateurRepository;

    /**
     * Marquer un utilisateur comme connecté (online)
     */
    @Transactional
    public void markUserAsOnline(String email) {
        try {
            Optional<Utilisateur> userOpt = utilisateurRepository.findByEmail(email);
            if (userOpt.isPresent()) {
                Utilisateur user = userOpt.get();
                user.setStatutOnline(true);
                user.setSessionActive(true);
                user.setDerniereConnexion(LocalDateTime.now());
                user.setDerniereActivite(LocalDateTime.now());
                utilisateurRepository.save(user);
                log.info("✅ Utilisateur marqué comme online: {}", email);
            } else {
                log.warn("⚠️ Utilisateur non trouvé pour marquer comme online: {}", email);
            }
        } catch (Exception e) {
            log.error("❌ Erreur lors du marquage online de l'utilisateur: {}", email, e);
        }
    }

    /**
     * Marquer un utilisateur comme déconnecté (offline)
     */
    @Transactional
    public void markUserAsOffline(String email) {
        try {
            Optional<Utilisateur> userOpt = utilisateurRepository.findByEmail(email);
            if (userOpt.isPresent()) {
                Utilisateur user = userOpt.get();
                user.setStatutOnline(false);
                user.setSessionActive(false);
                user.setDerniereActivite(LocalDateTime.now());
                utilisateurRepository.save(user);
                log.info("✅ Utilisateur marqué comme offline: {}", email);
            } else {
                log.warn("⚠️ Utilisateur non trouvé pour marquer comme offline: {}", email);
            }
        } catch (Exception e) {
            log.error("❌ Erreur lors du marquage offline de l'utilisateur: {}", email, e);
        }
    }

    /**
     * Mettre à jour l'activité d'un utilisateur
     */
    @Transactional
    public void updateUserActivity(String email) {
        try {
            Optional<Utilisateur> userOpt = utilisateurRepository.findByEmail(email);
            if (userOpt.isPresent()) {
                Utilisateur user = userOpt.get();
                user.setDerniereActivite(LocalDateTime.now());
                utilisateurRepository.save(user);
            }
        } catch (Exception e) {
            log.error("❌ Erreur lors de la mise à jour de l'activité: {}", email, e);
        }
    }

    /**
     * Obtenir la liste des utilisateurs en ligne
     */
    public List<Utilisateur> getOnlineUsers() {
        return utilisateurRepository.findByStatutOnlineTrue();
    }

    /**
     * Vérifier si un utilisateur est en ligne
     */
    public boolean isUserOnline(String email) {
        Optional<Utilisateur> userOpt = utilisateurRepository.findByEmail(email);
        return userOpt.map(Utilisateur::isStatutOnline).orElse(false);
    }

    /**
     * Nettoyer les sessions expirées (utilisateurs inactifs depuis plus de X minutes)
     */
    @Transactional
    public void cleanupExpiredSessions(int minutesInactive) {
        try {
            LocalDateTime threshold = LocalDateTime.now().minusMinutes(minutesInactive);
            List<Utilisateur> inactiveUsers = utilisateurRepository.findByDerniereActiviteBeforeAndStatutOnlineTrue(threshold);
            
            for (Utilisateur user : inactiveUsers) {
                user.setStatutOnline(false);
                user.setSessionActive(false);
                utilisateurRepository.save(user);
                log.info("🧹 Session expirée nettoyée pour: {}", user.getEmail());
            }
            
            log.info("✅ Nettoyage des sessions expirées terminé. {} utilisateurs affectés.", inactiveUsers.size());
        } catch (Exception e) {
            log.error("❌ Erreur lors du nettoyage des sessions expirées", e);
        }
    }
}
