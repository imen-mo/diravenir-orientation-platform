package com.dira.diravenir1.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {

    @Value("${app.jwtSecret}")
    private String jwtSecret;

    @Value("${app.jwtExpirationMs}")
    private long jwtExpirationMs;

    private SecretKey getSigningKey() {
        // Vérification de la longueur minimale pour HS512 (64 bytes minimum)
        if (jwtSecret.length() < 64) {
            throw new IllegalStateException("JWT secret must be at least 64 characters long for HS512 algorithm");
        }
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    // Génère un token JWT à partir d'un Authentication
    public String generateToken(Authentication auth) {
        UserDetails userPrincipal = (UserDetails) auth.getPrincipal();
        return generateToken(userPrincipal.getUsername());
    }

    // Génère un token JWT à partir d'un username (String)
    public String generateToken(String username) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationMs);

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .setIssuer("diravenir-app")
                .setAudience("diravenir-users")
                .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                .compact();
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            throw new SecurityException("Token has expired");
        } catch (UnsupportedJwtException e) {
            throw new SecurityException("Unsupported JWT token");
        } catch (MalformedJwtException e) {
            throw new SecurityException("Invalid JWT token");
        } catch (SecurityException e) {
            throw new SecurityException("Invalid JWT signature");
        } catch (IllegalArgumentException e) {
            throw new SecurityException("JWT claims string is empty");
        }
    }

    public boolean isTokenValid(String token, String username) {
        try {
            final String extractedUsername = extractUsername(token);
            return (extractedUsername.equals(username)) && !isTokenExpired(token);
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isTokenExpired(String token) {
        try {
            return extractClaim(token, Claims::getExpiration).before(new Date());
        } catch (Exception e) {
            return true;
        }
    }
}
