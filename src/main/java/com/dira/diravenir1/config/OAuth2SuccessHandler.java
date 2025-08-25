package com.dira.diravenir1.config;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Collections;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private static final Logger log = LoggerFactory.getLogger(OAuth2SuccessHandler.class);

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, 
                                     HttpServletResponse response, 
                                     Authentication authentication) throws IOException, ServletException {
        
        log.info("✅ OAuth2 Login réussi");
        
        if (authentication.getPrincipal() instanceof OAuth2User) {
            OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
            
            // Extraire les informations utilisateur
            String email = oauth2User.getAttribute("email");
            String name = oauth2User.getAttribute("name");
            String givenName = oauth2User.getAttribute("given_name");
            String familyName = oauth2User.getAttribute("family_name");
            String picture = oauth2User.getAttribute("picture");
            
            log.info("👤 Utilisateur OAuth2: {} ({})", name, email);
            
            // Créer une session HTTP pour maintenir l'authentification
            HttpSession session = request.getSession(true);
            session.setAttribute("oauth2User", oauth2User);
            session.setAttribute("userEmail", email);
            session.setAttribute("userName", name);
            session.setAttribute("userGivenName", givenName);
            session.setAttribute("userFamilyName", familyName);
            session.setAttribute("userPicture", picture);
            session.setAttribute("isOAuth2User", true);
            
            // Définir la durée de vie de la session (24 heures)
            session.setMaxInactiveInterval(24 * 60 * 60);
            
            log.info("🔐 Session OAuth2 créée pour l'utilisateur: {}", email);
            
            // Construire l'URL de redirection avec les informations utilisateur
            String redirectUrl = String.format(
                "http://localhost:3000/oauth2-success?email=%s&name=%s&givenName=%s&familyName=%s&picture=%s&sessionId=%s",
                email != null ? email : "",
                name != null ? name : "",
                givenName != null ? givenName : "",
                familyName != null ? familyName : "",
                picture != null ? picture : "",
                session.getId()
            );
            
            log.info("🔄 Redirection vers: {}", redirectUrl);
            
            // Rediriger vers le frontend
            getRedirectStrategy().sendRedirect(request, response, redirectUrl);
        } else {
            log.warn("⚠️ Principal non-OAuth2 détecté: {}", authentication.getPrincipal().getClass().getSimpleName());
            super.onAuthenticationSuccess(request, response, authentication);
        }
    }
}
