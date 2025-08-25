package com.dira.diravenir1.service;

import com.dira.diravenir1.Entities.Application;
import com.dira.diravenir1.Entities.EducationBackground;
import com.dira.diravenir1.Entities.WorkExperience;
import com.dira.diravenir1.Entities.FamilyMember;
import com.dira.diravenir1.Entities.FinancialGuarantor;
import com.dira.diravenir1.Entities.EmergencyContact;
// ApplicationDocument import removed as it's not needed for PDF generation
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ApplicationPdfService {
    
    private final EmailService emailService;
    
    /**
     * Générer un PDF complet de l'application
     * L'admin reçoit automatiquement ce PDF une fois l'application terminée
     */
    public byte[] generateApplicationPdf(Application application) {
        try {
            // Utiliser iText ou Apache PDFBox pour générer le PDF
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            
            // Créer le contenu du PDF
            createPdfContent(application, baos);
            
            // Envoyer automatiquement le PDF à l'admin
            sendPdfToAdmin(application, baos.toByteArray());
            
            return baos.toByteArray();
            
        } catch (Exception e) {
            log.error("Erreur lors de la génération du PDF pour l'application {}: {}", 
                    application.getId(), e.getMessage());
            throw new RuntimeException("Impossible de générer le PDF", e);
        }
    }
    
    /**
     * Créer le contenu du PDF avec toutes les informations
     */
    private void createPdfContent(Application application, ByteArrayOutputStream baos) {
        // TODO: Implémenter la génération PDF avec iText ou PDFBox
        // Pour l'instant, on simule la création
        
        log.info("Génération du PDF pour l'application: {}", application.getApplicationId());
        
        // Structure du PDF :
        // 1. En-tête avec logo Diravenir
        // 2. Informations de l'étudiant
        // 3. Détails du programme
        // 4. Éducation et expérience
        // 5. Informations familiales
        // 6. Documents uploadés
        // 7. Déclarations et signatures
        // 8. Pied de page avec informations de contact
    }
    
    /**
     * Envoyer automatiquement le PDF à l'admin
     */
    private void sendPdfToAdmin(Application application, byte[] pdfContent) {
        try {
            String subject = String.format("Nouvelle candidature terminée - %s %s", 
                    application.getFirstName(), application.getLastName());
            
            String body = String.format("""
                Bonjour,
                
                Une nouvelle candidature a été terminée avec succès.
                
                Détails de l'étudiant :
                - Nom : %s %s
                - Email : %s
                - Programme : %s
                - Université : %s
                - Statut : %s
                - Étape actuelle : %d/5
                
                Le PDF de la candidature est joint à cet email.
                
                Cordialement,
                Système Diravenir
                """,
                application.getFirstName(),
                application.getLastName(),
                application.getEmail(),
                application.getProgramName(),
                application.getUniversityName(),
                application.getStatus(),
                application.getCurrentStep()
            );
            
            // Envoyer l'email avec le PDF en pièce jointe
            // TODO: Implémenter sendEmailWithAttachment dans EmailService
            log.info("Email avec PDF à envoyer à l'admin: {}", "admin@diravenir.com");
            
            log.info("PDF envoyé à l'admin pour l'application: {}", application.getApplicationId());
            
        } catch (Exception e) {
            log.error("Erreur lors de l'envoi du PDF à l'admin: {}", e.getMessage());
        }
    }
    
    /**
     * Générer un résumé PDF pour l'étudiant
     */
    public byte[] generateStudentSummaryPdf(Application application) {
        try {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            
            // Créer un résumé simplifié pour l'étudiant
            createStudentSummaryPdf(application, baos);
            
            return baos.toByteArray();
            
        } catch (Exception e) {
            log.error("Erreur lors de la génération du résumé PDF: {}", e.getMessage());
            throw new RuntimeException("Impossible de générer le résumé PDF", e);
        }
    }
    
    /**
     * Créer le résumé PDF pour l'étudiant
     */
    private void createStudentSummaryPdf(Application application, ByteArrayOutputStream baos) {
        // TODO: Implémenter la génération du résumé PDF
        log.info("Génération du résumé PDF pour l'étudiant: {}", application.getEmail());
    }
    
    /**
     * Vérifier si une application est complète pour générer le PDF
     */
    public boolean isApplicationCompleteForPdf(Application application) {
        return application.getCurrentStep() == 5 && 
               application.getFinalDeclaration() != null && 
               application.getFinalDeclaration();
    }
    
    /**
     * Générer automatiquement le PDF quand l'application est terminée
     */
    public void generatePdfIfApplicationComplete(Application application) {
        if (isApplicationCompleteForPdf(application)) {
            log.info("Application {} terminée, génération automatique du PDF", application.getApplicationId());
            generateApplicationPdf(application);
        }
    }
}
