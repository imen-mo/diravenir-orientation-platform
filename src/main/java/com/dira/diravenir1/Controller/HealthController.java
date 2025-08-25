package com.dira.diravenir1.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Map;
import java.util.HashMap;
import java.util.Properties;
import java.time.LocalDateTime;
import com.dira.diravenir1.Entities.Utilisateur;
import com.dira.diravenir1.Entities.Role;
import com.dira.diravenir1.Repository.UtilisateurRepository;

@RestController
@RequestMapping("/api")
public class HealthController {

    private final UtilisateurRepository utilisateurRepository;

    public HealthController(UtilisateurRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        return ResponseEntity.ok(Map.of(
            "status", "UP",
            "timestamp", System.currentTimeMillis(),
            "service", "Diravenir Backend",
            "version", "1.0.0"
        ));
    }

    @GetMapping("/test-email")
    public ResponseEntity<Map<String, Object>> testEmail() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Test d'envoi d'email simple
            JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
            mailSender.setHost("smtp.gmail.com");
            mailSender.setPort(587);
            mailSender.setUsername("imanecompte024@gmail.com");
            mailSender.setPassword("eeor guik iftz nico");
            
            Properties props = mailSender.getJavaMailProperties();
            props.put("mail.transport.protocol", "smtp");
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.starttls.enable", "true");
            props.put("mail.smtp.starttls.required", "true");
            props.put("mail.smtp.connectiontimeout", "10000");
            props.put("mail.smtp.timeout", "10000");
            props.put("mail.smtp.writetimeout", "10000");
            
            // Test de connexion SMTP
            try {
                mailSender.testConnection();
                response.put("connectionTest", "✅ Connexion SMTP réussie");
            } catch (Exception connEx) {
                response.put("connectionTest", "❌ Échec connexion SMTP: " + connEx.getMessage());
                throw connEx;
            }
            
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("imanecompte024@gmail.com");
            message.setTo("amounaiman836@gmail.com");
            message.setSubject("🧪 Test SMTP Diravenir - " + LocalDateTime.now());
            message.setText("Ceci est un test d'envoi d'email depuis Diravenir.\n\nTimestamp: " + LocalDateTime.now() + "\n\nSi vous recevez cet email, le service SMTP fonctionne correctement !");
            
            mailSender.send(message);
            
            response.put("status", "success");
            response.put("message", "Test d'email réussi");
            response.put("timestamp", LocalDateTime.now().toString());
            response.put("to", "amounaiman836@gmail.com");
            response.put("smtp_host", "smtp.gmail.com");
            response.put("smtp_port", "587");
            
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Erreur lors du test d'email: " + e.getMessage());
            response.put("errorType", e.getClass().getSimpleName());
            response.put("stackTrace", e.getStackTrace()[0].toString());
            e.printStackTrace();
        }
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/test-database")
    public ResponseEntity<Map<String, Object>> testDatabase() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Test de lecture
            long userCount = utilisateurRepository.count();
            response.put("readTest", "✅ Succès - " + userCount + " utilisateurs trouvés");
            
            // Test d'écriture (créer un utilisateur temporaire)
            Utilisateur testUser = Utilisateur.builder()
                    .nom("Test")
                    .prenom("Database")
                    .email("test.db." + System.currentTimeMillis() + "@example.com")
                    .password("test123")
                    .role(Role.ETUDIANT)
                    .compteActif(false)
                    .dateCreation(LocalDateTime.now())
                    .build();
            
            Utilisateur savedUser = utilisateurRepository.save(testUser);
            response.put("writeTest", "✅ Succès - Utilisateur créé avec ID: " + savedUser.getId());
            
            // Supprimer l'utilisateur de test
            utilisateurRepository.deleteById(savedUser.getId());
            response.put("deleteTest", "✅ Succès - Utilisateur de test supprimé");
            
            response.put("status", "success");
            response.put("message", "Tous les tests de base de données ont réussi");
            
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Erreur lors du test de base de données: " + e.getMessage());
            response.put("error", e.getClass().getSimpleName());
            e.printStackTrace();
        }
        
        return ResponseEntity.ok(response);
    }






}
