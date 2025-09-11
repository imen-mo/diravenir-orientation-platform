package com.diravenir.repository;

import com.diravenir.Entities.OrientationNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrientationNotificationRepository extends JpaRepository<OrientationNotification, Long> {
    
    /**
     * Trouve les notifications par UUID de test
     */
    List<OrientationNotification> findByTestUuid(String testUuid);
    
    /**
     * Trouve les notifications par email
     */
    List<OrientationNotification> findByStudentEmail(String studentEmail);
    
    /**
     * Trouve les notifications par type
     */
    List<OrientationNotification> findByNotificationType(OrientationNotification.NotificationType notificationType);
    
    /**
     * Trouve les notifications par statut
     */
    List<OrientationNotification> findByStatus(OrientationNotification.NotificationStatus status);
    
    /**
     * Trouve les notifications envoyées après une date donnée
     */
    @Query("SELECT on FROM OrientationNotification on WHERE on.sentAt >= :date")
    List<OrientationNotification> findBySentAtAfter(@Param("date") LocalDateTime date);
    
    /**
     * Trouve les notifications par type et statut
     */
    List<OrientationNotification> findByNotificationTypeAndStatus(
        OrientationNotification.NotificationType notificationType, 
        OrientationNotification.NotificationStatus status
    );
    
    /**
     * Trouve les notifications par UUID de test et type
     */
    List<OrientationNotification> findByTestUuidAndNotificationType(
        String testUuid, 
        OrientationNotification.NotificationType notificationType
    );
    
    /**
     * Compte les notifications par statut
     */
    @Query("SELECT on.status, COUNT(on) FROM OrientationNotification on GROUP BY on.status")
    List<Object[]> countByStatus();
    
    /**
     * Trouve les notifications avec des erreurs
     */
    @Query("SELECT on FROM OrientationNotification on WHERE on.errorMessage IS NOT NULL AND on.errorMessage != ''")
    List<OrientationNotification> findWithErrors();
}
