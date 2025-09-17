package com.diravenir.service;

import com.diravenir.dto.AuthResponse;
import com.diravenir.dto.LoginRequest;
import com.diravenir.dto.RegisterRequest;

/**
 * Interface pour le service d'authentification
 */
public interface AuthService {
    
    /**
     * Inscription d'un nouvel utilisateur
     */
    AuthResponse register(RegisterRequest request);
    
    /**
     * Connexion d'un utilisateur
     */
    AuthResponse authenticate(LoginRequest request);
    
    /**
     * Vérification d'email
     */
    AuthResponse verifyEmail(String token);
    
    /**
     * Demande de réinitialisation de mot de passe
     */
    void forgotPassword(String email);
    
    /**
     * Réinitialisation de mot de passe
     */
    AuthResponse resetPassword(String token, String newPassword);
    
    /**
     * Déconnexion
     */
    void logout(String token);
    
    /**
     * Rafraîchir le token
     */
    AuthResponse refreshToken(String refreshToken);
}
