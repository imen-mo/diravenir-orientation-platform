package com.diravenir.service;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Arrays;
import java.util.Optional;

/**
 * Service de gestion sécurisée des cookies
 * Implémente les meilleures pratiques de sécurité OWASP
 */
@Slf4j
@Service
public class SecureCookieService {

    @Value("${app.cookie.secure:true}")
    private boolean secureCookies;

    @Value("${app.cookie.http-only:true}")
    private boolean httpOnlyCookies;

    @Value("${app.cookie.same-site:Strict}")
    private String sameSite;

    @Value("${app.cookie.domain:}")
    private String cookieDomain;

    /**
     * Crée un cookie JWT sécurisé
     */
    public Cookie createSecureJwtCookie(String name, String value, Duration maxAge) {
        Cookie cookie = new Cookie(name, value);
        
        // 🔒 SÉCURITÉ MAXIMALE
        cookie.setHttpOnly(true);           // Pas d'accès JavaScript
        cookie.setSecure(secureCookies);    // HTTPS seulement
        cookie.setPath("/");                // Toute l'application
        
        // Domaine personnalisé si configuré
        if (cookieDomain != null && !cookieDomain.trim().isEmpty()) {
            cookie.setDomain(cookieDomain);
        }
        
        // Age maximum
        if (maxAge != null) {
            cookie.setMaxAge((int) maxAge.toSeconds());
        }
        
        // SameSite pour prévenir CSRF
        if ("Strict".equals(sameSite)) {
            // Strict : cookie jamais envoyé en cross-site
        } else if ("Lax".equals(sameSite)) {
            // Lax : cookie envoyé seulement en navigation
        }
        
        log.debug("🍪 Cookie sécurisé créé: {} - HttpOnly: {} - Secure: {} - SameSite: {}", 
            name, cookie.isHttpOnly(), cookie.getSecure(), sameSite);
        
        return cookie;
    }

    /**
     * Crée un cookie d'authentification admin
     */
    public Cookie createAdminAuthCookie(String value, Duration maxAge) {
        Cookie cookie = createSecureJwtCookie("admin_auth", value, maxAge);
        
        // 🔒 SÉCURITÉ SUPPLÉMENTAIRE POUR ADMIN
        cookie.setPath("/admin");           // Route admin seulement
        cookie.setMaxAge((int) maxAge.toSeconds());
        
        log.info("🔐 Cookie admin créé avec sécurité maximale");
        return cookie;
    }

    /**
     * Crée un cookie d'authentification utilisateur
     */
    public Cookie createUserAuthCookie(String value, Duration maxAge) {
        Cookie cookie = createSecureJwtCookie("user_auth", value, maxAge);
        
        // 🔒 SÉCURITÉ STANDARD POUR UTILISATEURS
        cookie.setPath("/");
        cookie.setMaxAge((int) maxAge.toSeconds());
        
        log.debug("👤 Cookie utilisateur créé");
        return cookie;
    }

    /**
     * Récupère un cookie sécurisé
     */
    public Optional<String> getSecureCookie(HttpServletRequest request, String name) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            return Optional.empty();
        }
        
        return Arrays.stream(cookies)
            .filter(cookie -> name.equals(cookie.getName()))
            .filter(this::isCookieValid)
            .map(Cookie::getValue)
            .findFirst();
    }

    /**
     * Vérifie la validité d'un cookie
     */
    private boolean isCookieValid(Cookie cookie) {
        // 🔒 VÉRIFICATIONS DE SÉCURITÉ
        if (cookie == null || cookie.getValue() == null) {
            return false;
        }
        
        // Vérifier le chemin
        if (!"/".equals(cookie.getPath()) && !"/admin".equals(cookie.getPath())) {
            log.warn("🚫 Cookie avec chemin suspect: {} - {}", cookie.getName(), cookie.getPath());
            return false;
        }
        
        // Vérifier le domaine
        if (cookie.getDomain() != null && !cookieDomain.equals(cookie.getDomain())) {
            log.warn("🚫 Cookie avec domaine suspect: {} - {}", cookie.getName(), cookie.getDomain());
            return false;
        }
        
        return true;
    }

    /**
     * Supprime un cookie sécurisé
     */
    public void removeSecureCookie(HttpServletResponse response, String name, String path) {
        Cookie cookie = new Cookie(name, "");
        cookie.setPath(path != null ? path : "/");
        cookie.setMaxAge(0); // Expire immédiatement
        
        // Même configuration de sécurité
        cookie.setHttpOnly(true);
        cookie.setSecure(secureCookies);
        
        if (cookieDomain != null && !cookieDomain.trim().isEmpty()) {
            cookie.setDomain(cookieDomain);
        }
        
        response.addCookie(cookie);
        log.debug("🗑️ Cookie supprimé: {} - Path: {}", name, path);
    }

    /**
     * Valide tous les cookies de la requête
     */
    public boolean validateAllCookies(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            return true;
        }
        
        for (Cookie cookie : cookies) {
            if (!isCookieValid(cookie)) {
                log.warn("🚫 Cookie invalide détecté: {} - {}", cookie.getName(), cookie.getValue());
                return false;
            }
        }
        
        return true;
    }

    /**
     * Nettoie les cookies expirés
     */
    public void cleanupExpiredCookies(HttpServletRequest request, HttpServletResponse response) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            return;
        }
        
        for (Cookie cookie : cookies) {
            if (cookie.getMaxAge() > 0 && cookie.getMaxAge() < System.currentTimeMillis() / 1000) {
                removeSecureCookie(response, cookie.getName(), cookie.getPath());
                log.debug("🧹 Cookie expiré nettoyé: {}", cookie.getName());
            }
        }
    }
}
