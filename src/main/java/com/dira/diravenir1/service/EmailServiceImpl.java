package com.dira.diravenir1.service;

import com.dira.diravenir1.dto.OrientationResponseDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {
    @Value("${spring.mail.username:test@diravenir.com}")
    private String mailUsername;
    
    @Value("${app.frontend.url:http://localhost:3000}")
    private String frontendUrl;
    
    private final JavaMailSender mailSender;

    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public boolean sendOrientationResults(String userEmail, String userName, OrientationResponseDTO results) {
        try {
            System.out.println("📧 Service Email: Envoi des résultats d'orientation à: " + userEmail);
            
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(mailUsername);
            message.setTo(userEmail);
            message.setSubject("🎯 Vos résultats d'orientation - Diravenir");
            
            String emailContent = String.format(
                "🏆 Top 3 des programmes recommandés :\n",
                userName,
                "Profil Principal", // Valeur par défaut
                "Score Global" // Valeur par défaut
            );
            
            // Ajouter les 3 meilleurs programmes (commenté temporairement)
            /*
            for (int i = 0; i < Math.min(3, results.getProgrammesRecommandes().size()); i++) {
                var programme = results.getProgrammesRecommandes().get(i);
                emailContent += String.format(
                    "   %d. %s - %s\n" +
                    "      Score : %d/100\n" +
                    "      Université : %s\n\n",
                    i + 1,
                    programme.getNom(),
                    programme.getDomaine(),
                    programme.getScore(),
                    programme.getUniversite()
                );
            }
            */
            
            // Version simplifiée pour l'instant
            emailContent += "   Programmes recommandés disponibles dans votre espace personnel\n\n";
            
            emailContent += String.format(
                "🔗 Consultez vos résultats complets :\n" +
                "%s/results\n\n" +
                "À bientôt !\n\n" +
                "Cordialement,\nL'équipe Diravenir",
                frontendUrl
            );
            
            message.setText(emailContent);
            mailSender.send(message);
            
            System.out.println("✅ Email de résultats d'orientation envoyé avec succès à: " + userEmail);
            return true;
            
        } catch (Exception e) {
            System.err.println("❌ Erreur lors de l'envoi de l'email de résultats: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean sendWelcomeEmail(String userEmail, String userName) {
        try {
            System.out.println("📧 Service Email: Envoi d'email de bienvenue à: " + userEmail);
            
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(mailUsername);
            message.setTo(userEmail);
            message.setSubject("🎉 Bienvenue sur Diravenir !");
            
            String emailContent = String.format(
                "Bonjour %s,\n\n" +
                "Bienvenue sur Diravenir ! Nous sommes ravis de vous accompagner dans votre parcours d'orientation.\n\n" +
                "Votre compte a été créé avec succès avec l'email: %s\n\n" +
                "🚀 Prêt(e) à découvrir votre orientation ?\n" +
                "Complétez votre test d'orientation pour recevoir des recommandations personnalisées.\n\n" +
                "À bientôt !\n\n" +
                "Cordialement,\nL'équipe Diravenir",
                userName,
                userEmail
            );
            
            message.setText(emailContent);
            mailSender.send(message);
            
            System.out.println("✅ Email de bienvenue envoyé avec succès à: " + userEmail);
            return true;
            
        } catch (Exception e) {
            System.err.println("❌ Erreur lors de l'envoi de l'email de bienvenue: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean sendVerificationEmail(String userEmail, String userName, String token) {
        try {
            System.out.println("📧 Service Email: Envoi d'email de vérification à: " + userEmail);
            System.out.println("🔍 Configuration SMTP:");
            System.out.println("   - Username: " + mailUsername);
            System.out.println("   - Frontend URL: " + frontendUrl);
            
            // Validation email basique (juste @ et .)
            if (!userEmail.contains("@") || !userEmail.contains(".")) {
                System.err.println("❌ Format d'email invalide: " + userEmail);
                return false;
            }
            
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(mailUsername);
            message.setTo(userEmail);
            message.setSubject("🔐 Vérifiez votre email - Diravenir");
            
            String verificationUrl = frontendUrl + "/verify-email?token=" + token;
            System.out.println("🔗 URL de vérification: " + verificationUrl);
            
            String emailContent = String.format(
                "Bonjour %s,\n\n" +
                "Merci de vous être inscrit sur Diravenir !\n\n" +
                "🔐 Pour activer votre compte, veuillez cliquer sur le lien suivant :\n" +
                "%s\n\n" +
                "⚠️  Ce lien expire dans 7 jours.\n\n" +
                "Si vous n'avez pas créé de compte sur Diravenir, ignorez cet email.\n\n" +
                "À bientôt !\n\n" +
                "Cordialement,\nL'équipe Diravenir",
                userName,
                verificationUrl
            );
            
            message.setText(emailContent);
            System.out.println("📤 Tentative d'envoi de l'email...");
            mailSender.send(message);
            
            System.out.println("✅ Email de vérification envoyé avec succès à: " + userEmail);
            return true;
            
        } catch (Exception e) {
            System.err.println("❌ Erreur lors de l'envoi de l'email de vérification: " + e.getMessage());
            System.err.println("❌ Type d'erreur: " + e.getClass().getSimpleName());
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean sendPasswordResetEmail(String userEmail, String userName, String token) {
        try {
            System.out.println("📧 Service Email: Envoi d'email de réinitialisation à: " + userEmail);
            
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(mailUsername);
            message.setTo(userEmail);
            message.setSubject("🔑 Réinitialisation de mot de passe - Diravenir");
            
            String resetUrl = frontendUrl + "/reset-password?token=" + token;
            
            String emailContent = String.format(
                "Bonjour %s,\n\n" +
                "Vous avez demandé la réinitialisation de votre mot de passe sur Diravenir.\n\n" +
                "🔑 Pour définir un nouveau mot de passe, veuillez cliquer sur le lien suivant :\n" +
                "%s\n\n" +
                "⚠️  Ce lien expire dans 1 heure.\n\n" +
                "Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.\n\n" +
                "À bientôt !\n\n" +
                "Cordialement,\nL'équipe Diravenir",
                userName,
                resetUrl
            );
            
            message.setText(emailContent);
            mailSender.send(message);
            
            System.out.println("✅ Email de réinitialisation envoyé avec succès à: " + userEmail);
            return true;
            
        } catch (Exception e) {
            System.err.println("❌ Erreur lors de l'envoi de l'email de réinitialisation: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }
    
    @Override
    public void sendEmail(String to, String subject, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(mailUsername);
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            mailSender.send(message);
            System.out.println("✅ Email simple envoyé avec succès à: " + to);
        } catch (Exception e) {
            System.err.println("❌ Erreur lors de l'envoi de l'email simple: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    @Override
    public void sendEmailWithAttachment(String to, String subject, String body, byte[] attachment, String filename) {
        // Implémentation simplifiée - envoi sans pièce jointe pour l'instant
        sendEmail(to, subject, body + "\n\n[Pièce jointe: " + filename + " - non implémentée]");
    }
    
    @Override
    public void sendEmailToAdmin(String subject, String body) {
        // Envoi à l'admin (utilise l'email configuré)
        sendEmail(mailUsername, "[ADMIN] " + subject, body);
    }
    
    @Override
    public void sendEmailToAdminWithAttachment(String subject, String body, byte[] attachment, String filename) {
        // Envoi à l'admin avec pièce jointe
        sendEmailToAdmin(subject, body + "\n\n[Pièce jointe: " + filename + " - non implémentée]");
    }
    
    @Override
    public void sendNewApplicationNotification(String studentName, String studentEmail, String programName) {
        String subject = "📝 Nouvelle candidature reçue";
        String body = String.format(
            "Une nouvelle candidature a été soumise :\n\n" +
            "👤 Étudiant: %s\n" +
            "📧 Email: %s\n" +
            "🎓 Programme: %s\n\n" +
            "Veuillez traiter cette candidature dans votre interface d'administration.",
            studentName, studentEmail, programName
        );
        sendEmailToAdmin(subject, body);
    }
    
    @Override
    public void sendStatusChangeNotification(String studentEmail, String studentName, String oldStatus, String newStatus) {
        try {
            String subject = "🔄 Mise à jour de votre candidature - Diravenir";
            String body = String.format(
                "Bonjour %s,\n\n" +
                "Le statut de votre candidature a été mis à jour :\n\n" +
                "📊 Ancien statut: %s\n" +
                "📊 Nouveau statut: %s\n\n" +
                "🔗 Consultez les détails dans votre espace personnel :\n" +
                "%s/dashboard\n\n" +
                "À bientôt !\n\n" +
                "Cordialement,\nL'équipe Diravenir",
                studentName, oldStatus, newStatus, frontendUrl
            );
            
            sendEmail(studentEmail, subject, body);
            System.out.println("✅ Notification de changement de statut envoyée à: " + studentEmail);
            
        } catch (Exception e) {
            System.err.println("❌ Erreur lors de l'envoi de la notification de changement de statut: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
