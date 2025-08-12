package com.dira.diravenir1.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

/**
 * Service pour gérer la liste noire des tokens JWT lors de la déconnexion.
 * Assure la sécurité en invalidant les tokens même s'ils n'ont pas expiré.
 */
@Slf4j
@Service
public class TokenBlacklistService {

    private final ConcurrentHashMap<String, Long> blacklistedTokens = new ConcurrentHashMap<>();
    private final ScheduledExecutorService cleanupExecutor = Executors.newSingleThreadScheduledExecutor();

    public TokenBlacklistService() {
        // Nettoyer les tokens expirés toutes les heures
        cleanupExecutor.scheduleAtFixedRate(this::cleanupExpiredTokens, 1, 1, TimeUnit.HOURS);
        
        // Nettoyer aussi au démarrage
        cleanupExpiredTokens();
    }

    /**
     * Ajoute un token à la liste noire
     * @param token Le token JWT à blacklister
     * @param expirationTime Le temps d'expiration du token en millisecondes
     */
    public void blacklistToken(String token, long expirationTime) {
        blacklistedTokens.put(token, expirationTime);
        log.info("Token ajouté à la liste noire. Total tokens blacklistés: {}", blacklistedTokens.size());
    }

    /**
     * Vérifie si un token est dans la liste noire
     * @param token Le token JWT à vérifier
     * @return true si le token est blacklisté, false sinon
     */
    public boolean isTokenBlacklisted(String token) {
        return blacklistedTokens.containsKey(token);
    }

    /**
     * Nettoie les tokens expirés de la liste noire
     */
    private void cleanupExpiredTokens() {
        long currentTime = System.currentTimeMillis();
        int initialSize = blacklistedTokens.size();
        
        blacklistedTokens.entrySet().removeIf(entry -> {
            boolean expired = entry.getValue() < currentTime;
            if (expired) {
                log.debug("Token expiré supprimé de la liste noire");
            }
            return expired;
        });
        
        int removedCount = initialSize - blacklistedTokens.size();
        if (removedCount > 0) {
            log.info("{} tokens expirés supprimés de la liste noire. Total restant: {}", 
                    removedCount, blacklistedTokens.size());
        }
    }

    /**
     * Obtient le nombre de tokens dans la liste noire
     * @return Le nombre de tokens blacklistés
     */
    public int getBlacklistedTokenCount() {
        return blacklistedTokens.size();
    }

    /**
     * Vide complètement la liste noire (pour les tests ou maintenance)
     */
    public void clearBlacklist() {
        blacklistedTokens.clear();
        log.info("Liste noire des tokens vidée");
    }
}
