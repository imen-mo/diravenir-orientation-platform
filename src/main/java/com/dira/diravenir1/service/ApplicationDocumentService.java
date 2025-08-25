package com.dira.diravenir1.service;

import com.dira.diravenir1.Entities.Application;
import com.dira.diravenir1.Entities.ApplicationDocument;
import com.dira.diravenir1.Repository.ApplicationDocumentRepository;
import com.dira.diravenir1.Repository.ApplicationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
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
    private final ApplicationValidationService validationService;
    private final AntivirusScanService antivirusScanService;
    
    @Value("${app.upload.directory:uploads/applications}")
    private String uploadDirectory;
    
    @Value("${app.upload.max-file-size:5242880}")
    private long maxFileSizeBytes; // 5MB par défaut
    
    // Types de documents acceptés
    private static final String[] ALLOWED_EXTENSIONS = {
        ".jpg", ".jpeg", ".png", ".bmp", ".doc", ".docx", ".pdf", ".xls", ".xlsx"
    };
    
    // Types MIME acceptés
    private static final String[] ALLOWED_MIME_TYPES = {
        "image/jpeg", "image/jpg", "image/png", "image/bmp",
        "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/pdf",
        "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    };
    
    /**
     * Upload un document pour une application
     */
    @Transactional
    public ApplicationDocument uploadDocument(Long applicationId, MultipartFile file, String documentType) {
        try {
            // 1. Valider l'application
            Application application = applicationRepository.findById(applicationId)
                    .orElseThrow(() -> new IllegalArgumentException("Application non trouvée: " + applicationId));
            
            // 2. Valider le fichier
            validateFile(file);
            
            // 3. Scanner antivirus
            if (!antivirusScanService.isFileClean(convertToFile(file))) {
                throw new SecurityException("Fichier infecté détecté");
            }
            
            // 4. Créer le nom de fichier sécurisé
            String fileName = generateSecureFileName(file.getOriginalFilename());
            
            // 5. Créer le répertoire de destination
            Path uploadPath = createUploadDirectory(applicationId);
            
            // 6. Sauvegarder le fichier
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath);
            
            // 7. Créer l'entité document
            ApplicationDocument document = new ApplicationDocument();
            document.setApplicationId(applicationId);
            document.setDocumentType(documentType);
            document.setOriginalFileName(file.getOriginalFilename());
            document.setStoredFileName(fileName);
            document.setFilePath(filePath.toString());
            document.setFileSize(file.getSize());
            document.setMimeType(file.getContentType());
            document.setUploadDate(LocalDateTime.now());
            document.setStatus("UPLOADED");
            
            // 8. Sauvegarder en base
            ApplicationDocument savedDocument = documentRepository.save(document);
            
            // 9. Mettre à jour le chemin dans l'application
            updateApplicationDocumentPath(application, documentType, filePath.toString());
            
            log.info("Document uploadé avec succès: {} pour l'application {}", fileName, applicationId);
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
    @Transactional
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
            
            // Supprimer de la base
            documentRepository.delete(document);
            
            // Mettre à jour l'application
            updateApplicationDocumentPath(document.getApplicationId(), document.getDocumentType(), null);
            
            log.info("Document supprimé: {}", documentId);
            return true;
            
        } catch (Exception e) {
            log.error("Erreur lors de la suppression du document: {}", e.getMessage());
            return false;
        }
    }
    
    /**
     * Remplacer un document existant
     */
    @Transactional
    public ApplicationDocument replaceDocument(Long documentId, MultipartFile newFile) {
        try {
            // 1. Récupérer l'ancien document
            ApplicationDocument oldDocument = documentRepository.findById(documentId)
                    .orElseThrow(() -> new IllegalArgumentException("Document non trouvé: " + documentId));
            
            // 2. Valider le nouveau fichier
            validateFile(newFile);
            
            // 3. Scanner antivirus
            if (!antivirusScanService.isFileClean(convertToFile(newFile))) {
                throw new SecurityException("Fichier infecté détecté");
            }
            
            // 4. Supprimer l'ancien fichier
            Path oldFilePath = Paths.get(oldDocument.getFilePath());
            if (Files.exists(oldFilePath)) {
                Files.delete(oldFilePath);
            }
            
            // 5. Créer le nouveau nom de fichier
            String newFileName = generateSecureFileName(newFile.getOriginalFilename());
            Path uploadPath = createUploadDirectory(oldDocument.getApplicationId());
            Path newFilePath = uploadPath.resolve(newFileName);
            
            // 6. Sauvegarder le nouveau fichier
            Files.copy(newFile.getInputStream(), newFilePath);
            
            // 7. Mettre à jour le document
            oldDocument.setOriginalFileName(newFile.getOriginalFilename());
            oldDocument.setStoredFileName(newFileName);
            oldDocument.setFilePath(newFilePath.toString());
            oldDocument.setFileSize(newFile.getSize());
            oldDocument.setMimeType(newFile.getContentType());
            oldDocument.setUploadDate(LocalDateTime.now());
            oldDocument.setStatus("UPDATED");
            
            // 8. Sauvegarder
            ApplicationDocument updatedDocument = documentRepository.save(oldDocument);
            
            // 9. Mettre à jour l'application
            updateApplicationDocumentPath(oldDocument.getApplicationId(), oldDocument.getDocumentType(), newFilePath.toString());
            
            log.info("Document remplacé: {} pour l'application {}", newFileName, oldDocument.getApplicationId());
            return updatedDocument;
            
        } catch (Exception e) {
            log.error("Erreur lors du remplacement du document: {}", e.getMessage());
            throw new RuntimeException("Impossible de remplacer le document", e);
        }
    }
    
    /**
     * Marquer un document comme "Not Applicable"
     */
    @Transactional
    public ApplicationDocument markDocumentNotApplicable(Long documentId, String reason) {
        try {
            ApplicationDocument document = documentRepository.findById(documentId)
                    .orElseThrow(() -> new IllegalArgumentException("Document non trouvé: " + documentId));
            
            document.setStatus("NOT_APPLICABLE");
            document.setNotApplicableReason(reason);
            document.setUpdatedDate(LocalDateTime.now());
            
            return documentRepository.save(document);
            
        } catch (Exception e) {
            log.error("Erreur lors du marquage du document: {}", e.getMessage());
            throw new RuntimeException("Impossible de marquer le document", e);
        }
    }
    
    /**
     * Valider tous les documents d'une application
     */
    public boolean validateApplicationDocuments(Long applicationId) {
        try {
            List<ApplicationDocument> documents = documentRepository.findByApplicationId(applicationId);
            
            // Vérifier les documents obligatoires
            boolean hasPassport = documents.stream()
                    .anyMatch(doc -> "PASSPORT".equals(doc.getDocumentType()) && "UPLOADED".equals(doc.getStatus()));
            
            boolean hasAcademicCertificate = documents.stream()
                    .anyMatch(doc -> "ACADEMIC_CERTIFICATE".equals(doc.getDocumentType()) && "UPLOADED".equals(doc.getStatus()));
            
            boolean hasAcademicTranscript = documents.stream()
                    .anyMatch(doc -> "ACADEMIC_TRANSCRIPT".equals(doc.getDocumentType()) && "UPLOADED".equals(doc.getStatus()));
            
            boolean hasNonCriminalCertificate = documents.stream()
                    .anyMatch(doc -> "NON_CRIMINAL_CERTIFICATE".equals(doc.getDocumentType()) && "UPLOADED".equals(doc.getStatus()));
            
            boolean hasPhoto = documents.stream()
                    .anyMatch(doc -> "PHOTO".equals(doc.getDocumentType()) && "UPLOADED".equals(doc.getStatus()));
            
            return hasPassport && hasAcademicCertificate && hasAcademicTranscript && 
                   hasNonCriminalCertificate && hasPhoto;
            
        } catch (Exception e) {
            log.error("Erreur lors de la validation des documents: {}", e.getMessage());
            return false;
        }
    }
    
    // ===== MÉTHODES PRIVÉES =====
    
    private void validateFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Fichier vide ou null");
        }
        
        if (file.getSize() > maxFileSizeBytes) {
            throw new IllegalArgumentException("Fichier trop volumineux. Maximum: " + (maxFileSizeBytes / 1024 / 1024) + " MB");
        }
        
        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || originalFilename.trim().isEmpty()) {
            throw new IllegalArgumentException("Nom de fichier invalide");
        }
        
        // Vérifier l'extension
        boolean validExtension = false;
        for (String extension : ALLOWED_EXTENSIONS) {
            if (originalFilename.toLowerCase().endsWith(extension)) {
                validExtension = true;
                break;
            }
        }
        
        if (!validExtension) {
            throw new IllegalArgumentException("Type de fichier non autorisé. Types acceptés: " + String.join(", ", ALLOWED_EXTENSIONS));
        }
        
        // Vérifier le type MIME
        String contentType = file.getContentType();
        if (contentType != null) {
            boolean validMimeType = false;
            for (String mimeType : ALLOWED_MIME_TYPES) {
                if (mimeType.equals(contentType)) {
                    validMimeType = true;
                    break;
                }
            }
            
            if (!validMimeType) {
                throw new IllegalArgumentException("Type MIME non autorisé: " + contentType);
            }
        }
    }
    
    private String generateSecureFileName(String originalFilename) {
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        
        return UUID.randomUUID().toString() + extension;
    }
    
    private Path createUploadDirectory(Long applicationId) throws IOException {
        Path uploadPath = Paths.get(uploadDirectory, applicationId.toString());
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        return uploadPath;
    }
    
    private File convertToFile(MultipartFile multipartFile) throws IOException {
        File tempFile = File.createTempFile("temp_", "_" + multipartFile.getOriginalFilename());
        multipartFile.transferTo(tempFile);
        return tempFile;
    }
    
    private void updateApplicationDocumentPath(Application application, String documentType, String filePath) {
        switch (documentType) {
            case "PASSPORT":
                application.setPassportPath(filePath);
                break;
            case "ACADEMIC_CERTIFICATE":
                application.setAcademicCertificatePath(filePath);
                break;
            case "ACADEMIC_TRANSCRIPT":
                application.setAcademicTranscriptPath(filePath);
                break;
            case "LANGUAGE_CERTIFICATE":
                application.setLanguageCertificatePath(filePath);
                break;
            case "PHYSICAL_EXAMINATION":
                application.setPhysicalExaminationPath(filePath);
                break;
            case "NON_CRIMINAL_CERTIFICATE":
                application.setNonCriminalCertificatePath(filePath);
                break;
            case "BANK_STATEMENT":
                application.setBankStatementPath(filePath);
                break;
            case "PHOTO":
                application.setPhotoPath(filePath);
                break;
            case "RESUME":
                application.setResumePath(filePath);
                break;
            case "AWARD_CERTIFICATES":
                application.setAwardCertificatesPath(filePath);
                break;
            case "PARENT_ID":
                application.setParentIdPath(filePath);
                break;
        }
        
        applicationRepository.save(application);
    }
    
    private void updateApplicationDocumentPath(Long applicationId, String documentType, String filePath) {
        Optional<Application> applicationOpt = applicationRepository.findById(applicationId);
        if (applicationOpt.isPresent()) {
            Application application = applicationOpt.get();
            updateApplicationDocumentPath(application, documentType, filePath);
        }
    }
}
