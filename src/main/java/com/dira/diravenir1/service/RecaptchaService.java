package com.dira.diravenir1.service;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.Map;

@Service
public class RecaptchaService {

    @Value("${google.recaptcha.secret}")
    private String secret;

    @Value("${google.recaptcha.url}")
    private String verifyUrl;

    public boolean verify(String response) {
        RestTemplate restTemplate = new RestTemplate();
        Map<String, Object> responseMap = restTemplate.postForObject(
                verifyUrl + "?secret=" + secret + "&response=" + response,
                null, Map.class);
        return (Boolean) responseMap.get("success");
    }
}
