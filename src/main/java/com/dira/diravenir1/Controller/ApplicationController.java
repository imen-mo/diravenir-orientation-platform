package com.dira.diravenir1.Controller;

import com.dira.diravenir1.Entities.Application;
import com.dira.diravenir1.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class ApplicationController {
    
    private final ApplicationService applicationService;
    
    // ===== CRUD ENDPOINTS =====
    
    /**
     * Créer une nouvelle application
     */
    @PostMapping
    public ResponseEntity<Application> createApplication(@RequestBody Application application) {
        try {
            Application created = applicationService.createApplication(application);
            return ResponseEntity.ok(created);
        } catch (Exception e) {
            log.error("Erreur lors de la création de l'application: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /**
     * Récupérer une application par ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Application> getApplicationById(@PathVariable Long id) {
        Optional<Application> application = applicationService.getApplicationById(id);
        return application.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * Récupérer une application par applicationId
     */
    @GetMapping("/by-application-id/{applicationId}")
    public ResponseEntity<Application> getApplicationByApplicationId(@PathVariable String applicationId) {
        Optional<Application> application = applicationService.getApplicationByApplicationId(applicationId);
        return application.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * Récupérer toutes les applications d'un utilisateur
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Application>> getApplicationsByUserId(@PathVariable Long userId) {
        List<Application> applications = applicationService.getApplicationsByUserId(userId);
        return ResponseEntity.ok(applications);
    }
    
    /**
     * Mettre à jour une application
     */
    @PutMapping("/{id}")
    public ResponseEntity<Application> updateApplication(@PathVariable Long id, @RequestBody Application application) {
        try {
            application.setId(id);
            Application updated = applicationService.updateApplication(application);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            log.error("Erreur lors de la mise à jour de l'application: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /**
     * Supprimer une application
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable Long id) {
        try {
            applicationService.deleteApplication(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error("Erreur lors de la suppression de l'application: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
    
    // ===== STEP MANAGEMENT ENDPOINTS =====
    
    /**
     * Passer à l'étape suivante
     */
    @PostMapping("/{id}/next-step")
    public ResponseEntity<Boolean> nextStep(@PathVariable Long id) {
        boolean success = applicationService.nextStep(id);
        return ResponseEntity.ok(success);
    }
    
    /**
     * Revenir à l'étape précédente
     */
    @PostMapping("/{id}/previous-step")
    public ResponseEntity<Boolean> previousStep(@PathVariable Long id) {
        boolean success = applicationService.previousStep(id);
        return ResponseEntity.ok(success);
    }
    
    /**
     * Aller à une étape spécifique
     */
    @PostMapping("/{id}/go-to-step/{step}")
    public ResponseEntity<Boolean> goToStep(@PathVariable Long id, @PathVariable Integer step) {
        boolean success = applicationService.goToStep(id, step);
        return ResponseEntity.ok(success);
    }
    
    // ===== SUBMISSION ENDPOINTS =====
    
    /**
     * Soumettre une application
     */
    @PostMapping("/{id}/submit")
    public ResponseEntity<Boolean> submitApplication(@PathVariable Long id) {
        boolean success = applicationService.submitApplication(id);
        return ResponseEntity.ok(success);
    }
    
    // ===== STATUS MANAGEMENT ENDPOINTS =====
    
    /**
     * Mettre à jour le statut d'une application (Admin)
     */
    @PutMapping("/{id}/status")
    public ResponseEntity<Boolean> updateApplicationStatus(
            @PathVariable Long id,
            @RequestParam String status,
            @RequestParam(required = false) String adminNotes) {
        
        boolean success = applicationService.updateApplicationStatus(id, status, adminNotes);
        return ResponseEntity.ok(success);
    }
    
    // ===== QUERY ENDPOINTS =====
    
    /**
     * Récupérer les applications en cours
     */
    @GetMapping("/in-progress")
    public ResponseEntity<List<Application>> getApplicationsInProgress() {
        List<Application> applications = applicationService.getApplicationsInProgress();
        return ResponseEntity.ok(applications);
    }
    
    /**
     * Récupérer les applications soumises
     */
    @GetMapping("/submitted")
    public ResponseEntity<List<Application>> getSubmittedApplications() {
        List<Application> applications = applicationService.getSubmittedApplications();
        return ResponseEntity.ok(applications);
    }
    
    /**
     * Récupérer les applications par statut
     */
    @GetMapping("/by-status/{status}")
    public ResponseEntity<List<Application>> getApplicationsByStatus(@PathVariable String status) {
        List<Application> applications = applicationService.getApplicationsByStatus(status);
        return ResponseEntity.ok(applications);
    }
    
    /**
     * Récupérer les applications par étape
     */
    @GetMapping("/by-step/{step}")
    public ResponseEntity<List<Application>> getApplicationsByStep(@PathVariable Integer step) {
        List<Application> applications = applicationService.getApplicationsByStep(step);
        return ResponseEntity.ok(applications);
    }
    
    /**
     * Vérifier si une application existe
     */
    @GetMapping("/exists/{applicationId}")
    public ResponseEntity<Boolean> applicationExists(@PathVariable String applicationId) {
        boolean exists = applicationService.applicationExists(applicationId);
        return ResponseEntity.ok(exists);
    }
    
    /**
     * Vérifier si un utilisateur a une application en cours
     */
    @GetMapping("/user/{userId}/has-in-progress")
    public ResponseEntity<Boolean> userHasApplicationInProgress(@PathVariable Long userId) {
        boolean hasInProgress = applicationService.userHasApplicationInProgress(userId);
        return ResponseEntity.ok(hasInProgress);
    }
    
    // ===== STATISTICS ENDPOINTS =====
    
    /**
     * Obtenir les statistiques des applications
     */
    @GetMapping("/statistics")
    public ResponseEntity<ApplicationService.ApplicationStatistics> getApplicationStatistics() {
        ApplicationService.ApplicationStatistics stats = applicationService.getApplicationStatistics();
        return ResponseEntity.ok(stats);
    }
    
    // ===== HEALTH CHECK =====
    
    /**
     * Vérifier la santé du service
     */
    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Application Service is running");
    }
}
