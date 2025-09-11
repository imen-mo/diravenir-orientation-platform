package com.diravenir.service;

import com.diravenir.Entities.ApplicationDocument;
import com.diravenir.Entities.Application;
import com.diravenir.repository.ApplicationDocumentRepository;
import com.diravenir.repository.ApplicationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ApplicationDocumentService {
    
    private final ApplicationDocumentRepository documentRepository;
    private final ApplicationRepository applicationRepository;
    
    // Configuration des chemins de stockage
    private static final String UPLOAD_DIR = "uploads/applications/";
    private static final String[] ALLOWED_EXTENSIONS = {".pdf", ".jpg", ".jpeg", ".png", ".doc", ".docx"};
    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    
    /**
     * Uploader un document pour une application
     */
    public ApplicationDocument uploadDocument(Long applicationId, String documentType, MultipartFile file) {
        try {
            // Vérifier que l'application existe
            Optional<Application> applicationOpt = applicationRepository.findById(applicationId);
            if (applicationOpt.isEmpty()) {
                throw new RuntimeException("Application not found with ID: " + applicationId);
            }
            
            Application application = applicationOpt.get();
            
            // Valider le fichier
            validateFile(file);
            
            // Générer un nom de fichier unique
            String originalFileName = file.getOriginalFilename();
            String fileExtension = getFileExtension(originalFileName);
            String storedFileName = UUID.randomUUID().toString() + fileExtension;
            
            // Créer le répertoire de stockage
            String applicationDir = UPLOAD_DIR + applicationId + "/";
            Path uploadPath = Paths.get(applicationDir);
            Files.createDirectories(uploadPath);
            
            // Sauvegarder le fichier
            Path filePath = uploadPath.resolve(storedFileName);
            Files.copy(file.getInputStream(), filePath);
            
            // Créer l'entité document
            ApplicationDocument document = new ApplicationDocument();
            document.setApplicationId(applicationId);
            document.setDocumentType(documentType);
            document.setOriginalFileName(originalFileName);
            document.setStoredFileName(storedFileName);
            document.setFilePath(filePath.toString());
            document.setFileSize(file.getSize());
            document.setMimeType(file.getContentType());
            document.setUploadDate(LocalDateTime.now());
            document.setStatus("UPLOADED");
            document.setVerificationStatus("PENDING");
            
            // Sauvegarder en base de données
            ApplicationDocument savedDocument = documentRepository.save(document);
            
            log.info("Document uploadé avec succès: {} pour l'application: {}", 
                    originalFileName, applicationId);
            
            return savedDocument;
            
        } catch (Exception e) {
            log.error("Erreur lors de l'upload du document: {}", e.getMessage());
            throw new RuntimeException("Impossible d'uploader le document", e);
        }
    }
    
    /**
     * Récupérer tous les documents d'une application
     */
    public List<ApplicationDocument> getApplicationDocuments(Long applicationId) {
        return documentRepository.findByApplicationId(applicationId);
    }
    
    /**
     * Récupérer un document par ID
     */
    public Optional<ApplicationDocument> getDocumentById(Long documentId) {
        return documentRepository.findById(documentId);
    }
    
    /**
     * Supprimer un document
     */
    public boolean deleteDocument(Long documentId) {
        try {
            Optional<ApplicationDocument> documentOpt = documentRepository.findById(documentId);
            if (documentOpt.isEmpty()) {
                return false;
            }
            
            ApplicationDocument document = documentOpt.get();
            
            // Supprimer le fichier physique
            Path filePath = Paths.get(document.getFilePath());
            if (Files.exists(filePath)) {
                Files.delete(filePath);
            }
            
            // Supprimer de la base de données
            documentRepository.deleteById(documentId);
            
            log.info("Document supprimé avec succès: {}", documentId);
            return true;
            
        } catch (Exception e) {
            log.error("Erreur lors de la suppression du document: {}", e.getMessage());
            return false;
        }
    }
    
    /**
     * Mettre à jour le statut d'un document
     */
    public ApplicationDocument updateDocumentStatus(Long documentId, String status, String adminNotes) {
        try {
            Optional<ApplicationDocument> documentOpt = documentRepository.findById(documentId);
            if (documentOpt.isEmpty()) {
                throw new RuntimeException("Document not found with ID: " + documentId);
            }
            
            ApplicationDocument document = documentOpt.get();
            document.setStatus(status);
            document.setAdminNotes(adminNotes);
            document.setUpdatedDate(LocalDateTime.now());
            
            if ("VERIFIED".equals(status)) {
                document.setVerificationStatus("VERIFIED");
                document.setVerifiedBy("Admin");
                document.setVerifiedAt(LocalDateTime.now());
            }
            
            return documentRepository.save(document);
            
        } catch (Exception e) {
            log.error("Erreur lors de la mise à jour du statut du document: {}", e.getMessage());
            throw new RuntimeException("Impossible de mettre à jour le statut du document", e);
        }
    }
    
    /**
     * Marquer un document comme non applicable
     */
    public ApplicationDocument markDocumentAsNotApplicable(Long documentId, String reason) {
        try {
            Optional<ApplicationDocument> documentOpt = documentRepository.findById(documentId);
            if (documentOpt.isEmpty()) {
                throw new RuntimeException("Document not found with ID: " + documentId);
            }
            
            ApplicationDocument document = documentOpt.get();
            document.setStatus("NOT_APPLICABLE");
            document.setNotApplicableReason(reason);
            document.setUpdatedDate(LocalDateTime.now());
            
            return documentRepository.save(document);
            
        } catch (Exception e) {
            log.error("Erreur lors du marquage du document comme non applicable: {}", e.getMessage());
            throw new RuntimeException("Impossible de marquer le document comme non applicable", e);
        }
    }
    
    /**
     * Valider un fichier uploadé
     */
    private void validateFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new RuntimeException("Le fichier est vide");
        }
        
        if (file.getSize() > MAX_FILE_SIZE) {
            throw new RuntimeException("Le fichier est trop volumineux. Taille maximale: " + 
                    (MAX_FILE_SIZE / (1024 * 1024)) + "MB");
        }
        
        String originalFileName = file.getOriginalFilename();
        if (originalFileName == null || !isValidFileExtension(originalFileName)) {
            throw new RuntimeException("Type de fichier non autorisé. Types autorisés: " + 
                    String.join(", ", ALLOWED_EXTENSIONS));
        }
    }
    
    /**
     * Vérifier si l'extension du fichier est autorisée
     */
    private boolean isValidFileExtension(String fileName) {
        String extension = getFileExtension(fileName).toLowerCase();
        for (String allowedExt : ALLOWED_EXTENSIONS) {
            if (allowedExt.equals(extension)) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * Extraire l'extension d'un fichier
     */
    private String getFileExtension(String fileName) {
        if (fileName == null || !fileName.contains(".")) {
            return "";
        }
        return fileName.substring(fileName.lastIndexOf("."));
    }
    
    /**
     * Obtenir le chemin complet d'un fichier
     */
    public Path getDocumentFilePath(Long documentId) {
        Optional<ApplicationDocument> documentOpt = documentRepository.findById(documentId);
        if (documentOpt.isEmpty()) {
            throw new RuntimeException("Document not found with ID: " + documentId);
        }
        
        return Paths.get(documentOpt.get().getFilePath());
    }
    
    /**
     * Vérifier si tous les documents requis sont uploadés
     */
    public boolean areAllRequiredDocumentsUploaded(Long applicationId) {
        List<ApplicationDocument> documents = getApplicationDocuments(applicationId);
        
        // Documents requis obligatoires
        String[] requiredTypes = {"PASSPORT", "ACADEMIC_CERTIFICATE", "ACADEMIC_TRANSCRIPT", 
                                 "NON_CRIMINAL_CERTIFICATE", "PHOTO"};
        
        for (String requiredType : requiredTypes) {
            boolean found = documents.stream()
                    .anyMatch(doc -> doc.getDocumentType().equals(requiredType) && 
                                   "UPLOADED".equals(doc.getStatus()));
            
            if (!found) {
                return false;
            }
        }
        
        return true;
    }
    
    /**
     * Obtenir les statistiques des documents d'une application
     */
    public DocumentStatistics getDocumentStatistics(Long applicationId) {
        List<ApplicationDocument> documents = getApplicationDocuments(applicationId);
        
        long totalDocuments = documents.size();
        long uploadedDocuments = documents.stream()
                .filter(doc -> "UPLOADED".equals(doc.getStatus()))
                .count();
        long verifiedDocuments = documents.stream()
                .filter(doc -> "VERIFIED".equals(doc.getVerificationStatus()))
                .count();
        long notApplicableDocuments = documents.stream()
                .filter(doc -> "NOT_APPLICABLE".equals(doc.getStatus()))
                .count();
        
        return DocumentStatistics.builder()
                .totalDocuments(totalDocuments)
                .uploadedDocuments(uploadedDocuments)
                .verifiedDocuments(verifiedDocuments)
                .notApplicableDocuments(notApplicableDocuments)
                .build();
    }
    
    /**
     * Classe pour les statistiques des documents
     */
    @lombok.Data
    @lombok.Builder
    public static class DocumentStatistics {
        private long totalDocuments;
        private long uploadedDocuments;
        private long verifiedDocuments;
        private long notApplicableDocuments;
    }
}
