package com.diravenir.service;

import com.diravenir.Entities.Application;
import com.diravenir.Entities.ApplicationStatusHistory;
import com.diravenir.repository.ApplicationStatusHistoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ApplicationStatusHistoryService {
    
    private final ApplicationStatusHistoryRepository statusHistoryRepository;
    
    /**
     * Enregistrer un changement de statut
     */
    @Transactional
    public ApplicationStatusHistory recordStatusChange(
            Long applicationId, 
            String oldStatus, 
            String newStatus, 
            String changedBy, 
            String adminNotes) {
        
        try {
            ApplicationStatusHistory history = new ApplicationStatusHistory();
            history.setApplicationId(applicationId);
            history.setOldStatus(oldStatus);
            history.setNewStatus(newStatus);
            history.setChangedBy(changedBy);
            history.setAdminNotes(adminNotes);
            history.setChangedAt(LocalDateTime.now());
            
            ApplicationStatusHistory savedHistory = statusHistoryRepository.save(history);
            
            log.info("Changement de statut enregistré: {} → {} pour l'application {}", 
                    oldStatus, newStatus, applicationId);
            
            return savedHistory;
            
        } catch (Exception e) {
            log.error("Erreur lors de l'enregistrement du changement de statut: {}", e.getMessage());
            throw new RuntimeException("Impossible d'enregistrer le changement de statut", e);
        }
    }
    
    /**
     * Récupérer l'historique d'une application
     */
    public List<ApplicationStatusHistory> getApplicationStatusHistory(Long applicationId) {
        return statusHistoryRepository.findByApplicationIdOrderByChangedAtDesc(applicationId);
    }
    
    /**
     * Récupérer l'historique par statut
     */
    public List<ApplicationStatusHistory> getStatusHistoryByStatus(String status) {
        return statusHistoryRepository.findByNewStatusOrderByChangedAtDesc(status);
    }
    
    /**
     * Récupérer l'historique par admin
     */
    public List<ApplicationStatusHistory> getStatusHistoryByAdmin(String adminName) {
        return statusHistoryRepository.findByChangedByOrderByChangedAtDesc(adminName);
    }
    
    /**
     * Récupérer l'historique récent (derniers 30 jours)
     */
    public List<ApplicationStatusHistory> getRecentStatusHistory() {
        LocalDateTime thirtyDaysAgo = LocalDateTime.now().minusDays(30);
        return statusHistoryRepository.findByChangedAtAfterOrderByChangedAtDesc(thirtyDaysAgo);
    }
    
    /**
     * Compter les changements de statut par application
     */
    public long countStatusChangesByApplication(Long applicationId) {
        return statusHistoryRepository.countByApplicationId(applicationId);
    }
    
    /**
     * Obtenir le dernier changement de statut d'une application
     */
    public ApplicationStatusHistory getLastStatusChange(Long applicationId) {
        return statusHistoryRepository.findFirstByApplicationIdOrderByChangedAtDesc(applicationId)
                .orElse(null);
    }
}
