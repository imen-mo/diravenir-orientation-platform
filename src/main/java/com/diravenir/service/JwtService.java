package com.diravenir.service;

import org.springframework.security.core.userdetails.UserDetails;
import java.util.Map;

/**
 * Interface pour le service JWT
 */
public interface JwtService {
    
    /**
     * Extraire le nom d'utilisateur du token
     */
    String extractUsername(String token);
    
    /**
     * Générer un token pour l'utilisateur
     */
    String generateToken(UserDetails userDetails);
    
    /**
     * Générer un token avec des claims supplémentaires
     */
    String generateToken(Map<String, Object> extraClaims, UserDetails userDetails);
    
    /**
     * Vérifier si le token est valide
     */
    boolean isTokenValid(String token, UserDetails userDetails);
    
    /**
     * Vérifier si le token a expiré
     */
    boolean isTokenExpired(String token);
    
    /**
     * Générer un refresh token
     */
    String generateRefreshToken(UserDetails userDetails);
}
