package com.diravenir.service;

import com.diravenir.Entities.Application;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class EmailNotificationService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;

    @Autowired
    private PDFGenerationService pdfGenerationService;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${app.admin.email:admin@diravenir.com}")
    private String adminEmail;

    @Value("${app.company.name:Diravenir}")
    private String companyName;

    @Value("${app.company.website:https://diravenir.com}")
    private String companyWebsite;

    /**
     * Envoyer notification de nouvelle application à l'admin
     */
    public void sendApplicationNotificationToAdmin(Application application) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(adminEmail);
            helper.setSubject("Nouvelle candidature reçue - " + application.getApplicationId());

            // Générer le PDF
            byte[] pdfBytes = pdfGenerationService.generateApplicationPDF(application);
            
            // Créer le contexte pour le template
            Context context = new Context();
            context.setVariable("application", application);
            context.setVariable("companyName", companyName);
            context.setVariable("companyWebsite", companyWebsite);
            context.setVariable("formattedDate", application.getCreatedAt().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")));

            // Générer le contenu HTML
            String htmlContent = templateEngine.process("admin-application-notification", context);
            helper.setText(htmlContent, true);

            // Attacher le PDF
            helper.addAttachment("application_" + application.getApplicationId() + ".pdf", 
                new ByteArrayResource(pdfBytes));

            mailSender.send(message);
            log.info("Notification admin envoyée pour l'application: {}", application.getApplicationId());

        } catch (Exception e) {
            log.error("Erreur lors de l'envoi de la notification admin pour l'application: {}", 
                application.getApplicationId(), e);
        }
    }

    /**
     * Envoyer confirmation de candidature à l'étudiant
     */
    public void sendApplicationConfirmationToStudent(Application application) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(application.getEmail());
            helper.setSubject("Confirmation de candidature - " + application.getApplicationId());

            // Générer le PDF
            byte[] pdfBytes = pdfGenerationService.generateApplicationPDF(application);
            
            // Créer le contexte pour le template
            Context context = new Context();
            context.setVariable("application", application);
            context.setVariable("companyName", companyName);
            context.setVariable("companyWebsite", companyWebsite);
            context.setVariable("formattedDate", application.getCreatedAt().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")));

            // Générer le contenu HTML
            String htmlContent = templateEngine.process("student-application-confirmation", context);
            helper.setText(htmlContent, true);

            // Attacher le PDF
            helper.addAttachment("votre_candidature_" + application.getApplicationId() + ".pdf", 
                new ByteArrayResource(pdfBytes));

            mailSender.send(message);
            log.info("Confirmation étudiant envoyée pour l'application: {}", application.getApplicationId());

        } catch (Exception e) {
            log.error("Erreur lors de l'envoi de la confirmation étudiant pour l'application: {}", 
                application.getApplicationId(), e);
        }
    }

    /**
     * Envoyer notification de changement de statut
     */
    public void sendStatusChangeNotification(Application application, String oldStatus, String newStatus, String adminNotes) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(application.getEmail());
            helper.setSubject("Mise à jour de votre candidature - " + application.getApplicationId());

            // Créer le contexte pour le template
            Context context = new Context();
            context.setVariable("application", application);
            context.setVariable("oldStatus", oldStatus);
            context.setVariable("newStatus", newStatus);
            context.setVariable("adminNotes", adminNotes);
            context.setVariable("companyName", companyName);
            context.setVariable("companyWebsite", companyWebsite);
            context.setVariable("formattedDate", java.time.LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")));

            // Générer le contenu HTML
            String htmlContent = templateEngine.process("status-change-notification", context);
            helper.setText(htmlContent, true);

            mailSender.send(message);
            log.info("Notification de changement de statut envoyée pour l'application: {}", application.getApplicationId());

        } catch (Exception e) {
            log.error("Erreur lors de l'envoi de la notification de changement de statut pour l'application: {}", 
                application.getApplicationId(), e);
        }
    }

    /**
     * Envoyer notification de paiement reçu
     */
    public void sendPaymentConfirmation(Application application, String transactionId, String paymentMethod) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(application.getEmail());
            helper.setSubject("Confirmation de paiement - " + application.getApplicationId());

            // Créer le contexte pour le template
            Context context = new Context();
            context.setVariable("application", application);
            context.setVariable("transactionId", transactionId);
            context.setVariable("paymentMethod", paymentMethod);
            context.setVariable("companyName", companyName);
            context.setVariable("companyWebsite", companyWebsite);
            context.setVariable("formattedDate", java.time.LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")));

            // Générer le contenu HTML
            String htmlContent = templateEngine.process("payment-confirmation", context);
            helper.setText(htmlContent, true);

            mailSender.send(message);
            log.info("Confirmation de paiement envoyée pour l'application: {}", application.getApplicationId());

        } catch (Exception e) {
            log.error("Erreur lors de l'envoi de la confirmation de paiement pour l'application: {}", 
                application.getApplicationId(), e);
        }
    }

    /**
     * Envoyer notification de documents requis
     */
    public void sendDocumentsRequiredNotification(Application application, String missingDocuments) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(application.getEmail());
            helper.setSubject("Documents requis - " + application.getApplicationId());

            // Créer le contexte pour le template
            Context context = new Context();
            context.setVariable("application", application);
            context.setVariable("missingDocuments", missingDocuments);
            context.setVariable("companyName", companyName);
            context.setVariable("companyWebsite", companyWebsite);
            context.setVariable("formattedDate", java.time.LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")));

            // Générer le contenu HTML
            String htmlContent = templateEngine.process("documents-required-notification", context);
            helper.setText(htmlContent, true);

            mailSender.send(message);
            log.info("Notification de documents requis envoyée pour l'application: {}", application.getApplicationId());

        } catch (Exception e) {
            log.error("Erreur lors de l'envoi de la notification de documents requis pour l'application: {}", 
                application.getApplicationId(), e);
        }
    }

    /**
     * Envoyer notification de candidature approuvée
     */
    public void sendApplicationApprovedNotification(Application application) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(application.getEmail());
            helper.setSubject("Félicitations ! Votre candidature a été approuvée - " + application.getApplicationId());

            // Créer le contexte pour le template
            Context context = new Context();
            context.setVariable("application", application);
            context.setVariable("companyName", companyName);
            context.setVariable("companyWebsite", companyWebsite);
            context.setVariable("formattedDate", java.time.LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")));

            // Générer le contenu HTML
            String htmlContent = templateEngine.process("application-approved-notification", context);
            helper.setText(htmlContent, true);

            mailSender.send(message);
            log.info("Notification d'approbation envoyée pour l'application: {}", application.getApplicationId());

        } catch (Exception e) {
            log.error("Erreur lors de l'envoi de la notification d'approbation pour l'application: {}", 
                application.getApplicationId(), e);
        }
    }

    /**
     * Envoyer notification de candidature rejetée
     */
    public void sendApplicationRejectedNotification(Application application, String rejectionReason) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(application.getEmail());
            helper.setSubject("Mise à jour de votre candidature - " + application.getApplicationId());

            // Créer le contexte pour le template
            Context context = new Context();
            context.setVariable("application", application);
            context.setVariable("rejectionReason", rejectionReason);
            context.setVariable("companyName", companyName);
            context.setVariable("companyWebsite", companyWebsite);
            context.setVariable("formattedDate", java.time.LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")));

            // Générer le contenu HTML
            String htmlContent = templateEngine.process("application-rejected-notification", context);
            helper.setText(htmlContent, true);

            mailSender.send(message);
            log.info("Notification de rejet envoyée pour l'application: {}", application.getApplicationId());

        } catch (Exception e) {
            log.error("Erreur lors de l'envoi de la notification de rejet pour l'application: {}", 
                application.getApplicationId(), e);
        }
    }
}
