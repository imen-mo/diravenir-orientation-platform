package com.dira.diravenir1.config;

import com.dira.diravenir1.filter.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final OAuth2UserService<OAuth2UserRequest, OAuth2User> oauth2UserService;
    private final OAuth2SuccessHandler oauth2SuccessHandler;

    /**
     * Chaîne de filtres de sécurité principale
     * CORRIGÉE pour permettre l'accès public aux endpoints de test d'orientation
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.and()) // Utilise la configuration CORS globale
                .csrf(csrf -> csrf.disable())
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
                .authorizeHttpRequests(auth -> auth
                        // Endpoints publics (pas d'authentification requise)
                        .requestMatchers(new AntPathRequestMatcher("/h2-console/")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/auth/")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/health/")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/oauth2/")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/error")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/actuator/health")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/public/", "GET")).permitAll()
                        
                        // Endpoints d'orientation - ACCÈS PUBLIC POUR LES TESTS
                        .requestMatchers(new AntPathRequestMatcher("/api/orientation/")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/orientation/majors")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/orientation/ideal-profiles")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/orientation/ideal-profiles/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/orientation/majors/**")).permitAll()
                        
                        // Endpoints de test d'orientation - ACCÈS PUBLIC
                        .requestMatchers(new AntPathRequestMatcher("/api/test/orientation/**")).permitAll()
                        
                        // Endpoints de sécurité de test - ACCÈS PUBLIC
                        .requestMatchers(new AntPathRequestMatcher("/api/security-test/**")).permitAll()
                        
                        // Autres endpoints publics
                        .requestMatchers(new AntPathRequestMatcher("/api/filieres/")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/temoignages/")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/destinations/")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/partenaires/")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/applications/")).permitAll()
                        
                        // Endpoints des programmes - ACCÈS PUBLIC POUR L'AFFICHAGE
                        .requestMatchers(new AntPathRequestMatcher("/api/programs/")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/programs/**")).permitAll()
                        
                        // Tous les autres endpoints nécessitent une authentification
                        .anyRequest().authenticated()
                )
                .oauth2Login(oauth2 -> oauth2
                        .userInfoEndpoint(userInfo -> userInfo.userService(oauth2UserService))
                        .successHandler(oauth2SuccessHandler)
                        .failureHandler((request, response, exception) -> {
                            try {
                                response.sendRedirect("http://localhost:3000/oauth2-failure?error=" + java.net.URLEncoder.encode(exception.getMessage(), "UTF-8"));
                            } catch (Exception e) {
                                response.sendRedirect("http://localhost:3000/oauth2-failure?error=oauth2_failed");
                            }
                        })
                )
                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint((request, response, authException) -> {
                            response.setStatus(401);
                            response.setContentType("application/json");
                            response.getWriter().write("{\"error\":\"Accès non autorisé\"}");
                        })
                        .accessDeniedHandler((request, response, accessDeniedException) -> {
                            response.setStatus(403);
                            response.setContentType("application/json");
                            response.getWriter().write("{\"error\":\"Accès refusé\"}");
                        })
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    /**
     * Configuration CORS simplifiée - utilise la configuration globale
     * SUPPRIMÉE pour éviter le conflit avec GlobalCorsConfig
     */
    // @Bean
    // public CorsConfigurationSource corsConfigurationSource() {
    //     // Cette méthode a été supprimée pour éviter le conflit
    //     // La configuration CORS est maintenant gérée par GlobalCorsConfig
    // }

    /**
     * Encodeur de mots de passe fort (BCrypt)
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

    /**
     * Gestionnaire d'authentification
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
