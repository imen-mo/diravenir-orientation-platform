package com.dira.diravenir1.service;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OAuth2UserService extends DefaultOAuth2UserService {

    private static final Logger log = LoggerFactory.getLogger(OAuth2UserService.class);

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        log.info("🔐 Chargement de l'utilisateur OAuth2 depuis: {}", userRequest.getClientRegistration().getRegistrationId());
        
        try {
            // Charger l'utilisateur depuis le fournisseur OAuth2 (Google)
            OAuth2User oauth2User = super.loadUser(userRequest);
            
            // Extraire les informations de l'utilisateur
            String email = oauth2User.getAttribute("email");
            String name = oauth2User.getAttribute("name");
            String givenName = oauth2User.getAttribute("given_name");
            String familyName = oauth2User.getAttribute("family_name");
            String picture = oauth2User.getAttribute("picture");
            String sub = oauth2User.getAttribute("sub");
            
            log.info("👤 Utilisateur OAuth2 chargé: {} ({})", name, email);
            
            // Créer un utilisateur OAuth2 personnalisé avec les autorisations appropriées
            // Utiliser l'email comme nom d'utilisateur principal pour l'identification
            DefaultOAuth2User customOAuth2User = new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
                oauth2User.getAttributes(),
                "email" // Utiliser l'email comme nom d'utilisateur principal
            );
            
            log.info("✅ Utilisateur OAuth2 personnalisé créé avec succès pour: {}", email);
            
            return customOAuth2User;
            
        } catch (Exception e) {
            log.error("❌ Erreur lors du chargement de l'utilisateur OAuth2: {}", e.getMessage(), e);
            throw new OAuth2AuthenticationException("Erreur lors du chargement de l'utilisateur OAuth2: " + e.getMessage());
        }
    }
}
