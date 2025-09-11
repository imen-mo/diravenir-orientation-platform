package com.diravenir.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.UUID;

@Service
@Slf4j
public class JwtService {

    @Value("${application.security.jwt.secret-key:404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970}")
    private String secretKey;
    
    @Value("${application.security.jwt.expiration:3600000}") // 1 hour (plus sécurisé)
    private long jwtExpiration;
    
    @Value("${application.security.jwt.refresh-token.expiration:604800000}") // 7 days
    private long refreshExpiration;
    
    // Cache pour les tokens révoqués (blacklist)
    private final Map<String, Date> revokedTokens = new HashMap<>();

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("type", "access");
        claims.put("jti", UUID.randomUUID().toString()); // JWT ID unique
        return generateToken(claims, userDetails);
    }

    public String generateToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails
    ) {
        return buildToken(extraClaims, userDetails, jwtExpiration);
    }

    public String generateRefreshToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("type", "refresh");
        claims.put("jti", UUID.randomUUID().toString()); // JWT ID unique
        return buildToken(claims, userDetails, refreshExpiration);
    }

    private String buildToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails,
            long expiration
    ) {
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateTokenForUser(String username, String role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role);
        
        return Jwts
                .builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        try {
            // Vérifier si le token est révoqué
            if (isTokenRevoked(token)) {
                log.warn("❌ Token révoqué détecté");
                return false;
            }
            
            // Vérifier l'expiration
            if (isTokenExpired(token)) {
                log.warn("❌ Token expiré");
                return false;
            }
            
            // Vérifier l'utilisateur (si fourni)
            if (userDetails != null) {
                final String username = extractUsername(token);
                if (!username.equals(userDetails.getUsername())) {
                    log.warn("❌ Username mismatch dans le token");
                    return false;
                }
            }
            
            return true;
        } catch (Exception e) {
            log.error("❌ Erreur lors de la validation du token: {}", e.getMessage());
            return false;
        }
    }
    
    /**
     * Vérifie si un token est révoqué
     */
    public boolean isTokenRevoked(String token) {
        try {
            String jti = extractClaim(token, claims -> claims.get("jti", String.class));
            return revokedTokens.containsKey(jti);
        } catch (Exception e) {
            log.error("❌ Erreur lors de la vérification de révocation: {}", e.getMessage());
            return true; // En cas d'erreur, considérer comme révoqué par sécurité
        }
    }
    
    /**
     * Révoque un token (ajoute à la blacklist)
     */
    public void revokeToken(String token) {
        try {
            String jti = extractClaim(token, claims -> claims.get("jti", String.class));
            Date expiry = extractExpiration(token);
            revokedTokens.put(jti, expiry);
            log.info("✅ Token révoqué avec JTI: {}", jti);
        } catch (Exception e) {
            log.error("❌ Erreur lors de la révocation du token: {}", e.getMessage());
        }
    }
    
    /**
     * Nettoie les tokens révoqués expirés
     */
    public void cleanupRevokedTokens() {
        Date now = new Date();
        revokedTokens.entrySet().removeIf(entry -> now.after(entry.getValue()));
        log.info("🧹 Nettoyage des tokens révoqués expirés effectué");
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
