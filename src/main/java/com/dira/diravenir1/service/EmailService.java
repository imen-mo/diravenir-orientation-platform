package com.dira.diravenir1.service;

import com.dira.diravenir1.dto.OrientationResponseDTO;

public interface EmailService {
    
    /**
     * Envoie les résultats d'orientation par email
     */
    boolean sendOrientationResults(String userEmail, String userName, OrientationResponseDTO results);
    
    /**
     * Envoie un email de bienvenue
     */
    boolean sendWelcomeEmail(String userEmail, String userName);
    
    /**
     * Envoie un email de vérification
     */
    boolean sendVerificationEmail(String userEmail, String userName, String verificationToken);
    
    /**
     * Envoie un email de réinitialisation de mot de passe
     */
    boolean sendPasswordResetEmail(String userEmail, String userName, String resetToken);
    
    /**
     * Envoie un email simple
     */
    void sendEmail(String to, String subject, String body);
    
    /**
     * Envoie un email avec pièce jointe
     */
    void sendEmailWithAttachment(String to, String subject, String body, byte[] attachment, String filename);
    
    /**
     * Envoie un email à l'admin
     */
    void sendEmailToAdmin(String subject, String body);
    
    /**
     * Envoie un email à l'admin avec pièce jointe
     */
    void sendEmailToAdminWithAttachment(String subject, String body, byte[] attachment, String filename);
    
    /**
     * Envoie une notification de nouvelle candidature à l'admin
     */
    void sendNewApplicationNotification(String studentName, String studentEmail, String programName);
    
    /**
     * Envoie une notification de changement de statut à l'étudiant
     */
    void sendStatusChangeNotification(String studentEmail, String studentName, String oldStatus, String newStatus);
} 