package com.dira.diravenir1.config;

import com.dira.diravenir1.Entities.Utilisateur;
import com.dira.diravenir1.Repository.UtilisateurRepository;
import com.dira.diravenir1.service.JwtService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private static final Logger logger = LoggerFactory.getLogger(OAuth2SuccessHandler.class);

    @Value("${app.frontend.url:http://localhost:3000}")
    private String frontendUrl;

    private final UtilisateurRepository utilisateurRepository;
    private final JwtService jwtService;

    public OAuth2SuccessHandler(UtilisateurRepository utilisateurRepository, JwtService jwtService) {
        this.utilisateurRepository = utilisateurRepository;
        this.jwtService = jwtService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                     Authentication authentication) throws IOException, ServletException {
        
        try {
            logger.info("🔐 Début du traitement de l'authentification OAuth2 réussie");
            
            if (authentication == null || !(authentication.getPrincipal() instanceof OAuth2User)) {
                logger.warn("⚠️ Authentification OAuth2 invalide - Redirection vers la page d'accueil");
                redirectToFrontend(response, "/?error=oauth2_invalid_auth");
                return;
            }

            OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
            String email = oauth2User.getAttribute("email");
            
            if (email == null || email.trim().isEmpty()) {
                logger.error("❌ Email OAuth2 manquant - Redirection vers la page d'accueil");
                redirectToFrontend(response, "/?error=oauth2_no_email");
                return;
            }

            logger.info("✅ Authentification OAuth2 réussie pour l'email : {}", email);
            
            // Vérifier si l'utilisateur existe en base
            Optional<Utilisateur> existingUser = utilisateurRepository.findByEmail(email);
            
            if (existingUser.isPresent()) {
                Utilisateur user = existingUser.get();
                logger.info("✅ Utilisateur OAuth2 existant connecté : {} | Rôle: {} | Compte Actif: {} | Email Vérifié: {}", 
                           email, user.getRole(), user.isCompteActif(), user.isEmailVerifie());
            } else {
                logger.info("🆕 Nouvel utilisateur OAuth2 créé : {}", email);
            }
            
            // Créer un token JWT pour l'utilisateur
            String token = jwtService.generateToken(email);
            logger.info("🔑 Token JWT généré avec succès pour : {}", email);
            
            // Maintenir la session
            SecurityContextHolder.getContext().setAuthentication(authentication);
            
            // REDIRECTION VERS LA PAGE HOME AUTHENTIFIÉE avec profil et statut
            // Au lieu de rediriger vers la page d'accueil simple, on redirige vers la home authentifiée
            String redirectUrl = frontendUrl + "/home?oauth2=success&email=" + 
                URLEncoder.encode(email, StandardCharsets.UTF_8) + "&token=" + 
                URLEncoder.encode(token, StandardCharsets.UTF_8) + "&authenticated=true";
            
            logger.info("🔄 Redirection OAuth2 vers la page home authentifiée : {}", redirectUrl);
            redirectToFrontend(response, redirectUrl);
            
        } catch (Exception e) {
            logger.error("❌ ERREUR CRITIQUE lors du traitement OAuth2 : {}", e.getMessage(), e);
            
            // En cas d'erreur, rediriger vers la page d'accueil avec un message d'erreur
            try {
                String errorMessage = URLEncoder.encode("Erreur lors de l'authentification OAuth2: " + e.getMessage(), StandardCharsets.UTF_8);
                redirectToFrontend(response, "/?error=oauth2_error&message=" + errorMessage);
            } catch (Exception redirectError) {
                logger.error("❌ ERREUR lors de la redirection d'erreur : {}", redirectError.getMessage());
                // Fallback : redirection simple
                response.sendRedirect(frontendUrl + "/?error=oauth2_failed");
            }
        }
    }

    /**
     * Redirige vers le frontend de manière sécurisée
     */
    private void redirectToFrontend(HttpServletResponse response, String path) throws IOException {
        String fullUrl = frontendUrl + path;
        logger.info("🔄 Redirection vers : {}", fullUrl);
        response.sendRedirect(fullUrl);
    }
}
