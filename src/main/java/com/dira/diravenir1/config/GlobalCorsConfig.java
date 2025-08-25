package com.dira.diravenir1.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;
import java.util.List;

/**
 * Configuration CORS globale ultra-robuste pour Diravenir
 * Résout tous les problèmes CORS et permet une intégration frontend/backend parfaite
 */
@Configuration
public class GlobalCorsConfig implements WebMvcConfigurer {

    /**
     * Configuration CORS pour WebMvc (contrôleurs REST)
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns(
                    "http://localhost:*",
                    "http://127.0.0.1:*",
                    "http://localhost:3000",
                    "http://localhost:5173",
                    "http://localhost:3005",
                    "http://localhost:4200"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "HEAD")
                .allowedHeaders("*")
                .exposedHeaders("Authorization", "X-Auth-Error", "X-Total-Count")
                .allowCredentials(true)
                .maxAge(3600);
    }

    /**
     * Configuration CORS pour Spring Security (double sécurité)
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        
        // Origines autorisées (tous les ports localhost)
        config.setAllowedOriginPatterns(Arrays.asList(
            "http://localhost:*",
            "http://127.0.0.1:*"
        ));
        
        // Méthodes HTTP autorisées
        config.setAllowedMethods(Arrays.asList(
            "GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "HEAD"
        ));
        
        // Headers autorisés
        config.setAllowedHeaders(Arrays.asList(
            "*",
            "Authorization",
            "Content-Type",
            "Accept",
            "Origin",
            "X-Requested-With",
            "Cache-Control",
            "X-Auth-Error"
        ));
        
        // Headers exposés
        config.setExposedHeaders(Arrays.asList(
            "Authorization",
            "X-Auth-Error",
            "X-Total-Count",
            "X-Page-Info"
        ));
        
        // Configuration avancée
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);
        
        // Autoriser les cookies et credentials
        config.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        
        return source;
    }
}
