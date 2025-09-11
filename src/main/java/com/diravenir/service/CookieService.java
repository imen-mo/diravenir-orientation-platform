package com.diravenir.service;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Optional;

@Service
@Slf4j
public class CookieService {

    @Value("${app.cookie.domain:localhost}")
    private String cookieDomain;

    @Value("${app.cookie.secure:false}")
    private boolean cookieSecure;

    @Value("${app.cookie.same-site:Lax}")
    private String cookieSameSite;

    // Noms des cookies
    public static final String ACCESS_TOKEN_COOKIE = "diravenir_access_token";
    public static final String REFRESH_TOKEN_COOKIE = "diravenir_refresh_token";
    public static final String USER_INFO_COOKIE = "diravenir_user_info";

    /**
     * Crée un cookie sécurisé pour le token d'accès
     */
    public void setAccessTokenCookie(HttpServletResponse response, String token, int maxAgeSeconds) {
        Cookie cookie = createSecureCookie(ACCESS_TOKEN_COOKIE, token, maxAgeSeconds);
        response.addCookie(cookie);
        log.debug("🍪 Cookie d'accès défini avec maxAge: {}s", maxAgeSeconds);
    }

    /**
     * Crée un cookie sécurisé pour le refresh token
     */
    public void setRefreshTokenCookie(HttpServletResponse response, String refreshToken, int maxAgeSeconds) {
        Cookie cookie = createSecureCookie(REFRESH_TOKEN_COOKIE, refreshToken, maxAgeSeconds);
        response.addCookie(cookie);
        log.debug("🍪 Cookie de refresh défini avec maxAge: {}s", maxAgeSeconds);
    }

    /**
     * Crée un cookie pour les informations utilisateur
     */
    public void setUserInfoCookie(HttpServletResponse response, String userInfo, int maxAgeSeconds) {
        Cookie cookie = createSecureCookie(USER_INFO_COOKIE, userInfo, maxAgeSeconds);
        response.addCookie(cookie);
        log.debug("🍪 Cookie utilisateur défini avec maxAge: {}s", maxAgeSeconds);
    }

    /**
     * Récupère le token d'accès depuis les cookies
     */
    public Optional<String> getAccessTokenFromCookie(HttpServletRequest request) {
        return getCookieValue(request, ACCESS_TOKEN_COOKIE);
    }

    /**
     * Récupère le refresh token depuis les cookies
     */
    public Optional<String> getRefreshTokenFromCookie(HttpServletRequest request) {
        return getCookieValue(request, REFRESH_TOKEN_COOKIE);
    }

    /**
     * Récupère les informations utilisateur depuis les cookies
     */
    public Optional<String> getUserInfoFromCookie(HttpServletRequest request) {
        return getCookieValue(request, USER_INFO_COOKIE);
    }

    /**
     * Supprime tous les cookies d'authentification
     */
    public void clearAuthCookies(HttpServletResponse response) {
        // Supprimer le cookie d'accès
        Cookie accessCookie = createSecureCookie(ACCESS_TOKEN_COOKIE, "", 0);
        response.addCookie(accessCookie);

        // Supprimer le cookie de refresh
        Cookie refreshCookie = createSecureCookie(REFRESH_TOKEN_COOKIE, "", 0);
        response.addCookie(refreshCookie);

        // Supprimer le cookie utilisateur
        Cookie userCookie = createSecureCookie(USER_INFO_COOKIE, "", 0);
        response.addCookie(userCookie);

        log.info("🍪 Tous les cookies d'authentification supprimés");
    }

    /**
     * Crée un cookie sécurisé avec les bonnes configurations
     */
    private Cookie createSecureCookie(String name, String value, int maxAgeSeconds) {
        Cookie cookie = new Cookie(name, value);
        
        // Configuration de base
        cookie.setMaxAge(maxAgeSeconds);
        cookie.setPath("/");
        
        // Configuration de sécurité
        if (cookieSecure) {
            cookie.setSecure(true);
        }
        
        // Configuration du domaine
        if (cookieDomain != null && !cookieDomain.isEmpty()) {
            cookie.setDomain(cookieDomain);
        }
        
        // Configuration SameSite (via commentaire car pas directement supporté par Cookie)
        // cookie.setAttribute("SameSite", cookieSameSite);
        
        // HttpOnly pour éviter l'accès JavaScript
        cookie.setHttpOnly(true);
        
        return cookie;
    }

    /**
     * Récupère la valeur d'un cookie par son nom
     */
    private Optional<String> getCookieValue(HttpServletRequest request, String cookieName) {
        if (request.getCookies() == null) {
            return Optional.empty();
        }

        return Arrays.stream(request.getCookies())
                .filter(cookie -> cookieName.equals(cookie.getName()))
                .map(Cookie::getValue)
                .findFirst();
    }

    /**
     * Vérifie si un cookie existe
     */
    public boolean hasCookie(HttpServletRequest request, String cookieName) {
        return getCookieValue(request, cookieName).isPresent();
    }

    /**
     * Définit tous les cookies d'authentification en une fois
     */
    public void setAllAuthCookies(HttpServletResponse response, String accessToken, String refreshToken, String userInfo) {
        // Token d'accès : 1 heure
        setAccessTokenCookie(response, accessToken, 3600);
        
        // Refresh token : 7 jours
        setRefreshTokenCookie(response, refreshToken, 7 * 24 * 3600);
        
        // Informations utilisateur : 7 jours
        setUserInfoCookie(response, userInfo, 7 * 24 * 3600);
        
        log.info("🍪 Tous les cookies d'authentification définis");
    }
}
