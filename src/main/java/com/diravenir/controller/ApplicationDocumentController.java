package com.diravenir.controller;

import com.diravenir.Entities.ApplicationDocument;
import com.diravenir.service.ApplicationDocumentService;
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
import java.nio.file.Path;
import java.util.List;

@RestController
@RequestMapping("/api/applications/{applicationId}/documents")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class ApplicationDocumentController {
    
    private final ApplicationDocumentService documentService;
    
    /**
     * Uploader un document
     */
    @PostMapping("/upload")
    public ResponseEntity<ApplicationDocument> uploadDocument(
            @PathVariable Long applicationId,
            @RequestParam String documentType,
            @RequestParam("file") MultipartFile file) {
        
        try {
            ApplicationDocument document = documentService.uploadDocument(applicationId, documentType, file);
            return ResponseEntity.ok(document);
            
        } catch (Exception e) {
            log.error("Erreur lors de l'upload du document: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Récupérer tous les documents d'une application
     */
    @GetMapping
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
    public ResponseEntity<ApplicationDocument> getDocument(@PathVariable Long applicationId, 
                                                        @PathVariable Long documentId) {
        try {
            return documentService.getDocumentById(documentId)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
                    
        } catch (Exception e) {
            log.error("Erreur lors de la récupération du document: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /**
     * Télécharger un document
     */
    @GetMapping("/{documentId}/download")
    public ResponseEntity<Resource> downloadDocument(@PathVariable Long applicationId, 
                                                   @PathVariable Long documentId) {
        try {
            Path filePath = documentService.getDocumentFilePath(documentId);
            Resource resource = new UrlResource(filePath.toUri());
            
            if (resource.exists() && resource.isReadable()) {
                ApplicationDocument document = documentService.getDocumentById(documentId)
                        .orElseThrow(() -> new RuntimeException("Document not found"));
                
                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(document.getMimeType()))
                        .header(HttpHeaders.CONTENT_DISPOSITION, 
                                "attachment; filename=\"" + document.getOriginalFileName() + "\"")
                        .body(resource);
                        
            } else {
                return ResponseEntity.notFound().build();
            }
            
        } catch (Exception e) {
            log.error("Erreur lors du téléchargement du document: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /**
     * Afficher un document (pour les images et PDFs)
     */
    @GetMapping("/{documentId}/view")
    public ResponseEntity<Resource> viewDocument(@PathVariable Long applicationId, 
                                               @PathVariable Long documentId) {
        try {
            Path filePath = documentService.getDocumentFilePath(documentId);
            Resource resource = new UrlResource(filePath.toUri());
            
            if (resource.exists() && resource.isReadable()) {
                ApplicationDocument document = documentService.getDocumentById(documentId)
                        .orElseThrow(() -> new RuntimeException("Document not found"));
                
                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(document.getMimeType()))
                        .body(resource);
                        
            } else {
                return ResponseEntity.notFound().build();
            }
            
        } catch (Exception e) {
            log.error("Erreur lors de l'affichage du document: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /**
     * Mettre à jour le statut d'un document
     */
    @PutMapping("/{documentId}/status")
    public ResponseEntity<ApplicationDocument> updateDocumentStatus(
            @PathVariable Long applicationId,
            @PathVariable Long documentId,
            @RequestParam String status,
            @RequestParam(required = false) String adminNotes) {
        
        try {
            ApplicationDocument document = documentService.updateDocumentStatus(documentId, status, adminNotes);
            return ResponseEntity.ok(document);
            
        } catch (Exception e) {
            log.error("Erreur lors de la mise à jour du statut: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Marquer un document comme non applicable
     */
    @PutMapping("/{documentId}/not-applicable")
    public ResponseEntity<ApplicationDocument> markDocumentAsNotApplicable(
            @PathVariable Long applicationId,
            @PathVariable Long documentId,
            @RequestParam String reason) {
        
        try {
            ApplicationDocument document = documentService.markDocumentAsNotApplicable(documentId, reason);
            return ResponseEntity.ok(document);
            
        } catch (Exception e) {
            log.error("Erreur lors du marquage comme non applicable: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Supprimer un document
     */
    @DeleteMapping("/{documentId}")
    public ResponseEntity<Void> deleteDocument(@PathVariable Long applicationId, 
                                             @PathVariable Long documentId) {
        try {
            boolean deleted = documentService.deleteDocument(documentId);
            return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
            
        } catch (Exception e) {
            log.error("Erreur lors de la suppression du document: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /**
     * Vérifier si tous les documents requis sont uploadés
     */
    @GetMapping("/required-check")
    public ResponseEntity<Boolean> checkRequiredDocuments(@PathVariable Long applicationId) {
        try {
            boolean allRequired = documentService.areAllRequiredDocumentsUploaded(applicationId);
            return ResponseEntity.ok(allRequired);
            
        } catch (Exception e) {
            log.error("Erreur lors de la vérification des documents requis: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /**
     * Obtenir les statistiques des documents
     */
    @GetMapping("/statistics")
    public ResponseEntity<ApplicationDocumentService.DocumentStatistics> getDocumentStatistics(
            @PathVariable Long applicationId) {
        try {
            ApplicationDocumentService.DocumentStatistics stats = 
                    documentService.getDocumentStatistics(applicationId);
            return ResponseEntity.ok(stats);
            
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des statistiques: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
}
