package com.dira.diravenir1.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomUserDetailsService implements UserDetailsService {

    // Pour l'instant, nous créons un utilisateur par défaut
    // Plus tard, vous pourrez injecter votre repository d'utilisateurs

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("🔍 Chargement des détails utilisateur pour: {}", username);
        
        // Pour l'instant, créer un utilisateur par défaut
        // Vous devrez adapter ceci selon votre modèle d'utilisateur
        return User.builder()
                .username(username)
                .password("$2a$12$dummy.password.hash.for.oauth2.users")
                .authorities(Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")))
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(false)
                .build();
    }
}
