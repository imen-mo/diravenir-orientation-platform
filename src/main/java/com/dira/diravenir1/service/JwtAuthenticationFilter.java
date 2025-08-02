package com.dira.diravenir1.service;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Filtre d'authentification JWT qui s'exécute une fois par requête.
 * Vérifie la présence et la validité du token JWT dans l'en-tête Authorization.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final String TOKEN_PREFIX = "Bearer ";
    private static final String AUTH_HEADER = "Authorization";
    private static final String AUTH_ERROR_HEADER = "X-Auth-Error";
    
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                   HttpServletResponse response,
                                   FilterChain filterChain) throws ServletException, IOException {
        
        // Ignorer les requêtes OPTIONS pour CORS
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            filterChain.doFilter(request, response);
            return;
        }
        
        try {
            // Extraire le token JWT de l'en-tête Authorization
            String jwt = parseJwt(request);
            
            if (jwt != null) {
                try {
                    // Valider le token et extraire le nom d'utilisateur
                    String username = jwtService.extractUsername(jwt);
                    
                    // Si l'utilisateur n'est pas déjà authentifié
                    if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                        // Charger les détails de l'utilisateur
                        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                        
                        // Vérifier la validité du token
                        if (jwtService.isTokenValid(jwt, userDetails.getUsername())) {
                            // Créer un objet d'authentification
                            UsernamePasswordAuthenticationToken authentication = 
                                new UsernamePasswordAuthenticationToken(
                                    userDetails, 
                                    null, 
                                    userDetails.getAuthorities()
                                );
                            
                            // Définir les détails de l'authentification
                            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                            
                            // Définir l'authentification dans le contexte de sécurité
                            SecurityContextHolder.getContext().setAuthentication(authentication);
                            log.debug("Utilisateur authentifié avec succès : {}", username);
                        }
                    }
                } catch (ExpiredJwtException ex) {
                    log.warn("Le JWT a expiré : {}", ex.getMessage());
                    handleJwtError(response, "Le jeton d'authentification a expiré", HttpStatus.UNAUTHORIZED);
                    return;
                } catch (SignatureException ex) {
                    log.warn("Signature JWT invalide : {}", ex.getMessage());
                    handleJwtError(response, "Signature du jeton invalide", HttpStatus.UNAUTHORIZED);
                    return;
                } catch (MalformedJwtException | UnsupportedJwtException ex) {
                    log.warn("Token JWT invalide : {}", ex.getMessage());
                    handleJwtError(response, "Jeton d'authentification invalide", HttpStatus.UNAUTHORIZED);
                    return;
                } catch (UsernameNotFoundException ex) {
                    log.warn("Utilisateur non trouvé : {}", ex.getMessage());
                    handleJwtError(response, "Utilisateur non trouvé", HttpStatus.UNAUTHORIZED);
                    return;
                } catch (IllegalArgumentException ex) {
                    log.warn("JWT claims est vide : {}", ex.getMessage());
                    handleJwtError(response, "Jeton d'authentification invalide", HttpStatus.BAD_REQUEST);
                    return;
                }
            }
            
            // Continuer la chaîne de filtres
            filterChain.doFilter(request, response);
            
        } catch (Exception e) {
            log.error("Erreur inattendue lors de l'authentification : {}", e.getMessage(), e);
            handleJwtError(response, "Erreur d'authentification", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * Extrait le token JWT de l'en-tête Authorization
     */
    private String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader(AUTH_HEADER);
        
        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith(TOKEN_PREFIX)) {
            return headerAuth.substring(TOKEN_PREFIX.length());
        }
        
        // Vérifier également le cookie d'authentification
        return null;
    }
    
    /**
     * Gère les erreurs d'authentification en renvoyant une réponse d'erreur appropriée
     */
    private void handleJwtError(HttpServletResponse response, String message, HttpStatus status) throws IOException {
        response.setStatus(status.value());
        response.setHeader(AUTH_ERROR_HEADER, message);
        response.setContentType("application/json");
        
        String jsonResponse = String.format(
            "{\"status\":%d,\"error\":\"%s\",\"message\":\"%s\"}",
            status.value(),
            status.getReasonPhrase(),
            message
        );
        
        response.getWriter().write(jsonResponse);
    }
    
    /**
     * Détermine si le chemin de la requête doit être exclu du filtrage JWT
     */
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        // Exclure les chemins publics du filtrage JWT
        return path.startsWith("/api/auth/") || 
               path.startsWith("/v3/api-docs") || 
               path.startsWith("/swagger-ui") ||
               path.startsWith("/swagger-ui.html") ||
               path.startsWith("/api/formations") ||
               path.startsWith("/api/domaines");
    }
}
