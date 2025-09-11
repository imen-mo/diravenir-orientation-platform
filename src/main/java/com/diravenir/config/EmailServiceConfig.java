package com.diravenir.config;

import com.diravenir.service.EmailService;
import com.diravenir.service.EmailServiceInterface;
import com.diravenir.service.MockEmailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

/**
 * Configuration conditionnelle du service email
 * Utilise MockEmailService en mode mock, EmailService en mode réel
 */
@Configuration
@Slf4j
public class EmailServiceConfig {

    @Value("${app.email.mock:false}")
    private boolean emailMockMode;

    @Bean
    @Primary
    public EmailServiceInterface emailServiceInterface(EmailService realEmailService, MockEmailService mockEmailService) {
        if (emailMockMode) {
            log.info("📧 Mode MOCK activé pour les emails - Les emails seront affichés dans les logs");
            return mockEmailService;
        } else {
            log.info("📧 Mode RÉEL activé pour les emails - Les emails seront envoyés via SMTP");
            return realEmailService;
        }
    }
}
