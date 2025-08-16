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
        
        if (authentication != null && authentication.getPrincipal() instanceof OAuth2User) {
            OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
            String email = oauth2User.getAttribute("email");
            
            if (email != null) {
                // Vérifier si l'utilisateur existe en base
                Optional<Utilisateur> existingUser = utilisateurRepository.findByEmail(email);
                
                if (existingUser.isPresent()) {
                    logger.info("✅ Utilisateur OAuth2 existant connecté : {}", email);
                } else {
                    logger.info("🆕 Nouvel utilisateur OAuth2 créé : {}", email);
                }
                
                // Créer un token JWT pour l'utilisateur
                String token = jwtService.generateToken(email);
                
                // Maintenir la session
                SecurityContextHolder.getContext().setAuthentication(authentication);
                
                // Rediriger vers le frontend avec l'email et le token
                String redirectUrl = frontendUrl + "/?oauth2=success&email=" + 
                    java.net.URLEncoder.encode(email, "UTF-8") + "&token=" + 
                    java.net.URLEncoder.encode(token, "UTF-8");
                
                logger.info("🔄 Redirection OAuth2 avec token vers : {}", redirectUrl);
                getRedirectStrategy().sendRedirect(request, response, redirectUrl);
                return;
            }
        }
        
        // Fallback vers la page d'accueil
        logger.warn("⚠️ Redirection OAuth2 fallback vers la page d'accueil");
        getRedirectStrategy().sendRedirect(request, response, frontendUrl + "/");
    }
}
