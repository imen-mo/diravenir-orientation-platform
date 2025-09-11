package com.diravenir.service;

import com.diravenir.Entities.Application;
import com.diravenir.repository.ApplicationRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@Slf4j
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private EmailNotificationService emailNotificationService;

    @Autowired
    private PDFGenerationService pdfGenerationService;

    /**
     * Créer une nouvelle application
     */
    public Application createApplication(Application application) {
        try {
            // Générer un ID unique
            application.setApplicationId(generateApplicationId());
            application.setStatus("DRAFT");
            application.setCurrentStep(1);
            application.setCreatedAt(LocalDateTime.now());
            application.setUpdatedAt(LocalDateTime.now());

            Application savedApplication = applicationRepository.save(application);
            
            log.info("Nouvelle application créée: {}", savedApplication.getApplicationId());
            return savedApplication;

        } catch (Exception e) {
            log.error("Erreur lors de la création de l'application", e);
            throw new RuntimeException("Erreur lors de la création de l'application", e);
        }
    }

    /**
     * Sauvegarder une application
     */
    public Application saveApplication(Application application) {
        try {
            application.setUpdatedAt(LocalDateTime.now());
            return applicationRepository.save(application);
        } catch (Exception e) {
            log.error("Erreur lors de la sauvegarde de l'application: {}", application.getApplicationId(), e);
            throw new RuntimeException("Erreur lors de la sauvegarde de l'application", e);
        }
    }

    /**
     * Récupérer une application par ID
     */
    public Application getApplicationById(String applicationId) {
        try {
            return applicationRepository.findByApplicationId(applicationId).orElse(null);
        } catch (Exception e) {
            log.error("Erreur lors de la récupération de l'application: {}", applicationId, e);
            return null;
        }
    }

    /**
     * Récupérer toutes les applications avec pagination
     */
    public Map<String, Object> getApplicationsWithPagination(int page, int size, String status, String searchTerm) {
        try {
            Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
            List<Application> applications;
            long totalElements;

            if (status != null && !status.isEmpty() && searchTerm != null && !searchTerm.isEmpty()) {
                // Filtrer par statut et terme de recherche
                applications = applicationRepository.findByStatusAndSearchTerm(status, searchTerm, pageable);
                totalElements = applications.size(); // Simplification
            } else if (status != null && !status.isEmpty()) {
                // Filtrer par statut seulement
                applications = applicationRepository.findByStatus(status);
                totalElements = applications.size();
            } else if (searchTerm != null && !searchTerm.isEmpty()) {
                // Rechercher par terme seulement
                applications = applicationRepository.findBySearchTerm(searchTerm, pageable);
                totalElements = applications.size(); // Simplification
            } else {
                // Toutes les applications
                Page<Application> applicationsPage = applicationRepository.findAll(pageable);
                applications = applicationsPage.getContent();
                totalElements = applicationsPage.getTotalElements();
            }

            Map<String, Object> result = new HashMap<>();
            result.put("applications", applications);
            result.put("currentPage", page);
            result.put("totalPages", (int) Math.ceil((double) totalElements / size));
            result.put("totalElements", totalElements);
            result.put("hasNext", (page + 1) * size < totalElements);
            result.put("hasPrevious", page > 0);

            return result;

        } catch (Exception e) {
            log.error("Erreur lors de la récupération des applications avec pagination", e);
            throw new RuntimeException("Erreur lors de la récupération des applications", e);
        }
    }

    /**
     * Récupérer les applications par utilisateur
     */
    public List<Application> getApplicationsByUserId(Long userId) {
        try {
            return applicationRepository.findByUserId(userId);
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des applications pour l'utilisateur: {}", userId, e);
            return List.of();
        }
    }

    /**
     * Récupérer les applications par statut
     */
    public List<Application> getApplicationsByStatus(String status) {
        try {
            return applicationRepository.findByStatus(status);
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des applications par statut: {}", status, e);
            return List.of();
        }
    }

    /**
     * Soumettre une application
     */
    public Application submitApplication(String applicationId) {
        try {
            Application application = getApplicationById(applicationId);
            if (application == null) {
                throw new RuntimeException("Application non trouvée: " + applicationId);
            }

            // Vérifier que tous les champs requis sont remplis
            if (!isApplicationComplete(application)) {
                throw new RuntimeException("L'application n'est pas complète");
            }

            application.setStatus("SUBMITTED");
            application.setSubmittedAt(LocalDateTime.now());
            application.setCurrentStep(5);

            Application submittedApplication = saveApplication(application);

            // Envoyer notifications
            emailNotificationService.sendApplicationNotificationToAdmin(submittedApplication);
            emailNotificationService.sendApplicationConfirmationToStudent(submittedApplication);

            log.info("Application soumise: {}", applicationId);
            return submittedApplication;

        } catch (Exception e) {
            log.error("Erreur lors de la soumission de l'application: {}", applicationId, e);
            throw new RuntimeException("Erreur lors de la soumission de l'application", e);
        }
    }

    /**
     * Mettre à jour le statut de paiement
     */
    public Application updatePaymentStatus(String applicationId, String paymentStatus, String transactionId) {
        try {
            Application application = getApplicationById(applicationId);
            if (application == null) {
                throw new RuntimeException("Application non trouvée: " + applicationId);
            }

            application.setPaymentStatus(com.diravenir.Entities.Application.PaymentStatus.valueOf(paymentStatus));
            
            if ("COMPLETED".equals(paymentStatus)) {
                emailNotificationService.sendPaymentConfirmation(application, transactionId, application.getPaymentMethod());
            }

            return saveApplication(application);

        } catch (Exception e) {
            log.error("Erreur lors de la mise à jour du statut de paiement pour l'application: {}", applicationId, e);
            throw new RuntimeException("Erreur lors de la mise à jour du statut de paiement", e);
        }
    }

    /**
     * Obtenir les statistiques des applications
     */
    public Map<String, Object> getApplicationStatistics() {
        try {
            Map<String, Object> statistics = new HashMap<>();

            // Compter par statut
            statistics.put("total", applicationRepository.count());
            statistics.put("draft", applicationRepository.countByStatus("DRAFT"));
            statistics.put("submitted", applicationRepository.countByStatus("SUBMITTED"));
            statistics.put("pending", applicationRepository.countByStatus("PENDING"));
            statistics.put("approved", applicationRepository.countByStatus("APPROVED"));
            statistics.put("rejected", applicationRepository.countByStatus("REJECTED"));
            statistics.put("documentsRequired", applicationRepository.countByStatus("DOCUMENTS_REQUIRED"));

            // Compter par statut de paiement
            statistics.put("paymentPending", applicationRepository.countByPaymentStatus(com.diravenir.Entities.Application.PaymentStatus.PENDING));
            statistics.put("paymentCompleted", applicationRepository.countByPaymentStatus(com.diravenir.Entities.Application.PaymentStatus.COMPLETED));
            statistics.put("paymentFailed", applicationRepository.countByPaymentStatus(com.diravenir.Entities.Application.PaymentStatus.FAILED));

            // Applications du mois en cours
            LocalDateTime startOfMonth = LocalDateTime.now().withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
            statistics.put("thisMonth", applicationRepository.countByCreatedAtAfter(startOfMonth));

            // Applications de la semaine en cours
            LocalDateTime startOfWeek = LocalDateTime.now().minusDays(7);
            statistics.put("thisWeek", applicationRepository.countByCreatedAtAfter(startOfWeek));

            return statistics;

        } catch (Exception e) {
            log.error("Erreur lors de la récupération des statistiques", e);
            throw new RuntimeException("Erreur lors de la récupération des statistiques", e);
        }
    }

    /**
     * Rechercher des applications
     */
    public List<Application> searchApplications(String searchTerm) {
        try {
            return applicationRepository.searchApplications(searchTerm);
        } catch (Exception e) {
            log.error("Erreur lors de la recherche d'applications: {}", searchTerm, e);
            return List.of();
        }
    }

    /**
     * Générer le PDF complet de l'application
     */
    public byte[] generateApplicationPDF(Application application) {
        try {
            return pdfGenerationService.generateApplicationPDF(application);
        } catch (Exception e) {
            log.error("Erreur lors de la génération du PDF pour l'application: {}", application.getApplicationId(), e);
            throw new RuntimeException("Erreur lors de la génération du PDF", e);
        }
    }

    /**
     * Générer le reçu de paiement
     */
    public byte[] generateReceipt(Map<String, Object> receiptData) {
        try {
            return pdfGenerationService.generateReceipt(receiptData);
        } catch (Exception e) {
            log.error("Erreur lors de la génération du reçu", e);
            throw new RuntimeException("Erreur lors de la génération du reçu", e);
        }
    }

    /**
     * Vérifier si une application est complète
     */
    private boolean isApplicationComplete(Application application) {
        // Vérifier les champs requis de l'étape 1
        if (application.getEmail() == null || application.getEmail().trim().isEmpty()) return false;
        if (application.getFirstName() == null || application.getFirstName().trim().isEmpty()) return false;
        if (application.getLastName() == null || application.getLastName().trim().isEmpty()) return false;
        if (application.getPhone() == null || application.getPhone().trim().isEmpty()) return false;

        // Vérifier les déclarations
        if (!application.getDeclaration1()) return false;
        if (!application.getDeclaration2()) return false;
        if (!application.getDeclaration3()) return false;
        if (!application.getDeclaration4()) return false;
        if (!application.getDeclaration5()) return false;
        if (!application.getDeclaration6()) return false;
        if (!application.getFinalDeclaration()) return false;

        // Vérifier que l'étape actuelle est 5
        if (application.getCurrentStep() != 5) return false;

        return true;
    }

    /**
     * Générer un ID d'application unique
     */
    private String generateApplicationId() {
        String timestamp = String.valueOf(System.currentTimeMillis());
        String random = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        return "APP-" + timestamp.substring(timestamp.length() - 6) + "-" + random;
    }

    /**
     * Mettre à jour l'étape actuelle
     */
    public Application updateCurrentStep(String applicationId, int step) {
        try {
            Application application = getApplicationById(applicationId);
            if (application == null) {
                throw new RuntimeException("Application non trouvée: " + applicationId);
            }

            application.setCurrentStep(step);
            return saveApplication(application);

        } catch (Exception e) {
            log.error("Erreur lors de la mise à jour de l'étape pour l'application: {}", applicationId, e);
            throw new RuntimeException("Erreur lors de la mise à jour de l'étape", e);
        }
    }

    /**
     * Auto-save d'une application
     */
    public Application autoSaveApplication(Application application) {
        try {
            application.setUpdatedAt(LocalDateTime.now());
            return applicationRepository.save(application);
        } catch (Exception e) {
            log.error("Erreur lors de l'auto-save de l'application: {}", application.getApplicationId(), e);
            return null;
        }
    }
}
