package com.diravenir.controller;

import com.diravenir.Entities.Application;
import com.diravenir.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
    public ResponseEntity<Application> getApplicationById(@PathVariable String id) {
        Application application = applicationService.getApplicationById(id);
        return application != null ? ResponseEntity.ok(application) : ResponseEntity.notFound().build();
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
    public ResponseEntity<Application> updateApplication(@PathVariable String id, @RequestBody Application application) {
        try {
            application.setApplicationId(id);
            Application updated = applicationService.saveApplication(application);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            log.error("Erreur lors de la mise à jour de l'application: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
    
    // ===== STEP MANAGEMENT ENDPOINTS =====
    
    /**
     * Mettre à jour l'étape actuelle
     */
    @PutMapping("/{id}/step/{step}")
    public ResponseEntity<Application> updateStep(@PathVariable String id, @PathVariable Integer step) {
        try {
            Application application = applicationService.updateCurrentStep(id, step);
            return ResponseEntity.ok(application);
        } catch (Exception e) {
            log.error("Erreur lors de la mise à jour de l'étape: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
    
    // ===== SUBMISSION ENDPOINTS =====
    
    /**
     * Soumettre une application
     */
    @PutMapping("/{id}/submit")
    public ResponseEntity<Application> submitApplication(@PathVariable String id) {
        try {
            Application application = applicationService.submitApplication(id);
            return ResponseEntity.ok(application);
        } catch (Exception e) {
            log.error("Erreur lors de la soumission de l'application: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
    
    // ===== AUTO-SAVE ENDPOINTS =====
    
    /**
     * Auto-save d'une application
     */
    @PostMapping("/auto-save")
    public ResponseEntity<Application> autoSaveApplication(@RequestBody Application application) {
        try {
            Application saved = applicationService.autoSaveApplication(application);
            return saved != null ? ResponseEntity.ok(saved) : ResponseEntity.internalServerError().build();
        } catch (Exception e) {
            log.error("Erreur lors de la sauvegarde automatique: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
    
    // ===== QUERY ENDPOINTS =====
    
    /**
     * Récupérer les applications par statut
     */
    @GetMapping("/by-status/{status}")
    public ResponseEntity<List<Application>> getApplicationsByStatus(@PathVariable String status) {
        List<Application> applications = applicationService.getApplicationsByStatus(status);
        return ResponseEntity.ok(applications);
    }
    
    /**
     * Rechercher des applications
     */
    @GetMapping("/search")
    public ResponseEntity<List<Application>> searchApplications(@RequestParam String term) {
        List<Application> applications = applicationService.searchApplications(term);
        return ResponseEntity.ok(applications);
    }
    
    /**
     * Récupérer les applications avec pagination
     */
    @GetMapping("/paginated")
    public ResponseEntity<Map<String, Object>> getApplicationsPaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String searchTerm) {
        try {
            Map<String, Object> result = applicationService.getApplicationsWithPagination(page, size, status, searchTerm);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des applications: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
    
    // ===== STATISTICS ENDPOINTS =====
    
    /**
     * Obtenir les statistiques des applications
     */
    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getApplicationStatistics() {
        Map<String, Object> stats = applicationService.getApplicationStatistics();
        return ResponseEntity.ok(stats);
    }
    
    // ===== PDF GENERATION ENDPOINTS =====
    
    /**
     * Générer le PDF complet de l'application
     */
    @GetMapping("/{id}/pdf")
    public ResponseEntity<byte[]> generateApplicationPDF(@PathVariable String id) {
        try {
            Application application = applicationService.getApplicationById(id);
            if (application == null) {
                return ResponseEntity.notFound().build();
            }
            
            byte[] pdfBytes = applicationService.generateApplicationPDF(application);
            
            return ResponseEntity.ok()
                .header("Content-Type", "application/pdf")
                .header("Content-Disposition", "attachment; filename=application_" + id + ".pdf")
                .body(pdfBytes);
                
        } catch (Exception e) {
            log.error("Erreur lors de la génération du PDF: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /**
     * Générer le reçu de paiement
     */
    @PostMapping("/generate-receipt")
    public ResponseEntity<byte[]> generateReceipt(@RequestBody Map<String, Object> receiptData) {
        try {
            byte[] pdfBytes = applicationService.generateReceipt(receiptData);
            
            String applicationId = (String) receiptData.get("applicationId");
            return ResponseEntity.ok()
                .header("Content-Type", "application/pdf")
                .header("Content-Disposition", "attachment; filename=receipt_" + applicationId + ".pdf")
                .body(pdfBytes);
                
        } catch (Exception e) {
            log.error("Erreur lors de la génération du reçu: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
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
