package com.diravenir.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService implements EmailServiceInterface {

    private final JavaMailSender mailSender;
    
    @Value("${app.frontend.url:http://localhost:3000}")
    private String frontendUrl;
    
    @Value("${spring.mail.username}")
    private String fromEmail;

    /**
     * Envoie un email de vérification
     */
    public void sendVerificationEmail(String toEmail, String userName, String verificationToken) {
        log.info("📧 Envoi d'email de vérification à: {}", toEmail);
        
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("🔐 Vérification de votre compte DirAvenir");
            
            String verificationUrl = frontendUrl + "/verify-email?token=" + verificationToken;
            
            message.setText(buildVerificationEmailContent(userName, verificationUrl));
            
            mailSender.send(message);
            log.info("✅ Email de vérification envoyé avec succès à: {}", toEmail);
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de l'envoi de l'email de vérification: {}", e.getMessage());
            throw new RuntimeException("Erreur lors de l'envoi de l'email de vérification", e);
        }
    }

    /**
     * Envoie un email de réinitialisation de mot de passe
     */
    public void sendPasswordResetEmail(String toEmail, String userName, String resetToken) {
        log.info("📧 Envoi d'email de reset à: {}", toEmail);
        
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("🔒 Réinitialisation de votre mot de passe DirAvenir");
            
            String resetUrl = frontendUrl + "/reset-password?token=" + resetToken;
            
            message.setText(buildPasswordResetEmailContent(userName, resetUrl));
            
            mailSender.send(message);
            log.info("✅ Email de reset envoyé avec succès à: {}", toEmail);
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de l'envoi de l'email de reset: {}", e.getMessage());
            throw new RuntimeException("Erreur lors de l'envoi de l'email de réinitialisation", e);
        }
    }

    /**
     * Envoie un email OTP
     */
    public void sendOTPEmail(String toEmail, String userName, String otpCode) {
        log.info("📧 Envoi d'email OTP à: {}", toEmail);
        
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("🔐 Code de vérification DirAvenir");
            
            message.setText(buildOTPEmailContent(userName, otpCode));
            
            mailSender.send(message);
            log.info("✅ Email OTP envoyé avec succès à: {}", toEmail);
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de l'envoi de l'email OTP: {}", e.getMessage());
            throw new RuntimeException("Erreur lors de l'envoi de l'email OTP", e);
        }
    }

    /**
     * Envoie un email de bienvenue
     */
    public void sendWelcomeEmail(String toEmail, String userName) {
        log.info("📧 Envoi d'email de bienvenue à: {}", toEmail);
        
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("🎉 Bienvenue sur DirAvenir !");
            
            message.setText(buildWelcomeEmailContent(userName));
            
            mailSender.send(message);
            log.info("✅ Email de bienvenue envoyé avec succès à: {}", toEmail);
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de l'envoi de l'email de bienvenue: {}", e.getMessage());
            // Ne pas faire échouer le processus si l'email de bienvenue échoue
        }
    }

    /**
     * Envoie les résultats d'orientation par email
     */
    public void sendOrientationResultsEmail(String toEmail, String userName, String testUuid, 
                                          String topRecommendation, Double topScore, 
                                          String userProfile) {
        log.info("📧 Envoi des résultats d'orientation à: {}", toEmail);
        
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("🎯 Vos résultats d'orientation DirAvenir");
            
            message.setText(buildOrientationResultsEmailContent(userName, testUuid, 
                                                               topRecommendation, topScore, userProfile));
            
            mailSender.send(message);
            log.info("✅ Email de résultats d'orientation envoyé avec succès à: {}", toEmail);
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de l'envoi de l'email de résultats: {}", e.getMessage());
            // Ne pas faire échouer le processus si l'email échoue
        }
    }

    /**
     * Construit le contenu de l'email de vérification
     */
    private String buildVerificationEmailContent(String userName, String verificationUrl) {
        return String.format("""
            Bonjour %s,
            
            Bienvenue sur DirAvenir ! 🎓
            
            Pour activer votre compte et commencer votre parcours d'orientation, 
            veuillez cliquer sur le lien ci-dessous :
            
            🔗 %s
            
            Ce lien est valide pendant 24 heures.
            
            Si vous n'avez pas créé de compte sur DirAvenir, 
            vous pouvez ignorer cet email en toute sécurité.
            
            Cordialement,
            L'équipe DirAvenir
            """, userName, verificationUrl);
    }

    /**
     * Construit le contenu de l'email OTP
     */
    private String buildOTPEmailContent(String userName, String otpCode) {
        return String.format("""
            Bonjour %s,
            
            Voici votre code de vérification DirAvenir :
            
            🔐 %s
            
            Ce code expire dans 10 minutes.
            
            Si vous n'avez pas demandé ce code, 
            vous pouvez ignorer cet email en toute sécurité.
            
            Cordialement,
            L'équipe DirAvenir
            """, userName, otpCode);
    }

    /**
     * Construit le contenu de l'email de réinitialisation
     */
    private String buildPasswordResetEmailContent(String userName, String resetUrl) {
        return String.format("""
            Bonjour %s,
            
            Vous avez demandé la réinitialisation de votre mot de passe DirAvenir.
            
            Pour créer un nouveau mot de passe, cliquez sur le lien ci-dessous :
            
            🔗 %s
            
            Ce lien est valide pendant 1 heure.
            
            Si vous n'avez pas demandé cette réinitialisation, 
            vous pouvez ignorer cet email en toute sécurité.
            
            Cordialement,
            L'équipe DirAvenir
            """, userName, resetUrl);
    }

    /**
     * Construit le contenu de l'email de bienvenue
     */
    private String buildWelcomeEmailContent(String userName) {
        return String.format("""
            Bonjour %s,
            
            Félicitations ! Votre compte DirAvenir est maintenant activé ! 🎉
            
            Vous pouvez maintenant :
            • Accéder à votre tableau de bord personnel
            • Commencer votre test d'orientation
            • Explorer les programmes disponibles
            • Postuler aux universités partenaires
            
            Connectez-vous dès maintenant : %s/login
            
            Bonne orientation !
            L'équipe DirAvenir
            """, userName, frontendUrl);
    }

    /**
     * Construit le contenu de l'email de résultats d'orientation
     */
    private String buildOrientationResultsEmailContent(String userName, String testUuid, 
                                                      String topRecommendation, Double topScore, 
                                                      String userProfile) {
        return String.format("""
            Bonjour %s,
            
            🎯 Vos résultats d'orientation DirAvenir sont prêts !
            
            📊 RÉSULTATS DE VOTRE TEST :
            • Test ID : %s
            • Meilleure recommandation : %s
            • Score de correspondance : %.1f%%
            
            📈 VOTRE PROFIL :
            %s
            
            🎓 PROCHAINES ÉTAPES :
            • Explorez les programmes recommandés
            • Découvrez les universités partenaires
            • Consultez les témoignages d'étudiants
            • Postulez directement via notre plateforme
            
            🔗 Accédez à vos résultats complets : %s/results/%s
            
            💡 CONSEIL :
            Ces résultats sont basés sur vos réponses au test. N'hésitez pas à explorer 
            d'autres options qui pourraient vous intéresser !
            
            Bonne continuation dans votre parcours d'orientation !
            
            Cordialement,
            L'équipe DirAvenir
            """, userName, testUuid, topRecommendation, topScore, 
                 formatUserProfile(userProfile), frontendUrl, testUuid);
    }

    /**
     * Formate le profil utilisateur pour l'email
     */
    private String formatUserProfile(String userProfileJson) {
        try {
            // Parse simple du JSON pour extraire les valeurs principales
            String formatted = userProfileJson
                .replaceAll("[{}\"]", "")
                .replaceAll(",", "\n• ")
                .replaceAll(":", " : ");
            return "• " + formatted;
        } catch (Exception e) {
            return "• Profil calculé avec succès";
        }
    }
}