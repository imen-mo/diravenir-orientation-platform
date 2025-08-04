package com.dira.diravenir1.service;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

/**
 * Service pour la gestion des jetons JWT (génération, validation, extraction).
 */
@Slf4j
@Service
public class JwtService {

    @Value("${app.jwt.secret}")
    private String secretKey;

    @Value("${app.jwt.expiration-ms:86400000}")
    private long jwtExpirationMs;

    @Value("${app.jwt.refresh-expiration-ms:604800000}")
    private long refreshExpirationMs;

    /**
     * Génère un token JWT à partir des informations d'authentification.
     */
    public String generateToken(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return generateToken(new HashMap<>(), userDetails.getUsername());
    }

    /**
     * Génère un token JWT pour un nom d'utilisateur.
     */
    public String generateToken(String username) {
        return generateToken(new HashMap<>(), username);
    }

    /**
     * Génère un token JWT avec des revendications personnalisées.
     */
    private String generateToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                .compact();
    }

    /**
     * Génère un token de rafraîchissement.
     */
    public String generateRefreshToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + refreshExpirationMs))
                .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                .compact();
    }

    /**
     * Extrait le nom d'utilisateur à partir d'un token.
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Extrait une revendication spécifique d’un token.
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Vérifie si un token est valide.
     */
    public boolean isTokenValid(String token, String expectedUsername) {
        try {
            String actualUsername = extractUsername(token);
            return actualUsername.equals(expectedUsername) && !isTokenExpired(token);
        } catch (JwtException | IllegalArgumentException e) {
            log.warn("Token JWT invalide : {}", e.getMessage());
            return false;
        }
    }

    /**
     * Vérifie si un token a expiré.
     */
    public boolean isTokenExpired(String token) {
        try {
            Date expiration = extractClaim(token, Claims::getExpiration);
            return expiration.before(new Date());
        } catch (JwtException e) {
            log.warn("Impossible de vérifier l’expiration du token : {}", e.getMessage());
            return true; // On considère le token comme expiré
        }
    }

    /**
     * Récupère toutes les revendications d’un token.
     */
    private Claims extractAllClaims(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            log.warn("Le token a expiré : {}", e.getMessage());
            throw e;
        } catch (UnsupportedJwtException | MalformedJwtException | SignatureException | IllegalArgumentException e) {
            log.error("Erreur lors de l'analyse du token : {}", e.getMessage());
            throw e;
        }
    }

    /**
     * Récupère la clé de signature à partir du secret.
     */
    private Key getSigningKey() {
        if (secretKey == null || secretKey.trim().isEmpty() || secretKey.length() < 64) {
            throw new IllegalStateException("La clé secrète JWT doit contenir au moins 64 caractères.");
        }
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    /**
     * Retourne le temps restant avant expiration du token (en ms).
     */
    public long getRemainingTimeMs(String token) {
        try {
            Date expiration = extractClaim(token, Claims::getExpiration);
            return expiration.getTime() - System.currentTimeMillis();
        } catch (JwtException e) {
            log.warn("Erreur lors du calcul du temps restant du token : {}", e.getMessage());
            return 0;
        }
    }

    /**
     * Retourne la durée de validité du token JWT (en secondes).
     */
    public long getExpiration() {
        return jwtExpirationMs / 1000;
    }
}
