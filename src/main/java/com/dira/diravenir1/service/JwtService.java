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
 * Service pour la gestion des jetons JWT (JSON Web Tokens).
 * Permet de générer, valider et extraire des informations des jetons JWT.
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
     * Génère un token JWT à partir des détails d'authentification de l'utilisateur.
     * 
     * @param authentication L'objet d'authentification Spring Security
     * @return Le token JWT généré
     */
    public String generateToken(Authentication authentication) {
        UserDetails userPrincipal = (UserDetails) authentication.getPrincipal();
        Map<String, Object> claims = new HashMap<>();
        
        // Ajouter des revendications personnalisées si nécessaire
        // claims.put("roles", userPrincipal.getAuthorities());
        
        return generateToken(claims, userPrincipal.getUsername());
    }

    /**
     * Génère un token JWT à partir d'un nom d'utilisateur.
     * 
     * @param username Le nom d'utilisateur pour lequel générer le token
     * @return Le token JWT généré
     */
    public String generateToken(String username) {
        return generateToken(new HashMap<>(), username);
    }
    
    /**
     * Génère un token JWT avec des revendications personnalisées.
     */
    private String generateToken(Map<String, Object> extraClaims, String subject) {
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                .compact();
    }
    
    /**
     * Génère un token de rafraîchissement pour un utilisateur.
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
     * Extrait le nom d'utilisateur du token JWT.
     */
    public String extractUsername(String token) {
        try {
            return extractClaim(token, Claims::getSubject);
        } catch (ExpiredJwtException ex) {
            log.warn("Le JWT a expiré : {}", ex.getMessage());
            throw ex;
        } catch (Exception ex) {
            log.error("Erreur lors de l'extraction du nom d'utilisateur du token JWT : {}", ex.getMessage());
            throw ex;
        }
    }

    /**
     * Extrait une revendication spécifique du token JWT.
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Extrait toutes les revendications du token JWT.
     */
    private Claims extractAllClaims(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException ex) {
            log.warn("Le JWT a expiré : {}", ex.getMessage());
            throw ex;
        } catch (UnsupportedJwtException ex) {
            log.error("Le token JWT n'est pas supporté : {}", ex.getMessage());
            throw ex;
        } catch (MalformedJwtException ex) {
            log.error("Le token JWT est malformé : {}", ex.getMessage());
            throw ex;
        } catch (SignatureException ex) {
            log.error("Signature JWT invalide : {}", ex.getMessage());
            throw ex;
        } catch (IllegalArgumentException ex) {
            log.error("La chaîne de caractères du token JWT est vide : {}", ex.getMessage());
            throw ex;
        }
    }

    /**
     * Vérifie si le token JWT est valide pour un utilisateur donné.
     */
    public boolean isTokenValid(String token, String username) {
        try {
            final String extractedUsername = extractUsername(token);
            return (extractedUsername.equals(username)) && !isTokenExpired(token);
        } catch (Exception ex) {
            log.error("Erreur lors de la validation du token JWT : {}", ex.getMessage());
            return false;
        }
    }

    /**
     * Vérifie si le token JWT a expiré.
     */
    private boolean isTokenExpired(String token) {
        try {
            return extractClaim(token, Claims::getExpiration).before(new Date());
        } catch (ExpiredJwtException ex) {
            return true;
        } catch (Exception ex) {
            log.error("Erreur lors de la vérification de l'expiration du token JWT : {}", ex.getMessage());
            return true; // En cas d'erreur, on considère le token comme expiré par sécurité
        }
    }
    
    /**
     * Récupère la clé de signature pour les tokens JWT.
     */
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }
    
    /**
     * Calcule le temps restant avant l'expiration d'un token en millisecondes.
     */
    public long getRemainingTimeMs(String token) {
        try {
            Date expiration = extractClaim(token, Claims::getExpiration);
            return expiration.getTime() - System.currentTimeMillis();
        } catch (Exception ex) {
            log.error("Erreur lors du calcul du temps restant du token : {}", ex.getMessage());
            return 0;
        }
    }
}
