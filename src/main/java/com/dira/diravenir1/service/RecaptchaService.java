package com.dira.diravenir1.service;

import com.dira.diravenir1.payload.GoogleResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
public class RecaptchaService {

    @Value("${google.recaptcha.secret}")
    private String recaptchaSecret;
    
    @Value("${app.environment:dev}")
    private String environment;

    private static final String GOOGLE_RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

    public boolean verify(String recaptchaToken) {
        // Désactiver la vérification en environnement de développement
        if ("dev".equals(environment)) {
            return true;
        }
        
        // Vérification normale en production
        RestTemplate restTemplate = new RestTemplate();

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("secret", recaptchaSecret);
        params.add("response", recaptchaToken);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        try {
            ResponseEntity<GoogleResponse> response = restTemplate.postForEntity(
                    GOOGLE_RECAPTCHA_VERIFY_URL, request, GoogleResponse.class);

            GoogleResponse googleResponse = response.getBody();
            return googleResponse != null && googleResponse.isSuccess();
        } catch (Exception e) {
            // En cas d'erreur de connexion à Google, on accepte en développement
            return "dev".equals(environment);
        }
    }
}
