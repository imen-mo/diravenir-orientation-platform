package com.dira.diravenir1.service;

import com.dira.diravenir1.Entities.Utilisateur;
import com.dira.diravenir1.Repository.UtilisateurRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class GoogleOAuthService extends DefaultOAuth2UserService {

    private static final Logger logger = LoggerFactory.getLogger(GoogleOAuthService.class);

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oauth2User = super.loadUser(userRequest);
        
        try {
            return processOAuth2User(userRequest, oauth2User);
        } catch (Exception ex) {
            logger.error("❌ Erreur lors du traitement OAuth2 : {}", ex.getMessage());
            throw new OAuth2AuthenticationException("Erreur lors de l'authentification OAuth2");
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest userRequest, OAuth2User oauth2User) {
        String provider = userRequest.getClientRegistration().getRegistrationId();
        String providerId = oauth2User.getAttribute("sub");
        String email = oauth2User.getAttribute("email");
        String name = oauth2User.getAttribute("name");
        String picture = oauth2User.getAttribute("picture");
        String givenName = oauth2User.getAttribute("given_name");
        String familyName = oauth2User.getAttribute("family_name");

        logger.info("🔐 Authentification OAuth2 - Provider: {} | Email: {} | Photo: {}", provider, email, picture);

        // Vérifier si l'utilisateur existe déjà
        Optional<Utilisateur> existingUser = utilisateurRepository.findByEmail(email);
        
        if (existingUser.isPresent()) {
            Utilisateur user = existingUser.get();
            logger.info("✅ Utilisateur OAuth2 existant trouvé : {} | Rôle: {}", email, user.getRole());
            
            // Mettre à jour les informations si nécessaire
            boolean updated = false;
            if (picture != null && !picture.equals(user.getPhotoProfil())) {
                user.setPhotoProfil(picture);
                updated = true;
            }
            if (providerId != null && !providerId.equals(user.getGoogleId())) {
                user.setGoogleId(providerId);
                updated = true;
            }
            if (updated) {
                utilisateurRepository.save(user);
                logger.info("✅ Informations utilisateur OAuth2 mises à jour : {}", email);
            }
            
            // Marquer l'utilisateur comme connecté OAuth2
            user.setDerniereConnexion(java.time.LocalDateTime.now());
            utilisateurRepository.save(user);
            
            return createOAuth2User(user, oauth2User.getAttributes());
        } else {
            // Créer un nouvel utilisateur
            logger.info("🆕 Création d'un nouvel utilisateur OAuth2 : {}", email);
            Utilisateur newUser = createNewOAuth2User(provider, providerId, email, name, picture, givenName, familyName);
            logger.info("✅ Nouvel utilisateur OAuth2 créé avec succès : {}", email);
            return createOAuth2User(newUser, oauth2User.getAttributes());
        }
    }

    private Utilisateur createNewOAuth2User(String provider, String providerId, String email, String name, String picture, String givenName, String familyName) {
        Utilisateur user = new Utilisateur();
        
        // Utiliser les noms séparés si disponibles, sinon extraire du nom complet
        String firstName = givenName != null ? givenName : (name != null ? name.split(" ", 2)[0] : "");
        String lastName = familyName != null ? familyName : (name != null && name.split(" ", 2).length > 1 ? name.split(" ", 2)[1] : "");
        
        user.setEmail(email);
        user.setNom(lastName);
        user.setPrenom(firstName);
        user.setPassword("OAUTH2_USER"); // Mot de passe spécial pour les utilisateurs OAuth2
        user.setRole(com.dira.diravenir1.Entities.Role.USER);
        user.setEmailVerifie(true); // Email vérifié par Google
        
        // ======================
        // === NOUVEAUX CHAMPS ===
        // ======================
        user.setPhotoProfil(picture);
        user.setGoogleId(providerId);
        user.setProvider(provider);
        user.setProviderId(providerId);
        
        // Sauvegarder l'utilisateur
        return utilisateurRepository.save(user);
    }

    private OAuth2User createOAuth2User(Utilisateur user, Map<String, Object> attributes) {
        return new org.springframework.security.oauth2.core.user.DefaultOAuth2User(
                java.util.Collections.singletonList(new org.springframework.security.core.authority.SimpleGrantedAuthority("ROLE_" + user.getRole().name())),
                attributes,
                "email"
        );
    }
} 