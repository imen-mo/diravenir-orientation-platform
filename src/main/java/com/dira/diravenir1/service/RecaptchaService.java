package com.dira.diravenir1.service;

import com.dira.diravenir1.payload.GoogleResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class RecaptchaService {

    private static final Logger logger = LoggerFactory.getLogger(RecaptchaService.class);
    
    @Value("${google.recaptcha.secret}")
    private String recaptchaSecret;
    
    @Value("${app.environment:dev}")
    private String environment;
    
    @Value("${google.recaptcha.score.threshold:0.5}")
    private double scoreThreshold;
    
    @Value("${google.recaptcha.score.threshold.strict:0.7}")
    private double strictScoreThreshold;

    private static final String GOOGLE_RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

    /**
     * Vérifie le token reCAPTCHA avec validation du score
     */
    public boolean verify(String recaptchaToken) {
        return verify(recaptchaToken, "submit", false);
    }
    
    /**
     * Vérifie le token reCAPTCHA avec action spécifique et validation stricte du score
     */
    public boolean verify(String recaptchaToken, String action, boolean strictMode) {
        logger.info("🔍 RecaptchaService.verify() - Environment: {} | Action: {} | Strict: {}", 
                   environment, action, strictMode);
        logger.info("🔍 RecaptchaService.verify() - Token: {}", 
                   recaptchaToken != null ? "PRÉSENT" : "ABSENT");
        
        // Désactiver la vérification en environnement de développement
        if ("dev".equals(environment)) {
            logger.info("🔍 RecaptchaService.verify() - Mode DEV détecté, retourne true");
            return true;
        }
        
        if (recaptchaToken == null || recaptchaToken.trim().isEmpty()) {
            logger.warn("🚫 RecaptchaService.verify() - Token reCAPTCHA manquant");
            return false;
        }
        
        // Vérification normale en production
        RestTemplate restTemplate = new RestTemplate();

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("secret", recaptchaSecret);
        params.add("response", recaptchaToken);
        params.add("remoteip", "127.0.0.1"); // En production, utiliser l'IP réelle

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        try {
            ResponseEntity<GoogleResponse> response = restTemplate.postForEntity(
                    GOOGLE_RECAPTCHA_VERIFY_URL, request, GoogleResponse.class);

            GoogleResponse googleResponse = response.getBody();
            
            if (googleResponse == null) {
                logger.error("🚫 RecaptchaService.verify() - Réponse Google vide");
                return false;
            }
            
            // Vérifier le succès de base
            if (!googleResponse.isSuccess()) {
                logger.warn("🚫 RecaptchaService.verify() - Échec de vérification Google: {}", 
                           googleResponse.getErrorCodes());
                return false;
            }
            
            // Vérifier l'action (si spécifiée)
            if (action != null && !action.equals(googleResponse.getAction())) {
                logger.warn("🚫 RecaptchaService.verify() - Action mismatch: attendu={}, reçu={}", 
                           action, googleResponse.getAction());
                return false;
            }
            
            // Vérifier le score de confiance
            double threshold = strictMode ? strictScoreThreshold : scoreThreshold;
            if (googleResponse.getScore() != null && googleResponse.getScore() < threshold) {
                logger.warn("🚫 RecaptchaService.verify() - Score trop faible: {} < {}", 
                           googleResponse.getScore(), threshold);
                logger.info("🔍 RecaptchaService.verify() - Niveau de risque: {}", 
                           googleResponse.getRiskLevel());
                return false;
            }
            
            logger.info("✅ RecaptchaService.verify() - Vérification réussie | Score: {} | Action: {} | Risque: {}", 
                       googleResponse.getScore(), googleResponse.getAction(), googleResponse.getRiskLevel());
            return true;
            
        } catch (Exception e) {
            logger.error("🚫 RecaptchaService.verify() - Erreur lors de la vérification: {}", e.getMessage());
            // En cas d'erreur de connexion à Google, on accepte en développement
            return "dev".equals(environment);
        }
    }
    
    /**
     * Vérifie le token reCAPTCHA avec validation stricte (score >= 0.7)
     */
    public boolean verifyStrict(String recaptchaToken, String action) {
        return verify(recaptchaToken, action, true);
    }
    
    /**
     * Vérifie le token reCAPTCHA pour l'inscription (score >= 0.5)
     */
    public boolean verifySignup(String recaptchaToken) {
        return verify(recaptchaToken, "signup", false);
    }
    
    /**
     * Vérifie le token reCAPTCHA pour la connexion (score >= 0.5)
     */
    public boolean verifySignin(String recaptchaToken) {
        return verify(recaptchaToken, "signin", false);
    }
    
    /**
     * Vérifie le token reCAPTCHA pour les actions sensibles (score >= 0.7)
     */
    public boolean verifySensitive(String recaptchaToken, String action) {
        return verify(recaptchaToken, action, true);
    }
}
