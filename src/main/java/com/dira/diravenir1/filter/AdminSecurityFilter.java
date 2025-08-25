package com.dira.diravenir1.filter;

import com.dira.diravenir1.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Filtre de sécurité militaire pour les routes admin
 * Vérifications multiples : JWT, rôle, IP, rate limiting, audit trail
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class AdminSecurityFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    
    // Rate limiting : max 10 requêtes par minute par IP
    private static final int MAX_REQUESTS_PER_MINUTE = 10;
    private static final ConcurrentHashMap<String, RequestCounter> requestCounters = new ConcurrentHashMap<>();
    
    // IPs bannies
    private static final ConcurrentHashMap<String, Long> bannedIPs = new ConcurrentHashMap<>();
    private static final long BAN_DURATION = 24 * 60 * 60 * 1000; // 24 heures

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        
        try {
        
        String requestURI = request.getRequestURI();
        
        // Appliquer seulement aux routes admin
        if (!requestURI.startsWith("/api/admin") && !requestURI.startsWith("/admin")) {
            filterChain.doFilter(request, response);
            return;
        }

        String clientIP = getClientIP(request);
        String userAgent = request.getHeader("User-Agent");
        
        // 🔒 VÉRIFICATION 1: IP bannie
        if (isIPBanned(clientIP)) {
            log.warn("🚫 IP BANNIE: {} - Tentative d'accès admin", clientIP);
            try {
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write("{\"error\":\"Access denied\",\"timestamp\":\"" + 
                    LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) + "\"}");
            } catch (IOException e) {
                log.error("❌ Erreur lors de l'écriture de la réponse IP bannie", e);
            }
            return;
        }

        // 🔒 VÉRIFICATION 2: Rate limiting
        if (isRateLimited(clientIP)) {
            log.warn("🚫 RATE LIMIT: {} - Trop de requêtes admin", clientIP);
            try {
                response.setStatus(429); // 429 Too Many Requests
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write("{\"error\":\"Rate limit exceeded\",\"timestamp\":\"" + 
                    LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) + "\"}");
            } catch (IOException e) {
                log.error("❌ Erreur lors de l'écriture de la réponse rate limit", e);
            }
            return;
        }

        // 🔒 VÉRIFICATION 3: User-Agent suspect
        if (isSuspiciousUserAgent(userAgent)) {
            log.warn("🚫 USER-AGENT SUSPECT: {} - IP: {}", userAgent, clientIP);
            banIP(clientIP);
            try {
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                response.setContentType("application/json");
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write("{\"error\":\"Access denied\",\"timestamp\":\"" + 
                    LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) + "\"}");
            } catch (IOException e) {
                log.error("❌ Erreur lors de l'écriture de la réponse User-Agent suspect", e);
            }
            return;
        }

        // 🔒 VÉRIFICATION 4: Authentification et autorisation
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            log.warn("🚫 NON AUTHENTIFIÉ: {} - Tentative d'accès admin", clientIP);
            try {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write("{\"error\":\"Authentication required\",\"timestamp\":\"" + 
                    LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) + "\"}");
            } catch (IOException e) {
                log.error("❌ Erreur lors de l'écriture de la réponse non authentifié", e);
            }
            return;
        }

        // 🔒 VÉRIFICATION 5: Rôle ADMIN
        if (authentication.getPrincipal() instanceof UserDetails userDetails) {
            boolean hasAdminRole = userDetails.getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().equals("ROLE_ADMIN"));
            
            if (!hasAdminRole) {
                log.warn("🚫 ACCÈS NON AUTORISÉ: {} - Rôle: {} - IP: {}", 
                    userDetails.getUsername(), 
                    userDetails.getAuthorities(), 
                    clientIP);
                
                // Bannir l'IP en cas de tentative d'accès non autorisé
                banIP(clientIP);
                
                try {
                    response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                    response.setContentType("application/json");
                    response.setCharacterEncoding("UTF-8");
                    response.getWriter().write("{\"error\":\"Insufficient privileges\",\"timestamp\":\"" + 
                        LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) + "\"}");
                } catch (IOException e) {
                    log.error("❌ Erreur lors de l'écriture de la réponse privilèges insuffisants", e);
                }
                return;
            }
        }

        // 🔒 VÉRIFICATION 6: Audit trail
        log.info("✅ ACCÈS ADMIN AUTORISÉ: {} - IP: {} - URI: {} - User-Agent: {}", 
            authentication.getName(), clientIP, requestURI, userAgent);

        // Incrémenter le compteur de requêtes
        incrementRequestCounter(clientIP);
        
        // Continuer le filtrage
        filterChain.doFilter(request, response);
        
        } catch (Exception e) {
            log.error("❌ ERREUR CRITIQUE dans AdminSecurityFilter: {}", e.getMessage(), e);
            try {
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write("{\"error\":\"Internal server error\",\"timestamp\":\"" + 
                    LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) + "\"}");
            } catch (IOException ioException) {
                log.error("❌ Impossible d'écrire la réponse d'erreur", ioException);
            }
        }
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

    private boolean isIPBanned(String ip) {
        Long banTime = bannedIPs.get(ip);
        if (banTime == null) {
            return false;
        }
        
        // Vérifier si le bannissement a expiré
        if (System.currentTimeMillis() - banTime > BAN_DURATION) {
            bannedIPs.remove(ip);
            return false;
        }
        
        return true;
    }

    private void banIP(String ip) {
        bannedIPs.put(ip, System.currentTimeMillis());
        log.warn("🚫 IP BANNIE: {} - Bannissement de 24h", ip);
    }

    private boolean isRateLimited(String ip) {
        RequestCounter counter = requestCounters.get(ip);
        if (counter == null) {
            counter = new RequestCounter();
            requestCounters.put(ip, counter);
        }
        
        long currentTime = System.currentTimeMillis();
        if (currentTime - counter.lastReset > 60000) { // 1 minute
            counter.count = 1;
            counter.lastReset = currentTime;
            return false;
        }
        
        return ++counter.count > MAX_REQUESTS_PER_MINUTE;
    }

    private void incrementRequestCounter(String ip) {
        RequestCounter counter = requestCounters.get(ip);
        if (counter != null) {
            counter.count++;
        }
    }

    private boolean isSuspiciousUserAgent(String userAgent) {
        if (userAgent == null || userAgent.trim().isEmpty()) {
            return true;
        }
        
        String lowerUA = userAgent.toLowerCase();
        
        // Détecter les outils d'attaque
        String[] suspiciousPatterns = {
            "curl", "wget", "python", "perl", "ruby", "php", "java",
            "sqlmap", "nikto", "nmap", "burp", "owasp", "zap",
            "scanner", "crawler", "bot", "spider", "automation"
        };
        
        for (String pattern : suspiciousPatterns) {
            if (lowerUA.contains(pattern)) {
                return true;
            }
        }
        
        return false;
    }

    private static class RequestCounter {
        int count = 0;
        long lastReset = System.currentTimeMillis();
    }
}
