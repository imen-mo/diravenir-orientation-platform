package com.dira.diravenir1.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
public class EnvironmentConfig implements CommandLineRunner {

    @Autowired
    private Environment environment;

    @Override
    public void run(String... args) throws Exception {
        loadEnvironmentVariables();
    }

    private void loadEnvironmentVariables() {
        try {
            // Charger les variables d'environnement depuis le fichier .env
            Dotenv dotenv = Dotenv.configure()
                    .directory(".")
                    .filename(".env")
                    .ignoreIfMissing()
                    .load();
            
            if (dotenv != null) {
                // Définir les variables système pour chaque variable d'environnement
                dotenv.entries().forEach(entry -> {
                    String key = entry.getKey();
                    String value = entry.getValue();
                    
                    // Ne pas écraser les variables système existantes
                    if (System.getProperty(key) == null) {
                        System.setProperty(key, value);
                    }
                });
                
                System.out.println("✅ Variables d'environnement chargées depuis .env");
                System.out.println("🔐 Configuration JWT: " + (dotenv.get("JWT_SECRET") != null ? "CONFIGURÉE" : "NON CONFIGURÉE"));
                System.out.println("📧 Configuration Email: " + (dotenv.get("MAIL_USERNAME") != null ? "CONFIGURÉE" : "NON CONFIGURÉE"));
                System.out.println("🔑 Configuration OAuth2 Google: " + (dotenv.get("GOOGLE_CLIENT_ID") != null ? "CONFIGURÉE" : "NON CONFIGURÉE"));
                System.out.println("🌐 Configuration CORS: " + (dotenv.get("CORS_ORIGINS") != null ? "CONFIGURÉE" : "NON CONFIGURÉE"));
                System.out.println("⚡ Configuration Rate Limiting: " + (dotenv.get("RATE_LIMIT_MAX_ATTEMPTS") != null ? "CONFIGURÉE" : "NON CONFIGURÉE"));
                System.out.println("🧹 Configuration Session Cleanup: " + (dotenv.get("SESSION_CLEANUP_INTERVAL") != null ? "CONFIGURÉE" : "NON CONFIGURÉE"));
            } else {
                System.out.println("⚠️ Fichier .env non trouvé, utilisation des variables système par défaut");
            }
        } catch (Exception e) {
            System.err.println("❌ Erreur lors du chargement du fichier .env: " + e.getMessage());
            System.err.println("ℹ️ Utilisation des variables système par défaut");
        }
    }
}
