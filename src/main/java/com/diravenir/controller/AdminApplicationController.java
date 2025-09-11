package com.diravenir.controller;

import com.diravenir.Entities.Application;
import com.diravenir.service.ApplicationService;
import com.diravenir.service.EmailNotificationService;
import com.diravenir.service.PDFGenerationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/applications")
@Slf4j
@CrossOrigin(origins = "*")
public class AdminApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @Autowired
    private EmailNotificationService emailNotificationService;

    @Autowired
    private PDFGenerationService pdfGenerationService;

    /**
     * Récupérer toutes les applications avec pagination
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllApplications(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String searchTerm) {
        
        try {
            Map<String, Object> result = applicationService.getApplicationsWithPagination(page, size, status, searchTerm);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des applications", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Erreur lors de la récupération des applications"));
        }
    }

    /**
     * Récupérer une application par ID
     */
    @GetMapping("/{applicationId}")
    public ResponseEntity<Application> getApplicationById(@PathVariable String applicationId) {
        try {
            Application application = applicationService.getApplicationById(applicationId);
            if (application != null) {
                return ResponseEntity.ok(application);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            log.error("Erreur lors de la récupération de l'application: {}", applicationId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Approuver une application
     */
    @PostMapping("/{applicationId}/approve")
    public ResponseEntity<Map<String, Object>> approveApplication(
            @PathVariable String applicationId,
            @RequestBody(required = false) Map<String, String> requestBody) {
        
        try {
            String adminNotes = requestBody != null ? requestBody.get("adminNotes") : null;
            
            Application application = applicationService.getApplicationById(applicationId);
            if (application == null) {
                return ResponseEntity.notFound().build();
            }

            String oldStatus = application.getStatus();
            application.setStatus("APPROVED");
            application.setApprovedAt(LocalDateTime.now());
            if (adminNotes != null) {
                application.setAdminNotes(adminNotes);
            }

            Application updatedApplication = applicationService.saveApplication(application);
            
            // Envoyer notification email
            emailNotificationService.sendApplicationApprovedNotification(updatedApplication);
            
            // Envoyer notification de changement de statut
            emailNotificationService.sendStatusChangeNotification(updatedApplication, oldStatus, "APPROVED", adminNotes);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Application approuvée avec succès");
            response.put("application", updatedApplication);
            response.put("oldStatus", oldStatus);
            response.put("newStatus", "APPROVED");

            log.info("Application approuvée: {} par admin", applicationId);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Erreur lors de l'approbation de l'application: {}", applicationId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Erreur lors de l'approbation de l'application"));
        }
    }

    /**
     * Rejeter une application
     */
    @PostMapping("/{applicationId}/reject")
    public ResponseEntity<Map<String, Object>> rejectApplication(
            @PathVariable String applicationId,
            @RequestBody Map<String, String> requestBody) {
        
        try {
            String rejectionReason = requestBody.get("rejectionReason");
            String adminNotes = requestBody.get("adminNotes");
            
            if (rejectionReason == null || rejectionReason.trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(Map.of("error", "La raison du rejet est requise"));
            }

            Application application = applicationService.getApplicationById(applicationId);
            if (application == null) {
                return ResponseEntity.notFound().build();
            }

            String oldStatus = application.getStatus();
            application.setStatus("REJECTED");
            application.setRejectedAt(LocalDateTime.now());
            application.setAdminNotes(adminNotes);

            Application updatedApplication = applicationService.saveApplication(application);
            
            // Envoyer notification email
            emailNotificationService.sendApplicationRejectedNotification(updatedApplication, rejectionReason);
            
            // Envoyer notification de changement de statut
            emailNotificationService.sendStatusChangeNotification(updatedApplication, oldStatus, "REJECTED", adminNotes);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Application rejetée");
            response.put("application", updatedApplication);
            response.put("oldStatus", oldStatus);
            response.put("newStatus", "REJECTED");
            response.put("rejectionReason", rejectionReason);

            log.info("Application rejetée: {} par admin, raison: {}", applicationId, rejectionReason);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Erreur lors du rejet de l'application: {}", applicationId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Erreur lors du rejet de l'application"));
        }
    }

    /**
     * Marquer une application comme en attente
     */
    @PostMapping("/{applicationId}/pending")
    public ResponseEntity<Map<String, Object>> markAsPending(
            @PathVariable String applicationId,
            @RequestBody(required = false) Map<String, String> requestBody) {
        
        try {
            String adminNotes = requestBody != null ? requestBody.get("adminNotes") : null;
            
            Application application = applicationService.getApplicationById(applicationId);
            if (application == null) {
                return ResponseEntity.notFound().build();
            }

            String oldStatus = application.getStatus();
            application.setStatus("PENDING");
            if (adminNotes != null) {
                application.setAdminNotes(adminNotes);
            }

            Application updatedApplication = applicationService.saveApplication(application);
            
            // Envoyer notification de changement de statut
            emailNotificationService.sendStatusChangeNotification(updatedApplication, oldStatus, "PENDING", adminNotes);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Application marquée comme en attente");
            response.put("application", updatedApplication);
            response.put("oldStatus", oldStatus);
            response.put("newStatus", "PENDING");

            log.info("Application marquée comme en attente: {} par admin", applicationId);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Erreur lors du marquage en attente de l'application: {}", applicationId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Erreur lors du marquage en attente de l'application"));
        }
    }

    /**
     * Demander des documents supplémentaires
     */
    @PostMapping("/{applicationId}/request-documents")
    public ResponseEntity<Map<String, Object>> requestAdditionalDocuments(
            @PathVariable String applicationId,
            @RequestBody Map<String, String> requestBody) {
        
        try {
            String missingDocuments = requestBody.get("missingDocuments");
            String adminNotes = requestBody.get("adminNotes");
            
            if (missingDocuments == null || missingDocuments.trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(Map.of("error", "La liste des documents manquants est requise"));
            }

            Application application = applicationService.getApplicationById(applicationId);
            if (application == null) {
                return ResponseEntity.notFound().build();
            }

            application.setStatus("DOCUMENTS_REQUIRED");
            application.setAdminNotes(adminNotes);

            Application updatedApplication = applicationService.saveApplication(application);
            
            // Envoyer notification email
            emailNotificationService.sendDocumentsRequiredNotification(updatedApplication, missingDocuments);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Demande de documents envoyée");
            response.put("application", updatedApplication);
            response.put("missingDocuments", missingDocuments);

            log.info("Demande de documents envoyée pour l'application: {}", applicationId);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Erreur lors de la demande de documents pour l'application: {}", applicationId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Erreur lors de la demande de documents"));
        }
    }

    /**
     * Générer et télécharger le PDF d'une application
     */
    @GetMapping("/{applicationId}/pdf")
    public ResponseEntity<byte[]> downloadApplicationPDF(@PathVariable String applicationId) {
        try {
            Application application = applicationService.getApplicationById(applicationId);
            if (application == null) {
                return ResponseEntity.notFound().build();
            }

            byte[] pdfBytes = pdfGenerationService.generateApplicationPDF(application);
            
            return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=application_" + applicationId + ".pdf")
                .header("Content-Type", "application/pdf")
                .body(pdfBytes);

        } catch (Exception e) {
            log.error("Erreur lors de la génération du PDF pour l'application: {}", applicationId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Obtenir les statistiques des applications
     */
    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getApplicationStatistics() {
        try {
            Map<String, Object> statistics = applicationService.getApplicationStatistics();
            return ResponseEntity.ok(statistics);
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des statistiques", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Erreur lors de la récupération des statistiques"));
        }
    }

    /**
     * Mettre à jour les notes admin
     */
    @PutMapping("/{applicationId}/notes")
    public ResponseEntity<Map<String, Object>> updateAdminNotes(
            @PathVariable String applicationId,
            @RequestBody Map<String, String> requestBody) {
        
        try {
            String adminNotes = requestBody.get("adminNotes");
            
            Application application = applicationService.getApplicationById(applicationId);
            if (application == null) {
                return ResponseEntity.notFound().build();
            }

            application.setAdminNotes(adminNotes);
            Application updatedApplication = applicationService.saveApplication(application);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Notes admin mises à jour");
            response.put("application", updatedApplication);

            log.info("Notes admin mises à jour pour l'application: {}", applicationId);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Erreur lors de la mise à jour des notes admin pour l'application: {}", applicationId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Erreur lors de la mise à jour des notes admin"));
        }
    }

    /**
     * Supprimer une application (soft delete)
     */
    @DeleteMapping("/{applicationId}")
    public ResponseEntity<Map<String, Object>> deleteApplication(@PathVariable String applicationId) {
        try {
            Application application = applicationService.getApplicationById(applicationId);
            if (application == null) {
                return ResponseEntity.notFound().build();
            }

            application.setStatus("DELETED");
            applicationService.saveApplication(application);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Application supprimée avec succès");
            response.put("applicationId", applicationId);

            log.info("Application supprimée: {} par admin", applicationId);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Erreur lors de la suppression de l'application: {}", applicationId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Erreur lors de la suppression de l'application"));
        }
    }
}
