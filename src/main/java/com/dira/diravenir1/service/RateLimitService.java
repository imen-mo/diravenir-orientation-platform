package com.dira.diravenir1.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class RateLimitService {

    private static final Logger logger = LoggerFactory.getLogger(RateLimitService.class);
    
    @Value("${app.rate-limit.max-requests-per-minute:60}")
    private int maxRequestsPerMinute;
    
    @Value("${app.rate-limit.max-signup-per-hour:10}")
    private int maxSignupPerHour;

    private final ConcurrentHashMap<String, AtomicInteger> requestCounts = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, LocalDateTime> lastResetTime = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, AtomicInteger> signupCounts = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, LocalDateTime> signupResetTime = new ConcurrentHashMap<>();

    public boolean isRateLimited(String ip, String endpoint) {
        String key = ip + ":" + endpoint;
        LocalDateTime now = LocalDateTime.now();
        
        // Réinitialiser le compteur si une minute s'est écoulée
        LocalDateTime lastReset = lastResetTime.get(key);
        if (lastReset == null || now.isAfter(lastReset.plusMinutes(1))) {
            requestCounts.put(key, new AtomicInteger(0));
            lastResetTime.put(key, now);
        }
        
        AtomicInteger count = requestCounts.get(key);
        int currentCount = count.incrementAndGet();
        
        if (currentCount > maxRequestsPerMinute) {
            String timestamp = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            logger.warn("🚫 RATE LIMIT EXCÉDÉ - IP: {} | Endpoint: {} | Compteur: {} | Timestamp: {}", 
                       ip, endpoint, currentCount, timestamp);
            return true;
        }
        
        return false;
    }

    public boolean isSignupRateLimited(String ip) {
        LocalDateTime now = LocalDateTime.now();
        
        // Réinitialiser le compteur si une heure s'est écoulée
        LocalDateTime lastReset = signupResetTime.get(ip);
        if (lastReset == null || now.isAfter(lastReset.plusHours(1))) {
            signupCounts.put(ip, new AtomicInteger(0));
            signupResetTime.put(ip, now);
        }
        
        AtomicInteger count = signupCounts.get(ip);
        int currentCount = count.incrementAndGet();
        
        if (currentCount > maxSignupPerHour) {
            String timestamp = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            logger.warn("🚫 SIGNUP RATE LIMIT EXCÉDÉ - IP: {} | Compteur: {} | Timestamp: {}", 
                       ip, currentCount, timestamp);
            return true;
        }
        
        return false;
    }

    public int getRemainingRequests(String ip, String endpoint) {
        String key = ip + ":" + endpoint;
        AtomicInteger count = requestCounts.get(key);
        if (count == null) {
            return maxRequestsPerMinute;
        }
        return Math.max(0, maxRequestsPerMinute - count.get());
    }

    public int getRemainingSignups(String ip) {
        AtomicInteger count = signupCounts.get(ip);
        if (count == null) {
            return maxSignupPerHour;
        }
        return Math.max(0, maxSignupPerHour - count.get());
    }

    public void resetRateLimit(String ip, String endpoint) {
        String key = ip + ":" + endpoint;
        requestCounts.remove(key);
        lastResetTime.remove(key);
    }

    public void resetSignupRateLimit(String ip) {
        signupCounts.remove(ip);
        signupResetTime.remove(ip);
    }
} 