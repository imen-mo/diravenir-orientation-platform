package com.diravenir.service;

import com.diravenir.Entities.Application;

/**
 * Interface pour le service de notifications email
 */
public interface EmailNotificationService {
    
    /**
     * Envoyer une notification d'application soumise
     */
    void sendApplicationSubmittedNotification(Application application);
    
    /**
     * Envoyer une notification d'acceptation d'application
     */
    void sendApplicationAcceptedNotification(Application application);
    
    /**
     * Envoyer une notification de rejet d'application
     */
    void sendApplicationRejectedNotification(Application application);
    
    /**
     * Envoyer une notification de documents manquants
     */
    void sendMissingDocumentsNotification(Application application);
}
