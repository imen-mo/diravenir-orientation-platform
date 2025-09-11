package com.diravenir.filter;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

@Component
@Order(1)
@Slf4j
public class RateLimitingFilter implements Filter {

    // Cache pour les tentatives par IP
    private final Map<String, RateLimitInfo> rateLimitCache = new ConcurrentHashMap<>();
    
    // Configuration du rate limiting
    private static final int MAX_REQUESTS_PER_MINUTE = 60;
    private static final int MAX_AUTH_REQUESTS_PER_MINUTE = 10;
    private static final int BLOCK_DURATION_MINUTES = 15;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        
        String clientIP = getClientIP(httpRequest);
        String requestURI = httpRequest.getRequestURI();
        
        // Vérifier le rate limiting
        if (isRateLimited(clientIP, requestURI)) {
            log.warn("🚫 Rate limit dépassé pour IP: {} sur {}", clientIP, requestURI);
            
            httpResponse.setStatus(429);
            httpResponse.setContentType("application/json");
            httpResponse.getWriter().write("{\"error\":\"Trop de requêtes. Veuillez réessayer plus tard.\"}");
            return;
        }
        
        chain.doFilter(request, response);
    }
    
    private boolean isRateLimited(String clientIP, String requestURI) {
        LocalDateTime now = LocalDateTime.now();
        
        // Nettoyer les entrées expirées
        cleanupExpiredEntries(now);
        
        RateLimitInfo rateLimitInfo = rateLimitCache.computeIfAbsent(clientIP, 
                k -> new RateLimitInfo());
        
        // Déterminer la limite selon le type de requête
        int maxRequests = requestURI.contains("/api/auth") ? 
                MAX_AUTH_REQUESTS_PER_MINUTE : MAX_REQUESTS_PER_MINUTE;
        
        // Vérifier si l'IP est bloquée
        if (rateLimitInfo.isBlocked(now)) {
            return true;
        }
        
        // Incrémenter le compteur
        rateLimitInfo.incrementRequest(now);
        
        // Vérifier si la limite est dépassée
        if (rateLimitInfo.getRequestCount() > maxRequests) {
            rateLimitInfo.blockUntil(now.plusMinutes(BLOCK_DURATION_MINUTES));
            log.warn("🚫 IP {} bloquée pour {} minutes", clientIP, BLOCK_DURATION_MINUTES);
            return true;
        }
        
        return false;
    }
    
    private void cleanupExpiredEntries(LocalDateTime now) {
        rateLimitCache.entrySet().removeIf(entry -> 
                entry.getValue().isExpired(now));
    }
    
    private String getClientIP(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        
        String xRealIP = request.getHeader("X-Real-IP");
        if (xRealIP != null && !xRealIP.isEmpty()) {
            return xRealIP;
        }
        
        return request.getRemoteAddr();
    }
    
    private static class RateLimitInfo {
        private int requestCount = 0;
        private LocalDateTime windowStart = LocalDateTime.now();
        private LocalDateTime blockedUntil = null;
        
        public void incrementRequest(LocalDateTime now) {
            // Réinitialiser le compteur si une nouvelle minute a commencé
            if (now.isAfter(windowStart.plusMinutes(1))) {
                requestCount = 1;
                windowStart = now;
            } else {
                requestCount++;
            }
        }
        
        public int getRequestCount() {
            return requestCount;
        }
        
        public boolean isBlocked(LocalDateTime now) {
            return blockedUntil != null && now.isBefore(blockedUntil);
        }
        
        public void blockUntil(LocalDateTime until) {
            blockedUntil = until;
        }
        
        public boolean isExpired(LocalDateTime now) {
            return blockedUntil != null && now.isAfter(blockedUntil.plusMinutes(1));
        }
    }
}
