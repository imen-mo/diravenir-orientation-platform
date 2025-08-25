package com.dira.diravenir1.Controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
@RequestMapping("/oauth2")
public class OAuth2CallbackController {

    @GetMapping("/callback")
    public void handleOAuth2Callback(
            @AuthenticationPrincipal OAuth2User oauth2User,
            @RequestParam(value = "error", required = false) String error,
            HttpServletRequest request,
            HttpServletResponse response) throws IOException {
        
        if (error != null) {
            // Gérer l'erreur
            System.err.println("❌ OAuth2 Error: " + error);
            response.sendRedirect("http://localhost:3000/oauth2-failure?error=" + error);
            return;
        }
        
        if (oauth2User != null) {
            // Succès - extraire les informations utilisateur
            String email = oauth2User.getAttribute("email");
            String name = oauth2User.getAttribute("name");
            String givenName = oauth2User.getAttribute("given_name");
            String familyName = oauth2User.getAttribute("family_name");
            
            System.out.println("✅ OAuth2 Callback réussi pour: " + email);
            System.out.println("👤 Nom: " + name);
            System.out.println("📧 Email: " + email);
            
            // Construire l'URL de redirection avec les paramètres utilisateur
            String redirectUrl = "http://localhost:3000/oauth2-success" +
                    "?email=" + (email != null ? email : "") +
                    "&name=" + (name != null ? name : "") +
                    "&givenName=" + (givenName != null ? givenName : "") +
                    "&familyName=" + (familyName != null ? familyName : "");
            
            System.out.println("🔄 Redirection vers: " + redirectUrl);
            response.sendRedirect(redirectUrl);
        } else {
            // Pas d'utilisateur OAuth2
            System.err.println("❌ OAuth2 Callback: Pas d'utilisateur");
            response.sendRedirect("http://localhost:3000/oauth2-failure?error=no_user");
        }
    }
    
    @GetMapping("/success")
    public void handleOAuth2Success(
            @AuthenticationPrincipal OAuth2User oauth2User,
            HttpServletResponse response) throws IOException {
        
        if (oauth2User != null) {
            String email = oauth2User.getAttribute("email");
            System.out.println("✅ OAuth2 Success pour: " + email);
            
            // Rediriger vers le frontend avec les informations
            String redirectUrl = "http://localhost:3000/oauth2-success" +
                    "?email=" + (email != null ? email : "") +
                    "&name=" + (oauth2User.getAttribute("name") != null ? oauth2User.getAttribute("name") : "");
            
            response.sendRedirect(redirectUrl);
        } else {
            response.sendRedirect("http://localhost:3000/oauth2-failure?error=authentication_failed");
        }
    }
}
