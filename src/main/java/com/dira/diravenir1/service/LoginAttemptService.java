package com.dira.diravenir1.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class LoginAttemptService {

    private static final Logger logger = LoggerFactory.getLogger(LoginAttemptService.class);
    private final int MAX_ATTEMPT = 5;
    private ConcurrentHashMap<String, Integer> attemptsCache = new ConcurrentHashMap<>();
    private ConcurrentHashMap<String, LocalDateTime> lastAttemptCache = new ConcurrentHashMap<>();

    public void loginFailed(String ip) {
        int attempts = attemptsCache.getOrDefault(ip, 0);
        attemptsCache.put(ip, attempts + 1);
        lastAttemptCache.put(ip, LocalDateTime.now());
        
        // Logging détaillé
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        logger.warn("🔴 TENTATIVE DE CONNEXION ÉCHOUÉE - IP: {} | Tentative: {}/{} | Timestamp: {}", 
                   ip, attempts + 1, MAX_ATTEMPT, timestamp);
        
        if (attempts + 1 >= MAX_ATTEMPT) {
            logger.error("🚨 IP BLOQUÉE - IP: {} | Bloquée après {} tentatives | Timestamp: {}", 
                       ip, MAX_ATTEMPT, timestamp);
        }
    }

    public void loginSucceeded(String ip) {
        int previousAttempts = attemptsCache.getOrDefault(ip, 0);
        attemptsCache.remove(ip);
        lastAttemptCache.remove(ip);
        
        // Logging succès
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        if (previousAttempts > 0) {
            logger.info("🟢 CONNEXION RÉUSSIE - IP: {} | Après {} échecs précédents | Timestamp: {}", 
                      ip, previousAttempts, timestamp);
        } else {
            logger.info("🟢 CONNEXION RÉUSSIE - IP: {} | Première tentative | Timestamp: {}", 
                      ip, timestamp);
        }
    }

    public boolean isBlocked(String ip) {
        boolean blocked = attemptsCache.getOrDefault(ip, 0) >= MAX_ATTEMPT;
        if (blocked) {
            LocalDateTime lastAttempt = lastAttemptCache.get(ip);
            String lastAttemptStr = lastAttempt != null ? 
                lastAttempt.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")) : "N/A";
            logger.warn("🚫 ACCÈS BLOQUÉ - IP: {} | Dernière tentative: {}", ip, lastAttemptStr);
        }
        return blocked;
    }

    public int getAttempts(String ip) {
        return attemptsCache.getOrDefault(ip, 0);
    }

    public LocalDateTime getLastAttempt(String ip) {
        return lastAttemptCache.get(ip);
    }
}
