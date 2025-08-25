package com.dira.diravenir1.filter;

import com.dira.diravenir1.service.CustomUserDetailsService;
import com.dira.diravenir1.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        
        // Ignorer tous les endpoints publics qui ne nécessitent pas de JWT
        String requestURI = request.getRequestURI();
        
        // Liste complète des endpoints publics (même que dans SecurityConfig)
        if (isPublicEndpoint(requestURI)) {
            filterChain.doFilter(request, response);
            return;
        }
        
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;
        
        // Vérifier si l'en-tête Authorization est présent et commence par "Bearer "
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            // Pas de token JWT - laisser Spring Security gérer l'authentification
            filterChain.doFilter(request, response);
            return;
        }
        
        // Extraire le token JWT
        jwt = authHeader.substring(7);
        userEmail = jwtService.extractUsername(jwt);
        
        // Si l'email est extrait et qu'aucune authentification n'est présente
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
            
            // Vérifier si le token est valide
            if (jwtService.isTokenValid(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.getAuthorities()
                );
                
                authToken.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(request)
                );
                
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        
        filterChain.doFilter(request, response);
    }
    
    /**
     * Vérifie si l'endpoint est public (pas d'authentification JWT requise)
     * Cette liste doit correspondre exactement à celle définie dans SecurityConfig
     */
    private boolean isPublicEndpoint(String requestURI) {
        // Endpoints d'authentification
        if (requestURI.startsWith("/api/auth/")) return true;
        
        // Endpoints de santé et monitoring
        if (requestURI.startsWith("/api/health/")) return true;
        if (requestURI.startsWith("/actuator/health")) return true;
        
        // Endpoints OAuth2
        if (requestURI.startsWith("/oauth2/")) return true;
        
        // Endpoints d'orientation (accès public pour les tests)
        if (requestURI.startsWith("/api/orientation/")) return true;
        if (requestURI.startsWith("/api/test/orientation/")) return true;
        
        // Endpoints de sécurité de test
        if (requestURI.startsWith("/api/security-test/")) return true;
        
        // Endpoints publics de contenu
        if (requestURI.startsWith("/api/filieres/")) return true;
        if (requestURI.startsWith("/api/temoignages/")) return true;
        if (requestURI.startsWith("/api/destinations/")) return true;
        if (requestURI.startsWith("/api/partenaires/")) return true;
        if (requestURI.startsWith("/api/applications/")) return true;
        
        // Endpoints système
        if (requestURI.startsWith("/h2-console/")) return true;
        if (requestURI.startsWith("/error")) return true;
        if (requestURI.startsWith("/public/")) return true;
        
        // Endpoints spécifiques
        if (requestURI.equals("/api/auth/create-admin")) return true;
        if (requestURI.equals("/api/auth/register")) return true;
        if (requestURI.equals("/api/auth/login")) return true;
        if (requestURI.equals("/api/auth/check-admin")) return true;
        
        return false;
    }
}
