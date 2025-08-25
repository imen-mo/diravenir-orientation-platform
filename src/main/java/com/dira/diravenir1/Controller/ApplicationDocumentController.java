package com.dira.diravenir1.Controller;

import com.dira.diravenir1.Entities.ApplicationDocument;
import com.dira.diravenir1.service.ApplicationDocumentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/application-documents")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class ApplicationDocumentController {
    
    private final ApplicationDocumentService documentService;
    
    // ===== UPLOAD DE DOCUMENTS =====
    
    /**
     * Upload un document pour une application
     */
    @PostMapping("/upload/{applicationId}")
    public ResponseEntity<ApplicationDocument> uploadDocument(
            @PathVariable Long applicationId,
            @RequestParam("file") MultipartFile file,
            @RequestParam("documentType") String documentType) {
        
        try {
            log.info("Upload du document {} pour l'application {}", documentType, applicationId);
            
            ApplicationDocument document = documentService.uploadDocument(applicationId, file, documentType);
            
            return ResponseEntity.ok(document);
            
        } catch (Exception e) {
            log.error("Erreur lors de l'upload du document: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Upload multiple de documents
     */
    @PostMapping("/upload-multiple/{applicationId}")
    public ResponseEntity<List<ApplicationDocument>> uploadMultipleDocuments(
            @PathVariable Long applicationId,
            @RequestParam("files") MultipartFile[] files,
            @RequestParam("documentTypes") String[] documentTypes) {
        
        try {
            if (files.length != documentTypes.length) {
                return ResponseEntity.badRequest().build();
            }
            
            List<ApplicationDocument> documents = new java.util.ArrayList<>();
            
            for (int i = 0; i < files.length; i++) {
                try {
                    ApplicationDocument document = documentService.uploadDocument(applicationId, files[i], documentTypes[i]);
                    documents.add(document);
                } catch (Exception e) {
                    log.error("Erreur lors de l'upload du document {}: {}", i, e.getMessage());
                }
            }
            
            return ResponseEntity.ok(documents);
            
        } catch (Exception e) {
            log.error("Erreur lors de l'upload multiple: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
    
    // ===== RÉCUPÉRATION DE DOCUMENTS =====
    
    /**
     * Récupérer tous les documents d'une application
     */
    @GetMapping("/application/{applicationId}")
    public ResponseEntity<List<ApplicationDocument>> getApplicationDocuments(@PathVariable Long applicationId) {
        try {
            List<ApplicationDocument> documents = documentService.getApplicationDocuments(applicationId);
            return ResponseEntity.ok(documents);
            
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des documents: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /**
     * Récupérer un document par ID
     */
    @GetMapping("/{documentId}")
    public ResponseEntity<ApplicationDocument> getDocumentById(@PathVariable Long documentId) {
        try {
            var documentOpt = documentService.getDocumentById(documentId);
            return documentOpt.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
            
        } catch (Exception e) {
            log.error("Erreur lors de la récupération du document: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /**
     * Télécharger un document
     */
    @GetMapping("/download/{documentId}")
    public ResponseEntity<Resource> downloadDocument(@PathVariable Long documentId) {
        try {
            var documentOpt = documentService.getDocumentById(documentId);
            if (documentOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            ApplicationDocument document = documentOpt.get();
            Path filePath = Paths.get(document.getFilePath());
            
            if (!java.nio.file.Files.exists(filePath)) {
                return ResponseEntity.notFound().build();
            }
            
            Resource resource = new UrlResource(filePath.toUri());
            
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(document.getMimeType()))
                    .header(HttpHeaders.CONTENT_DISPOSITION, 
                            "attachment; filename=\"" + document.getOriginalFileName() + "\"")
                    .body(resource);
            
        } catch (MalformedURLException e) {
            log.error("Erreur lors du téléchargement du document: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /**
     * Prévisualiser un document (pour les images)
     */
    @GetMapping("/preview/{documentId}")
    public ResponseEntity<Resource> previewDocument(@PathVariable Long documentId) {
        try {
            var documentOpt = documentService.getDocumentById(documentId);
            if (documentOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            ApplicationDocument document = documentOpt.get();
            Path filePath = Paths.get(document.getFilePath());
            
            if (!java.nio.file.Files.exists(filePath)) {
                return ResponseEntity.notFound().build();
            }
            
            Resource resource = new UrlResource(filePath.toUri());
            
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(document.getMimeType()))
                    .body(resource);
            
        } catch (MalformedURLException e) {
            log.error("Erreur lors de la prévisualisation du document: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
    
    // ===== GESTION DES DOCUMENTS =====
    
    /**
     * Remplacer un document existant
     */
    @PutMapping("/{documentId}/replace")
    public ResponseEntity<ApplicationDocument> replaceDocument(
            @PathVariable Long documentId,
            @RequestParam("file") MultipartFile newFile) {
        
        try {
            ApplicationDocument updatedDocument = documentService.replaceDocument(documentId, newFile);
            return ResponseEntity.ok(updatedDocument);
            
        } catch (Exception e) {
            log.error("Erreur lors du remplacement du document: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Marquer un document comme "Not Applicable"
     */
    @PutMapping("/{documentId}/mark-not-applicable")
    public ResponseEntity<ApplicationDocument> markDocumentNotApplicable(
            @PathVariable Long documentId,
            @RequestParam("reason") String reason) {
        
        try {
            ApplicationDocument document = documentService.markDocumentNotApplicable(documentId, reason);
            return ResponseEntity.ok(document);
            
        } catch (Exception e) {
            log.error("Erreur lors du marquage du document: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Supprimer un document
     */
    @DeleteMapping("/{documentId}")
    public ResponseEntity<Void> deleteDocument(@PathVariable Long documentId) {
        try {
            boolean deleted = documentService.deleteDocument(documentId);
            return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
            
        } catch (Exception e) {
            log.error("Erreur lors de la suppression du document: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
    
    // ===== VALIDATION ET VÉRIFICATION =====
    
    /**
     * Valider tous les documents d'une application
     */
    @GetMapping("/validate/{applicationId}")
    public ResponseEntity<Boolean> validateApplicationDocuments(@PathVariable Long applicationId) {
        try {
            boolean isValid = documentService.validateApplicationDocuments(applicationId);
            return ResponseEntity.ok(isValid);
            
        } catch (Exception e) {
            log.error("Erreur lors de la validation des documents: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /**
     * Obtenir le statut des documents d'une application
     */
    @GetMapping("/status/{applicationId}")
    public ResponseEntity<DocumentStatusSummary> getDocumentStatus(@PathVariable Long applicationId) {
        try {
            List<ApplicationDocument> documents = documentService.getApplicationDocuments(applicationId);
            
            DocumentStatusSummary summary = new DocumentStatusSummary();
            summary.setApplicationId(applicationId);
            summary.setTotalDocuments(documents.size());
            
            long uploadedCount = documents.stream()
                    .filter(doc -> "UPLOADED".equals(doc.getStatus()))
                    .count();
            summary.setUploadedDocuments(uploadedCount);
            
            long notApplicableCount = documents.stream()
                    .filter(doc -> "NOT_APPLICABLE".equals(doc.getStatus()))
                    .count();
            summary.setNotApplicableDocuments(notApplicableCount);
            
            long missingCount = documents.stream()
                    .filter(doc -> doc.isRequired() && !"UPLOADED".equals(doc.getStatus()) && !"NOT_APPLICABLE".equals(doc.getStatus()))
                    .count();
            summary.setMissingRequiredDocuments(missingCount);
            
            summary.setComplete(summary.getMissingRequiredDocuments() == 0);
            
            return ResponseEntity.ok(summary);
            
        } catch (Exception e) {
            log.error("Erreur lors de la récupération du statut: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
    
    // ===== CLASSE INTERNE POUR LE RÉSUMÉ DU STATUT =====
    
    public static class DocumentStatusSummary {
        private Long applicationId;
        private int totalDocuments;
        private long uploadedDocuments;
        private long notApplicableDocuments;
        private long missingRequiredDocuments;
        private boolean complete;
        
        // Getters et Setters
        public Long getApplicationId() { return applicationId; }
        public void setApplicationId(Long applicationId) { this.applicationId = applicationId; }
        
        public int getTotalDocuments() { return totalDocuments; }
        public void setTotalDocuments(int totalDocuments) { this.totalDocuments = totalDocuments; }
        
        public long getUploadedDocuments() { return uploadedDocuments; }
        public void setUploadedDocuments(long uploadedDocuments) { this.uploadedDocuments = uploadedDocuments; }
        
        public long getNotApplicableDocuments() { return notApplicableDocuments; }
        public void setNotApplicableDocuments(long notApplicableDocuments) { this.notApplicableDocuments = notApplicableDocuments; }
        
        public long getMissingRequiredDocuments() { return missingRequiredDocuments; }
        public void setMissingRequiredDocuments(long missingRequiredDocuments) { this.missingRequiredDocuments = missingRequiredDocuments; }
        
        public boolean isComplete() { return complete; }
        public void setComplete(boolean complete) { this.complete = complete; }
    }
}
