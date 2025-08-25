package com.dira.diravenir1.service;

import com.dira.diravenir1.Entities.*;
import com.dira.diravenir1.Repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ApplicationService {
    
    private final ApplicationRepository applicationRepository;
    private final EducationBackgroundRepository educationRepository;
    private final WorkExperienceRepository workRepository;
    private final FamilyMemberRepository familyRepository;
    private final ApplicationDocumentRepository documentRepository;
    private final ApplicationPdfService pdfService;
    
    // ===== CRUD OPERATIONS =====
    
    /**
     * Créer une nouvelle application
     */
    @Transactional
    public Application createApplication(Application application) {
        try {
            // Générer un ID unique
            if (application.getApplicationId() == null) {
                application.setApplicationId("APP" + System.currentTimeMillis());
            }
            
            // Initialiser le statut
            application.setStatus("DRAFT");
            application.setCurrentStep(1);
            
            // Sauvegarder l'application
            Application savedApplication = applicationRepository.save(application);
            
            log.info("Application créée avec succès: {}", savedApplication.getApplicationId());
            return savedApplication;
            
        } catch (Exception e) {
            log.error("Erreur lors de la création de l'application: {}", e.getMessage());
            throw new RuntimeException("Impossible de créer l'application", e);
        }
    }
    
    /**
     * Récupérer une application par ID
     */
    public Optional<Application> getApplicationById(Long id) {
        return applicationRepository.findById(id);
    }
    
    /**
     * Récupérer une application par applicationId
     */
    public Optional<Application> getApplicationByApplicationId(String applicationId) {
        return applicationRepository.findByApplicationId(applicationId);
    }
    
    /**
     * Récupérer toutes les applications d'un utilisateur
     */
    public List<Application> getApplicationsByUserId(Long userId) {
        return applicationRepository.findByUserId(userId);
    }
    
    /**
     * Mettre à jour une application
     */
    @Transactional
    public Application updateApplication(Application application) {
        try {
            application.setUpdatedAt(LocalDateTime.now());
            Application updatedApplication = applicationRepository.save(application);
            
            log.info("Application mise à jour: {}", updatedApplication.getApplicationId());
            return updatedApplication;
            
        } catch (Exception e) {
            log.error("Erreur lors de la mise à jour de l'application: {}", e.getMessage());
            throw new RuntimeException("Impossible de mettre à jour l'application", e);
        }
    }
    
    /**
     * Supprimer une application
     */
    @Transactional
    public void deleteApplication(Long id) {
        try {
            applicationRepository.deleteById(id);
            log.info("Application supprimée: {}", id);
        } catch (Exception e) {
            log.error("Erreur lors de la suppression de l'application: {}", e.getMessage());
            throw new RuntimeException("Impossible de supprimer l'application", e);
        }
    }
    
    // ===== STEP MANAGEMENT =====
    
    /**
     * Passer à l'étape suivante
     */
    @Transactional
    public boolean nextStep(Long applicationId) {
        try {
            Optional<Application> appOpt = applicationRepository.findById(applicationId);
            if (appOpt.isEmpty()) {
                log.error("Application non trouvée: {}", applicationId);
                return false;
            }
            
            Application app = appOpt.get();
            if (app.getCurrentStep() < 5) {
                app.setCurrentStep(app.getCurrentStep() + 1);
                app.setUpdatedAt(LocalDateTime.now());
                
                // Mettre à jour le statut selon l'étape
                if (app.getCurrentStep() == 5) {
                    app.setStatus("IN_PROGRESS");
                }
                
                applicationRepository.save(app);
                log.info("Application {} passée à l'étape {}", applicationId, app.getCurrentStep());
                return true;
            }
            
            return false;
            
        } catch (Exception e) {
            log.error("Erreur lors du passage à l'étape suivante: {}", e.getMessage());
            return false;
        }
    }
    
    /**
     * Revenir à l'étape précédente
     */
    @Transactional
    public boolean previousStep(Long applicationId) {
        try {
            Optional<Application> appOpt = applicationRepository.findById(applicationId);
            if (appOpt.isEmpty()) {
                return false;
            }
            
            Application app = appOpt.get();
            if (app.getCurrentStep() > 1) {
                app.setCurrentStep(app.getCurrentStep() - 1);
                app.setUpdatedAt(LocalDateTime.now());
                applicationRepository.save(app);
                return true;
            }
            
            return false;
            
        } catch (Exception e) {
            log.error("Erreur lors du retour à l'étape précédente: {}", e.getMessage());
            return false;
        }
    }
    
    /**
     * Aller à une étape spécifique
     */
    @Transactional
    public boolean goToStep(Long applicationId, Integer step) {
        try {
            if (step < 1 || step > 5) {
                return false;
            }
            
            Optional<Application> appOpt = applicationRepository.findById(applicationId);
            if (appOpt.isEmpty()) {
                return false;
            }
            
            Application app = appOpt.get();
            app.setCurrentStep(step);
            app.setUpdatedAt(LocalDateTime.now());
            applicationRepository.save(app);
            return true;
            
        } catch (Exception e) {
            log.error("Erreur lors du passage à l'étape {}: {}", step, e.getMessage());
            return false;
        }
    }
    
    // ===== SUBMISSION =====
    
    /**
     * Soumettre une application
     */
    @Transactional
    public boolean submitApplication(Long applicationId) {
        try {
            Optional<Application> appOpt = applicationRepository.findById(applicationId);
            if (appOpt.isEmpty()) {
                return false;
            }
            
            Application app = appOpt.get();
            
            // Vérifier que l'application est complète
            if (app.getCurrentStep() != 5 || !app.getFinalDeclaration()) {
                log.error("Application {} non complète pour soumission", applicationId);
                return false;
            }
            
            // Mettre à jour le statut
            app.setStatus("SUBMITTED");
            app.setSubmittedAt(LocalDateTime.now());
            app.setUpdatedAt(LocalDateTime.now());
            
            applicationRepository.save(app);
            
            // Générer automatiquement le PDF pour l'admin
            pdfService.generatePdfIfApplicationComplete(app);
            
            log.info("Application {} soumise avec succès", applicationId);
            return true;
            
        } catch (Exception e) {
            log.error("Erreur lors de la soumission de l'application: {}", e.getMessage());
            return false;
        }
    }
    
    // ===== STATUS MANAGEMENT =====
    
    /**
     * Mettre à jour le statut d'une application
     */
    @Transactional
    public boolean updateApplicationStatus(Long applicationId, String newStatus, String adminNotes) {
        try {
            Optional<Application> appOpt = applicationRepository.findById(applicationId);
            if (appOpt.isEmpty()) {
                return false;
            }
            
            Application app = appOpt.get();
            String oldStatus = app.getStatus();
            
            app.setStatus(newStatus);
            app.setAdminNotes(adminNotes);
            app.setUpdatedAt(LocalDateTime.now());
            
            // Mettre à jour les timestamps selon le statut
            if ("APPROVED".equals(newStatus)) {
                app.setApprovedAt(LocalDateTime.now());
            } else if ("REJECTED".equals(newStatus)) {
                app.setRejectedAt(LocalDateTime.now());
            }
            
            applicationRepository.save(app);
            
            log.info("Statut de l'application {} mis à jour: {} → {}", 
                    applicationId, oldStatus, newStatus);
            return true;
            
        } catch (Exception e) {
            log.error("Erreur lors de la mise à jour du statut: {}", e.getMessage());
            return false;
        }
    }
    
    // ===== QUERIES =====
    
    /**
     * Récupérer les applications en cours
     */
    public List<Application> getApplicationsInProgress() {
        return applicationRepository.findApplicationsInProgress();
    }
    
    /**
     * Récupérer les applications soumises
     */
    public List<Application> getSubmittedApplications() {
        return applicationRepository.findSubmittedApplications();
    }
    
    /**
     * Récupérer les applications par statut
     */
    public List<Application> getApplicationsByStatus(String status) {
        return applicationRepository.findByStatus(status);
    }
    
    /**
     * Récupérer les applications par étape
     */
    public List<Application> getApplicationsByStep(Integer step) {
        return applicationRepository.findByCurrentStep(step);
    }
    
    /**
     * Vérifier si une application existe
     */
    public boolean applicationExists(String applicationId) {
        return applicationRepository.findByApplicationId(applicationId).isPresent();
    }
    
    /**
     * Vérifier si un utilisateur a une application en cours
     */
    public boolean userHasApplicationInProgress(Long userId) {
        return applicationRepository.existsByUserIdAndStatusNotIn(userId);
    }
    
    // ===== STATISTICS =====
    
    /**
     * Obtenir les statistiques des applications
     */
    public ApplicationStatistics getApplicationStatistics() {
        try {
            long total = applicationRepository.count();
            long draft = applicationRepository.countByStatus("DRAFT");
            long inProgress = applicationRepository.countApplicationsInProgress();
            long submitted = applicationRepository.countSubmittedApplications();
            long approved = applicationRepository.countByStatus("APPROVED");
            long rejected = applicationRepository.countByStatus("REJECTED");
            
            return new ApplicationStatistics(total, draft, inProgress, submitted, approved, rejected);
            
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des statistiques: {}", e.getMessage());
            return new ApplicationStatistics(0, 0, 0, 0, 0, 0);
        }
    }
    
    // ===== INNER CLASSES =====
    
    public static class ApplicationStatistics {
        private final long total;
        private final long draft;
        private final long inProgress;
        private final long submitted;
        private final long approved;
        private final long rejected;
        
        public ApplicationStatistics(long total, long draft, long inProgress, long submitted, long approved, long rejected) {
            this.total = total;
            this.draft = draft;
            this.inProgress = inProgress;
            this.submitted = submitted;
            this.approved = approved;
            this.rejected = rejected;
        }
        
        // Getters
        public long getTotal() { return total; }
        public long getDraft() { return draft; }
        public long getInProgress() { return inProgress; }
        public long getSubmitted() { return submitted; }
        public long getApproved() { return approved; }
        public long getRejected() { return rejected; }
    }
}
